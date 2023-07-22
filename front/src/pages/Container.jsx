import React,{useEffect} from "react";
import MoviesInTheaters from "../components/MoviesInTheaters";
import Searchbar from "../components/Searchbar";

function Container() {
    return (
        <section>
            <Searchbar />
            <MoviesInTheaters/>
        </section>
    )
}

export default Container;