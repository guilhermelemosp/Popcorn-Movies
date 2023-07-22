package com.example.MovieProjectApi.services.movieService;

import com.example.MovieProjectApi.controllers.MovieController;
import com.example.MovieProjectApi.models.MovieModel;
import com.example.MovieProjectApi.repositories.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;


@Service
public class MovieServiceFindById {

    MovieRepository movieRepository;

    public MovieServiceFindById(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public MovieModel findById(UUID id) {
        Optional<MovieModel> movieO = movieRepository.findById(id);
        movieO.get().add(linkTo(methodOn(MovieController.class).getAllMovies()).withSelfRel());
        return movieO.orElse(null);
    }
}
