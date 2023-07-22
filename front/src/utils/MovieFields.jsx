import axios from "axios";
import React, { useContext} from "react";
import Contextpage from "../Contextpage";
import GenresList from "../pages/Employee/utils/GenresList";
export const availableSeats = 100;

export const AddMovie = ({navigate}) => {
    const genres = GenresList();
    const { moviedet } = useContext(Contextpage);


    const checkMovie = async () => {

        if (!moviedet.original_title) {
        alert("Título do filme inválido.");
        return;
        }
        const response = await axios.get(`http://localhost:8080/check-movie`, {
            params: {
                movieTitle: moviedet.original_title,
            },
        });
        console.log(response.data);
        return response.data;
    };
    
    const addMoviesToDb = async () => {  
        const movieExists = await checkMovie();
        if (movieExists) {
            alert("Filme já existe.");
            navigate("/home");
        } else {
            try{
            const movieGenres = moviedet.genres;
            const addRespectiveMovieGenresToDb = movieGenres.map((genre) => genres[genre.id]);
            console.log(addRespectiveMovieGenresToDb);
            const joinedGenres = addRespectiveMovieGenresToDb.join(", ");
            const data = moviedet
            await axios.post("http://localhost:8080/movies", {
            movieTitle: data.original_title,
            movieDuration: data.runtime,
            movieGenre: joinedGenres,
            moviePosterPath: data.poster_path,
            movieOverview: data.overview,
            movieBackdropPath: data.backdrop_path,
            });

            alert("Filme registrado com sucesso!");
            navigate("/home");
            } catch (error) {
            console.log(error);
            alert("Erro ao registrar filme. Tente novamente.");
            }
        }  
    };


    return { addMoviesToDb };
}

