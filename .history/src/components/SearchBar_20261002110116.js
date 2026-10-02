import { useEffect, useRef } from "react";

function SearchBar({ keyword, setKeyword }) {
  const inputRef = useRef(null);

  // Tự động focus khi mở trang
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleClear = () => {
    setKeyword("");
    inputRef.current.focus();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
      <label style={{ alignSelf: "center", fontSize: "16px" }}>
        Search Movie:
      </label>

      <input
        ref={inputRef}
        type="text"
        value={keyword}
        placeholder="Enter movie title..."
        onChange={(e) => setKeyword(e.target.value)}
        style={{ width: "350px", padding: "10px", fontSize: "16px" }}
      />

      <button
        onClick={handleClear}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Clear
      </button>
    </div>
  );
}

export default SearchBar;