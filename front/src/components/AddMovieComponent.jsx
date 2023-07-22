import React, { useState, useContext } from 'react'
import Contextpage from '../Contextpage';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from "axios";
import GenresList from '../pages/EmployeePages/utils/GenresList';

export const MovieForm = () => {
  const APIKEY = import.meta.env.VITE_API_KEY;
  const genres = GenresList();

  const [step, setStep] = useState(1);
  const [movieName, setMovieName] = useState('');
  const [tmdbId, setTmdbId] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [selectedOption] = useState("Cartaz");


  const { moviedet } = useContext(Contextpage);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
 
  const handleSubmitMovieName = async (e) => {
    e.preventDefault();

      const response = await axios.get(`http://localhost:8080/check-movie`, {
          params: {
              movieTitle: movieName,
          },
      });
      console.log(response.data);
     if (response.data) {
      alert("Filme já existe. Escolha outro.");
    } else {
      handleNextStep();
    }
  };

  const handleSubmitTmdbId = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${APIKEY}&language=en-US`
      );
      if (!response.ok) {
        // Verifica se a resposta não é ok (status code não é 2xx) e trata o erro.
        throw new Error('Filme não encontrado na API TMDB.');
      }
  
      const moviedetail = await response.json();
      console.log(moviedetail);
  
      const movieData = {
        original_title: moviedetail.original_title,
        poster_path: `https://image.tmdb.org/t/p/w500${moviedetail.poster_path}`,
        genres: moviedetail.genres,
        runtime: moviedetail.runtime,
        backdrop_path: moviedetail.backdrop_path,
        overview: moviedetail.overview,
      };
      setMovieData(movieData);
      console.log(movieData);
      handleNextStep();
    } catch (error) {
      console.error(error);
      alert('Filme não encontrado na API TMDB. Verifique o ID digitado e tente novamente.');
    }
  };
  

  const handleSubmitConfirmation = async (e) => {
    e.preventDefault();
    try{
      const movieGenres = moviedet.genres;
      const addRespectiveMovieGenresToDb = movieGenres.map((genre) => genres[genre.id]);

      const joinedGenres = addRespectiveMovieGenresToDb.join(", ");

      const data = movieData;
      const path = selectedOption === "Cartaz" ? "" : "/create-movie/tbr";
      const additionalData = selectedOption === "Cartaz" ? {} : { movieReleaseDate: moviedet.release_date };

      await axios.post(`http://localhost:8080/movies${path}`, {
      movieTitle: data.original_title,
      movieDuration: data.runtime,
      movieGenre: joinedGenres,
      moviePosterPath: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      movieOverview: data.overview,
      movieBackdropPath: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
      ...additionalData,
    });

    alert("Filme registrado com sucesso!");
    setStep(1);
    setMovieName('');
    setTmdbId('');
    setMovieData(null);

    } catch (error) {
      console.log(error);
      alert("Erro ao registrar filme. Tente novamente.");
    }
  }  



  return (
    <div className="container mx-auto px-4 py-8">
      {step === 1 && (
        <div>
          <h1 className="text-3xl font-semibold mb-4 text-white">Etapa 1: Verificar Filme no Banco de Dados</h1>
          <form onSubmit={handleSubmitMovieName}>
            <label htmlFor="movieName" className="block mb-2 text-white">Digite o Nome do Filme:</label>
            <input
              type="text"
              id="movieName"
              className="block w-full border rounded py-2 px-3 mb-4"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              required
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Próxima Etapa
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div>
          <h1 className="text-3xl font-semibold mb-4 text-white">Etapa 2: Verificar Filme na API TMDB</h1>
          <form onSubmit={handleSubmitTmdbId}>
            <label htmlFor="tmdbId" className="block mb-2 text-white">Digite o ID do Filme TMDB:</label>
            <input
              type="text"
              id="tmdbId"
              className="block w-full border rounded py-2 px-3 mb-4"
              value={tmdbId}
              onChange={(e) => setTmdbId(e.target.value)}
              required
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Próxima Etapa
            </button>
            <button type="button" className="ml-2 text-blue-500 font-bold" onClick={handlePrevStep}>
              Voltar
            </button>
          </form>
        </div>
      )}

      {step === 3 && movieData && (
        <div>
          <h1 className="text-3xl font-semibold mb-4 text-white">Etapa 3: Filme Encontrado</h1>
          <div className="mb-4">
            <img src={movieData.poster_path} alt={movieData.title} className="w-40 h-auto" />
          </div>
          <p>Foi encontrado o seguinte filme: {movieData.title}</p>
          <form 
            className="text-1xl font-semibold mb-4 text-white"
            onSubmit={handleSubmitConfirmation}>
            {/* <p className="text-3xl font-semibold mb-4 text-white"> Selecione Onde Guardará o Filme:</p>
            <input
              type="radio"
              name="movieOption"
              value="Cartaz"
              className="text-3xl font-semibold mb-4 text-white"
              checked={selectedOption === "Cartaz"}
              onChange={() => setSelectedOption("Cartaz")}
            />{" "}
            Filmes em Cartaz
            {"       "}
            <input
              type="radio"
              name="movieOption"
              value="EmBreve"
              className="text-white"
              checked={selectedOption === "EmBreve"}
              onChange={() => setSelectedOption("EmBreve")}
            />{" "}
            Em Breve */}
            <p className="text-2xl font-semibold mb-4 text-white"> Confirme se o filme está correto e clique em "Confirmar Cadastro".</p>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Confirmar Cadastro
            </button>
            <button type="button" className="ml-2 text-blue-500 font-bold" onClick={handlePrevStep}>
              Voltar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MovieForm;