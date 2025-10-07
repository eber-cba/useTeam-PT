import React, { createContext, useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

export const KanbanContext = createContext();

export const KanbanProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [columns] = useState(["Por hacer", "En progreso", "Hecho"]);
  const [isConnected, setIsConnected] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const socket = useSocket();
  const { getAuthHeaders, token } = useAuth();
  const { addToast } = useToast();

  // Cargar tareas iniciales
  useEffect(() => {
    fetch("http://localhost:3000/api/tareas")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => {
        console.error(err);
        try {
          addToast({
            title: "Error",
            description: "No se pudieron cargar las tareas.",
            type: "error",
          });
        } catch (e) {}
      });
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
      try {
        addToast({
          title: "WebSocket",
          description: "Error en la conexión en tiempo real.",
          type: "warning",
        });
      } catch (e) {}
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
    // Persistir en backend
    const headers = token
      ? getAuthHeaders()
      : { "Content-Type": "application/json" };

    fetch(`http://localhost:3000/api/tareas/${taskId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ columna: newColumna }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setTasks((prev) =>
          prev.map((t) => (t._id === updated._id ? updated : t))
        );
        if (socket && isConnected) {
          socket.emit("task-moved", {
            taskId,
            newColumna,
            userId: "user-" + Math.random().toString(36).substr(2, 9),
          });
        }
      })
      .catch((err) => {
        console.error("Error moviendo tarea:", err);
        try {
          addToast({
            title: "Error",
            description: "No se pudo mover la tarea.",
            type: "error",
          });
        } catch (e) {}
      });
  };

  const addTask = (newTask) => {
    // Persistir en el backend
    const headers = token
      ? getAuthHeaders()
      : { "Content-Type": "application/json" };

    fetch("http://localhost:3000/api/tareas", {
      method: "POST",
      headers,
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((saved) => {
        // Reemplazar la tarea temporal por la guardada usando clientTempId si existe
        setTasks((prev) => {
          if (saved.clientTempId) {
            return prev.map((t) =>
              t.clientTempId === saved.clientTempId ? saved : t
            );
          }
          const exists = prev.some((t) => t._id === saved._id);
          if (exists) return prev.map((t) => (t._id === saved._id ? saved : t));
          return [
            ...prev.filter((t) => !String(t._id).startsWith("temp-")),
            saved,
          ];
        });

        // Emitir al servidor para colaboración (si está conectado)
        if (socket && isConnected) {
          socket.emit("task-created", {
            task: saved,
            userId: "user-" + Math.random().toString(36).substr(2, 9),
          });
        }
      })
      .catch((err) => {
        console.error("Error guardando tarea:", err);
        try {
          addToast({
            title: "Error",
            description: "No se pudo guardar la tarea en el servidor.",
            type: "error",
          });
        } catch (e) {}
        // Fallback: añadir localmente
        setTasks((prev) => [...prev, newTask]);
      });
  };

  const updateTask = (taskId, updates) => {
    // Actualizar localmente primero
    setTasks((prev) =>
      prev.map((task) => (task._id === taskId ? { ...task, ...updates } : task))
    );
    // Persistir en backend
    const headers = token
      ? getAuthHeaders()
      : { "Content-Type": "application/json" };

    fetch(`http://localhost:3000/api/tareas/${taskId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(updates),
    })
      .then((res) => res.json())
      .then((updated) => {
        setTasks((prev) =>
          prev.map((t) => (t._id === updated._id ? updated : t))
        );
        if (socket && isConnected) {
          socket.emit("task-updated", {
            taskId,
            updates,
            userId: "user-" + Math.random().toString(36).substr(2, 9),
          });
        }
      })
      .catch((err) => {
        console.error("Error actualizando tarea:", err);
        try {
          addToast({
            title: "Error",
            description: "No se pudo actualizar la tarea.",
            type: "error",
          });
        } catch (e) {}
      });
  };

  const deleteTask = (taskId) => {
    // Eliminar localmente primero
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
    // Persistir en backend
    const headers = token ? getAuthHeaders() : undefined;
    fetch(`http://localhost:3000/api/tareas/${taskId}`, {
      method: "DELETE",
      headers,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error eliminando tarea");
        if (socket && isConnected) {
          socket.emit("task-deleted", {
            taskId,
            userId: "user-" + Math.random().toString(36).substr(2, 9),
          });
        }
      })
      .catch((err) => {
        console.error("Error eliminando tarea:", err);
        try {
          addToast({
            title: "Error",
            description: "No se pudo eliminar la tarea.",
            type: "error",
          });
        } catch (e) {}
      });
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

export default KanbanProvider;
