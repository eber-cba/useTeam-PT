import React, { useState, useEffect } from "react";
import { useKanban } from "../../context/KanbanContext";
import {
  ActivityContainer,
  ActivityHeader,
  ActivityTitle,
  StatusIndicator,
  StatusDot,
  ActivityFeed,
  ActivityItem,
  ActivityTime,
  EmptyState
} from "../CollaborationPanel/StyledCollaborationPanel";

export default function CollaborationFeed() {
  const { isConnected } = useKanban();
  const [activities, setActivities] = useState([]);

  // LOGS NUEVOS PARA DEPURACIÓN
  console.log("[COLLABFEED] Estado conexión:", isConnected);

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
    <ActivityContainer>
      <ActivityHeader>
        <ActivityTitle>Actividad en Tiempo Real</ActivityTitle>
        <StatusIndicator>
          <StatusDot
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span>Conectado</span>
        </StatusIndicator>
      </ActivityHeader>

      <ActivityFeed>
        {activities.length === 0 ? (
          <EmptyState>No hay actividad reciente</EmptyState>
        ) : (
          activities.map((a, i) => {
            const userName =
              typeof a.user === "string"
                ? a.user
                : a.user?.name || a.user?.email || "Usuario desconocido";

            return (
              <ActivityItem
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <strong>{userName}</strong> {a.action} <em>{a.task}</em>{" "}
                <ActivityTime>({a.time})</ActivityTime>
              </ActivityItem>
            );
          })
        )}
      </ActivityFeed>
    </ActivityContainer>
  );
}
