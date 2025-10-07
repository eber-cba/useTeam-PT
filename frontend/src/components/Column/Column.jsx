import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function Column({ columnName, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: columnName,
  });

  return (
    <div ref={setNodeRef} className={`column ${isOver ? "drag-over" : ""}`}>
      <div className="column-header">
        <h3>{columnName}</h3>
        <span className="task-count">{children ? children.length : 0}</span>
      </div>
      <div className="column-content">{children}</div>
    </div>
  );
}
