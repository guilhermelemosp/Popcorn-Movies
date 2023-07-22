package com.example.MovieProjectApi.services.ticketService;

import com.example.MovieProjectApi.dtos.TicketRecordDto;
import com.example.MovieProjectApi.models.MovieModel;
import com.example.MovieProjectApi.models.TicketModel;
import com.example.MovieProjectApi.models.UserModel;
import com.example.MovieProjectApi.repositories.TicketRepository;
import com.example.MovieProjectApi.services.movieService.MovieServiceFindAll;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketServiceCreateTicket {

    TicketRepository ticketRepository;
    UserModel userModel;
    MovieServiceFindAll movieServiceFindAll;

    public TicketServiceCreateTicket(TicketRepository ticketRepository,
                                     MovieServiceFindAll movieServiceFindAll) {
        this.ticketRepository = ticketRepository;
        this.movieServiceFindAll = movieServiceFindAll;
    }

    public TicketModel createTicket(TicketRecordDto ticketRecordDto) {
        var ticketModel = new TicketModel();
        BeanUtils.copyProperties(ticketRecordDto, ticketModel); // conversão de DTO para Model
        List<MovieModel> getAllMovies = movieServiceFindAll.findAll();
        int userAge = userModel.getAge(); // pega a idade do usuário

        MovieModel movie; // cria um objeto do tipo MovieModel
//
//        for(int i = 0; i < getAllMovies.size(); i++) { // percorre a lista de filmes
//            movie = getAllMovies.get(i); // pega o filme da lista
//            if (movie.getMovieMinimumAge() <= userAge) { // verifica se a idade do usuário é maior ou igual a idade mínima do filme
//                ticketRepository.save(ticketModel); // salva o ticket
//            }
//        }
//        return ticketModel; // retorna o ticket
        return null;
    }
}
