import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: 'Shutter Island',
            description: 'Teddy Daniels and Chuck Aule, two US marshals, are sent to an asylum on a remote island in order to investigate the disappearance of a patient, where Teddy uncovers a shocking truth about the place.',
            genre: ['Thriller'],
            director: 'Martin Scorsese',
            image: 'https://image.tmdb.org/t/p/original/4GDy0PHYX3VRXUtwK5ysFbg3kEx.jpg',
            featured: true

        },
        {
            id: 2,
            title: 'Interstellar',
            description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
            genre: ['Science Fiction'],
            director: 'Christopher Nolan',
            image: 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
            featured: true
        },
        {
            id: 3,
            title: 'Inception',
            description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
            genre: ['Science Fiction'],
            director: 'Christopher Nolan',
            image: 'https://image.tmdb.org/t/p/original/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
            featured: true
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView
                movie={selectedMovie}
                onBackClick={() => {
                    setSelectedMovie(null);
                }}
            />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};