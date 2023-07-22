package com.example.MovieProjectApi.services.userService.utils;

import com.example.MovieProjectApi.models.UserModel;
import com.example.MovieProjectApi.services.userService.UserServiceFindAll;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class UserRules {

    UserServiceFindAll userServiceFindAll;
    UserModel currentUser;


    public UserRules(UserServiceFindAll userServiceFindAll) {
        this.userServiceFindAll = userServiceFindAll;
    }

    public String encryptPassword(String password) {
        String encryptedPassword = BCrypt.hashpw(password, BCrypt.gensalt(10));
        return encryptedPassword;
    }

    public UserModel authenticateUser(String username, String password) {
        List<UserModel> users = userServiceFindAll.findAll();
        String passwordFromDb;
        String encryptedPassword;
        for (UserModel user : users) {
            if (user.getUsername().equals(username)) {
               passwordFromDb = user.getPassword();
                if (BCrypt.checkpw(password, passwordFromDb)) {
                    return user;
                }
            }
        }

        return null;
    }


}
