import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useKanban } from "../../context/KanbanContext";

export default function Column({ column, children }) {
  const { removeColumn } = useKanban();
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

  const onSave = () => {
    if (!name || !name.trim()) return;
    if (name !== (column && column.name)) {
      // call context update (we'll use a custom event via columns API from KanbanContext)
      // KanbanContext exposes removeColumn and addColumn; it doesn't expose rename directly, so we'll emit a custom event
      // For now, use fetch to PUT /api/columns/:id
      const headers = { "Content-Type": "application/json" };
      fetch(`http://localhost:3000/api/columns/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ name }),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("Error renombrando columna");
          return res.json();
        })
        .then(() => setEditing(false))
        .catch((e) => console.error(e));
    } else {
      setEditing(false);
    }
  };

  const onDelete = () => {
    if (
      !confirm(
        `Eliminar columna "${column.name}"? Esto moverá sus tareas a 'Por hacer'.`
      )
    )
      return;
    removeColumn(id);
  };

  return (
    <div
      ref={(el) => {
        setNodeRef(el);
        setSortableRef(el);
      }}
      style={style}
      className={`column ${isOver ? "drag-over" : ""}`}
      {...attributes}
    >
      <div className="column-header">
        {editing ? (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={onSave}>Guardar</button>
            <button
              onClick={() => {
                setEditing(false);
                setName(column.name);
              }}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <>
            <h3>{column && column.name ? column.name : column}</h3>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span className="task-count">
                {children ? React.Children.count(children) : 0}
              </span>
              <button className="edit-col-btn" onClick={() => setEditing(true)}>
                ✎
              </button>
              <button className="delete-col-btn" onClick={onDelete}>
                🗑
              </button>
              <button className="drag-handle" {...listeners}>
                ☰
              </button>
            </div>
          </>
        )}
      </div>
      <div className="column-content">{children}</div>
    </div>
  );
}
