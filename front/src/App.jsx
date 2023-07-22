import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Detail } from './components/Detail';
import Login from './auth/Login';
import Navbar from './components/Navbar'
import Container from './pages/Container'
import BuyTickets from './pages/BuyTickets';
import TicketsBought from './pages/TicketsBought';
import MenuAdmin from './pages/EmployeePages/MenuAdmin';
import DeleteUser from './pages/EmployeePages/DeleteUser';
import DeleteMovie from './pages/EmployeePages/DeleteMovie';
// import FavoritePage from './pages/User/FavoritePage';
import SignIn from './pages/SignIn';
import { MovieProvider } from "./Contextpage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
const location = useLocation();

  return (
    <MovieProvider>
       <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      {location.pathname !== '/' && location.pathname !== '/signin' && location.pathname !== 'menu-admin' && location.pathname !== 'delete-user' && <Navbar />}
      <div className="md:ml-[15rem]">
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/home' element={<Container />} />
          <Route path='/buy-tickets' element={<BuyTickets />} />
          <Route path='/mtb' element={<TicketsBought />} />
          <Route path='/moviedetail/:id' element={<Detail />} />
          <Route path="/menu-admin" element={<MenuAdmin />} />
          <Route path="/delete-user" element={<DeleteUser />} />
          <Route path="/delete-movie" element={<DeleteMovie />} />
        </Routes>
      </div>
    </MovieProvider>
  )
}

export default App
