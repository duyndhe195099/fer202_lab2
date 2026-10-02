import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import Header from "./components/Header";
import TaskForm from "./components/TaskForm";

import { ThemeContext } from "./context/ThemeContext";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { movies } from "./datas/movies";
import MovieList from "./components/MovieList.js";
function App() {
  const { darkMode } = useContext(ThemeContext);

  const [savedTasks, setSavedTasks] = useLocalStorage("tasks", initialTasks);
  const [tasks, dispatch] = useReducer(taskReducer, savedTasks);

  const [filter, setFilter] = useState("all");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setSavedTasks(tasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const addTask = useCallback((title) => {
    dispatch({ type: "ADD_TASK", payload: title });
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  }, []);

  const toggleTask = useCallback((id) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  }, []);

  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length;
    return {
      total: tasks.length,
      completed,
      active: tasks.length - completed,
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const kw = keyword.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchFilter =
        filter === "all" ||
        (filter === "active" && !task.completed) ||
        (filter === "completed" && task.completed);

      const matchKeyword = task.title.toLowerCase().includes(kw);

      return matchFilter && matchKeyword;
    });
  }, [tasks, filter, keyword]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#222" : "#f5f5f5",
        color: darkMode ? "white" : "black",
      }}
    >
      <Header />

      <TaskForm addTask={addTask} />

      <section
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          padding: "20px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        >
          <option value="all">Tất cả</option>
          <option value="active">Chưa làm</option>
          <option value="completed">Hoàn thành</option>
        </select>

        <input
          type="text"
          value={keyword}
          placeholder="Tìm kiếm..."
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: "300px", padding: "10px", fontSize: "16px" }}
        />
      </section>

      <p
        style={{
          textAlign: "center",
          padding: "20px",
          margin: 0,
          borderBottom: "1px solid #ccc",
        }}
      >
        Tổng: {stats.total} | Chưa làm: {stats.active} | Hoàn thành:{" "}
        {stats.completed}
      </p>

      <MovieList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
      />
    </div>
  );
}

export default App;