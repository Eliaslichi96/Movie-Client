import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movie, removeFav, addFav }) => {
    return (
        <div>
            <div>
                <img height={300} src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre?.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director?.Name}</span>
            </div>

            <Button onClick={onBackClick}> Back </Button>
        </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.array,
        director: PropTypes.string,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};
