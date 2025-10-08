import React, { useState, useEffect } from "react";
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
  ColumnActions,
  ActionIcon,
  TasksContainer,
  EmptyColumnMessage,
  DragHandle,
} from "./StyledColumn";

export default function Column({ column, children }) {
  const { removeColumn, updateColumn } = useKanban();

  const getTasksForColumn = () => {
    const { tasks } = useKanban();
    const columnName = column && column.name ? column.name : "";
    const columnId = column && column._id ? column._id : "";

    // Filtrar tareas que coincidan con el nombre O el ID de la columna
    return tasks
      .filter((task) => {
        return task.columna === columnName || task.columna === columnId;
      })
      .sort((a, b) => (a.orden || 0) - (b.orden || 0));
  };

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(column && column.name ? column.name : "");

  // Sincronizar el estado local con los cambios del contexto
  useEffect(() => {
    if (column && column.name) {
      setName(column.name);
    }
  }, [column?.name]);

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
    isDragging,
    isSorting,
    over,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 1000 : undefined,
    boxShadow: isDragging
      ? "0 35px 70px rgba(0,0,0,0.18), 0 18px 35px rgba(0,0,0,0.12)"
      : undefined,
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
      await updateColumn(id, newName, oldName);
      setEditing(false);
    } catch (e) {
      console.error("❌ [Column] Error al renombrar columna:", e);
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
      data-dragging={isDragging ? "true" : undefined}
      {...attributes}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.9 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
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
                  color: "rgba(255, 255, 255, 0.7)",
                  marginTop: "8px",
                  display: "block",
                  fontWeight: "500",
                }}
              >
                Creada por {column.createdBy}
              </span>
            )}
            <ColumnActions>
              <ActionIcon
                onClick={() => setEditing(true)}
                variant="edit"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiEdit2 />
              </ActionIcon>
              <ActionIcon
                onClick={onDelete}
                variant="delete"
                whileHover={{
                  scale: 1.1,
                  rotate: -5,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiTrash2 />
              </ActionIcon>
              <DragHandle
                {...listeners}
                whileHover={{
                  scale: 1.1,
                  rotate: 10,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiMenu />
              </DragHandle>
            </ColumnActions>
          </>
        )}
      </ColumnHeader>

      <TasksContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.4,
          type: "spring",
          stiffness: 100,
        }}
      >
        {children && React.Children.count(children) > 0 ? (
          children
        ) : (
          <EmptyColumnMessage
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.5,
              type: "spring",
              stiffness: 80,
            }}
          >
            <p>✨ No hay tareas aquí</p>
            <p>Arrastra una tarea o crea una nueva</p>
          </EmptyColumnMessage>
        )}
      </TasksContainer>
    </ColumnContainer>
  );
}
