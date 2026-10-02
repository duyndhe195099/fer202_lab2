import { memo } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

function MovieItem({ movie, isFavorite, toggleFavorite, viewDetail }) {
  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "6px 12px",
    fontSize: "14px",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        padding: "15px 20px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <span style={{ flex: 2, fontSize: "18px", fontWeight: "bold" }}>
        {movie.title}
      </span>

      <span style={{ flex: 1 }}>{movie.genre}</span>

      <span style={{ width: "50px" }}>{movie.year}</span>

      <span style={{ width: "60px" }}> {movie.rating}</span>

      <button onClick={() => toggleFavorite(movie.id)} style={buttonStyle}>
        {isFavorite ? (
          <>
            <FaStar /> Bỏ thích
          </>
        ) : (
          <>
            <CiStar /> Yêu Thích
          </>
        )}
      </button>

      <button onClick={() => viewDetail(movie)} style={buttonStyle}>
       Chi tiết
      </button>
    </div>
  );
}

export default memo(MovieItem);