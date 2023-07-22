import React, { useState, useContext } from 'react'
import Contextpage from '../Contextpage';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from "axios";
import GenresList from '../pages/EmployeePages/utils/GenresList';

export const DeleteUserComponent = () => {
  const APIKEY = import.meta.env.VITE_API_KEY;
  const genres = GenresList();

  const [step, setStep] = useState(1);
  const [userDataDelete, setUserDataDelete] = useState('');

  const { username, setUsername, userId, setUserId } = useContext(Contextpage);
 
  

  const handleSubmitConfirmation = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.delete(`http://localhost:8080/users/${userId}`);
    
    alert("Usuário DELETADO com sucesso!");
    setStep(1);
    setUsername('');
    setUserId('');

    } catch (error) {
      console.log(error);
      alert("Erro ao deletar Usuário. Tente novamente.");
    }
  }  



  return (
    <div className="container mx-auto px-4 py-8">
        <div>
          <h1 className="text-3xl font-semibold mb-4 text-white">ID do Usuário</h1>
          <form onSubmit={handleSubmitConfirmation}>
            <label htmlFor="username" className="block mb-2 text-white">Digite o ID do Usuário:</label>
            <input
              type="text"
              id="username"
              className="block w-full border rounded py-2 px-3 mb-4"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
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

export default DeleteUserComponent;