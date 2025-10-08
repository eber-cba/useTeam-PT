import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDraggable } from "@dnd-kit/core";
import { useKanban } from "../../context/KanbanContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { FiEdit2, FiTrash2, FiUser, FiCalendar, FiMove } from "react-icons/fi";
import TaskForm from "../TaskForm/TaskForm";
import {
  TaskCard,
  TaskHeader,
  TaskTitle,
  TaskActions,
  ActionButton,
  TaskDescription,
  TaskMeta,
  PriorityBadge,
  TaskDate,
  AssignedUser,
  TaskFooter,
  DragIndicator,
  AvatarCircle,
} from "./StyledTask";

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

  const getInitials = (user) => {
    const label = (user?.name || user?.email || user?.id || "").trim();
    if (!label) return "?";
    const parts = label.split(/\s|\./).filter(Boolean);
    const initials = parts
      .slice(0, 2)
      .map((p) => p[0].toUpperCase())
      .join("");
    return initials || label[0].toUpperCase();
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
    <TaskCard
      ref={setNodeRef}
      style={style}
      isDragging={isDragging}
      priority={task.prioridad}
      {...(!isEditing ? listeners : {})}
      {...(!isEditing ? attributes : {})}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.9 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <DragIndicator>
        <FiMove />
      </DragIndicator>

      <TaskHeader>
        <TaskTitle whileHover={{ scale: 1.02 }}>{task.titulo}</TaskTitle>
        <TaskActions>
          <ActionButton
            variant="edit"
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            title="Editar tarea"
          >
            <FiEdit2 />
          </ActionButton>
          <ActionButton
            variant="delete"
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            whileHover={{
              scale: 1.1,
              rotate: -5,
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            title="Eliminar tarea"
          >
            <FiTrash2 />
          </ActionButton>
        </TaskActions>
      </TaskHeader>

      {task.descripcion && (
        <TaskDescription
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {task.descripcion}
        </TaskDescription>
      )}

      <TaskMeta>
        <PriorityBadge
          priority={task.prioridad}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          {task.prioridad || "media"}
        </PriorityBadge>

        {task.fechaCreacion && (
          <TaskDate
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FiCalendar />
            {new Date(task.fechaCreacion).toLocaleDateString()}
          </TaskDate>
        )}
      </TaskMeta>

      {(task.createdBy || task.lastEditedBy) && (
        <TaskFooter
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {task.createdBy && (
            <AssignedUser>
              <AvatarCircle title={task.createdBy.name || task.createdBy.email}>
                {getInitials(task.createdBy)}
              </AvatarCircle>
              Creada por:{" "}
              {task.createdBy.name || task.createdBy.email || task.createdBy.id}
              {task.fechaCreacion && (
                <span> · {new Date(task.fechaCreacion).toLocaleString()}</span>
              )}
            </AssignedUser>
          )}
          {task.lastEditedBy && (
            <AssignedUser>
              <AvatarCircle
                title={task.lastEditedBy.name || task.lastEditedBy.email}
              >
                {getInitials(task.lastEditedBy)}
              </AvatarCircle>
              Editada por:{" "}
              {task.lastEditedBy.name ||
                task.lastEditedBy.email ||
                task.lastEditedBy.id}
              {task.lastEditedAt && (
                <span> · {new Date(task.lastEditedAt).toLocaleString()}</span>
              )}
            </AssignedUser>
          )}
        </TaskFooter>
      )}

      {isEditing &&
        createPortal(
          <TaskForm
            existingTask={task}
            onClose={() => {
              setIsEditing(false);
            }}
            onSave={handleEditSave}
          />,
          document.body
        )}
    </TaskCard>
  );
};

// Inline editor removed; TaskForm modal is used for editing instead.

export default Task;
