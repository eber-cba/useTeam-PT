import React, { useState, useEffect } from "react";
import { useKanban } from "../../context/KanbanContext";

export default function ConnectedUsers() {
  const { isConnected } = useKanban();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simular usuarios conectados
    if (isConnected) {
      const connectedUsers = [
        { id: 1, name: "Ana García", avatar: "A", isActive: true },
        { id: 2, name: "Carlos López", avatar: "C", isActive: true },
        { id: 3, name: "María Rodríguez", avatar: "M", isActive: false },
        { id: 4, name: "Pedro Sánchez", avatar: "P", isActive: true },
      ];
      setUsers(connectedUsers);
    }
  }, [isConnected]);

  if (!isConnected) return null;

  const activeUsers = users.filter((user) => user.isActive);
  const totalUsers = users.length;

  return (
    <div className="connected-users">
      <div className="users-header">
        <h4>Colaboradores</h4>
        <span className="user-count">
          {activeUsers.length} de {totalUsers} conectados
        </span>
      </div>

      <div className="users-list">
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-item ${user.isActive ? "active" : "inactive"}`}
          >
            <div className="user-avatar-small">{user.avatar}</div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-status">
                {user.isActive ? "En línea" : "Desconectado"}
              </span>
            </div>
            <div
              className={`status-indicator ${
                user.isActive ? "online" : "offline"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
