import PropTypes from "prop-types";
export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img height={300} src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Featured: </span>
                <span>{movie.featured}</span>
            </div>
            <button onClick={onBackClick}> Back </button>
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
