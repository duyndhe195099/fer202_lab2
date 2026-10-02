const genres = [
  "All Genres",
  "Action",
  "Animation",
  "Comedy",
  "Drama",
  "Romance",
  "Sci-Fi",
];

function GenreFilter({ genre, setGenre }) {
  return (
    <label style={{ fontSize: "16px" }}>
      Genre:{" "}
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        style={{ padding: "8px", fontSize: "16px" }}
      >
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </label>
  );
}

export default GenreFilter;