// components/Layout/AppLayout.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import SidePanel from "../SidePanel/SidePanel";
import StatusBar from "../StatusBar/StatusBar";
import {
  MainLayout,
  MainContent,
  BoardContainer,
  Overlay,
} from "./StyledAppLayout";

const AppLayout = ({ children }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <MainLayout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar
        onMenuToggle={() => setShowMobileMenu(!showMobileMenu)}
        showMobileMenu={showMobileMenu}
      />

      <MainContent style={{ paddingTop: '100px' }}>
        <BoardContainer>{children}</BoardContainer>
      </MainContent>

      <SidePanel
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
      />

      {showMobileMenu && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      <StatusBar />
    </MainLayout>
  );
};

export default AppLayout;
