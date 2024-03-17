// Here you import the PropTypes library
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";

// The MovieCard function component
export const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {
    return (
        <Card className="h-100 mt-5 card-shadow">
            <div className="position-relative .d-inline-block">
                <Card.Img variant="top card-img" src={movie.ImagePath} />
                <div>
                    {isFavorite ? (
                        <BookmarkHeartFill size={40} color="orange" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => removeFav(movie._id)} />
                    ) : (
                        <BookmarkHeart size={40} color="orange" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => addFav(movie._id)} />
                    )}
                </div>
            </div>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="link">
                        Open
                    </Button>
                </Link>
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