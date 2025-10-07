// components/Task/Task.js
import React from "react";
import { useKanban } from "../../context/KanbanContext";

const Task = ({ taskId }) => {
  const { tasks } = useKanban();
  const task = tasks.find((t) => t._id === taskId);

  if (!task) return null;

  return (
    <div className="task-card">
      <strong>{task.titulo}</strong>
      <p>{task.descripcion}</p>
    </div>
  );
};

export default Task;
