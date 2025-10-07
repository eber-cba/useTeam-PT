import React, { useState } from "react";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "../Column/Column";
import Task from "../Task/Task";
import TaskForm from "../TaskForm/TaskForm";
import { useKanban } from "../../context/KanbanContext";

export default function Board() {
  const { tasks, columns, moveTask } = useKanban();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find((t) => t._id === active.id);
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id;
    const newColumn = over.id;

    // Verificar si la tarea ya está en esa columna
    const task = tasks.find((t) => t._id === taskId);
    if (task && task.columna !== newColumn) {
      moveTask(taskId, newColumn);
    }
  };

  const getTasksForColumn = (columnName) => {
    return tasks.filter((task) => task.columna === columnName);
  };

  return (
    <div className="kanban-board">
      <div className="board-header">
        <h1 className="board-title">Tablero Kanban</h1>
        <button className="add-task-btn" onClick={() => setShowTaskForm(true)}>
          + Nueva Tarea
        </button>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="columns-container">
          {columns.map((column) => (
            <Column key={column} columnName={column}>
              <SortableContext
                items={getTasksForColumn(column).map((task) => task._id)}
                strategy={verticalListSortingStrategy}
              >
                {getTasksForColumn(column).map((task) => (
                  <Task key={task._id} task={task} />
                ))}
              </SortableContext>
            </Column>
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="task-card dragging">
              <h4>{activeTask.titulo}</h4>
              <p>{activeTask.descripcion}</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}
    </div>
  );
}
