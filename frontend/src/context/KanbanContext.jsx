// src/context/KanbanContext.jsx
import React, { createContext, useState, useEffect, useCallback } from "react";
import { useSocket } from "../hooks/useSocket";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

export const KanbanContext = createContext();

export const KanbanProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [columnMap, setColumnMap] = useState({}); // Mapa ID -> nombre

  const socket = useSocket();
  const { getAuthHeaders, token, user } = useAuth();
  const { addToast } = useToast();

  // Función helper para mapear columnas
  const mapTaskColumns = useCallback((tasksData, colMap) => {
    return tasksData
      .map((task) => {
        if (!task || !task._id) return null;

        // Si columna es un ID de MongoDB (24 caracteres hex), mapear a nombre
        const isMongoId = /^[0-9a-fA-F]{24}$/.test(task.columna);
        const mappedColumna = isMongoId
          ? colMap[task.columna] || task.columna
          : task.columna;

        return {
          ...task,
          columna: mappedColumna,
        };
      })
      .filter(Boolean);
  }, []);

  // Cargar datos iniciales SOLO UNA VEZ
  useEffect(() => {
    if (isInitialLoadComplete) return;

    const loadInitialData = async () => {
      try {
        console.log("🔄 Carga inicial ÚNICA - iniciando...");

        // 1. Cargar columnas primero
        const columnsRes = await fetch("http://localhost:3000/api/columns");
        let newColumnMap = {};

        if (columnsRes.ok) {
          const columnsData = await columnsRes.json();
          console.log("📊 Columnas cargadas:", columnsData);
          setColumns(Array.isArray(columnsData) ? columnsData : []);

          // Crear mapa de ID -> nombre
          columnsData.forEach((col) => {
            if (col._id && col.name) {
              newColumnMap[col._id] = col.name;
            }
          });
          setColumnMap(newColumnMap);
          console.log("🗺️ Mapa de columnas creado:", newColumnMap);
        } else {
          console.error("❌ Error cargando columnas:", columnsRes.status);
          const defaultColumns = [
            { _id: "default-1", name: "Por hacer" },
            { _id: "default-2", name: "En progreso" },
            { _id: "default-3", name: "Hecho" },
          ];
          setColumns(defaultColumns);
          defaultColumns.forEach((col) => {
            newColumnMap[col._id] = col.name;
          });
          setColumnMap(newColumnMap);
        }

        // 2. Cargar tareas y mapear columnas
        const tasksRes = await fetch("http://localhost:3000/api/tareas");
        console.log("📡 Respuesta de /api/tareas:", tasksRes.status);

        if (tasksRes.ok) {
          const tasksData = await tasksRes.json();
          console.log("📋 Tareas recibidas del backend:", tasksData);

          if (!Array.isArray(tasksData)) {
            console.error("❌ La respuesta no es un array:", typeof tasksData);
            setTasks([]);
          } else {
            // Mapear IDs de columna a nombres
            const mappedTasks = mapTaskColumns(tasksData, newColumnMap);
            console.log("✅ Tareas mapeadas:", mappedTasks);
            setTasks(mappedTasks);
          }
        } else {
          const errorText = await tasksRes.text();
          console.error(
            "❌ Error cargando tareas:",
            tasksRes.status,
            errorText
          );
          setTasks([]);
        }

        setIsInitialLoadComplete(true);
        console.log("🎯 Carga inicial completada");
      } catch (error) {
        console.error("❌ Error cargando datos iniciales:", error);
        setIsInitialLoadComplete(true);
      }
    };

    loadInitialData();
  }, [isInitialLoadComplete, mapTaskColumns]);

  // Debug: Monitorear cambios
  useEffect(() => {
    console.log(
      "🔄 Estado actualizado - Tasks:",
      tasks.length,
      "Columns:",
      columns.length
    );
    window.debugKanban = { tasks, columns, columnMap };
  }, [tasks, columns, columnMap]);

  // WebSocket events
  useEffect(() => {
    if (!socket) return;
    window.socket = socket;

    socket.on("connect", () => {
      console.log("✅ Socket conectado");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket desconectado");
      setIsConnected(false);
    });

    // Columnas reordenadas
    socket.on("column-reordered", (data) => {
      console.log("📡 [WS] Columnas reordenadas:", data);
      if (!data?.columns) return;
      setColumns(data.columns.map((c, idx) => ({ ...c, order: idx })));

      // Actualizar mapa
      const newMap = {};
      data.columns.forEach((col) => {
        if (col._id && col.name) newMap[col._id] = col.name;
      });
      setColumnMap(newMap);
    });

    // Tareas reordenadas
    socket.on("tasks-reordered", (data) => {
      console.log("📡 [WS] Tareas reordenadas:", data);
      if (!data?.column || !Array.isArray(data.orderedIds)) return;

      setTasks((prev = []) => {
        return prev.map((t) => {
          if (t?.columna === data.column) {
            const idx = data.orderedIds.indexOf(t._id);
            return { ...t, orden: idx >= 0 ? idx : t.orden || 0 };
          }
          return t;
        });
      });
    });

    // Tarea agregada
    socket.on("task-added", (data) => {
      console.log("📡 [WS] Tarea agregada:", data);
      const task = data?.task ?? data;
      if (!task || !task._id) return;

      // Ignorar tareas temporales
      if (task._id.toString().startsWith("temp-")) {
        console.log("🚫 Ignorando tarea temporal de WebSocket:", task._id);
        return;
      }

      setTasks((prev = []) => {
        // Verificar si ya existe
        const exists = prev.some((t) => t?._id === task._id);
        if (exists) {
          console.log("🚫 Tarea ya existe:", task._id);
          return prev;
        }

        // Mapear columna
        const mappedTask = {
          ...task,
          columna: columnMap[task.columna] || task.columna,
        };

        console.log("✅ Agregando tarea desde WebSocket:", mappedTask);
        return [...prev, mappedTask];
      });
    });

    // Tarea actualizada
    socket.on("task-updated", (data) => {
      console.log("📡 [WS] Tarea actualizada:", data);
      const incoming = data?.task ?? data?.updates ?? data;
      if (!incoming || !incoming._id) return;

      setTasks((prevTasks = []) => {
        const hasExisting = prevTasks.some((t) => t?._id === incoming._id);

        // Mapear columna
        const mapped = {
          ...incoming,
          columna: columnMap[incoming.columna] || incoming.columna,
        };

        if (hasExisting) {
          console.log("✅ Actualizando tarea existente:", mapped._id);
          return prevTasks.map((t) => (t?._id === incoming._id ? mapped : t));
        } else {
          console.log("✅ Agregando tarea nueva desde update:", mapped._id);
          return [...prevTasks, mapped];
        }
      });
    });

    // Tarea eliminada
    socket.on("task-removed", (data) => {
      console.log("📡 [WS] Tarea eliminada:", data);
      if (!data) return;
      const id = data.taskId ?? data;
      setTasks((prev = []) => prev.filter((t) => t?._id !== id));
    });

    // Columna creada
    socket.on("column-created", (data) => {
      console.log("📡 [WS] Columna creada:", data);
      if (!data?.column) return;
      const c = data.column;

      setColumns((prev = []) => {
        const exists = prev.some((pc) => pc?._id === c._id);
        if (exists) return prev;
        return [...prev, { _id: c._id, name: c.name, createdBy: c.createdBy }];
      });

      // Actualizar mapa
      setColumnMap((prev) => ({
        ...prev,
        [c._id]: c.name,
      }));
    });

    // Columna eliminada
    socket.on("column-removed", (data) => {
      console.log("📡 [WS] Columna eliminada:", data);
      if (!data?.column) return;
      const c = data.column;

      setColumns((prev = []) =>
        prev.filter((pc) => (c._id ? pc._id !== c._id : pc.name !== c.name))
      );

      // Mover tareas a "Por hacer"
      setTasks((prev = []) =>
        prev.map((t) =>
          t?.columna === (c.name || "") ? { ...t, columna: "Por hacer" } : t
        )
      );

      // Actualizar mapa
      if (c._id) {
        setColumnMap((prev) => {
          const newMap = { ...prev };
          delete newMap[c._id];
          return newMap;
        });
      }
    });

    // Columna actualizada
    socket.on("column-updated", (data) => {
      console.log("📡 [WS] Columna actualizada:", data);
      if (!data?.column) return;
      const c = data.column;
      const oldName = data.oldName || c.oldName;

      console.log("🔄 [WS] Actualizando columna:", c.name, "desde:", oldName);

      // Actualizar columnas
      setColumns((prev = []) =>
        prev.map((pc) => (pc?._id === c._id ? { ...pc, name: c.name } : pc))
      );

      // Actualizar mapa de columnas
      setColumnMap((prev) => ({
        ...prev,
        [c._id]: c.name,
      }));

      // 🔧 Sincronizar tareas que tenían el nombre anterior o el ID de columna
      setTasks((prev = []) => {
        console.log(
          "🔄 Actualizando tareas para columna:",
          c.name,
          "desde:",
          oldName
        );
        console.log("📋 Tareas antes de actualizar:", prev.length);
        console.log(
          "📋 Tareas actuales:",
          prev.map((t) => ({ id: t._id, columna: t.columna }))
        );

        const updatedTasks = prev.map((t) => {
          // Si la tarea tiene el nombre anterior o el ID de la columna, actualiza
          if (t.columna === oldName || t.columna === c._id) {
            console.log(
              "✅ Actualizando tarea:",
              t._id,
              "de",
              t.columna,
              "a",
              c.name
            );
            return { ...t, columna: c.name };
          }
          return t;
        });

        console.log("📋 Tareas después de actualizar:", updatedTasks.length);
        console.log(
          "📋 Tareas actualizadas:",
          updatedTasks.map((t) => ({ id: t._id, columna: t.columna }))
        );
        return updatedTasks;
      });

      // 🔧 Forzar re-render del componente para asegurar sincronización
      setTimeout(() => {
        console.log("🔄 Forzando re-render después de actualizar columna");
        setTasks((currentTasks) => {
          console.log("📋 Estado final de tareas:", currentTasks.length);
          return currentTasks;
        });
      }, 100);
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
      socket.off("column-reordered");
      socket.off("tasks-reordered");
    };
  }, [socket, columnMap]);

  // Agregar columna
  const addColumn = async (name) => {
    if (!name?.trim() || columns.some((c) => c?.name === name)) return;

    const headers = {
      "Content-Type": "application/json",
      ...(token ? getAuthHeaders() : {}),
    };

    try {
      const res = await fetch("http://localhost:3000/api/columns", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name,
          createdBy: user?.name || user?.email || "Desconocido",
        }),
      });

      if (!res.ok) {
        addToast?.({
          title: res.status === 401 ? "Autenticación requerida" : "Error",
          description:
            res.status === 401
              ? "Inicia sesión para crear columnas."
              : "No se pudo crear la columna.",
          type: res.status === 401 ? "warning" : "error",
        });
        return;
      }

      const created = await res.json();
      console.log("✅ Columna creada en BD:", created);

      setColumns((prev = []) => {
        const exists = prev.some((c) => c?._id === created._id);
        if (exists) return prev;
        return [...prev, created];
      });

      // Actualizar mapa
      setColumnMap((prev) => ({
        ...prev,
        [created._id]: created.name,
      }));

      addToast?.({
        title: "Columna creada",
        description: `Se creó la columna "${created.name}"`,
        type: "success",
      });
    } catch (err) {
      console.error("Error creando columna:", err);
      addToast?.({
        title: "Error",
        description: "No se pudo crear la columna.",
        type: "error",
      });
    }
  };

  // Eliminar columna
  const removeColumn = async (idOrName) => {
    const byId = columns.find((c) => c?._id === idOrName);
    const columnId = byId?._id || idOrName;
    const name = byId?.name ?? idOrName;

    const prevColumns = columns;
    const prevTasks = tasks;

    // Eliminación optimista
    setColumns((prev) =>
      prev.filter((c) => (byId ? c._id !== byId._id : c.name !== name))
    );
    setTasks((prev) =>
      prev.map((t) =>
        t?.columna === name ? { ...t, columna: "Por hacer" } : t
      )
    );

    try {
      const response = await fetch(
        `http://localhost:3000/api/columns/${columnId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        setColumns(prevColumns);
        setTasks(prevTasks);
        addToast?.({
          title: "Error",
          description: "No se pudo eliminar la columna.",
          type: "error",
        });
        return;
      }

      addToast?.({
        title: "Eliminada",
        description: `Se eliminó la columna "${name}".`,
        type: "success",
      });
    } catch (err) {
      console.error("Error eliminando columna:", err);
      setColumns(prevColumns);
      setTasks(prevTasks);
      addToast?.({
        title: "Error",
        description: "No se pudo eliminar la columna.",
        type: "error",
      });
    }
  };

  // Reordenar columnas
  const reorderColumns = async (newColumns) => {
    // Actualizar estado local inmediatamente
    const columnsWithOrder = newColumns.map((c, idx) => ({ ...c, order: idx }));
    setColumns(columnsWithOrder);

    try {
      // Persistir en el backend
      const response = await fetch(
        "http://localhost:3000/api/columns/reorder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ columns: columnsWithOrder }),
        }
      );

      if (!response.ok) {
        console.error("❌ Error reordenando columnas en el backend");
        addToast?.({
          title: "Error",
          description: "No se pudo guardar el orden de las columnas.",
          type: "error",
        });
      } else {
        console.log("✅ Columnas reordenadas y persistidas");
      }
    } catch (err) {
      console.error("❌ Error reordenando columnas:", err);
      addToast?.({
        title: "Error",
        description: "No se pudo guardar el orden de las columnas.",
        type: "error",
      });
    }
  };

  // Agregar tarea
  const addTask = async (newTask) => {
    const headers = { "Content-Type": "application/json" };

    console.log("📤 Enviando tarea al backend:", newTask);

    try {
      // Encontrar el ID de la columna si solo tenemos el nombre
      const columnToUse = columns.find((col) => col.name === newTask.columna);
      const columnaValue = columnToUse ? columnToUse._id : newTask.columna;

      const response = await fetch("http://localhost:3000/api/tareas", {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...newTask,
          columna: columnaValue, // Enviar ID de columna al backend
          createdBy: user
            ? {
                id: user.id || user._id,
                name: user.name,
                email: user.email,
              }
            : null,
        }),
      });

      console.log("📥 Respuesta del servidor:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error del servidor:", errorText);

        addToast?.({
          title: "Error",
          description: `No se pudo crear la tarea.`,
          type: "error",
        });
        return;
      }

      const saved = await response.json();
      console.log("💾 Tarea guardada en BD:", saved);

      if (!saved || !saved._id) {
        addToast?.({
          title: "Error",
          description: "Respuesta inválida del servidor.",
          type: "error",
        });
        return;
      }

      // Mapear columna antes de agregar al estado
      const mappedTask = {
        ...saved,
        columna: columnMap[saved.columna] || saved.columna,
      };

      setTasks((prev = []) => {
        const exists = prev.some((t) => t?._id === saved._id);
        if (exists) {
          console.log("⚠️ Tarea ya existe, evitando duplicado");
          return prev;
        }
        console.log("✅ Insertando tarea:", mappedTask);
        return [...prev, mappedTask];
      });

      addToast?.({
        title: "Tarea creada",
        description: "Se creó la tarea correctamente.",
        type: "success",
      });
    } catch (error) {
      console.error("❌ Error creando tarea:", error);
      addToast?.({
        title: "Error",
        description: "No se pudo crear la tarea.",
        type: "error",
      });
    }
  };

  // Actualizar tarea
  const updateTask = async (taskId, updates) => {
    const originalTask = tasks.find((t) => t._id === taskId);

    try {
      // Si estamos actualizando la columna, enviar el ID
      let updatePayload = { ...updates };
      if (updates.columna) {
        const targetColumn = columns.find(
          (col) => col.name === updates.columna
        );
        updatePayload.columna = targetColumn
          ? targetColumn._id
          : updates.columna;
      }

      const response = await fetch(
        `http://localhost:3000/api/tareas/${taskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatePayload),
        }
      );

      if (!response.ok) {
        if (originalTask) {
          setTasks((prev = []) =>
            prev.map((t) => (t._id === taskId ? originalTask : t))
          );
        }
        addToast?.({
          title: "Error",
          description:
            response.status === 401
              ? "Inicia sesión para editar tareas."
              : "No se pudo actualizar la tarea.",
          type: response.status === 401 ? "warning" : "error",
        });
        return;
      }

      const updated = await response.json();

      // Mapear columna
      const mappedTask = {
        ...updated,
        columna: columnMap[updated.columna] || updated.columna,
      };

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? mappedTask : task))
      );

      addToast?.({
        title: "Guardado",
        description: "Tarea actualizada.",
        type: "success",
      });
    } catch (err) {
      console.error("Error actualizando tarea:", err);
      if (originalTask) {
        setTasks((prev = []) =>
          prev.map((t) => (t._id === taskId ? originalTask : t))
        );
      }
      addToast?.({
        title: "Error",
        description: "No se pudo actualizar la tarea.",
        type: "error",
      });
    }
  };

  // Eliminar tarea
  const deleteTask = async (taskId) => {
    const prevTasks = tasks;
    setTasks((prev = []) => prev.filter((t) => t?._id !== taskId));

    try {
      const response = await fetch(
        `http://localhost:3000/api/tareas/${taskId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        setTasks(prevTasks);
        addToast?.({
          title: "Error",
          description: "No se pudo eliminar la tarea.",
          type: "error",
        });
        return;
      }

      addToast?.({
        title: "Eliminada",
        description: "Tarea eliminada.",
        type: "success",
      });
    } catch (err) {
      setTasks(prevTasks);
      addToast?.({
        title: "Error",
        description: "No se pudo eliminar la tarea.",
        type: "error",
      });
    }
  };

  // Eliminar todas las tareas
  const deleteAllTasks = async () => {
    if (!confirm("¿Seguro que deseas eliminar TODAS las tareas?")) return;

    const prevTasks = tasks;
    setTasks([]);

    try {
      const ids = (prevTasks || []).map((t) => t?._id).filter(Boolean);
      const responses = await Promise.all(
        ids.map((id) =>
          fetch(`http://localhost:3000/api/tareas/${id}`, { method: "DELETE" })
        )
      );

      const failed = responses.find((r) => !r.ok);
      if (failed) {
        setTasks(prevTasks);
        addToast?.({
          title: "Error",
          description: "Hubo errores eliminando algunas tareas.",
          type: "error",
        });
        return;
      }

      addToast?.({
        title: "Listo",
        description: "Se eliminaron todas las tareas.",
        type: "success",
      });
    } catch (err) {
      console.error("Error eliminando todas las tareas:", err);
      setTasks(prevTasks);
      addToast?.({
        title: "Error",
        description: "No se pudieron eliminar todas las tareas.",
        type: "error",
      });
    }
  };

  // Actualizar columna
  const updateColumn = async (columnId, newName, oldName) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/columns/${columnId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newName,
            oldName: oldName,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error actualizando columna:", errorText);
        throw new Error("Error actualizando columna");
      }

      const updated = await response.json();
      console.log("✅ Columna actualizada:", updated);

      // Actualizar estado local inmediatamente
      setColumns((prev = []) =>
        prev.map((pc) => (pc?._id === columnId ? { ...pc, name: newName } : pc))
      );

      setColumnMap((prev) => ({
        ...prev,
        [columnId]: newName,
      }));

      // Actualizar tareas que tenían el nombre anterior
      setTasks((prev = []) =>
        prev.map((t) => {
          if (t.columna === oldName || t.columna === columnId) {
            return { ...t, columna: newName };
          }
          return t;
        })
      );

      addToast?.({
        title: "Columna actualizada",
        description: `Se renombró la columna a "${newName}"`,
        type: "success",
      });

      return updated;
    } catch (err) {
      console.error("Error actualizando columna:", err);
      addToast?.({
        title: "Error",
        description: "No se pudo actualizar la columna.",
        type: "error",
      });
      throw err;
    }
  };

  // Reordenar tareas en columna
  const reorderColumnTasks = async (columnName, orderedIds) => {
    try {
      await fetch("http://localhost:3000/api/tareas/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ column: columnName, orderedIds }),
      });
    } catch (err) {
      console.error("Error reordenando tareas:", err);
      addToast?.({
        title: "Error",
        description: "No se pudo reordenar la columna.",
      });
    }
  };

  // Mover tarea
  const moveTask = async (taskId, targetColumnName, order) => {
    const taskToMove = tasks.find((task) => task?._id === taskId);
    if (!taskToMove) {
      console.error("Tarea no encontrada:", taskId);
      return;
    }

    // Actualizar estado local inmediatamente
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId
          ? { ...task, columna: targetColumnName, orden: order || 0 }
          : task
      )
    );

    try {
      // Encontrar el ID de la columna destino
      const targetColumn = columns.find((col) => col.name === targetColumnName);
      const targetColumnId = targetColumn ? targetColumn._id : targetColumnName;

      const response = await fetch(
        `http://localhost:3000/api/tareas/${taskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            columna: targetColumnId,
            orden: order || 0,
          }),
        }
      );

      if (!response.ok) {
        console.error("Error al mover tarea:", response.statusText);
        // Revertir cambio
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === taskId ? taskToMove : task))
        );
        addToast?.({
          title: "Error",
          description: "No se pudo mover la tarea.",
          type: "error",
        });
        return;
      }

      const updated = await response.json();

      // Mapear la respuesta
      const mappedTask = {
        ...updated,
        columna: columnMap[updated.columna] || updated.columna,
      };

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? mappedTask : task))
      );

      console.log("✅ Tarea movida exitosamente:", mappedTask);
    } catch (error) {
      console.error("Error al mover tarea:", error);
      // Revertir cambio
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? taskToMove : task))
      );
      addToast?.({
        title: "Error",
        description: "No se pudo mover la tarea.",
        type: "error",
      });
    }
  };

  return (
    <KanbanContext.Provider
      value={{
        tasks,
        columns,
        collaborators,
        isConnected,
        addColumn,
        removeColumn,
        updateColumn,
        addTask,
        updateTask,
        deleteTask,
        deleteAllTasks,
        moveTask,
        reorderColumns,
        reorderColumnTasks,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = () => {
  const context = React.useContext(KanbanContext);
  if (!context) {
    console.error("❌ useKanban debe usarse dentro de KanbanProvider");
    return {
      tasks: [],
      columns: [],
      collaborators: [],
      isConnected: false,
      addColumn: () => {},
      removeColumn: () => {},
      updateColumn: () => {},
      moveTask: () => {},
      addTask: () => {},
      updateTask: () => {},
      deleteTask: () => {},
      deleteAllTasks: () => {},
      reorderColumns: () => {},
      reorderColumnTasks: () => {},
    };
  }
  return context;
};
