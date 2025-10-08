// components/StatusBar/StatusBar.js
import React from "react";
import { motion } from "framer-motion";
import ConnectionStatus from "../ConnectionStatus/ConnectionStatus";
import {
  StatusBarContainer,
  StatusText,
  VersionInfo,
  StatusItems,
} from "./StyledStatusBar";

const StatusBar = () => {
  return (
    <StatusBarContainer
      initial={{ y: 32 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <StatusText>
        <span>Tablero Kanban Colaborativo</span>
        <VersionInfo>v2.0</VersionInfo>
      </StatusText>

      <StatusItems>
        <ConnectionStatus />
      </StatusItems>
    </StatusBarContainer>
  );
};

export default StatusBar;
