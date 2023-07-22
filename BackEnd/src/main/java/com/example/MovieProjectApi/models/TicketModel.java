package com.example.MovieProjectApi.models;

import jakarta.persistence.*;
import org.springframework.hateoas.RepresentationModel;

import java.io.Serializable;

@Entity
@Table(name = "Tickets")
public class TicketModel extends RepresentationModel<TicketModel> implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int ticketId;

    @ManyToOne
    @JoinColumn(name = "movieId")
    private MovieModel movie;

    @ManyToOne
    @JoinColumn(name = "userId")
    private UserModel user;

    private int ticketsQuantity;

    public int getTicketsPrice() {
        return ticketsPrice;
    }

    public void setTicketsPrice(int ticketsPrice) {
        this.ticketsPrice = ticketsPrice;
    }

    private int ticketsPrice;


    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public int getTicketsQuantity() {
        return ticketsQuantity;
    }

    public void setTicketsQuantity(int ticketsQuantity) {
        this.ticketsQuantity = ticketsQuantity;
    }

    public MovieModel getMovie() {
        return movie;
    }

    public void setMovie(MovieModel movie) {
        this.movie = movie;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }
}
