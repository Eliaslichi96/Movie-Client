import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SingupView } from "../signup-view/signup-view";
import { LoginView } from "../login-view/login-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");

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
                        title: movie.Title,
                        genre: movie.Genre,
                        description: movie.Description,
                        director: movie.Director,
                    };
                });
                localStorage.setItem("movies",
                    JSON.stringify(moviesFromApi));
                setMovies(moviesFromApi);
            });
    }, [token]);
    // Add Favorite Movie
    const addFav = (id) => {

        fetch(`https://movie-api-project14-def5aeaaa6a3.herokuapp.com/users/${user.Username}/movies/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed to add")
            }
        }).then((user) => {
            if (user) {
                alert("Added successfully");
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                //setIsFavorite(true);
            }
        }).catch(error => {
            console.error('Error: ', error);
        });
    };
    // Remove Favorite Movie
    const removeFav = (id) => {

        fetch(`https://movie-api-project14-def5aeaaa6a3.herokuapp.com/users/${user.Username}/movies/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed to remove")
            }
        }).then((user) => {
            if (user) {
                alert("Removed successfully from favorite Movies");
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                //setIsFavorite(false);
            }
        }).catch(error => {
            console.error('Error: ', error);
        });
    };
    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }}
            />
            <Row className="justify-content-center my-5">
                <Routes>
                    {/* Return SignupView if not logged in, otherwise mainpage */}
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    {/* Return LoginView if not logged in, otherwise mainpage */}
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    {/* Return MovieView if logged in, otherwise LoginView */}
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>There is no movie</Col>
                                ) : (
                                    <Col md={12}>
                                        <MovieView
                                            movies={movies}
                                            removeFav={removeFav}
                                            addFav={addFav}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    {/* Return MovieCards if logged in, otherwise LoginView */}
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty</Col>
                                ) : (
                                    <>
                                        <Form className="form-inline mt-5 d-flex justify-content-center">
                                            <Form.Control
                                                className="ms-5 mx-md-0"
                                                type="search"
                                                id="searchForm"
                                                onChange={(e) => setSearch(e.target.value)}
                                                placeholder="Search for ..."
                                                aria-label="Search"
                                            />
                                            <Form.Select className="ms-1 ms-md-3 w-25" aria-label="Default select genre" onChange={(e) => setSelectedGenre(e.target.value)}>
                                                <option value="" selected>Search by genre</option>
                                                <option value="Comedy Horror">Comedy Horror</option>
                                                <option value="Horror">Horror</option>
                                                <option value="Musical">Musical</option>
                                                <option value="Fantasy">Fantasy</option>
                                                <option value="Thriller">Thriller</option>
                                            </Form.Select>
                                        </Form>
                                        {movies.filter((movie) => {
                                            return selectedGenre === ""
                                                ? movie
                                                : movie.Genre.Name === selectedGenre;
                                        })
                                            .filter((movie) => {
                                                return search === ""
                                                    ? movie
                                                    : movie.Title.toLowerCase().includes(search.toLowerCase());
                                            })
                                            .map((movie, movieId) => (
                                                <Col md={6} lg={4} xl={3} className="mb-5 col-8" key={movieId}>
                                                    <MovieCard
                                                        movie={movie}
                                                        removeFav={removeFav}
                                                        addFav={addFav}
                                                        isFavorite={user.FavoriteMovies.includes(movie._id)}
                                                    />
                                                </Col>
                                            ))}
                                    </>
                                )}
                            </>
                        }
                    />
                    {/* Return ProfileView if logged in, otherwise LoginView */}
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col>
                                        <ProfileView
                                            user={user}
                                            movies={movies}
                                            removeFav={removeFav}
                                            addFav={addFav}
                                            setUser={setUser}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
