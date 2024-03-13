// Here you import the PropTypes library
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// The MovieCard function component
export const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {
    return (
        <Card className="h-100 mt-5 card-shadow">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.genre}</Card.Text>

                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="link">
                        Open
                    </Button>
                </Link>
                <div>
                    {isFavorite ? (
                        <Button className="my-2 me-2" onClick={() => removeFav(movie._id)}>Remove from Favorite</Button>
                    ) : (
                        <Button className="my-2 me-2" onClick={() => addFav(movie._id)}>Add to Favorite</Button>
                    )}
                </div>
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