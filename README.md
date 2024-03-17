## Description

My-Movie-Client app is a React application designed for users to explore and engage with a vast collection of movies. Users can register an account, personalize their list of favorite movies, view detailed information about each movie, and manage their user profile. The application is built with React and uses Bootstrap for styling, incorporating a responsive design for optimal viewing on various devices.

## Features

-  Display a list of movies and detailed information about each movie.
-  User registration and login functionality for personalized experiences.
-  Ability to mark movies as favorites and manage a list of favorite movies.
-  Dynamic navigation that adjusts based on the user's authentication status.
-  User profile management, including updating personal information and deleting accounts.
-  Movie filtering functionality allows users to search for movies by title.
-  Recommendations for similar movies based on the movie details viewed.

## Installation

	@@ -47,22 +47,39 @@ This will launch the application in your default web browser.

-  React
-  React DOM
-  Bootstrap & Bootswatch
-  Parcel
-  Redux Toolkit for state management
-  React Redux for integrating Redux with React components
-  React Router for routing
-  React Bootstrap and React Bootstrap Icons for UI components
-  React Icons for additional icon options
-  React Slick for creating carousels
-  PropTypes for type-checking props

## Components and Redux Setup

### Main Components

-  **MainView**: Acts as the entry point, orchestrating navigation and rendering of different views.
-  **NavigationBar**: Provides dynamic navigation based on user authentication status.
-  **MovieView**: Displays detailed information about movies and suggests similar movies.
-  **MovieCard**: Represents a single movie in a card format, showing key details and allowing users to mark movie as favorite.
-  **SignupView & LoginView**: Handle user registration and authentication.
-  **ProfileView**: Allows users to view and edit their profile, manage favorite movies, change passwords, and delete accounts.
-  **MovieList**: Renders a list of movies, incorporating filtering functionality through **MovieFilter**.

### Redux Setup

The application leverages Redux Toolkit for state management, with slices for user authentication (`user`) and movie data (`movies`). It employs asynchronous thunks for user interactions with the backend API, managing application state efficiently.

## Routing with React Router

Utilizing React Router, the application ensures smooth navigation between different views, enabling a seamless user experience without page reloads.

## Styling and Responsiveness

The application uses Bootstrap, customized with Bootswatch, and Sass for styling, ensuring a responsive layout across different devices. Icons from React Bootstrap Icons and React Icons enhance the user interface.
