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
  // useContext
  const { darkMode } = useContext(ThemeContext);

  // useState
  const [keyword, setKeyword] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [sortBy, setSortBy] = useState("default");
  const [selectedMovie, setSelectedMovie] = useState(null);

  // useState + useEffect + localStorage (key: movie_favorites)
  const [favorites, setFavorites] = useLocalStorage("movie_favorites", []);

  // useCallback - thêm/bỏ yêu thích
  const toggleFavorite = useCallback(
    (id) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
      );
    },
    [setFavorites],
  );

  // useCallback - xem chi tiết (chỉ giữ 1 phim được chọn)
  const viewDetail = useCallback((movie) => {
    setSelectedMovie(movie);
  }, []);

  // useMemo - tính danh sách cuối cùng: tìm kiếm + lọc thể loại + sắp xếp
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
            Sort by:{" "}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: "8px", fontSize: "16px" }}
            >
              <option value="default">Default</option>
              <option value="desc">Rating: High → Low</option>
              <option value="asc">Rating: Low → High</option>
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
        Total Movies: {filteredMovies.length} | Favorites: {favorites.length}
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