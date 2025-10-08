import React, { useState } from "react";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import Column from "../Column/Column";
import Task from "../Task/Task";
import TaskForm from "../TaskForm/TaskForm";
import { useKanban } from "../../context/KanbanContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import {
  BoardContainer,
  ModernBoardHeader,
  HeaderLeft,
  HeaderCenter,
  HeaderRight,
  LogoContainer,
  KanbanIcon,
  HeaderTitle,
  UserBadge,
  UserAvatar,
  UserName,
  ActionButtonsContainer,
  ModernActionButton,
  ButtonIcon,
  ConnectionStatus,
  StatusDot,
  StatusText,
  ColumnsContainer,
  DragOverlayCard,
  EmptyState,
} from "./StyledBoard";

export default function Board() {
  const {
    tasks,
    columns,
    moveTask,
    addColumn,
    reorderColumns,
    deleteAllTasks,
    isConnected,
  } = useKanban();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  const handleDragStart = (event) => {
    const { active } = event;
    // If active id is a task id, set activeTask to show overlay
    const task = tasks.find((t) => t._id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // If dragging a column (activeId matches a column id), reorder columns
    const columnIds = columns.map((c) => c._id || c.name);
    if (columnIds.includes(activeId) && columnIds.includes(overId)) {
      const oldIndex = columnIds.indexOf(activeId);
      const newIndex = columnIds.indexOf(overId);
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const newCols = arrayMove(columns, oldIndex, newIndex);
        console.log(
          "🔄 Reordenando columnas:",
          newCols.map((c) => c.name)
        );
        reorderColumns(newCols);
      }
      return;
    }

    // Otherwise, it's a task move: over.id is the column id/name
    const taskId = activeId;
    const columnId = overId;
    const task = tasks.find((t) => t._id === taskId);

    // Find the column by ID or name to get the correct column name
    const targetColumn = columns.find(
      (col) => (col._id && col._id === columnId) || col.name === columnId
    );

    if (task && targetColumn && task.columna !== targetColumn.name) {
      console.log(
        `📦 Moviendo tarea "${task.titulo}" a columna "${targetColumn.name}"`
      );

      // Calcular el orden basado en las tareas existentes en la columna destino
      const tasksInTargetColumn = tasks.filter(
        (t) => t.columna === targetColumn.name
      );
      const newOrder = tasksInTargetColumn.length;

      moveTask(taskId, targetColumn.name, newOrder);
    }
  };

  const getTasksForColumn = (column) => {
    const name = column && column.name ? column.name : column;
    return tasks
      .filter((task) => task.columna === name)
      .sort((a, b) => (a.orden || 0) - (b.orden || 0));
  };

  return (
    <BoardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <ModernBoardHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <HeaderLeft>
          <LogoContainer>
            <KanbanIcon>📋</KanbanIcon>
            <HeaderTitle>Kanban Team</HeaderTitle>
            {user && (
              <UserBadge>
                <UserAvatar>
                  {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                </UserAvatar>
                <UserName>{user.name || user.email}</UserName>
              </UserBadge>
            )}
          </LogoContainer>
        </HeaderLeft>

        <HeaderCenter>
          <ActionButtonsContainer>
            <ModernActionButton
              variant="primary"
              onClick={() => setShowColumnModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ButtonIcon>+</ButtonIcon>
              Columna
            </ModernActionButton>

            {showColumnModal && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(0,0,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    padding: "2rem",
                    borderRadius: "12px",
                    minWidth: "320px",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    alignItems: "stretch",
                  }}
                >
                  <h3>Nueva columna</h3>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Nombre de la columna"
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      fontSize: "1rem",
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (newColumnName.trim()) {
                          addColumn(newColumnName.trim());
                          setNewColumnName("");
                          setShowColumnModal(false);
                        }
                      }
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      onClick={() => {
                        setShowColumnModal(false);
                        setNewColumnName("");
                      }}
                      style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        border: "none",
                        background: "#eee",
                        cursor: "pointer",
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        if (newColumnName.trim()) {
                          addColumn(newColumnName.trim());
                          setNewColumnName("");
                          setShowColumnModal(false);
                        }
                      }}
                      style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        border: "none",
                        background: "#007bff",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      Crear
                    </button>
                  </div>
                </div>
              </div>
            )}

            <ModernActionButton
              variant="success"
              onClick={() => setShowTaskForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ButtonIcon>+</ButtonIcon>
              Nueva Tarea
            </ModernActionButton>

            <ModernActionButton
              variant="warning"
              onClick={deleteAllTasks}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ButtonIcon>🗑️</ButtonIcon>
              Eliminar Todas
            </ModernActionButton>
          </ActionButtonsContainer>
        </HeaderCenter>

        <HeaderRight>
          <ConnectionStatus $isConnected={isConnected}>
            <StatusDot $isConnected={isConnected} />
            <StatusText>
              {isConnected ? "Conectado" : "Desconectado"}
            </StatusText>
          </ConnectionStatus>
        </HeaderRight>
      </ModernBoardHeader>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columns.map((c) => c._id || c.name)}
          strategy={horizontalListSortingStrategy}
        >
          <ColumnsContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {columns.length === 0 ? (
              <EmptyState
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h3>¡Comienza creando tu primera columna!</h3>
                <p>
                  Organiza tus tareas en columnas personalizadas para un mejor
                  flujo de trabajo.
                </p>
              </EmptyState>
            ) : (
              columns.map((column, index) => (
                <Column
                  key={column._id || column.name}
                  column={column}
                  index={index}
                >
                  <SortableContext
                    items={getTasksForColumn(column).map((task) => task._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {getTasksForColumn(column).map((task) => (
                      <Task key={task._id} task={task} />
                    ))}
                  </SortableContext>
                </Column>
              ))
            )}
          </ColumnsContainer>
        </SortableContext>

        <DragOverlay>
          {activeTask ? (
            <DragOverlayCard
              initial={{ scale: 0.8, rotate: 0 }}
              animate={{ scale: 1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <h4>{activeTask.titulo}</h4>
              <p>{activeTask.descripcion}</p>
            </DragOverlayCard>
          ) : null}
        </DragOverlay>
      </DndContext>

      {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}
    </BoardContainer>
  );
}
