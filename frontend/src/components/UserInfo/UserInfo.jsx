import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  UserInfoContainer,
  UserAvatar,
  UserMenu,
  UserMenuHeader,
  UserAvatarLarge,
  UserDetails,
  UserName,
  UserEmail,
  UserMenuActions,
  LogoutButton,
  MenuBackdrop,
  MenuItem,
  MenuIcon,
  UserStats,
  StatItem,
  StatValue,
  StatLabel,
  OnlineIndicator,
  MenuDivider,
  ThemeToggle,
} from "./StyledUserInfo";
import {
  FiLogOut,
  FiSettings,
  FiUser,
  FiBell,
  FiMoon,
  FiSun,
  FiAward,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";

export default function UserInfo() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const userStats = [
    { icon: FiCheckCircle, value: "24", label: "Tareas Completadas" },
    { icon: FiCalendar, value: "12", label: "En Progreso" },
    { icon: FiAward, value: "8", label: "Logros" },
  ];

  const menuItems = [
    { icon: FiUser, label: "Mi Perfil", action: () => console.log("Perfil") },
    {
      icon: FiSettings,
      label: "Configuración",
      action: () => console.log("Configuración"),
    },
    {
      icon: FiBell,
      label: "Notificaciones",
      action: () => console.log("Notificaciones"),
    },
  ];

  const handleLogout = () => {
    logout();
    setShowMenu(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Aquí puedes agregar la lógica para cambiar el tema global
  };

  return (
    <>
      <UserInfoContainer ref={menuRef}>
        <UserAvatar
          onClick={() => setShowMenu(!showMenu)}
          $isActive={showMenu}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          <div className="avatar-content">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <OnlineIndicator />
          <div className="avatar-glow" />
        </UserAvatar>

        {showMenu && (
          <>
            <MenuBackdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
            />
            <UserMenu
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              {/* Header del menú */}
              <UserMenuHeader>
                <UserAvatarLarge
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <div className="avatar-content">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="avatar-glow" />
                </UserAvatarLarge>
                <UserDetails>
                  <UserName
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {user.name}
                  </UserName>
                  <UserEmail
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {user.email}
                  </UserEmail>
                </UserDetails>
              </UserMenuHeader>

              {/* Estadísticas del usuario */}
              <UserStats
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {userStats.map((stat, index) => (
                  <StatItem
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <stat.icon className="stat-icon" />
                    <StatValue>{stat.value}</StatValue>
                    <StatLabel>{stat.label}</StatLabel>
                  </StatItem>
                ))}
              </UserStats>

              <MenuDivider />

              {/* Items del menú */}
              <div className="menu-items">
                {menuItems.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={item.action}
                    whileHover={{
                      x: 8,
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <MenuIcon>
                      <item.icon />
                    </MenuIcon>
                    <span>{item.label}</span>
                  </MenuItem>
                ))}
              </div>

              <MenuDivider />

              {/* Toggle de tema */}
              <ThemeToggle
                onClick={toggleTheme}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <MenuIcon>{isDarkMode ? <FiSun /> : <FiMoon />}</MenuIcon>
                <span>{isDarkMode ? "Modo Claro" : "Modo Oscuro"}</span>
                <div className={`toggle-switch ${isDarkMode ? "active" : ""}`}>
                  <div className="toggle-handle" />
                </div>
              </ThemeToggle>

              {/* Botón de cerrar sesión */}
              <UserMenuActions
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <LogoutButton
                  onClick={handleLogout}
                  whileHover={{
                    scale: 1.02,
                    x: 4,
                    boxShadow: "0 8px 25px rgba(239, 68, 68, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiLogOut />
                  <span>Cerrar Sesión</span>
                </LogoutButton>
              </UserMenuActions>
            </UserMenu>
          </>
        )}
      </UserInfoContainer>
    </>
  );
}
