// src/context/KanbanContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

export const KanbanContext = createContext();

export const KanbanProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState([
    { name: "Por hacer" },
    { name: "En progreso" },
    { name: "Hecho" },
  ]);
  const [isConnected, setIsConnected] = useState(false);
  const [collaborators, setCollaborators] = useState([]);

  const socket = useSocket();
  const { getAuthHeaders, token, user } = useAuth();
  const { addToast } = useToast();

  // Carga inicial de tareas
  useEffect(() => {
    fetch("http://localhost:3000/api/tareas")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTasks(data.filter(Boolean));
      })
      .catch((err) => {
        console.error("Error loading tasks", err);
        addToast?.({
          title: "Error",
          description: "No se pudieron cargar las tareas.",
          type: "error",
        });
      });
  }, [addToast]);

  // Carga inicial de columnas
  useEffect(() => {
    fetch("http://localhost:3000/api/columns")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setColumns(data.map((c) => ({ _id: c._id, name: c.name })));
        }
      })
      .catch(() => {});
  }, []);

  // WebSocket events
  useEffect(() => {
    if (!socket) return;
    window.socket = socket;

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    const safeMapReplace = (arr, id, newItem) =>
      Array.isArray(arr) ? arr.map((t) => (t?._id === id ? newItem : t)) : arr;

    socket.on("task-added", (data) => {
      if (!data) return;
      const task = data.task ?? data;
      setTasks((prev = []) => [...prev.filter(Boolean), task]);
    });

    socket.on("task-updated", (data) => {
      const { task } = data;
      
      setTasks((prevTasks) => {
        const existingTask = prevTasks.find(t => t._id === task._id);
        
        if (existingTask) {
          return safeMapReplace(prevTasks, task._id, task);
        } else {
          return [...prevTasks, task];
        }
      });
    });

    socket.on("task-removed", (data) => {
      if (!data) return;
      const id = data.taskId ?? data;
      setTasks((prev = []) => prev.filter((t) => t?._id !== id));
    });

    socket.on("column-created", (data) => {
      if (!data?.column) return;
      const c = data.column;
      setColumns((prev = []) =>
        prev.some((pc) => pc?._id === c._id || pc?.name === c.name)
          ? prev
          : [...prev, { _id: c._id, name: c.name }]
      );
    });

    socket.on("column-removed", (data) => {
      if (!data?.column) return;
      const c = data.column;
      setColumns((prev = []) =>
        prev.filter((pc) => (c._id ? pc._id !== c._id : pc.name !== c.name))
      );
      setTasks((prev = []) =>
        prev.map((t) =>
          t?.columna === (c.name || "") ? { ...t, columna: "Por hacer" } : t
        )
      );
    });

    socket.on("column-updated", (data) => {
      if (!data?.column) return;
      const c = data.column;
      setColumns((prev = []) =>
        prev.map((pc) => (pc?._id === c._id ? { ...pc, name: c.name } : pc))
      );
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("task-added");
      socket.off("task-updated");
      socket.off("task-removed");
      socket.off("column-created");
      socket.off("column-removed");
      socket.off("column-updated");
    };
  }, [socket]);

  // Column management
  const addColumn = async (name) => {
    if (!name?.trim() || columns.some((c) => c?.name === name)) return;
    const headers = token
      ? getAuthHeaders()
      : { "Content-Type": "application/json" };
    try {
      const res = await fetch("http://localhost:3000/api/columns", {
        method: "POST",
        headers,
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Error creando columna");
      const created = await res.json();
      setColumns((prev = []) => [
        ...prev,
        { _id: created._id, name: created.name },
      ]);
    } catch (err) {
      console.error("Error creando columna:", err);
      setColumns((prev = []) => [...prev, { name }]);
    }
  };

  const removeColumn = (idOrName) => {
    const byId = columns.find((c) => c?._id === idOrName);
    const name = byId?.name ?? idOrName;
    setColumns((prev) =>
      prev.filter((c) => (byId ? c._id !== byId._id : c.name !== name))
    );
    setTasks((prev) =>
      prev.map((t) =>
        t?.columna === name ? { ...t, columna: "Por hacer" } : t
      )
    );
  };

  const reorderColumns = (newColumns) => {
    setColumns(newColumns.map((c, idx) => ({ ...c, order: idx })));
  };

  // Tasks
  const addTask = async (newTask) => {
    const tempId = newTask._id; // id temporal
    const headers = token
      ? getAuthHeaders()
      : { "Content-Type": "application/json" };

    const response = await fetch("http://localhost:3000/api/tareas", {
      method: "POST",
      headers,
      body: JSON.stringify(newTask),
    });
    const saved = await response.json();

    // Reemplazar la tarea temporal por la real
    setTasks((prev) => prev.map((t) => (t._id === tempId ? saved : t)));
  };

  const updateTask = (taskId, updates) => {
    setTasks((prev = []) =>
      prev.map((t) => (t?._id === taskId ? { ...t, ...updates } : t))
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev = []) => prev.filter((t) => t?._id !== taskId));
  };

  const moveTask = async (taskId, targetColumnName, order) => {
    const taskToMove = tasks.find((task) => task._id === taskId);
    if (!taskToMove) {
      console.error("Tarea no encontrada:", taskId);
      return;
    }

    // Si es una tarea temporal, actualizar solo localmente
    if (taskToMove.clientTempId) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, columna: targetColumnName } : task
        )
      );
      return;
    }

    // Actualizar estado local inmediatamente
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, columna: targetColumnName } : task
      )
    );

    try {
      const response = await fetch(`http://localhost:3000/api/tareas/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ columna: targetColumnName, orden: order }),
      });

      if (response.ok) {
        const updated = await response.json();
        
        // Actualizar con la respuesta del backend
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? updated : task
          )
        );

        // Emitir evento WebSocket
        socket?.emit("task-moved", { 
          taskId: updated._id, 
          newColumna: updated.columna, 
          userId: user?.id
        });
      } else {
        console.error("Error al mover tarea:", response.statusText);
        // Revertir cambio local en caso de error
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? taskToMove : task
          )
        );
      }
    } catch (error) {
      console.error("Error al mover tarea:", error);
      // Revertir cambio local en caso de error
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? taskToMove : task
        )
      );
    }
  };

  return (
    <KanbanContext.Provider
      value={{
        tasks,
        columns,
        addColumn,
        removeColumn,
        moveTask,
        addTask,
        updateTask,
        deleteTask,
        isConnected,
        collaborators,
        reorderColumns,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = () => {
  const context = React.useContext(KanbanContext);
  if (!context)
    throw new Error("useKanban debe usarse dentro de KanbanProvider");
  return context;
};
