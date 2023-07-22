import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";

const Contextpage = createContext();

export function MovieProvider({ children }) {

  const [header, setHeader] = useState("Trending");
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [page, setPage] = useState(1);
  const [activegenre, setActiveGenre] = useState(28);
  const [genres, setGenres] = useState([])
  const [loader, setLoader] = useState(true);
  const [backgenre, setBackGenre] = useState(false);
  // const [user, setUser] = useAuthState(auth)//=======> firebase custom hooks state
  const navigate = useNavigate();// =====> navigate page
  const [clientName , setClientName] = useState(" ")
  const [signInName , setSignInName] = useState(" ")
  const [username , setUsername] = useState(" ")
  const [userId, setUserId] = useState(" ")
  const [age, setAge] = useState(null)
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // [Client, Employee]
  const [moviedet, setMoviedet] = useState([]);
  const [moviegenres, setMoviegenres] = useState([]);
  const [castdata, setCastdata] = useState([]);
  const [video, setVideo] = useState([]);



  const APIKEY = import.meta.env.VITE_API_KEY;

  if (page < 1) {
    setPage(1)
  }

  const ageGroup = age <= 11 ? "child" : age >= 12 && age <= 17 ? "teen" : "adult";


  const selectedFilmsForYou = async () => {
    const data = await axios("http://localhost:8080/movies");
    const moviesData = data.data;
    console.log(moviesData);
    setLoader(false);
    setHeader("Filmes em Cartaz");

    return moviesData;
  };

  const fetchSearch = async (query) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const searchmovies = await data.json();
    setMovies(searchmovies.results);
    setLoader(false);
    setHeader(`Results for "${query}"`);
  }

  const fetchGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&language=en-US`
    );
    const gen = await data.json();
    setGenres(gen.genres);
  }

  const fetchTrending = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${APIKEY}&page=${page}`
    );
    const trend = await data.json();
    setTrending(trend.results);
    setLoader(false)
    setHeader("Comprar Ingressos")
  }

  const fetchUpcoming = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=en-US&page=${page}`
    );
    const upc = await data.json();
    setUpcoming(upc.results)
    setLoader(false)
    setHeader("Meus Ingressos Comprados")
  }

  // creat local storage
  const GetFavorite = () => {
    setLoader(false)
    setHeader("Favorite Movies")
  }
      
  const handleLogout = async () => {
    setClientName(null)
    toast.success("Logout successfully");
    navigate("/")
  }

  return (
    <Contextpage.Provider
      value={{
        fetchGenre,
        genres,
        setGenres,
        selectedFilmsForYou,
        header,
        setHeader,
        movies,
        setMovies,
        page,
        setPage,
        activegenre,
        setActiveGenre,
        fetchSearch,
        loader,
        setBackGenre,
        backgenre,
        setLoader,
        fetchTrending,
        trending,
        fetchUpcoming,
        upcoming,
        GetFavorite,
        clientName,
        setClientName,
        signInName,
        setSignInName,
        username,
        setUsername,
        password,
        setPassword,
        handleLogout,
        age,
        setAge,
        role,
        setRole,
        userId,
        setUserId,
        moviedet,
        setMoviedet,
        moviegenres, 
        setMoviegenres,
        castdata,
        setCastdata,
        video,
        setVideo,
        
        
        
      
        // GoogleLogin,
        // user
      }}
    >
      {children}
    </Contextpage.Provider>
  );

}

export default Contextpage
