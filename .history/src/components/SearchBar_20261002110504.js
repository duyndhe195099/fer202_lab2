import { useEffect, useRef } from "react";

function SearchBar({ keyword, setKeyword }) {
  const inputRef = useRef(null);


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

     
    </div>
  );
}

export default SearchBar;