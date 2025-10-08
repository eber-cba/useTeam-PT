import React, { useState, useEffect, useRef } from "react";
import { useKanban } from "../../context/KanbanContext";
import { useAuth } from "../../context/AuthContext";
import { FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import {
  FormOverlay,
  FormContainer,
  FormHeader,
  FormTitle,
  CloseButton,
  FormContent,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormRow,
  FormActions,
  FormButton,
  ErrorMessage,
  ValidationIcon
} from './StyledTaskForm';

export default function TaskForm({ onClose, existingTask = null }) {
  const { addTask, updateTask, columns } = useKanban();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    columna: "Por hacer",
    prioridad: "media",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const titleRef = useRef(null);

  useEffect(() => {
    // autofocus title input when shown
    if (titleRef.current) {
      titleRef.current.focus();
      titleRef.current.select && titleRef.current.select();
    }

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es requerido";
    } else if (formData.titulo.trim().length < 3) {
      newErrors.titulo = "El título debe tener al menos 3 caracteres";
    }
    
    if (formData.descripcion && formData.descripcion.length > 500) {
      newErrors.descripcion = "La descripción no puede exceder 500 caracteres";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // LOGS NUEVOS PARA DEPURACIÓN
    console.log("[TASKFORM] handleSubmit ejecutado", formData);
    
    // Evitar doble submit
    if (isSubmitting) {
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (existingTask) {
        // Update existing task
        await updateTask(existingTask._id, {
          ...formData,
          lastEditedBy: user
            ? { id: user.id || user._id, name: user.name, email: user.email }
            : null,
        });
      } else {
        const tempId = `temp-${Date.now()}-${Math.random()}`;
        const newTask = {
          ...formData,
          _id: tempId, // ID temporal único
          clientTempId: tempId,
          fechaCreacion: new Date().toISOString(),
          estado: "activa",
          createdBy: user
            ? { id: user.id || user._id, name: user.name, email: user.email }
            : null,
        };

        await addTask(newTask);
        setFormData({
          titulo: "",
          descripcion: "",
          columna: "Por hacer",
          prioridad: "media",
        });
      }
      
      onClose();
    } catch (error) {
      // Puedes agregar manejo de errores aquí si lo deseas
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleOverlayClick = (e) => {
    // if clicked directly on overlay (not the form), close
    if (e.target.classList.contains("task-form-overlay")) onClose();
  };

  return (
    <FormOverlay 
      className="task-form-overlay" 
      onMouseDown={handleOverlayClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FormContainer 
        onMouseDown={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      >
        <FormHeader
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <FormTitle>
            {existingTask ? "Editar Tarea" : "Nueva Tarea"}
          </FormTitle>
          <CloseButton 
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiX />
          </CloseButton>
        </FormHeader>

        <FormContent onSubmit={handleSubmit}>
          <FormGroup
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <FormLabel htmlFor="titulo" required>
              Título
            </FormLabel>
            <FormInput
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              ref={titleRef}
              placeholder="Ingresa el título de la tarea"
              hasError={!!errors.titulo}
              whileFocus={{ scale: 1.02 }}
            />
            {errors.titulo && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ValidationIcon isValid={false}>
                  <FiAlertCircle />
                </ValidationIcon>
                {errors.titulo}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <FormLabel htmlFor="descripcion">
              Descripción
            </FormLabel>
            <FormTextarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe la tarea..."
              rows="3"
              hasError={!!errors.descripcion}
              whileFocus={{ scale: 1.01 }}
            />
            {errors.descripcion && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ValidationIcon isValid={false}>
                  <FiAlertCircle />
                </ValidationIcon>
                {errors.descripcion}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormRow
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <FormGroup>
              <FormLabel htmlFor="columna">
                Columna
              </FormLabel>
              <FormSelect
                id="columna"
                name="columna"
                value={formData.columna}
                onChange={handleChange}
                whileFocus={{ scale: 1.02 }}
              >
                {columns && columns.length
                  ? columns.map((c) => (
                      <option key={c._id || c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))
                  : ["Por hacer", "En progreso", "Hecho"].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="prioridad">
                Prioridad
              </FormLabel>
              <FormSelect
                id="prioridad"
                name="prioridad"
                value={formData.prioridad}
                onChange={handleChange}
                whileFocus={{ scale: 1.02 }}
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </FormSelect>
            </FormGroup>
          </FormRow>
        </FormContent>

        <FormActions
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <FormButton 
            type="button" 
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancelar
          </FormButton>
          <FormButton 
            type="button" 
            variant="primary"
            disabled={isSubmitting}
            onClick={async (e) => {
              // Llamar directamente a handleSubmit
              const fakeEvent = { preventDefault: () => {} };
              await handleSubmit(fakeEvent);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? (
              <>
                <ValidationIcon isValid={true}>
                  <FiCheck />
                </ValidationIcon>
                Guardando...
              </>
            ) : (
              existingTask ? "Guardar" : "Crear Tarea"
            )}
          </FormButton>
        </FormActions>
      </FormContainer>
    </FormOverlay>
  );
}
