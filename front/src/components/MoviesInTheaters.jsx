import React, { useEffect, useContext, useState } from 'react'
import Contextpage from '../Contextpage';
import Moviecard from './Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import Genre from './Genre';
import Header from './Header';
import { Pagebtn } from './Pagebtn';
import axios from 'axios';

function MoviesInTheaters() {

    const {movies,selectedFilmsForYou, activegenre,loader,page} = useContext(Contextpage);
    const [moviesList, setMoviesList] = useState([]); // Inicializa o estado com um array vazio

  const getMovies = async () => {
    try{
    const response = await axios.get("http://localhost:8080/movies");
    const moviesData = await response.data;
     setMoviesList(moviesData);
    console.log(moviesList);

    const allMovies = moviesList.map((movie)=> {
      <Moviecard key={movie.movie_id} movie={movie} />
    })

    } catch (error) {
      console.log(error);
    }
  
  };


    useEffect(() => {
      getMovies();
      console.log(getMovies());
      selectedFilmsForYou();
    }, [activegenre,page])
    
    return (

        <div className='w-full bg-[#10141e] md:p-10 mb-20 md:mb-0'>
            <Genre />
            <Header />
            <motion.div
                layout
                className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around">
                <AnimatePresence>
                    {
                        loader ?  <span className="loader m-10"></span>:
                            <>
                                {() => {
                                  moviesList.map((movie) => (
                                    <Moviecard key={movie.movie_id} movie={movie} />
                                      
                                ))}}
                            </>
                    }
                </AnimatePresence>
            </motion.div>
            <Pagebtn/>
            
        </div>
    )
}

export default MoviesInTheaters


//   `https://api.themoviedb.org/3/trending/all/day?api_key=b454aa11fb4b5fc5b515d2e80a898a1c&page=${page}`