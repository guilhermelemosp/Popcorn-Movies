package com.example.MovieProjectApi.dtos;

import com.example.MovieProjectApi.models.MovieModel;
import com.example.MovieProjectApi.models.UserModel;
import jakarta.validation.constraints.NotNull;

public record TicketRecordDto(MovieModel movie,
                              UserModel user,
                              @NotNull int ticketsQuantity){
}
