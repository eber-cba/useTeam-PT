// Column.jsx
import React, { useState, useEffect, useMemo } from "react";
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
  TaskCard,
} from "./StyledColumn";

/**
 * Mantengo la lógica: edición, renombrar (onSave -> updateColumn),
 * eliminar (onDelete -> removeColumn), useDroppable + useSortable.
 *
 * Visual: agrego contador, mejor interacción al arrastrar, fallback para renderizar tareas
 * si no vienen como children usando getTasksForColumn.
 */
export default function Column({ column, children }) {
  const { removeColumn, updateColumn, tasks: allTasks } = useKanban();

  // helper (igual que antes) — devuelve tareas por columna (nombre o id)
  const getTasksForColumn = () => {
    const columnName = column && column.name ? column.name : "";
    const columnId = column && column._id ? column._id : "";
    return (allTasks || [])
      .filter(
        (task) => task.columna === columnName || task.columna === columnId
      )
      .sort((a, b) => (a.orden || 0) - (b.orden || 0));
  };

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(column && column.name ? column.name : "");

  useEffect(() => {
    if (column && column.name) setName(column.name);
  }, [column?.name]);

  const id =
    column && column._id
      ? column._id
      : column && column.name
      ? column.name
      : "unknown";

  const { isOver, setNodeRef } = useDroppable({ id });

  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  // style para framer-motion transform + transition
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.9 : 1,
    zIndex: isDragging ? 1000 : undefined,
  };

  // tasks deducidas si no vienen como children
  const tasksForRender = useMemo(() => getTasksForColumn(), [allTasks, column]);

  const onSave = async () => {
    if (!name || !name.trim()) return;
    const newName = name.trim();
    const oldName = column && column.name ? column.name : "";

    if (newName === oldName) {
      setEditing(false);
      return;
    }

    try {
      await updateColumn(id, newName, oldName);
      setEditing(false);
    } catch (e) {
      console.error("❌ [Column] Error al renombrar columna:", e);
      setName(oldName);
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
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{
        duration: 0.45,
        type: "spring",
        stiffness: 140,
        damping: 18,
      }}
    >
      <ColumnHeader>
        {editing ? (
          <>
            <ColumnTitleInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSave()}
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.18 }}
              autoFocus
            />
            <ColumnActions>
              <ActionIcon
                onClick={onSave}
                variant="edit"
                title="Guardar"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
              >
                <FiSave />
              </ActionIcon>
              <ActionIcon
                onClick={() => {
                  setEditing(false);
                  setName(column.name);
                }}
                variant="delete"
                title="Cancelar"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
              >
                <FiX />
              </ActionIcon>
            </ColumnActions>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                width: "100%",
              }}
            >
              <ColumnTitle
                editable={true}
                onClick={() => setEditing(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.995 }}
                transition={{ type: "spring", stiffness: 300 }}
                title={column?.name}
              >
                {column && column.name ? column.name : "Sin nombre"}
              </ColumnTitle>

              {/* contador de tareas pequeño */}
              <div
                style={{
                  marginLeft: 6,
                  background: "linear-gradient(90deg,#a78bfa,#7c3aed)",
                  color: "#fff",
                  padding: "6px 8px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  boxShadow: "0 6px 18px rgba(124,58,237,0.12)",
                  minWidth: 36,
                  textAlign: "center",
                }}
                aria-hidden
              >
                {(children && React.Children.count(children)) ||
                  tasksForRender.length}
              </div>
            </div>

            {/* createdBy (opcional) */}
            {column?.createdBy && (
              <div
                style={{
                  marginLeft: 8,
                  fontSize: 12,
                  color: "rgba(15,23,42,0.45)",
                }}
              >
                Creada por {column.createdBy}
              </div>
            )}

            <ColumnActions>
              <ActionIcon
                onClick={() => setEditing(true)}
                variant="edit"
                title="Editar columna"
                whileHover={{ scale: 1.08, rotate: 4, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiEdit2 />
              </ActionIcon>
              <ActionIcon
                onClick={onDelete}
                variant="delete"
                title="Eliminar columna"
                whileHover={{ scale: 1.08, rotate: -4, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiTrash2 />
              </ActionIcon>

              <DragHandle
                {...listeners}
                title="Mover columna"
                whileHover={{ scale: 1.06, rotate: 6, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiMenu />
              </DragHandle>
            </ColumnActions>
          </>
        )}
      </ColumnHeader>

      <TasksContainer
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.14,
          duration: 0.36,
          type: "spring",
          stiffness: 110,
        }}
      >
        {children && React.Children.count(children) > 0 ? (
          children
        ) : tasksForRender.length > 0 ? (
          tasksForRender.map((task, i) => (
            <TaskCard
              key={task._id || task.id || i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.28 }}
              whileHover={{ scale: 1.02 }}
            >
              <div style={{ fontWeight: 700, color: "#0f172a" }}>
                {task.titulo || task.title || "Tarea"}
              </div>
              <div style={{ fontSize: 13, color: "rgba(15,23,42,0.6)" }}>
                {task.descripcion || task.desc || ""}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 8,
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 12, color: "rgba(15,23,42,0.45)" }}>
                  {task.prioridad || task.prio || ""}
                </div>
                <div style={{ fontSize: 12, color: "rgba(15,23,42,0.35)" }}>
                  {task.fecha ? new Date(task.fecha).toLocaleDateString() : ""}
                </div>
              </div>
            </TaskCard>
          ))
        ) : (
          <EmptyColumnMessage
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35 }}
          >
            <p style={{ margin: 0, fontWeight: 600 }}>✨ No hay tareas aquí</p>
            <p style={{ margin: 0, fontSize: 13 }}>
              Arrastra una tarea o crea una nueva
            </p>
          </EmptyColumnMessage>
        )}
      </TasksContainer>
    </ColumnContainer>
  );
}
