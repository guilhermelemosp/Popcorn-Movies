package com.example.MovieProjectApi.services.movieService;

import com.example.MovieProjectApi.models.MovieModel;
import com.example.MovieProjectApi.repositories.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class MovieServiceDeleteMovie {

    MovieRepository movieRepository;

    public MovieServiceDeleteMovie(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }


    public MovieModel deleteMovie(UUID movieId) {
        Optional<MovieModel> movieO = movieRepository.findById(movieId);

        movieRepository.deleteById(movieO.get().getMovieId());
        return movieO.orElse(null);
    }
}

