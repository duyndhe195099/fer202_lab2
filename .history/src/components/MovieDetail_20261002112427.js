import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function MovieDetail({ movie, onClose }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <aside
      style={{
        width: "320px",
        padding: "20px",
        border: "1px solid #ccc",
        backgroundColor: darkMode ? "#333" : "white",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Movie Details</h2>

      

      <button
        onClick={onClose}
        style={{ padding: "8px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Close
      </button>
    </aside>
  );
}

export default MovieDetail;