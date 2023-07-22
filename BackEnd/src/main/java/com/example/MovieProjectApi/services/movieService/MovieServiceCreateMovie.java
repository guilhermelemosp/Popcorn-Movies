package com.example.MovieProjectApi.services.movieService;

import com.example.MovieProjectApi.dtos.MovieRecordDto;
import com.example.MovieProjectApi.models.MovieModel;
import com.example.MovieProjectApi.repositories.MovieRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class MovieServiceCreateMovie {

    MovieRepository movieRepository;

    public MovieServiceCreateMovie(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public MovieModel createMovie(MovieRecordDto movieRecordDto) {
        var movieModel = new MovieModel();
        BeanUtils.copyProperties(movieRecordDto, movieModel); // conversão de DTO para Model
        return movieRepository.save(movieModel);
    }
}
