package com.example.MovieProjectApi.controllers;

import com.example.MovieProjectApi.dtos.TicketRecordDto;
import com.example.MovieProjectApi.models.TicketModel;
import com.example.MovieProjectApi.services.ticketService.TicketServiceCreateTicket;
import com.example.MovieProjectApi.services.ticketService.TicketServiceFindAll;
import com.example.MovieProjectApi.services.ticketService.TicketServiceFindById;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public class TicketController {

    TicketServiceCreateTicket ticketServiceCreateTicket;
    TicketServiceFindAll ticketServiceFindAll;
    TicketServiceFindById ticketServiceFindById;

    public TicketController(TicketServiceCreateTicket ticketServiceCreateTicket,
                            TicketServiceFindAll ticketsServiceFindAll,
                            TicketServiceFindById ticketServiceFindById) {
        this.ticketServiceCreateTicket = ticketServiceCreateTicket;
        this.ticketServiceFindAll = ticketsServiceFindAll;
        this.ticketServiceFindById = ticketServiceFindById;
    }

    @PostMapping("/tickets")
    public ResponseEntity<TicketModel> createTicket(@RequestBody @Valid TicketRecordDto ticketRecordDto) {
        var addTicket = ticketServiceCreateTicket.createTicket(ticketRecordDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(addTicket);
    }

    @GetMapping("/tickets")
    public ResponseEntity<List<TicketModel>> getAllTickets() {
        List<TicketModel> getTickets = ticketServiceFindAll.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(getTickets);
    }

    @GetMapping("/movies/{id}")
    public ResponseEntity<Object> getTicketsById(@PathVariable(value = "id") int ticketId) {
        TicketModel ticket = ticketServiceFindById.findById(ticketId);
        return ticket == null || ticket.getTicketId() != ticketId
                ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket not found")
                : ResponseEntity.status(HttpStatus.OK).body(ticket);

    }
}
