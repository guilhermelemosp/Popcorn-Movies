import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Contextpage from '../Contextpage';
import { motion } from 'framer-motion'


function Login() {
    
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ setIsAuthenticated] = useState(false);
  const {setClientName, setAge, setRole} = useContext(Contextpage)
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:8080/login",
      {
        params: {
          username: username,
          password: password,
        },
      });
      const userReturn = response.data;
      console.log(userReturn);

      if (userReturn !== null && userReturn.role === "Client") {
        setIsAuthenticated(true);
        setClientName(userReturn.name);
        setAge(userReturn.age);
        setRole(userReturn.role);
        alert("Login successful");
        navigate("/home");
      } else {
        userReturn.role === "Employee" ? navigate("/menu-admin") : alert("Login failed");
        setRole(userReturn.role);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('INVALID CREDENTIALS!');
      } else {
      console.log(err);
      }
      }
  };
      
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-5">
        <input
          className="border-2 border-white/30 p-5 flex justify-center items-center gap-5 rounded-2xl cursor-pointer hover:bg-black"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          value={username}
        />
        <input
          className="border-2 border-white/30 p-5 flex justify-center items-center gap-5 rounded-2xl cursor-pointer hover:bg-black"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          value={password}
        />

        <div className="flex flex-col gap-3 justify-center">
          <motion.button
            onClick={handleLogin}
            className="border-2 border-white/30 p-3 flex justify-center items-center gap-3 rounded-2xl cursor-pointer bg-white"
            whileHover={{ backgroundColor: "#4CAF50", rotate: [0, -5, 5, -5, 0] }}
          >
            Login
          </motion.button>
          <p 
          className="text-sm text-white cursor-pointer" 
          onClick={() => navigate("/signin")}>
            First Access? Sign In Here
          </p>
        </div>
      </div>
    </div>
  );
}


export default Login
