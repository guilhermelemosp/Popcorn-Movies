import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Contextpage from '../Contextpage';
import { HiChevronLeft } from "react-icons/hi";
import noimage from '../assets/images/movies.jpg'
import { FaPlay } from "react-icons/fa";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from "axios";
import GenresList  from '../pages/EmployeePages/utils/GenresList';
import { useNavigate } from 'react-router-dom';


export const Detail = () => {
  const APIKEY = import.meta.env.VITE_API_KEY;
  const genres = GenresList();
  const navigate = useNavigate();

  const { 
    loader, 
    setLoader, 
    role, 
    moviedet, 
    setMoviedet, 
    moviegenres, 
    setMoviegenres, 
    castdata,
    setCastdata,
    video,
    setVideo, 
  } = useContext(Contextpage);

  const { id } = useParams()


  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US` //QUANDO FINALIZAR, ESSA PARTE AQUI SERA SUBSTITUIDA PELO QUE ESTA DENTRO DA DB
    );
    const moviedetail = await data.json();
    setMoviedet(moviedetail);
    console.log(moviedetail);
    setMoviegenres(moviedetail.genres);
    setLoader(false);
  };

  const fetchCast = async () => {
    const castdata = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKEY}&language`
    );
    const castdetail = await castdata.json();
    setCastdata(castdetail.cast);
    setLoader(false);
  }

  const fetchVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=en-US`
    );
    const videodata = await data.json();
    setVideo(videodata.results);
    // console.log(videodata.results);
  }
  
  const checkMovie = async (path) => {

    if (!moviedet.original_title) {
      alert("Título do filme inválido.");
      return;
    }
      const response = await axios.get(`http://localhost:8080/check-movie${path}`, {
          params: {
              movieTitle: moviedet.original_title,
          },
      });
      console.log(response.data);
      return response.data;
  };
    

  const addMoviesToDb = async (path, additionalData) => {  
    const movieExists = await checkMovie(path);
    if (movieExists) {
      alert("Filme já existe.");
      navigate("/home");
    } else {
      try{
        const movieGenres = moviedet.genres;
        const addRespectiveMovieGenresToDb = movieGenres.map((genre) => genres[genre.id]);
        console.log(addRespectiveMovieGenresToDb);
        const joinedGenres = addRespectiveMovieGenresToDb.join(", ");
        console.log(joinedGenres);
        const data = moviedet
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

      navigate("/home");
      } catch (error) {
        console.log(error);
        alert("Erro ao registrar filme. Tente novamente.");
      }
    }  
  };
    

  useEffect(() => {
    fetchMovie();
    fetchCast();
    fetchVideo();
  }, []);

  return (

    <>
      {
        loader ? <div className='h-screen w-full flex justify-center items-center'><span className="loader m-10"></span></div> :
          <>

            <Link to="/home" className='fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full'><HiChevronLeft /></Link>

            {/* poster */}
            <div className='relative h-auto md:h-[82vh] flex justify-center'>
              <div className='h-full w-full shadowbackdrop absolute'></div>
              <h1 className='text-white absolute bottom-0 p-10 text-2xl md:text-6xl font-bold text-center'>{moviedet.original_title}</h1>
              {moviedet.backdrop_path === null ? <img src={noimage} className='h-full w-full' /> : <img src={"https://image.tmdb.org/t/p/original/" + moviedet.backdrop_path} className='h-full w-full' />} 
              {/* O moviedet.backdrop_path SERÁ SUBSTITUIDO FUTURAMENTE PELO QUE ESTA NA DB */}
            </div> 
            {/* overview */}
            <h2 className='text-white text-center pt-5 px-3 md:px-60 font-Roboto text-[18px]'>{moviedet.overview}</h2>

            <div className='text-blue-100 font-semibold my-3 flex justify-center'>
              <h2 className='bg-blue-600/30 border-2 border-blue-700 py-2 px-3 rounded-full'>Release Date : {moviedet.release_date}</h2>
            </div>

            {/* tag */}
            <div className='flex justify-center flex-wrap'>
              {moviegenres.map((tag) => (
                <>
                  <div key={tag.id} className='text-white font-semibold bg-gray-800 rounded-full px-4 py-1 m-2'>{tag.name}</div>
                </>
              ))}
            </div>

            {/* cast */}
            <div className='flex flex-col items-center'>
              <h1 className="text-3xl text-blue-300 font-semibold text-center p-2">Cast</h1>

              <div className="md:px-5 flex flex-row my-5 max-w-full flex-start overflow-x-auto relative
              scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-gray-900/90 md:pb-3">
                {castdata.map((cast) => (
                  <>
                    {cast.profile_path !== null ? <>
                      <div className='flex min-w-[9rem] md:min-w-[10rem] max-w-[9rem] md:max-w-[10rem] h-full items-center text-center flex-col mx-1'>
                        <LazyLoadImage effect='blur' src={"https://image.tmdb.org/t/p/w500" + cast.profile_path} className="w-full h-full rounded-xl" />
                        <p className='text-white'>{cast.name}</p>
                        <p className='text-blue-300'>({cast.character})</p>
                      </div>
                    </> : null}
                  </>
                ))}
              </div>
            </div>

            {/* trailer */}
            <div className='flex justify-center items-center mb-10 gap-5 flex-wrap'>
            {video.map((trail) => (
              <>
                {trail.type === "Trailer" ?
                  <>
                    <a key={trail.id} href={'https://www.youtube.com/watch?v=' + trail.key} target="_blank" className='flex border-2 border-red-600 bg-red-600/40 p-3 items-center justify-center gap-2 text-xl font-semibold rounded-full text-white'>
                      <FaPlay />Watch trailer
                    </a>
                  </>
                  : null}
              </>
            ))
            }

            {role === "Employee" ? <div className='flex justify-center items-center mb-10 gap-5 flex-wrap'>
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => addMoviesToDb("")}>Adicionar à "Filmes em Cartaz"</button>
                {/* <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => addMoviesToDb("/create-movie/tbr", { movieReleaseDate: moviedet.release_date})}>Adicionar à "Em Breve"</button> */}
            </div> 
            : null}
              </div>

          </>
      }
    </>
  )
}
