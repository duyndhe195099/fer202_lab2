import { useCallback, useContext, useMemo, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import GenreFilter from "./components/GenreFilter";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";

import { ThemeContext } from "./context/ThemeContext";
import useLocalStorage from "./hooks/useLocalStorage";
import { movies } from "./datas/movies";

function App() {
  
  const { darkMode } = useContext(ThemeContext);

  
  const [keyword, setKeyword] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [sortBy, setSortBy] = useState("default");
  const [selectedMovie, setSelectedMovie] = useState(null);


  const [favorites, setFavorites] = useLocalStorage("movie_favorites", []);


  const toggleFavorite = useCallback(
    (id) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
      );
    },
    [setFavorites],
  );


  const viewDetail = useCallback((movie) => {
    setSelectedMovie(movie);
  }, []);


  const filteredMovies = useMemo(() => {
    const kw = keyword.trim().toLowerCase();

    const result = movies.filter((movie) => {
      const matchGenre = genre === "All Genres" || movie.genre === genre;
      const matchTitle = movie.title.toLowerCase().includes(kw);
      return matchGenre && matchTitle;
    });

    if (sortBy === "desc") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "asc") {
      result.sort((a, b) => a.rating - b.rating);
    }

    return result;
  }, [keyword, genre, sortBy]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#222" : "#f5f5f5",
        color: darkMode ? "white" : "black",
      }}
    >
      <Header />

      <section style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
        <SearchBar keyword={keyword} setKeyword={setKeyword} />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginTop: "15px",
          }}
        >
          <GenreFilter genre={genre} setGenre={setGenre} />

          <label style={{ fontSize: "16px" }}>
            Sắp xếp:{" "}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: "8px", fontSize: "16px" }}
            >
              <option value="default">Mặc định</option>
              <option value="desc">Rating: Cao → Thấp</option>
              <option value="asc">Rating: Thấp → Cao</option>
            </select>
          </label>
        </div>
      </section>

      <p
        style={{
          textAlign: "center",
          margin: 0,
          padding: "15px",
          borderBottom: "1px solid #ccc",
        }}
      >
        Tổng: {filteredMovies.length} | Yêu thích: {favorites.length}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
          maxWidth: "1100px",
          margin: "20px auto",
          padding: "0 20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <MovieList
            movies={filteredMovies}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            viewDetail={viewDetail}
          />
        </div>

        {selectedMovie && (
          <MovieDetail
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;