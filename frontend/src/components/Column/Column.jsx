import React from "react";
import { useKanban } from "../../context/KanbanContext";
import Card from "../Card/Card";

export default function Column() {
  const { tasks, columns } = useKanban();

  const columnStyle = {
    flex: 1,
    padding: "10px",
    backgroundColor: "#f4f5f7",
    borderRadius: "5px",
    minHeight: "300px",
  };

  return (
    <>
      {columns.map((col) => (
        <div key={col} style={columnStyle}>
          <h3 style={{ textAlign: "center" }}>{col}</h3>
          {tasks
            .filter((t) => t.columna === col)
            .map((t) => (
              <Card key={t._id} task={t} />
            ))}
        </div>
      ))}
    </>
  );
}
