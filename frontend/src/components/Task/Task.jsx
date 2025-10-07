import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { useKanban } from "../../context/KanbanContext";

const Task = ({ task }) => {
  const { moveTask } = useKanban();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task._id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (prioridad) => {
    switch (prioridad) {
      case "alta":
        return "#dc3545";
      case "media":
        return "#ffc107";
      case "baja":
        return "#28a745";
      default:
        return "#6c757d";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-card ${isDragging ? "dragging" : ""}`}
      {...listeners}
      {...attributes}
    >
      <div className="task-header">
        <h4 className="task-title">{task.titulo}</h4>
        <div
          className="priority-indicator"
          style={{ backgroundColor: getPriorityColor(task.prioridad) }}
        />
      </div>

      {task.descripcion && (
        <p className="task-description">{task.descripcion}</p>
      )}

      <div className="task-footer">
        <span className="task-priority">{task.prioridad}</span>
        {task.fechaCreacion && (
          <span className="task-date">
            {new Date(task.fechaCreacion).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default Task;
