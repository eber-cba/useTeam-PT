// Task.jsx (actualizado)
import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useDraggable } from "@dnd-kit/core";
import { useKanban } from "../../context/KanbanContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import {
  FiEdit2,
  FiTrash2,
  FiUser,
  FiCalendar,
  FiMove,
  FiFlag,
  FiMoreVertical,
  FiCheckCircle,
} from "react-icons/fi";
import TaskForm from "../TaskForm/TaskForm";
import {
  TaskCard,
  TaskGlow,
  TaskContent,
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
  TaskTags,
  Tag,
  FloatingMenu,
  MenuButton,
  QuickActions,
  TaskLayers,
  DepthLayer,
  ShimmerLayer,
  HoverEffect,
  StatusIndicator,
} from "./StyledTask";

const Task = ({ task }) => {
  console.log('[Task] Renderizando tarea:', task);
  const { moveTask, updateTask, deleteTask } = useKanban();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const cardRef = useRef(null);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task._id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${
          transform.x * 0.5
        }deg)`
      : undefined,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const getPriorityColor = (prioridad) => {
    switch (prioridad) {
      case "alta":
        return {
          gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          glow: "#ef4444",
        };
      case "media":
        return {
          gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          glow: "#f59e0b",
        };
      case "baja":
        return {
          gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          glow: "#10b981",
        };
      default:
        return {
          gradient: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
          glow: "#6b7280",
        };
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

  const handleDelete = (e) => {
    e.stopPropagation();
    // no preventDefault aquí porque solo estamos controlando la burbuja
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

  const handleEditClick = (e) => {
    e.stopPropagation();
    // no preventDefault para que el click funcione como siempre
    setIsEditing(true);
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleQuickAction = (action, e) => {
    e.stopPropagation();
    action();
    setShowMenu(false);
  };

  // Prevenir que el evento suba a los padres (pero NO prevenir default)
  const preventDrag = (e) => {
    e.stopPropagation();
  };

  const quickActions = [
    {
      icon: FiFlag,
      label: "Alta Prioridad",
      action: () => updateTask(task._id, { ...task, prioridad: "alta" }),
      color: "#ef4444",
    },
    {
      icon: FiFlag,
      label: "Media Prioridad",
      action: () => updateTask(task._1d, { ...task, prioridad: "media" }),
      color: "#f59e0b",
    },
    {
      icon: FiFlag,
      label: "Baja Prioridad",
      action: () => updateTask(task._id, { ...task, prioridad: "baja" }),
      color: "#10b981",
    },
    {
      icon: FiCheckCircle,
      label: "Marcar Completada",
      action: () => updateTask(task._id, { ...task, estado: "completada" }),
      color: "#10b981",
    },
  ];

  const priorityInfo = getPriorityColor(task.prioridad);

  return (
    <>
      <TaskCard
        ref={(node) => {
          setNodeRef(node); // el elemento arrastrable DOM sigue apuntando al card (necesario por dnd-kit)
          cardRef.current = node;
        }}
        style={style}
        $isDragging={isDragging}
        $priority={task.prioridad}
        $isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowMenu(false);
        }}
        // NOTE: NO colocar {...attributes} {...listeners} aquí — se aplican SOLO al handle (DragIndicator)
        initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, y: -30, scale: 0.9, rotateX: 10 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 120,
          damping: 18,
        }}
      >
        {/* Efectos de capa */}
        <TaskLayers>
          <DepthLayer $depth={isDragging ? 3 : isHovered ? 2 : 1} />
          <ShimmerLayer $active={isHovered} />
          <HoverEffect $active={isHovered} $glowColor={priorityInfo.glow} />
        </TaskLayers>

        <TaskGlow $priority={task.prioridad} $isHovered={isHovered} />

        <TaskContent>
          <TaskHeader>
            <div className="title-section">
              <TaskTitle
                $priority={task.prioridad}
                onDoubleClick={handleEditClick}
                // Prevenir drag en el título
                onMouseDown={preventDrag}
                onTouchStart={preventDrag}
              >
                {task.titulo}
              </TaskTitle>

              <TaskMeta className="mobile-meta">
                <PriorityBadge
                  $priority={task.prioridad}
                  onMouseDown={preventDrag}
                  onTouchStart={preventDrag}
                >
                  <FiFlag />
                  {task.prioridad || "media"}
                </PriorityBadge>

                {task.estado && (
                  <StatusIndicator
                    $status={task.estado}
                    onMouseDown={preventDrag}
                    onTouchStart={preventDrag}
                  >
                    {task.estado}
                  </StatusIndicator>
                )}
              </TaskMeta>
            </div>

            <TaskActions
              // Prevenir drag en el contenedor de acciones
              onMouseDown={preventDrag}
              onTouchStart={preventDrag}
            >
              <MenuButton
                onClick={handleMenuToggle}
                $active={showMenu}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onMouseDown={preventDrag}
                onTouchStart={preventDrag}
              >
                <FiMoreVertical />
              </MenuButton>

              <ActionButton
                variant="edit"
                onClick={handleEditClick} // ahora usa el handler que hace stopPropagation
                whileHover={{ scale: 1.15, rotate: 12, y: -2 }}
                whileTap={{ scale: 0.85 }}
                title="Editar tarea"
                onMouseDown={preventDrag}
                onTouchStart={preventDrag}
              >
                <FiEdit2 />
              </ActionButton>

              <DragIndicator
                // SOLO el DragIndicator tiene los listeners y attributes del draggable
                $isHovered={isHovered}
                whileHover={{ scale: 1.2, rotate: 180 }}
                whileTap={{ scale: 0.9, rotate: 90 }}
                title="Mover tarea"
                {...attributes}
                {...listeners}
                // Asegurar que pulsar encima del handle no burbujee a la tarjeta
                onMouseDown={(e) => {
                  // importante: permitir que dnd-kit maneje el pointerdown,
                  // pero evitar que otros listeners en el árbol reaccionen
                  e.stopPropagation();
                }}
              >
                <FiMove />
              </DragIndicator>
            </TaskActions>
          </TaskHeader>

          {task.descripcion && (
            <TaskDescription
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 0.1, duration: 0.3 }}
              onMouseDown={preventDrag}
              onTouchStart={preventDrag}
            >
              {task.descripcion}
            </TaskDescription>
          )}

          {task.estado && (
            <StatusIndicator
              $status={task.estado}
              $large
              onMouseDown={preventDrag}
              onTouchStart={preventDrag}
            >
              <FiCheckCircle />
              {task.estado.charAt(0).toUpperCase() + task.estado.slice(1)}
            </StatusIndicator>
          )}

          {task.tags && task.tags.length > 0 && (
            <TaskTags
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onMouseDown={preventDrag}
              onTouchStart={preventDrag}
            >
              {task.tags.slice(0, 3).map((tag, index) => (
                <Tag
                  key={index}
                  $color={tag.color}
                  whileHover={{ scale: 1.1, y: -1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  onMouseDown={preventDrag}
                  onTouchStart={preventDrag}
                >
                  {tag.name}
                </Tag>
              ))}
              {task.tags.length > 3 && (
                <Tag
                  $color="#6b7280"
                  onMouseDown={preventDrag}
                  onTouchStart={preventDrag}
                >
                  +{task.tags.length - 3}
                </Tag>
              )}
            </TaskTags>
          )}

          <TaskFooter onMouseDown={preventDrag} onTouchStart={preventDrag}>
            <div className="footer-left">
              {(task.createdBy || task.lastEditedBy) && (
                <AssignedUser
                  onMouseDown={preventDrag}
                  onTouchStart={preventDrag}
                >
                  <AvatarCircle
                    $isCurrentUser={
                      user &&
                      task.createdBy &&
                      user.email === task.createdBy.email
                    }
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    onMouseDown={preventDrag}
                    onTouchStart={preventDrag}
                  >
                    {getInitials(task.createdBy || task.lastEditedBy)}
                  </AvatarCircle>
                  <div className="user-info">
                    <span className="user-name">
                      {task.createdBy?.name ||
                        task.lastEditedBy?.name ||
                        "Usuario"}
                    </span>
                    <span className="user-role">
                      {task.createdBy ? "Creador" : "Editor"}
                    </span>
                  </div>
                </AssignedUser>
              )}
            </div>

            <div className="footer-right">
              {task.fechaCreacion && (
                <TaskDate onMouseDown={preventDrag} onTouchStart={preventDrag}>
                  <FiCalendar />
                  {new Date(task.fechaCreacion).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                  })}
                </TaskDate>
              )}
            </div>
          </TaskFooter>
        </TaskContent>

        {showMenu && (
          <FloatingMenu
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={preventDrag}
            onTouchStart={preventDrag}
          >
            <QuickActions>
              {quickActions.map((action, index) => (
                <ActionButton
                  key={index}
                  variant="menu"
                  onClick={(e) => handleQuickAction(action.action, e)}
                  style={{ color: action.color }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  onMouseDown={preventDrag}
                  onTouchStart={preventDrag}
                >
                  <action.icon />
                  <span>{action.label}</span>
                </ActionButton>
              ))}

              <ActionButton
                variant="menu"
                onClick={handleDelete}
                style={{ color: "#ef4444" }}
                whileHover={{ scale: 1.05, x: 5 }}
                onMouseDown={preventDrag}
                onTouchStart={preventDrag}
              >
                <FiTrash2 />
                <span>Eliminar</span>
              </ActionButton>
            </QuickActions>
          </FloatingMenu>
        )}
      </TaskCard>

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
    </>
  );
};

export default Task;
