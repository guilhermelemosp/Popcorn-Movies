package com.example.MovieProjectApi.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserRecordDto(@NotBlank String name,
                            @NotBlank String username,
                            @NotBlank String password,
                            @NotNull int age,
                            @NotBlank String role) {

}
