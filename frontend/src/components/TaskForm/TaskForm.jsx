import React, { useState, useEffect } from "react";
import { useKanban } from "../../context/KanbanContext";
import { useAuth } from "../../context/AuthContext";

export default function TaskForm({ onClose, existingTask = null }) {
  const { addTask, updateTask } = useKanban();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    columna: "Por hacer",
    prioridad: "media",
  });

  useEffect(() => {
    if (existingTask) {
      setFormData({
        titulo: existingTask.titulo || "",
        descripcion: existingTask.descripcion || "",
        columna: existingTask.columna || "Por hacer",
        prioridad: existingTask.prioridad || "media",
      });
    }
  }, [existingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo.trim()) return;

    if (existingTask) {
      // Update existing task
      updateTask(existingTask._id, {
        ...formData,
        lastEditedBy: user
          ? { id: user.id || user._id, name: user.name, email: user.email }
          : null,
      });
      onClose();
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const newTask = {
      ...formData,
      _id: tempId, // ID temporal para UI
      clientTempId: tempId,
      fechaCreacion: new Date().toISOString(),
      estado: "activa",
      createdBy: user
        ? { id: user.id || user._id, name: user.name, email: user.email }
        : null,
    };

    addTask(newTask);
    onClose();
    setFormData({
      titulo: "",
      descripcion: "",
      columna: "Por hacer",
      prioridad: "media",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form">
        <div className="task-form-header">
          <h3>{existingTask ? "Editar Tarea" : "Nueva Tarea"}</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form-content">
          <div className="form-group">
            <label htmlFor="titulo">Título *</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ingresa el título de la tarea"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe la tarea..."
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="columna">Columna</label>
              <select
                id="columna"
                name="columna"
                value={formData.columna}
                onChange={handleChange}
              >
                <option value="Por hacer">Por hacer</option>
                <option value="En progreso">En progreso</option>
                <option value="Hecho">Hecho</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="prioridad">Prioridad</label>
              <select
                id="prioridad"
                name="prioridad"
                value={formData.prioridad}
                onChange={handleChange}
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {existingTask ? "Guardar" : "Crear Tarea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
