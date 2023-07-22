<h1 align="center">POPCORN MOVIES</h1>
Popcorn Movies is a React-based movie website that allows users to search for movies by title, sort them by genre, and buy tickets for the movies by user's age. The website is designed to be user-friendly and visually appealing.
<hr/>

# 🍿 Features 

- Search movies: users can search for movies by title
- Genre-wise display: movies can be sorted by genre
- Movies for you: displays a section for movies based on user's age
- Buy Tickets: displays a section to Users can buy tickets for the movies
- Movie Details: users can view detailed information about each movie

<hr/>

# 🍿 Technology

Popcorn Movies is built using the following technologies:

FRONTEND:
- ReactJS
- TMDB API
- Framer Motion

BACKEND:
- Java
- PostgreSQL
- Spring Boot

<hr/>

# 🍿 How to Run the Website on Your System

## Step 1: Download and Extract the Code

Firstly, download the entire website code and extract the ZIP file to a folder on your local system.

## Step 2: Obtain the TMDB Movies API Key and Firebase Configuration

This application is Hybrid, for now. I started by using the TMDB API, and throughout the project creation process, I gradually made changes to switch to local data storage and retrieval in a database.
Even so, before starting the website, you will need to obtain the TMDB Movies API key and Firebase configuration. Follow these steps to obtain them and add them to your `.env` file.

### ▶️ Get TMDB API Key 

- Go to https://www.themoviedb.org/ and log in.
- Click on your user profile picture in the navigation bar, and select "Settings".
- In the settings, select "API" and generate an API key.

## Step 3: Run the Website

Open your code editor (such as VS Code) and navigate to the project directory. Then, open a terminal and run the following command:

```bash
npm run dev
```
This will start the application. Open a web browser and navigate to http://localhost:3000 to access the website.

Note: Ensure that you have carefully added the TMDB API key configuration to your .env file. If the .env file is not working, add all the API keys and configuration manually.

The Tomcat(BackEnd - IntelliJ) is configurated to run at port 8080, so make sure that you have no other application running at this port. Also, make sure that you have the PostgreSQL installed and running at port 5432, or change the port in the "application.properties" file.
