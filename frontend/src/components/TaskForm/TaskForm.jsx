import React, { useState } from "react";
import { useKanban } from "../../context/KanbanContext";

export default function TaskForm({ onClose }) {
  const { addTask } = useKanban();
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    columna: "Por hacer",
    prioridad: "media",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo.trim()) return;

    const newTask = {
      ...formData,
      _id: `temp-${Date.now()}`, // ID temporal
      fechaCreacion: new Date().toISOString(),
      estado: "activa",
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
          <h3>Nueva Tarea</h3>
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
              Crear Tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
