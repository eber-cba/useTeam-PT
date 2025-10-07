import React from "react";
import { useKanban } from "../../context/KanbanContext";

export default function Card({ task }) {
  const { columns, moveTask } = useKanban();

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#fff",
  };
  const btnStyle = {
    padding: "2px 5px",
    fontSize: "12px",
    cursor: "pointer",
    borderRadius: "3px",
  };

  return (
    <div style={cardStyle}>
      <h4 style={{ margin: "0 0 5px 0" }}>{task.titulo}</h4>
      <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#555" }}>
        {task.descripcion}
      </p>
      <div style={{ display: "flex", gap: "5px", fontSize: "12px" }}>
        {columns
          .filter((c) => c.name !== task.columna)
          .map((c) => (
            <button
              key={c._id || c.name}
              onClick={() => moveTask(task._id, c.name)}
              style={btnStyle}
            >
              → {c.name}
            </button>
          ))}
      </div>
    </div>
  );
}
