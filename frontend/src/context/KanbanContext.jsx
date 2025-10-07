import React, { createContext, useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

export const KanbanContext = createContext();

export const KanbanProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [columns] = useState(["Por hacer", "En progreso", "Hecho"]);
  const [isConnected, setIsConnected] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const socket = useSocket();

  // Cargar tareas iniciales
  useEffect(() => {
    fetch("http://localhost:3000/api/tareas")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  // Configurar eventos de WebSocket
  useEffect(() => {
    if (!socket) return;

    // Estado de conexión
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Conectado para colaboración en tiempo real");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Desconectado del servidor");
    });

    // Eventos de colaboración
    socket.on("task-updated", (data) => {
      console.log("Tarea actualizada por otro usuario:", data);
      setTasks((prev) =>
        prev.map((task) => (task._id === data.task._id ? data.task : task))
      );
    });

    socket.on("task-added", (data) => {
      console.log("Nueva tarea agregada por otro usuario:", data);
      setTasks((prev) => [...prev, data.task]);
    });

    socket.on("task-modified", (data) => {
      console.log("Tarea modificada por otro usuario:", data);
      setTasks((prev) =>
        prev.map((task) => (task._id === data.task._id ? data.task : task))
      );
    });

    socket.on("task-removed", (data) => {
      console.log("Tarea eliminada por otro usuario:", data);
      setTasks((prev) => prev.filter((task) => task._id !== data.taskId));
    });

    socket.on("error", (error) => {
      console.error("Error del servidor WebSocket:", error);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("task-updated");
      socket.off("task-added");
      socket.off("task-modified");
      socket.off("task-removed");
      socket.off("error");
    };
  }, [socket]);

  const moveTask = (taskId, newColumna) => {
    // Actualizar localmente primero para respuesta rápida
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, columna: newColumna } : t))
    );

    // Enviar al servidor para colaboración
    if (socket && isConnected) {
      socket.emit("task-moved", {
        taskId,
        newColumna,
        userId: "user-" + Math.random().toString(36).substr(2, 9), // ID temporal del usuario
      });
    }
  };

  const addTask = (newTask) => {
    // Agregar localmente primero
    setTasks((prev) => [...prev, newTask]);

    // Enviar al servidor para colaboración
    if (socket && isConnected) {
      socket.emit("task-created", {
        task: newTask,
        userId: "user-" + Math.random().toString(36).substr(2, 9),
      });
    }
  };

  const updateTask = (taskId, updates) => {
    // Actualizar localmente primero
    setTasks((prev) =>
      prev.map((task) => (task._id === taskId ? { ...task, ...updates } : task))
    );

    // Enviar al servidor para colaboración
    if (socket && isConnected) {
      socket.emit("task-updated", {
        taskId,
        updates,
        userId: "user-" + Math.random().toString(36).substr(2, 9),
      });
    }
  };

  const deleteTask = (taskId) => {
    // Eliminar localmente primero
    setTasks((prev) => prev.filter((task) => task._id !== taskId));

    // Enviar al servidor para colaboración
    if (socket && isConnected) {
      socket.emit("task-deleted", {
        taskId,
        userId: "user-" + Math.random().toString(36).substr(2, 9),
      });
    }
  };

  return (
    <KanbanContext.Provider
      value={{
        tasks,
        setTasks,
        columns,
        moveTask,
        addTask,
        updateTask,
        deleteTask,
        isConnected,
        collaborators,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = () => {
  const context = React.useContext(KanbanContext);
  if (!context) {
    throw new Error("useKanban debe ser usado dentro de un KanbanProvider");
  }
  return context;
};
