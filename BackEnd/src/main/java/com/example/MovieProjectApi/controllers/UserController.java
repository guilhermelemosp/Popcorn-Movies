package com.example.MovieProjectApi.controllers;

import com.example.MovieProjectApi.dtos.UserRecordDto;
import com.example.MovieProjectApi.models.UserModel;
import com.example.MovieProjectApi.repositories.UserRepository;
import com.example.MovieProjectApi.services.userService.*;
import com.example.MovieProjectApi.services.userService.utils.UserRules;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserController {
    UserRepository userRepository;
    UserServiceFindAll userServiceFindAll;
    UserServiceFindById userServiceFindById;
    UserServiceCreateUser userServiceCreateUser;
    UserServiceUpdateUser userServiceUpdateUser;
    UserServiceDeleteUser userServiceDeleteUser;
    UserRules userRules;


    public UserController(
    UserRepository userRepository,
    UserServiceFindAll userServiceFindAll,
    UserServiceFindById userServiceFindById,
    UserServiceCreateUser userServiceCreateUser,
    UserServiceUpdateUser userServiceUpdateUser,
    UserServiceDeleteUser userServiceDeleteUser,
    UserRules userRules)
    {
        this.userRepository = userRepository;
        this.userServiceFindAll = userServiceFindAll;
        this.userServiceFindById = userServiceFindById;
        this.userServiceCreateUser = userServiceCreateUser;
        this.userServiceUpdateUser = userServiceUpdateUser;
        this.userServiceDeleteUser = userServiceDeleteUser;
        this.userRules = userRules;
    }

    @CrossOrigin(origins = "http://localhost:5173/signin")
    @PostMapping("/users")
    public ResponseEntity<UserModel> createUser(@RequestBody @Valid UserRecordDto userRecordDto) {
        var addUser = userServiceCreateUser.createUser(userRecordDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(addUser);
    }

    @PostMapping("/register-user")
    public ResponseEntity<UserModel> registerUser(@RequestBody @Valid UserRecordDto userRecordDto) {
        var addUser = userServiceCreateUser.createUser(userRecordDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(addUser);
    }


    @GetMapping("/login")
    public ResponseEntity<UserModel> login(@RequestParam ("username") String username,
                                                 @RequestParam ("password") String password) {
        UserModel user = userRules.authenticateUser(username, password);

        if (user != null) {
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/check-username")
    public ResponseEntity<Boolean> checkUsername(@RequestParam("username") String username) {
        boolean exists = userRepository.existsByUsername(username);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable(value = "id") UUID userId) {
        UserModel user = userServiceFindById.findById(userId);
        return user == null || !user.getUserId().equals(userId)
                ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found")
                : ResponseEntity.status(HttpStatus.OK).body(user);

    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable(value = "id") UUID userId,
                                             @RequestBody @Valid UserRecordDto userRecordDto) {
        UserModel user = userServiceUpdateUser.updateUser(userId, userRecordDto);
        return (user == null || !user.getUserId().equals(userId))
                ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found")
                : ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable(value = "id") UUID userId) {
        UserModel user = userServiceDeleteUser.deleteUser(userId);
        return (user == null || !user.getUserId().equals(userId)) ? ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("User not found")
                : ResponseEntity.status(HttpStatus.OK).body("User deleted successfully");
    }

}
