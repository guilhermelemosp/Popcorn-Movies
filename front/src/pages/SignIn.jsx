import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [isUsernameExists] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [accountType, setAccountType] = useState("");
  const navigate = useNavigate();
   

  const checkUsername = async () => {
    const response = await axios.get(`http://localhost:8080/check-username`, {
      params: {
          username: username,
      },
    });
    console.log(response.data);
    return response.data;
  };

  
  const registerUser = async () => {
    setIsSubmitting(true);

    const userNameExists = await checkUsername();
    console.log(userNameExists);

    if (userNameExists) {
      alert("Nome de usuário já existe. Por favor, escolha outro nome de usuário.");
    } else {
      try{
        await axios.post("http://localhost:8080/register-user", {
        name: name,
        username: username,
        password: password,
        age: age,
        role: 'Client',
      });

      alert("Usuário registrado com sucesso!");

      navigate("/");
      } catch (error) {
        console.log(error);
        alert("Erro ao registrar usuário. Tente novamente.");
      }
    }  
    setIsSubmitting(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleUsernameChange = async (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // const handleAccountTypeChange = (event) => {
  //   setAccountType(event.target.value);
  // };

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="flex flex-col gap-5">
        <input
          className="border-2 border-white/30 p-5 flex justify-center items-center gap-5 rounded-2xl cursor-pointer hover:bg-black"
          type="text"
          placeholder="Nome"
          value={name}
          onChange={handleNameChange}
        />
        <input
          className="border-2 border-white/30 p-5 flex justify-center items-center gap-5 rounded-2xl cursor-pointer hover:bg-black"
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          className="border-2 border-white/30 p-5 flex justify-center items-center gap-5 rounded-2xl cursor-pointer hover:bg-black"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={handlePasswordChange}
        />

        <input
          className="border-2 border-white/30 p-5 flex justify-center items-center gap-5 rounded-2xl cursor-pointer hover:bg-black"
          type="age"
          placeholder="Idade"
          value={age}
          onChange={handleAgeChange}
        />

        {/* <div className="text-white">
          <p>Selecione o tipo de conta:</p>
          <input
            type="radio"
            name="accountType"
            value="Client"
            className="text-white"
            checked={accountType === "Client"}
            onChange={handleAccountTypeChange}
          />{" "}
          Cliente
          {"       "}
          <input
            type="radio"
            name="accountType"
            value="Employee"
            className="text-white"
            checked={accountType === "Employee"}
            onChange={handleAccountTypeChange}
          />{" "}
          Funcionário
        </div> */}

        <button
          className="border-2 border-white/30 p-3 flex justify-center items-center gap-3 rounded-2xl cursor-pointer bg-white"
          onClick={registerUser}
          disabled={isUsernameExists || isSubmitting}
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
        
        <button
          className="border-2 border-white/30 p-3 flex justify-center items-center gap-3 rounded-2xl cursor-pointer bg-white"
          onClick={() => navigate("/")}
        >
          Voltar ao Menu Inicial
        </button>
      </form>
    </div>
  );
};

export default SignIn;
