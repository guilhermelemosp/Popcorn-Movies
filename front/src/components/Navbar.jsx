import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Contextpage from '../Contextpage';
import User from '../assets/images/User.jpg';



function Navbar() {

    const { header } = useContext(Contextpage);
    const [activemobile, setActivemobile] = useState(false);
    const { clientName, handleLogout, role } = useContext(Contextpage)


    const location = useLocation();
    const name = location.state?.name;


    return (
      <>

        <nav className={`fixed bg-black/90 md:bg-black h-full w-full md:w-[15rem] z-30 md:block`}>


            <ul className="text-white font-semibold text-[16px] text-center px-5">

                <Link to="/home"><li className={`${header == "Filmes em Cartaz" ? 'bg-blue-500/20 border-blue-600' : 'bg-gray-500/20 border-black'} p-2 my-2  hover:bg-blue-500/20 rounded-[5px] border-2 hover:border-blue-600`} >Em Cartaz</li></Link>
                
                <Link to="/buy-tickets"><li className={`${header == "Comprar Ingressos" ? 'bg-blue-500/20 border-blue-600' : 'bg-gray-500/20 border-black'} p-2 my-2  hover:bg-blue-500/20 rounded-[5px] border-2 hover:border-blue-600 `} >Comprar Ingressos</li></Link>

                <Link to="/mtb"><li className={`${header == "Meus Ingressos Comprados" ? 'bg-blue-500/20 border-blue-600' : 'bg-gray-500/20 border-black'} p-2 my-2  hover:bg-blue-500/20 rounded-[5px] border-2 hover:border-blue-600 `} >Meus Ingressos Comprados</li></Link>
            </ul>
            {role === "Employee" ?
                <ul className="text-white font-semibold text-[16px] text-center px-5">
                    <Link to="/menu-admin"><li className=" p-2 my-2  hover:bg-blue-500/20 rounded-[5px] border-2 hover:border-blue-600">Cadastrar Filme</li></Link>
                    <Link to="/delete-user"><li className=" p-2 my-2  hover:bg-blue-500/20 rounded-[5px] border-2 hover:border-blue-600">Deletar Usuário</li></Link>
                    <Link to="/delete-movie"><li className=" p-2 my-2  hover:bg-blue-500/20 rounded-[5px] border-2 hover:border-blue-600">Deletar Filme</li></Link>

                </ul>
                : null}
            {/* Loginsection */}
            <div className="absolute bottom-0 w-full p-5 md:p-2 text-white">
                {clientName ? <>
                    <div className="w-full bg-gray-900 px-5 py-2 gap-4 rounded-xl flex items-center font-semibold border-2 border-blue-100/10">
                        <img src={clientName.photoURL == null ? User : clientName.photoURL} alt="user" className="h-10 rounded-full" />
                        <h1>{clientName}</h1>
                    </div>

                    <div className="cursor-pointer bg-red-500 flex justify-center items-center p-2 rounded-xl mt-2" onClick={handleLogout}>
                        <h1>Logout</h1>
                    </div>
                </>
                    :
                    <>
                        <Link to="/" className="w-full bg-gray-900 py-2 gap-4 rounded-xl flex items-center justify-center font-semibold border-2 border-blue-100/10" onClick={() => setActivemobile(!activemobile)}>
                            <h1>Log in</h1>
                        </Link>
                    </>
                }
            </div>
        </nav>
    </>
  )
}

export default Navbar