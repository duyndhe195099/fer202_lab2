import MovieItem from "./MovieItem";

function MovieList({ movies, favorites, toggleFavorite, viewDetail }) {
  if (movies.length === 0) {
    return (
      <p style={{ textAlign: "center", padding: "30px" }}>Không tìm thấy phim.</p>
    );
  }

  return (
    <section>
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          isFavorite={favorites.includes(movie.id)}
          toggleFavorite={toggleFavorite}
          viewDetail={viewDetail}
        />
      ))}
    </section>
  );
}

export default MovieList;