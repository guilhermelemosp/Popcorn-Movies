package com.example.MovieProjectApi.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MovieRecordDto(@NotBlank String movieTitle,
                             @NotBlank String movieGenre,
                             @NotBlank String movieBackdropPath,
                             @NotBlank String moviePosterPath,
                             @NotBlank String movieOverview,
                             @NotNull int movieDuration) {
}