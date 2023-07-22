package com.example.MovieProjectApi.services.userService;

import com.example.MovieProjectApi.models.UserModel;
import com.example.MovieProjectApi.repositories.UserRepository;

import java.util.List;

public class UserServiceFindByUser {

    UserRepository userRepository;
    UserModel userModel;

    public UserServiceFindByUser(UserRepository userRepository, UserModel userModel) {
        this.userRepository = userRepository;
        this.userModel = userModel;
    }

    public UserModel getUserByUsername(String username) {
        List<UserModel> users = userRepository.findAll();
        for (UserModel user : users) {
            if (user.getUsername().equals(username)) {
                return user;
            }

        }
        return null;
    }


}
