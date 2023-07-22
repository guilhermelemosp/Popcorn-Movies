package com.example.MovieProjectApi.controllers;

import com.example.MovieProjectApi.dtos.MovieRecordDto;
import com.example.MovieProjectApi.models.MovieModel;
import com.example.MovieProjectApi.repositories.MovieRepository;
import com.example.MovieProjectApi.services.movieService.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class MovieController {
    MovieRepository movieRepository;
    MovieServiceFindAll movieServiceFindAll;
    MovieServiceFindById movieServiceFindById;
    MovieServiceCreateMovie movieServiceCreateMovie;
    MovieServiceUpdateMovie movieServiceUpdateMovie;
    MovieServiceDeleteMovie movieServiceDeleteMovie;

    public MovieController(MovieServiceFindAll movieServiceFindAll,
                           MovieServiceFindById movieServiceFindById,
                           MovieServiceCreateMovie movieServiceCreateMovie,
                           MovieServiceUpdateMovie movieServiceUpdateMovie,
                           MovieServiceDeleteMovie movieServiceDeleteMovie,
                           MovieRepository movieRepository) {

        this.movieServiceFindAll = movieServiceFindAll;
        this.movieServiceFindById = movieServiceFindById;
        this.movieRepository = movieRepository;
        this.movieServiceCreateMovie = movieServiceCreateMovie;
        this.movieServiceUpdateMovie = movieServiceUpdateMovie;
        this.movieServiceDeleteMovie = movieServiceDeleteMovie;
    }

    @PostMapping("/movies")
    public ResponseEntity<MovieModel> createMovie(@RequestBody @Valid MovieRecordDto movieRecordDto) {
        var addMovie = movieServiceCreateMovie.createMovie(movieRecordDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(addMovie);
    }

    @GetMapping("/movies")
    public ResponseEntity<List<MovieModel>> getAllMovies() {
        List<MovieModel> getMovies = movieServiceFindAll.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(getMovies);
    }

    @GetMapping("/check-movie")
    public ResponseEntity<Boolean> checkMovie(@RequestParam("movieTitle") String movieTitle) {
        boolean exists = movieRepository.existsByMovieTitle(movieTitle);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/movies/{id}")
    public ResponseEntity<Object> getMoviesById(@PathVariable(value = "id") UUID movieId) {
        MovieModel movie = movieServiceFindById.findById(movieId);
        return movie == null || !movie.getMovieId().equals(movieId)
                ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found")
                : ResponseEntity.status(HttpStatus.OK).body(movie);

    }

    @PutMapping("/movies/{id}")
    public ResponseEntity<Object> updateMovie(@PathVariable(value = "id") UUID movieId,
                                             @RequestBody @Valid MovieRecordDto movieRecordDto) {
        MovieModel movie = movieServiceUpdateMovie.updateMovie(movieId, movieRecordDto);
        return (movie == null || !movie.getMovieId().equals(movieId))
                ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found")
                : ResponseEntity.status(HttpStatus.OK).body(movie);

    }

    @DeleteMapping("/movies/{id}")
    public ResponseEntity<Object> deleteMovie(@PathVariable(value = "id") UUID movieId) {
        MovieModel movie = movieServiceDeleteMovie.deleteMovie(movieId);

        return (movie == null || !movie.getMovieId().equals(movieId))
                ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found")
                : ResponseEntity.status(HttpStatus.OK).body("Movie deleted successfully");

    }
}
