import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function UserInfo() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  if (!user) return null;

  return (
    <div className="user-info">
      <div className="user-avatar" onClick={() => setShowMenu(!showMenu)}>
        {user.name.charAt(0).toUpperCase()}
      </div>

      {showMenu && (
        <div className="user-menu">
          <div className="user-menu-header">
            <div className="user-avatar-large">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="user-menu-actions">
            <button onClick={logout} className="logout-btn">
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
