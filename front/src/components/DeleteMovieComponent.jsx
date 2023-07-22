import React, { useState, useContext } from 'react'
import Contextpage from '../Contextpage';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from "axios";
import GenresList from '../pages/EmployeePages/utils/GenresList';

export const DeleteMovieComponent = () => {
  const APIKEY = import.meta.env.VITE_API_KEY;
  const genres = GenresList();

  const [step, setStep] = useState(1);
  const [movieName, setMovieName] = useState('');
  const [movieId, setMovieId] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Cartaz");
 

  const handleSubmitConfirmation = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.delete(`http://localhost:8080/movies/${movieId}`);

      alert("Filme DELETADO com sucesso!");

    } catch (error) {
      console.log(error);
      alert("Erro ao deletar filme. Tente novamente.");
    }
  }  



  return (
    <div className="container mx-auto px-4 py-8">
        <div>
          <h1 className="text-3xl font-semibold mb-4 text-white">ID do Filme</h1>
          <form onSubmit={handleSubmitConfirmation}>
            <label htmlFor="movieName" className="block mb-2 text-white">Digite o ID do Filme:</label>
            <input
              type="text"
              id="movieName"
              className="block w-full border rounded py-2 px-3 mb-4"
              value={movieId}
              onChange={(e) => setMovieId(e.target.value)}
              required
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Próxima Etapa
            </button>
          </form>
        </div>
    </div>
  );
};

export default DeleteMovieComponent;