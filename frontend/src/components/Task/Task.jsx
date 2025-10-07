import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDraggable } from "@dnd-kit/core";
import { useKanban } from "../../context/KanbanContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import TaskForm from "../TaskForm/TaskForm";

const Task = ({ task }) => {
  const { moveTask, updateTask, deleteTask } = useKanban();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

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

  const handleDelete = () => {
    if (!task._id || String(task._id).startsWith("temp-")) {
      addToast({
        title: "Error",
        description: "No se puede eliminar una tarea temporal.",
        type: "warning",
      });
      return;
    }
    if (confirm("¿Seguro que deseas eliminar esta tarea?")) {
      deleteTask(task._id);
      addToast({
        title: "Eliminada",
        description: "Tarea eliminada.",
        type: "success",
      });
    }
  };

  const handleEditSave = (updated) => {
    updateTask(task._id, {
      ...updated,
      lastEditedBy: user
        ? { id: user.id, name: user.name, email: user.email }
        : null,
    });
    setIsEditing(false);
    addToast({
      title: "Guardada",
      description: "Tarea actualizada.",
      type: "success",
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-card ${isDragging ? "dragging" : ""}`}
      {...(!isEditing ? listeners : {})}
      {...(!isEditing ? attributes : {})}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
    >
      <div className="task-header">
        <h4 className="task-title">{task.titulo}</h4>
        <div
          className="priority-indicator"
          style={{ backgroundColor: getPriorityColor(task.prioridad) }}
        />
        <button
          className="task-open-btn"
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            console.log("Abrir modal para task", task._id);
            setIsEditing(true);
          }}
          title="Abrir tarea"
        >
          ✏️
        </button>
      </div>
      {task.descripcion && (
        <p className="task-description">{task.descripcion}</p>
      )}
      {task.createdBy && (
        <div className="task-meta">
          Creada por:{" "}
          {task.createdBy.name || task.createdBy.email || task.createdBy.id}
        </div>
      )}
      {task.lastEditedBy && (
        <div className="task-meta">
          Editada por:{" "}
          {task.lastEditedBy.name ||
            task.lastEditedBy.email ||
            task.lastEditedBy.id}{" "}
          -{" "}
          {task.lastEditedAt
            ? new Date(task.lastEditedAt).toLocaleString()
            : ""}
        </div>
      )}

      <div className="task-actions">
        <button
          type="button"
          className="btn-small"
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            console.log("Editar (botón) modal para task", task._id);
            setIsEditing(true);
          }}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn-small btn-danger"
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          Eliminar
        </button>
      </div>
      {isEditing &&
        createPortal(
          <TaskForm
            existingTask={task}
            onClose={() => {
              console.log("Cerrar modal para task", task._id);
              setIsEditing(false);
            }}
          />,
          document.body
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

// Inline editor removed; TaskForm modal is used for editing instead.

export default Task;
