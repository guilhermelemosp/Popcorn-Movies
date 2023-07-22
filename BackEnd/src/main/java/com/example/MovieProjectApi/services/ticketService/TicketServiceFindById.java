package com.example.MovieProjectApi.services.ticketService;

import com.example.MovieProjectApi.controllers.TicketController;
import com.example.MovieProjectApi.models.TicketModel;
import com.example.MovieProjectApi.repositories.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Service
public class TicketServiceFindById {

    TicketRepository ticketRepository;

    public TicketServiceFindById(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public TicketModel findById(int id) {
        Optional<TicketModel> ticketO = ticketRepository.findById(id);
        ticketO.get().add(linkTo(methodOn(TicketController.class).getAllTickets()).withSelfRel());
        return ticketO.orElse(null);
    }
}
