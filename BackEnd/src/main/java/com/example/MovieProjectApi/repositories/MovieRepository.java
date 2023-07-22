package com.example.MovieProjectApi.repositories;

import com.example.MovieProjectApi.models.MovieModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MovieRepository extends JpaRepository<MovieModel, UUID> {
    boolean existsByMovieTitle(String movieTitle);

}
