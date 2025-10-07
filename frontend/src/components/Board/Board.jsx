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

export default function Board() {
  const { tasks, columns, moveTask, addColumn, reorderColumns } = useKanban();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
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
        reorderColumns(newCols);
      }
      return;
    }

    // Otherwise, it's a task move: over.id is the column id/name
    const taskId = activeId;
    const newColumn = overId;
    const task = tasks.find((t) => t._id === taskId);
    if (task && task.columna !== newColumn) moveTask(taskId, newColumn);
  };

  const getTasksForColumn = (column) => {
    const name = column && column.name ? column.name : column;
    return tasks.filter((task) => task.columna === name);
  };

  return (
    <div className="kanban-board">
      <div className="board-header">
        <h1 className="board-title">Tablero Kanban</h1>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <input
            placeholder="Nueva columna"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid #ddd",
            }}
          />
          <button
            className="add-task-btn"
            onClick={() => {
              if (newColumnName && newColumnName.trim()) {
                addColumn(newColumnName.trim());
                setNewColumnName("");
              }
            }}
          >
            + Columna
          </button>
          <button
            className="add-task-btn"
            onClick={() => setShowTaskForm(true)}
          >
            + Nueva Tarea
          </button>
        </div>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columns.map((c) => c._id || c.name)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="columns-container">
            {columns.map((column) => (
              <Column key={column._id || column.name} column={column}>
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
        </SortableContext>

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
