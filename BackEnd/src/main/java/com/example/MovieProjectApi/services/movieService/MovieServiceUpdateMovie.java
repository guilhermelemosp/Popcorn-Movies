package com.example.MovieProjectApi.services.movieService;

import com.example.MovieProjectApi.dtos.MovieRecordDto;
import com.example.MovieProjectApi.models.MovieModel;
import com.example.MovieProjectApi.repositories.MovieRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class MovieServiceUpdateMovie {

    MovieRepository movieRepository;

    public MovieServiceUpdateMovie(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }
    public MovieModel updateMovie(UUID movieId, MovieRecordDto movieRecordDto) {
        Optional<MovieModel> existingMovie = movieRepository.findById(movieId);

        var movieModel = existingMovie.get();
        BeanUtils.copyProperties(movieRecordDto, movieModel); // conversão de DTO para Model
        return movieRepository.save(movieModel);
    }
}
