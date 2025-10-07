import React, { useState, useEffect } from "react";
import { useKanban } from "../../context/KanbanContext";

export default function CollaborationFeed() {
  const { isConnected } = useKanban();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Simular actividades de colaboración
    if (isConnected) {
      const activities = [
        {
          id: 1,
          user: "Ana García",
          action: "moved",
          task: "Diseñar mockups",
          time: "hace 2 min",
        },
        {
          id: 2,
          user: "Carlos López",
          action: "created",
          task: "Revisar código",
          time: "hace 5 min",
        },
        {
          id: 3,
          user: "María Rodríguez",
          action: "completed",
          task: "Testing",
          time: "hace 8 min",
        },
      ];
      setActivities(activities);
    }
  }, [isConnected]);

  const getActionIcon = (action) => {
    switch (action) {
      case "moved":
        return "↔️";
      case "created":
        return "➕";
      case "completed":
        return "✅";
      case "updated":
        return "✏️";
      default:
        return "👤";
    }
  };

  const getActionText = (action) => {
    switch (action) {
      case "moved":
        return "movió";
      case "created":
        return "creó";
      case "completed":
        return "completó";
      case "updated":
        return "actualizó";
      default:
        return "realizó una acción en";
    }
  };

  if (!isConnected) return null;

  return (
    <div className="collaboration-feed">
      <div className="feed-header">
        <h4>Actividad en Tiempo Real</h4>
        <div className="connection-indicator">
          <div className="pulse-dot"></div>
          <span>Conectado</span>
        </div>
      </div>

      <div className="feed-content">
        {activities.length === 0 ? (
          <p className="no-activity">No hay actividad reciente</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {getActionIcon(activity.action)}
              </div>
              <div className="activity-content">
                <p>
                  <strong>{activity.user}</strong>{" "}
                  {getActionText(activity.action)}{" "}
                  <strong>"{activity.task}"</strong>
                </p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
