import MovieItem from "./MovieItem";


function MovieList({ tasks, deleteTask, toggleTask }) {
  if (tasks.length === 0) {
    return (
      <p style={{ textAlign: "center", padding: "30px" }}>
        Không có công việc nào.
      </p>
    );
  }

  return (
    <section style={{ maxWidth: "800px", margin: "auto" }}>
      {tasks.map((task) => (
        <MovieItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      ))}
    </section>
  );
}

export default MovieList;