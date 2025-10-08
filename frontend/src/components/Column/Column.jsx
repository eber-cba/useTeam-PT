// Column.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useKanban } from "../../context/KanbanContext";
import {
  FiEdit2,
  FiTrash2,
  FiMenu,
  FiSave,
  FiX,
  FiPlus,
  FiMoreVertical,
} from "react-icons/fi";
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
  ColumnGradient,
  TaskCounter,
  AddTaskButton,
  ColumnContent,
  ShimmerEffect,
  FloatingParticles,
  DepthLayer,
  GlowBorder,
} from "./StyledColumn";

export default function Column({ column, children }) {
  const { removeColumn, updateColumn, tasks: allTasks, addTask } = useKanban();

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
  const [isHovered, setIsHovered] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    if (column && column.name) setName(column.name);
  }, [column?.name]);

  const id =
    column && column._id
      ? column._id
      : column && column.name
      ? column.name
      : "unknown";

  const { isOver, setNodeRef } = useDroppable({
    id,
    onIsOverChange: (over) => setIsDraggingOver(over),
  });

  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const tasksForRender = useMemo(() => getTasksForColumn(), [allTasks, column]);
  const taskCount =
    (children && React.Children.count(children)) || tasksForRender.length;

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

  const handleQuickAdd = () => {
    const newTask = {
      titulo: "Nueva tarea rápida",
      descripcion: "Descripción de la tarea",
      columna: column.name,
      prioridad: "media",
      fecha: new Date().toISOString(),
    };
    addTask(newTask);
  };

  return (
    <ColumnContainer
      ref={(el) => {
        setNodeRef(el);
        setSortableRef(el);
      }}
      style={style}
      $isOver={isOver}
      $isDragging={isDragging}
      $isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...attributes}
      initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, y: -30, scale: 0.9, rotateX: 15 }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
    >
      {/* Efectos de fondo y partículas */}
      <ColumnGradient $colorIndex={column?._id?.charCodeAt(0) % 5 || 0} />
      <FloatingParticles $visible={isHovered || isDraggingOver} />
      <ShimmerEffect $active={isHovered} />
      <DepthLayer $depth={isDragging ? 3 : isHovered ? 2 : 1} />
      <GlowBorder $active={isDraggingOver} />

      <ColumnHeader>
        {editing ? (
          <EditingHeader
            name={name}
            setName={setName}
            onSave={onSave}
            onCancel={() => {
              setEditing(false);
              setName(column.name);
            }}
          />
        ) : (
          <DefaultHeader
            column={column}
            taskCount={taskCount}
            onEdit={() => setEditing(true)}
            onDelete={onDelete}
            listeners={listeners}
            isHovered={isHovered}
          />
        )}
      </ColumnHeader>

      <ColumnContent>
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
          ) : tasksForRender.length > 0 ? (
            tasksForRender.map((task, i) => (
              <TaskCard
                key={task._id || task.id || i}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.1 + i * 0.05,
                  duration: 0.3,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                $priority={task.prioridad || "media"}
              >
                <div className="task-header">
                  <h4>{task.titulo || task.title || "Tarea sin título"}</h4>
                  <span className="priority-dot" />
                </div>
                {task.descripcion && <p>{task.descripcion}</p>}
                <div className="task-footer">
                  <div className="task-meta">
                    {task.prioridad && (
                      <span className={`priority-badge ${task.prioridad}`}>
                        {task.prioridad}
                      </span>
                    )}
                    {task.fecha && (
                      <span className="task-date">
                        {new Date(task.fecha).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </TaskCard>
            ))
          ) : (
            <EmptyColumnMessage
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="empty-icon">📋</div>
              <h4>Columna Vacía</h4>
              <p>Arrastra tareas aquí o crea una nueva</p>
              <AddTaskButton
                onClick={handleQuickAdd}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPlus />
                Crear Tarea Rápida
              </AddTaskButton>
            </EmptyColumnMessage>
          )}
        </TasksContainer>
      </ColumnContent>

      {/* Botón flotante para añadir tareas */}
      {tasksForRender.length > 0 && (
        <AddTaskButton
          className="floating-add"
          onClick={handleQuickAdd}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiPlus />
        </AddTaskButton>
      )}
    </ColumnContainer>
  );
}

// Subcomponente para el header en modo edición
const EditingHeader = ({ name, setName, onSave, onCancel }) => (
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
        $variant="success"
        title="Guardar"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiSave />
      </ActionIcon>
      <ActionIcon
        onClick={onCancel}
        $variant="warning"
        title="Cancelar"
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiX />
      </ActionIcon>
    </ColumnActions>
  </>
);

// Subcomponente para el header normal
const DefaultHeader = ({
  column,
  taskCount,
  onEdit,
  onDelete,
  listeners,
  isHovered,
}) => (
  <>
    <div className="header-content">
      <ColumnTitle
        $editable={true}
        onClick={onEdit}
        whileHover={{ scale: 1.02, x: 2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400 }}
        title={column?.name}
      >
        {column && column.name ? column.name : "Sin nombre"}
      </ColumnTitle>

      <TaskCounter
        $count={taskCount}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {taskCount}
      </TaskCounter>
    </div>

    <ColumnActions>
      <ActionIcon
        onClick={onEdit}
        $variant="primary"
        title="Editar columna"
        whileHover={{ scale: 1.15, rotate: 12, y: -2 }}
        whileTap={{ scale: 0.85 }}
      >
        <FiEdit2 />
      </ActionIcon>
      <ActionIcon
        onClick={onDelete}
        $variant="danger"
        title="Eliminar columna"
        whileHover={{ scale: 1.15, rotate: -12, y: -2 }}
        whileTap={{ scale: 0.85 }}
      >
        <FiTrash2 />
      </ActionIcon>

      <DragHandle
        {...listeners}
        title="Mover columna"
        whileHover={{ scale: 1.1, rotate: 180, y: -2 }}
        whileTap={{ scale: 0.9, rotate: 90 }}
        $isHovered={isHovered}
      >
        <FiMenu />
      </DragHandle>
    </ColumnActions>
  </>
);
