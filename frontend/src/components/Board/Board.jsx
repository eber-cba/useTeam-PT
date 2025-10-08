import React, { useState, useMemo } from "react";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy, // AÑADIR ESTA IMPORTACIÓN
  arrayMove,
} from "@dnd-kit/sortable";
import Column from "../Column/Column";
import Task from "../Task/Task";
import TaskForm from "../TaskForm/TaskForm";
import ExportButton from "../ExportButton/ExportButton";
import { useKanban } from "../../context/KanbanContext";
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
  ActionButtonsContainer,
  ModernActionButton,
  ButtonIcon,
  ColumnsContainer,
  DragOverlayCard,
  EmptyState,
  ColumnModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalInput,
  ModalActions,
  ModalButton,
  BoardStats,
  StatItem,
  StatValue,
  StatLabel,
  FloatingParticles,
  BoardBackground,
  HeaderGlow,
  AnimatedOrb,
} from "./StyledBoard";

export default function Board() {
  const {
    tasks,
    columns,
    moveTask,
    addColumn,
    reorderColumns,
    deleteAllTasks,
  } = useKanban();
  const { addToast } = useToast();

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [activeColumnId, setActiveColumnId] = useState(null);
  const [overColumnId, setOverColumnId] = useState(null);

  const handleDragStart = (event) => {
    const { active } = event;
    const columnIds = columns.map((c) => c._id || c.name);

    if (columnIds.includes(active.id)) {
      setActiveColumnId(active.id);
    }

    const task = tasks.find((t) => t._id === active.id);
    setActiveTask(task || null);
  };

  const handleDragOver = (event) => {
    const { over } = event;
    setOverColumnId(over?.id || null);
  };

  const handleDragEnd = (event) => {
    setActiveColumnId(null);
    setOverColumnId(null);
    setActiveTask(null);

    const { active, over } = event;
    const columnIds = columns.map((c) => c._id || c.name);

    if (columnIds.includes(active.id) && columnIds.includes(over?.id)) {
      const oldIndex = columnIds.indexOf(active.id);
      const newIndex = columnIds.indexOf(over.id);

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const newCols = arrayMove(columns, oldIndex, newIndex);
        reorderColumns(newCols);
      }
      return;
    }

    const taskId = active.id;
    const columnId = over?.id;
    const task = tasks.find((t) => t._id === taskId);
    const targetColumn = columns.find(
      (col) => (col._id && col._id === columnId) || col.name === columnId
    );

    if (task && targetColumn && task.columna !== targetColumn.name) {
      const tasksInTargetColumn = tasks.filter(
        (t) => t.columna === targetColumn.name
      );
      const newOrder = tasksInTargetColumn.length;
      moveTask(taskId, targetColumn.name, newOrder);
    }
  };

  const getTasksForColumn = (column) => {
    const name = column && column.name ? column.name : column;
    const columnTasks = tasks
      .filter((task) =>
        task.columna && name && task.columna.toLowerCase() === name.toLowerCase()
      )
      .sort((a, b) => (a.orden || 0) - (b.orden || 0));

    console.log(
      `📊 [Board] Tareas para columna "${name}":`,
      columnTasks.length
    );
    return columnTasks;
  };

  const handleCreateColumn = () => {
    if (newColumnName.trim()) {
      addColumn(newColumnName.trim());
      setNewColumnName("");
      setShowColumnModal(false);
      addToast("Columna creada exitosamente", "success");
    }
  };

  // Calcular estadísticas - SOLO cantidad de tareas y columnas
  const { totalTasks, columnsCount } = useMemo(() => {
    const total = tasks.length;
    const colsCount = columns.length;

    console.log(
      `📊 [Board] Estadísticas - Total: ${total}, Columnas: ${colsCount}`
    );

    return {
      totalTasks: total,
      columnsCount: colsCount,
    };
  }, [tasks, columns]);

  return (
    <BoardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <BoardBackground />
      <FloatingParticles />

      <ModernBoardHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <HeaderGlow />
        <AnimatedOrb />

        <HeaderLeft>
          <LogoContainer>
            <KanbanIcon>
              <div className="icon-inner">📋</div>
              <div className="icon-glow" />
            </KanbanIcon>
            <HeaderTitle>
              Kanban<span>Flow</span>
            </HeaderTitle>
          </LogoContainer>
        </HeaderLeft>

        <HeaderCenter>
          <ActionButtonsContainer>
            <ModernActionButton
              variant="primary"
              onClick={() => setShowColumnModal(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ButtonIcon>+</ButtonIcon>
              Nueva Columna
            </ModernActionButton>

            <ModernActionButton
              variant="success"
              onClick={() => setShowTaskForm(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ButtonIcon>+</ButtonIcon>
              Nueva Tarea
            </ModernActionButton>

            <ModernActionButton
              variant="warning"
              onClick={deleteAllTasks}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ButtonIcon>🗑️</ButtonIcon>
              Limpiar Todo
            </ModernActionButton>
          </ActionButtonsContainer>
        </HeaderCenter>

        <HeaderRight>
          <BoardStats>
            <StatItem>
              <StatValue>{totalTasks}</StatValue>
              <StatLabel>Tareas</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{columnsCount}</StatValue>
              <StatLabel>Columnas</StatLabel>
            </StatItem>
          </BoardStats>
        </HeaderRight>
      </ModernBoardHeader>

      {/* Modal para nueva columna */}
      {showColumnModal && (
        <ColumnModal>
          <ModalOverlay
            onClick={() => setShowColumnModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <ModalContent
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <ModalHeader>Crear Nueva Columna</ModalHeader>
            <ModalInput
              autoFocus
              type="text"
              placeholder="¿Cómo se llamará tu columna?"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateColumn();
                if (e.key === "Escape") setShowColumnModal(false);
              }}
            />
            <ModalActions>
              <ModalButton
                variant="secondary"
                onClick={() => setShowColumnModal(false)}
              >
                Cancelar
              </ModalButton>
              <ModalButton
                variant="primary"
                onClick={handleCreateColumn}
                disabled={!newColumnName.trim()}
              >
                Crear Columna
              </ModalButton>
            </ModalActions>
          </ModalContent>
        </ColumnModal>
      )}

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
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
                <div className="empty-icon">✨</div>
                <h3>¡Comienza creando tu primera columna!</h3>
                <p>
                  Organiza tus tareas en columnas personalizadas para un mejor
                  flujo de trabajo.
                </p>
                <ModernActionButton
                  variant="primary"
                  onClick={() => setShowColumnModal(true)}
                  style={{ marginTop: "20px" }}
                >
                  <ButtonIcon>+</ButtonIcon>
                  Crear Primera Columna
                </ModernActionButton>
              </EmptyState>
            ) : (
              columns.map((column, index) => {
                const colId = column._id || column.name;
                const columnTasks = getTasksForColumn(column);

                console.log(
                  `🎯 Renderizando columna "${column.name}" con ${columnTasks.length} tareas`
                );

                return (
                  <Column key={colId} column={column} index={index}>
                    <SortableContext
                      items={columnTasks.map((task) => task._id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {columnTasks.map((task) => (
                        <Task key={task._id} task={task} />
                      ))}
                    </SortableContext>
                  </Column>
                );
              })
            )}
          </ColumnsContainer>
        </SortableContext>

        <DragOverlay>
          {activeTask && (
            <DragOverlayCard
              initial={{ scale: 0.8, rotate: 0, opacity: 0 }}
              animate={{ scale: 1.08, rotate: 12, opacity: 0.98 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              <h4>{activeTask.titulo}</h4>
              <p>{activeTask.descripcion}</p>
              {activeTask.prioridad && (
                <span className={`priority-badge ${activeTask.prioridad}`}>
                  {activeTask.prioridad}
                </span>
              )}
            </DragOverlayCard>
          )}
        </DragOverlay>
      </DndContext>

      {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}
      <ExportButton />
    </BoardContainer>
  );
}
