// components/Navbar/Navbar.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid,
  FiMenu,
  FiX,
  FiBell,
  FiSettings,
  FiSearch,
  FiPlus,
  FiZap,
} from "react-icons/fi";
import UserInfo from "../UserInfo/UserInfo";
import {
  NavbarContainer,
  NavbarLeft,
  NavbarCenter,
  NavbarRight,
  AppLogo,
  LogoIcon,
  LogoText,
  SearchContainer,
  SearchInput,
  QuickActions,
  NavButton,
  NotificationBadge,
  MobileMenuButton,
  NavbarBackground,
  QuickActionButton,
  ActionIcon,
} from "./StyledNavbar";

const Navbar = ({ onMenuToggle, showMobileMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const quickActions = [];

  return (
    <>
      <NavbarBackground
        initial={{ height: "200px" }}
        animate={{ height: isScrolled ? "80px" : "200px" }}
        transition={{ duration: 0.4 }}
      />

      <NavbarContainer
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        $isScrolled={isScrolled}
      >
        <NavbarLeft>
          <AppLogo
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogoIcon
              animate={{ rotate: [0, 10, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              <FiGrid />
            </LogoIcon>
            <LogoText>Kanban Team</LogoText>
          </AppLogo>
        </NavbarLeft>

        <NavbarCenter>
          <AnimatePresence>
            {showSearch && (
              <SearchContainer
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 300, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SearchInput
                  placeholder="Buscar tareas, proyectos..."
                  autoFocus
                />
              </SearchContainer>
            )}
          </AnimatePresence>

          <QuickActions>
            {quickActions.map((action, index) => (
              <QuickActionButton
                key={index}
                onClick={action.action}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ActionIcon>
                  <action.icon />
                </ActionIcon>
                <span>{action.label}</span>
              </QuickActionButton>
            ))}
          </QuickActions>
        </NavbarCenter>

        <NavbarRight>
          <NavButton
            onClick={() => setShowSearch(!showSearch)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            title="Buscar"
          >
            <FiSearch />
          </NavButton>

          <NavButton
            onClick={() => console.log("Notificaciones")}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            title="Notificaciones"
          >
            <FiBell />
            <NotificationBadge
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              3
            </NotificationBadge>
          </NavButton>

          <NavButton
            onClick={() => console.log("Configuración")}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            title="Configuración"
          >
            <FiSettings />
          </NavButton>

          <UserInfo />

          <MobileMenuButton
            onClick={onMenuToggle}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            $active={showMobileMenu}
          >
            {showMobileMenu ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
        </NavbarRight>
      </NavbarContainer>
    </>
  );
};

export default Navbar;
