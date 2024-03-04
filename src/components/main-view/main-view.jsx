import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SingupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = us
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }
        fetch("https://movie-api-project14-def5aeaaa6a3.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        Title: movie.title,
                        ImagePath: movie.ImagePath,
                        Description: movie.Description,
                        Genre: {
                            Name: movie.genre?.Name,
                        },
                        Director: {
                            Name: movie.director?.Name
                        },
                    };
                });
                setMovies(moviesFromApi);

            });
    },
        [token]);

    if (!user) {
        return (
            <>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}
                />
                or
                <SingupView />
            </>
        );
    }

    if (selectedMovie) {
        let similarMovies = movies.filter((movie) => {
            return movie._id !== selectedMovie._id && movie.Genre.Name === selectedMovie.Genre.Name;
        });
        if (similarMovies.length === 0) {
            return (
                <>
                    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} /><br />
                    <h2>Similar Movies</h2>
                    <p>There are no similar movies.</p>
                </>
            );
        } else {
            return (
                <>
                    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} /><br />
                    <h2>Similar Movies</h2>
                    {similarMovies.map((movie) => (
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    ))}
                </>
            );
        }
    }



    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
            <button
                onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            >
                Logout
            </button>
        </div>
    );
};