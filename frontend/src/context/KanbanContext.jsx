import React, { createContext, useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

export const KanbanContext = createContext();

export const KanbanProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  // columns are objects: { _id?, name }
  const [columns, setColumns] = useState([
    { name: "Por hacer" },
    { name: "En progreso" },
    { name: "Hecho" },
  ]);
  const [isConnected, setIsConnected] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const socket = useSocket();
  const { getAuthHeaders, token } = useAuth();
  const { addToast } = useToast();

  // Load tasks
  useEffect(() => {
    fetch("http://localhost:3000/api/tareas")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => {
        console.error("Error loading tasks", err);
        try {
          addToast({
            title: "Error",
            description: "No se pudieron cargar las tareas.",
            type: "error",
          });
        } catch (e) {}
      });
  }, []);

  // Load columns from backend (seeded if empty)
  useEffect(() => {
    fetch("http://localhost:3000/api/columns")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setColumns(data.map((c) => ({ _id: c._id, name: c.name })));
        }
      })
      .catch((e) => {
        // keep defaults
      });
  }, []);

  // WebSocket events
  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    socket.on("task-added", (data) => setTasks((prev) => [...prev, data.task]));
    socket.on("task-updated", (data) =>
      setTasks((prev) =>
        prev.map((t) => (t._id === data.task._id ? data.task : t))
      )
    );
    socket.on("task-modified", (data) =>
      setTasks((prev) =>
        prev.map((t) => (t._id === data.task._id ? data.task : t))
      )
    );
    socket.on("task-removed", (data) =>
      setTasks((prev) => prev.filter((t) => t._id !== data.taskId))
    );

    // Column events
    socket.on("column-created", (data) => {
      const c = data.column;
      setColumns((prev) => {
        const exists = prev.some(
          (pc) => pc._id === c._id || pc.name === c.name
        );
        if (exists) return prev;
        return [...prev, { _id: c._id, name: c.name }];
      });
    });

    socket.on("column-removed", (data) => {
      const c = data.column;
      setColumns((prev) =>
        prev.filter((pc) => (c._id ? pc._id !== c._id : pc.name !== c.name))
      );
      // Move tasks from removed column to 'Por hacer'
      setTasks((prev) =>
        prev.map((t) =>
          t.columna === (c.name || "") ? { ...t, columna: "Por hacer" } : t
        )
      );
    });

    socket.on("column-updated", (data) => {
      const c = data.column;
      setColumns((prev) =>
        prev.map((pc) => (pc._id === c._id ? { ...pc, name: c.name } : pc))
      );
    });

    socket.on("column-reordered", (data) => {
      if (Array.isArray(data.columns)) {
        // Ordenar las columnas por el campo 'order' si existe
        const sorted = [...data.columns].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setColumns(sorted);
      }
    });

    socket.on("error", (err) => {
      console.error("Socket error", err);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("task-added");
      socket.off("task-updated");
      socket.off("task-modified");
      socket.off("task-removed");
      socket.off("column-created");
      socket.off("column-removed");
      socket.off("column-updated");
      socket.off("column-reordered");
      socket.off("error");
    };
  }, [socket]);

  // Column management
  const addColumn = async (name) => {
    if (!name || !name.trim()) return;
    if (columns.some((c) => c.name === name)) return;

    const headers = token
      ? getAuthHeaders()
      : { "Content-Type": "application/json" };
    try {
      const res = await fetch("http://localhost:3000/api/columns", {
        method: "POST",
        headers,
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || `HTTP ${res.status}`);
      }
      const created = await res.json();
      // NO agregar localmente, solo emitir por socket
      if (socket && isConnected)
        socket.emit("column-created", { column: created });
    } catch (err) {
      console.error("Error creando columna:", err);
      // fallback local SOLO si hay error de red
      setColumns((prev) => [...prev, { name }]);
    }
  };


  const removeColumn = (idOrName) => {
    const byId = columns.find((c) => c._id === idOrName);
    const name = byId ? byId.name : idOrName;
    if (byId && token) {
      const headers = getAuthHeaders();
      fetch(`http://localhost:3000/api/columns/${byId._id}`, {
        method: "DELETE",
        headers,
      })
        .then(async (res) => {
          if (!res.ok) {
            const errBody = await res.json().catch(() => ({}));
            throw new Error(errBody.message || `HTTP ${res.status}`);
          }
          return res.json();
        })
        .then(() => {
          setColumns((prev) => prev.filter((c) => c._id !== byId._id));
          setTasks((prev) =>
            prev.map((t) =>
              t.columna === name ? { ...t, columna: "Por hacer" } : t
            )
          );
          if (socket && isConnected)
            socket.emit("column-removed", { column: { _id: byId._id, name } });
        })
        .catch((err) => console.error("Error eliminando columna:", err));
      return;
    }

    // fallback by name
    setColumns((prev) => prev.filter((c) => c.name !== name));
    setTasks((prev) =>
      prev.map((t) => (t.columna === name ? { ...t, columna: "Por hacer" } : t))
    );
    if (socket && isConnected)
      socket.emit("column-removed", { column: { name } });
  };

  const reorderColumns = (newColumns) => {
    setColumns(newColumns.map((c, idx) => ({ ...c, order: idx })));
    newColumns.forEach((c, idx) => {
      if (c._id && token) {
        const headers = getAuthHeaders();
        fetch(`http://localhost:3000/api/columns/${c._id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify({ order: idx }),
        })
          .then((r) => r.json())
          .catch((e) => console.error("Error persisting column order", e));
      }
    });
    if (socket && isConnected) {
      socket.emit("column-reordered", { columns: newColumns });
    }
  };

  // Task operations
  const moveTask = (taskId, newColumna) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, columna: newColumna } : t))
    );
    const headers = token
      ? getAuthHeaders()
      : { "Content-Type": "application/json" };
    fetch(`http://localhost:3000/api/tareas/${taskId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ columna: newColumna }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.message || `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((updated) => {
        setTasks((prev) =>
          prev.map((t) => (t._id === updated._id ? updated : t))
        );
        if (socket && isConnected)
          socket.emit("task-moved", {
            taskId,
            newColumna,
            userId: "user-" + Math.random().toString(36).substr(2, 9),
          });
      })
      .catch((err) => {
        console.error("Error moviendo tarea:", err);
        try {
          addToast({ title: "Error", description: err.message, type: "error" });
        } catch (e) {}
      });
  };

  const addTask = (newTask) => {
    const headers = token
      ? getAuthHeaders()
      : { "Content-Type": "application/json" };
    fetch("http://localhost:3000/api/tareas", {
      method: "POST",
      headers,
      body: JSON.stringify(newTask),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.message || `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((saved) => {
        setTasks((prev) => {
          if (saved.clientTempId)
            return prev.map((t) =>
              t.clientTempId === saved.clientTempId ? saved : t
            );
          const exists = prev.some((t) => t._id === saved._id);
          if (exists) return prev.map((t) => (t._id === saved._id ? saved : t));
          return [
            ...prev.filter((t) => !String(t._id).startsWith("temp-")),
            saved,
          ];
        });
        if (socket && isConnected)
          socket.emit("task-created", {
            task: saved,
            userId: "user-" + Math.random().toString(36).substr(2, 9),
          });
      })
      .catch((err) => {
        console.error("Error guardando tarea:", err);
        try {
          addToast({ title: "Error", description: err.message, type: "error" });
        } catch (e) {}
        setTasks((prev) => [...prev, newTask]);
      });
  };

  const updateTask = (taskId, updates) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, ...updates } : t))
    );
    const headers = token
      ? getAuthHeaders()
      : { "Content-Type": "application/json" };
    fetch(`http://localhost:3000/api/tareas/${taskId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(updates),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.message || `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((updated) => {
        setTasks((prev) =>
          prev.map((t) => (t._id === updated._id ? updated : t))
        );
        if (socket && isConnected)
          socket.emit("task-updated", {
            taskId,
            updates,
            userId: "user-" + Math.random().toString(36).substr(2, 9),
          });
      })
      .catch((err) => {
        console.error("Error actualizando tarea:", err);
        try {
          addToast({ title: "Error", description: err.message, type: "error" });
        } catch (e) {}
      });
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
    const headers = token ? getAuthHeaders() : undefined;
    fetch(`http://localhost:3000/api/tareas/${taskId}`, {
      method: "DELETE",
      headers,
    })
      .then(async (res) => {
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.message || `HTTP ${res.status}`);
        }
        if (socket && isConnected)
          socket.emit("task-deleted", {
            taskId,
            userId: "user-" + Math.random().toString(36).substr(2, 9),
          });
      })
      .catch((err) => {
        console.error("Error eliminando tarea:", err);
        try {
          addToast({ title: "Error", description: err.message, type: "error" });
        } catch (e) {}
      });
  };

  return (
    <KanbanContext.Provider
      value={{
        tasks,
        setTasks,
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
    throw new Error("useKanban debe ser usado dentro de un KanbanProvider");
  return context;
};

export default KanbanProvider;
