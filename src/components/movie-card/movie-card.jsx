// Here you import the PropTypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card>
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.genre}</Card.Text>

                <Button onClick={() => onMovieClick(movie)} variant="link">
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }).isRequired
};