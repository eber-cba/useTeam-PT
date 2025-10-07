import React, { useState, useEffect } from "react";
import { useKanban } from "../../context/KanbanContext";

export default function ConnectedUsers() {
  const { isConnected } = useKanban();
  const [users, setUsers] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState(0);

  useEffect(() => {
    if (!isConnected) return;
    // Escuchar usuarios conectados vía socket
    const handleUsersConnected = (usersList) => {
      setUsers(usersList);
    };
    window.socket?.on("users-connected", handleUsersConnected);

    // Obtener usuarios registrados vía API
    fetch("http://localhost:3000/api/auth/users")
      .then((res) => res.json())
      .then((data) => setRegisteredUsers(data.length))
      .catch(() => setRegisteredUsers(0));

    return () => {
      window.socket?.off("users-connected", handleUsersConnected);
    };
  }, [isConnected]);

  if (!isConnected) return null;

  const activeUsers = users.length;

  return (
    <div className="connected-users">
      <div className="users-header">
        <h4>Colaboradores</h4>
        <span className="user-count">
          {activeUsers} conectados / {registeredUsers} registrados
        </span>
      </div>
      <div className="users-list">
        {users.map((user, idx) => (
          <div key={user.id || user.email || idx} className="user-item active">
            <div className="user-avatar-small">{user.name ? user.name[0] : (user.email ? user.email[0] : user.id?.[0] || "?")}</div>
            <div className="user-info">
              <span className="user-name">{user.name || user.email || user.id || "Sin datos"}</span>
              <span className="user-status">En línea</span>
            </div>
            <div className="status-indicator online"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
