package com.example.MovieProjectApi.repositories;

import com.example.MovieProjectApi.models.TicketModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<TicketModel, Integer> {
}
