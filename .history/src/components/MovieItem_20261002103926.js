import { memo } from "react";

function MovieItem({ task, deleteTask, toggleTask }) {
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
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />

      <span
        style={{
          flex: 1,
          fontSize: "20px",
          textDecoration: task.completed ? "line-through" : "none",
          opacity: task.completed ? 0.5 : 1,
        }}
      >
        {task.title}
      </span>

      <button onClick={() => deleteTask(task.id)} style={{ padding: "6px 14px" }}>
        Xóa
      </button>
    </div>
  );
}

export default memo(MovieItem);