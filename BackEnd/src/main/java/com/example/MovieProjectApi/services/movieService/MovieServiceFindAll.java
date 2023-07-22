package com.example.MovieProjectApi.services.movieService;

import com.example.MovieProjectApi.controllers.MovieController;
import com.example.MovieProjectApi.models.MovieModel;
import com.example.MovieProjectApi.repositories.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Service
public class MovieServiceFindAll {

    MovieRepository movieRepository;

    public MovieServiceFindAll(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<MovieModel> findAll() {
        List<MovieModel> movieList = movieRepository.findAll();
        UUID movieId;
        if (!movieList.isEmpty()) {
            for(MovieModel movie : movieList) {
                movieId = movie.getMovieId();
                movie.add(linkTo(methodOn(MovieController.class).getMoviesById(movieId)).withSelfRel());
            }
        }
        return movieList;


    }
}
