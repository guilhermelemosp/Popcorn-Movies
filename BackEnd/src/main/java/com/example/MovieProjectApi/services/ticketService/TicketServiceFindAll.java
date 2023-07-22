package com.example.MovieProjectApi.services.ticketService;

import com.example.MovieProjectApi.controllers.TicketController;
import com.example.MovieProjectApi.models.TicketModel;
import com.example.MovieProjectApi.repositories.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Service
public class TicketServiceFindAll {

    TicketRepository ticketRepository;

    public TicketServiceFindAll(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<TicketModel> findAll() {
        List<TicketModel> ticketList = ticketRepository.findAll();
        int ticketId;
        if (!ticketList.isEmpty()) {
            for(TicketModel ticket : ticketList) {
                ticketId = ticket.getTicketId();
                ticket.add(linkTo(methodOn(TicketController.class).getTicketsById(ticketId)).withSelfRel());
            }
        }
        return ticketList;


    }
}
