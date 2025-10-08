import React, { useState, useEffect } from "react";
import { useKanban } from "../../context/KanbanContext";
import {
  UsersContainer,
  UsersHeader,
  UsersTitle,
  UserCount,
  UsersList,
  UserItem,
  UserAvatar,
  UserInfo,
  UserName,
  UserStatus,
  OnlineIndicator,
  EmptyState
} from "../CollaborationPanel/StyledCollaborationPanel";

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

  // LOGS NUEVOS PARA DEPURACIÓN
  console.log("[CONNECTEDUSERS] Estado conexión:", isConnected);
  if (!isConnected) return null;

  const activeUsers = users.length;

  return (
    <UsersContainer>
      <UsersHeader>
        <UsersTitle>Colaboradores</UsersTitle>
        <UserCount>
          {activeUsers} conectados / {registeredUsers} registrados
        </UserCount>
      </UsersHeader>
      <UsersList>
        {users.length === 0 ? (
          <EmptyState>No hay usuarios conectados</EmptyState>
        ) : (
          users.map((user, idx) => (
            <UserItem
              key={user.id || user.email || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <UserAvatar>
                {user.name ? user.name[0] : (user.email ? user.email[0] : user.id?.[0] || "?")}
              </UserAvatar>
              <UserInfo>
                <UserName>{user.name || user.email || user.id || "Sin datos"}</UserName>
                <UserStatus>En línea</UserStatus>
              </UserInfo>
              <OnlineIndicator />
            </UserItem>
          ))
        )}
      </UsersList>
    </UsersContainer>
  );
}
