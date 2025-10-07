import React, { useState, useEffect } from "react";
import { useKanban } from "../../context/KanbanContext";

export default function CollaborationFeed() {
  const { isConnected } = useKanban();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (!isConnected || !window.socket) return;

    const handleActivity = (data, actionType) => {
      // Validación robusta de datos
      if (!data || !data.task) return;

      const taskTitle =
        typeof data.task === "string"
          ? data.task
          : data.task.titulo || data.task.title || "Tarea sin título";

      const user =
        data.createdBy ||
        data.movedBy ||
        data.updatedBy ||
        data.deletedBy ||
        "Anónimo";

      setActivities((prev) =>
        [
          {
            user,
            action: actionType,
            task: taskTitle,
            time: new Date().toLocaleTimeString(),
          },
          ...prev,
        ].slice(0, 20)
      );
    };

    // Eventos de socket
    const socket = window.socket;
    socket.on("task-added", (data) => handleActivity(data, "creó"));
    socket.on("task-updated", (data) => handleActivity(data, "movió"));
    socket.on("task-modified", (data) => handleActivity(data, "actualizó"));
    socket.on("task-removed", (data) => handleActivity(data, "eliminó"));

    return () => {
      socket.off("task-added");
      socket.off("task-updated");
      socket.off("task-modified");
      socket.off("task-removed");
    };
  }, [isConnected]);

  if (!isConnected) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h4 style={styles.title}>Actividad en Tiempo Real</h4>
        <div style={styles.status}>
          <div style={styles.dot}></div>
          <span>Conectado</span>
        </div>
      </div>

      <div style={styles.feed}>
        {activities.length === 0 ? (
          <p style={styles.empty}>No hay actividad reciente</p>
        ) : (
          activities.map((a, i) => {
            const userName =
              typeof a.user === "string"
                ? a.user
                : a.user?.name || a.user?.email || "Usuario desconocido";

            return (
              <div key={i} style={styles.item}>
                <strong>{userName}</strong> {a.action} <em>{a.task}</em>{" "}
                <span style={styles.time}>({a.time})</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#f9fafb",
    borderRadius: "12px",
    padding: "16px",
    marginTop: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
  },
  status: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    color: "green",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "green",
    animation: "pulse 1.5s infinite",
  },
  feed: {
    maxHeight: "250px",
    overflowY: "auto",
    fontSize: "14px",
  },
  item: {
    padding: "6px 0",
    borderBottom: "1px solid #eee",
  },
  time: {
    color: "#888",
    fontSize: "12px",
  },
  empty: {
    textAlign: "center",
    color: "#888",
  },
};
