import React,{useEffect} from "react";
import Movies from "../../components/MoviesInTheaters";
import Searchbar from "../../components/Searchbar";
import { MovieForm } from "../../components/AddMovieComponent";

function MenuAdmin() {
    return (
        <section>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                    <MovieForm />
                </div>
            </div>
        </section>
    )
}

export default MenuAdmin;