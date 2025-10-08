import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useKanban } from "../../context/KanbanContext";
import { FiEdit2, FiTrash2, FiMenu, FiSave, FiX } from "react-icons/fi";
import {
  ColumnContainer,
  ColumnHeader,
  ColumnTitle,
  ColumnTitleInput,
  TaskCount,
  ColumnActions,
  ActionIcon,
  TasksContainer,
  EmptyColumnMessage,
  DragHandle,
} from "./StyledColumn";

export default function Column({ column, children }) {
  const { removeColumn } = useKanban();

  const getTasksForColumn = () => {
    const { tasks } = useKanban();
    const columnName = column && column.name ? column.name : "";
    return tasks
      .filter((task) => task.columna === columnName)
      .sort((a, b) => (a.orden || 0) - (b.orden || 0));
  };

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(column && column.name ? column.name : "");

  const id =
    column && column._id
      ? column._id
      : column && column.name
      ? column.name
      : "unknown";
  const { isOver, setNodeRef } = useDroppable({ id });

  // sortable wrapper for columns (so columns can be reordered)
  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onSave = async () => {
    if (!name || !name.trim()) return;
    const newName = name.trim();
    const oldName = column && column.name ? column.name : "";

    if (newName === oldName) {
      setEditing(false);
      return;
    }

    console.log(`✏️ [Column] Renombrando columna "${oldName}" a "${newName}"`);

    try {
      const headers = { "Content-Type": "application/json" };
      const response = await fetch(`http://localhost:3000/api/columns/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          name: newName,
          oldName: oldName, // Enviar el nombre anterior para actualizar tareas
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error renombrando columna:", errorText);
        throw new Error("Error renombrando columna");
      }

      const updated = await response.json();
      console.log("✅ [Column] Columna renombrada:", updated);
      setEditing(false);
    } catch (e) {
      console.error("❌ [Column] Error al renombrar columna:", e);
      alert("No se pudo renombrar la columna. Intenta de nuevo.");
      setName(oldName); // Revertir al nombre anterior
    }
  };

  const onDelete = () => {
    if (
      !confirm(
        `¿Eliminar columna "${column.name}"? Esto moverá sus tareas a 'Por hacer'.`
      )
    )
      return;
    removeColumn(id);
  };

  return (
    <ColumnContainer
      ref={(el) => {
        setNodeRef(el);
        setSortableRef(el);
      }}
      style={style}
      isOver={isOver}
      {...attributes}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <ColumnHeader>
        {editing ? (
          <>
            <ColumnTitleInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSave()}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              autoFocus
            />
            <ColumnActions>
              <ActionIcon
                onClick={onSave}
                variant="edit"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiSave />
              </ActionIcon>
              <ActionIcon
                onClick={() => {
                  setEditing(false);
                  setName(column.name);
                }}
                variant="delete"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiX />
              </ActionIcon>
            </ColumnActions>
          </>
        ) : (
          <>
            <ColumnTitle
              editable={true}
              onClick={() => setEditing(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {column && column.name ? column.name : column}
            </ColumnTitle>
            {column.createdBy && (
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#888",
                  marginTop: "2px",
                  display: "block",
                }}
              >
                Creada por {column.createdBy}
              </span>
            )}
            <TaskCount
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {children ? React.Children.count(children) : 0}
            </TaskCount>
            <ColumnActions>
              <ActionIcon
                onClick={() => setEditing(true)}
                variant="edit"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiEdit2 />
              </ActionIcon>
              <ActionIcon
                onClick={onDelete}
                variant="delete"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiTrash2 />
              </ActionIcon>
              <DragHandle {...listeners}>
                <FiMenu />
              </DragHandle>
            </ColumnActions>
          </>
        )}
      </ColumnHeader>

      <TasksContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {children && React.Children.count(children) > 0 ? (
          children
        ) : (
          <EmptyColumnMessage
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <p>No hay tareas aquí</p>
            <p>Arrastra una tarea o crea una nueva</p>
          </EmptyColumnMessage>
        )}
      </TasksContainer>
    </ColumnContainer>
  );
}
