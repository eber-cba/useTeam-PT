// components/SidePanel/SidePanel.js
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CollaborationPanel from "../CollaborationPanel/CollaborationPanel";
import ExportButton from "../ExportButton/ExportButton";
import {
  SidePanelContainer,
  PanelContent,
  CloseButton,
  PanelHeader,
  PanelTitle,
} from "./StyledSidePanel";

const SidePanel = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <SidePanelContainer
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <PanelHeader>
            <PanelTitle>Panel de Control</PanelTitle>
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </CloseButton>
          </PanelHeader>

          <PanelContent>
            <CollaborationPanel />
            <ExportButton />
          </PanelContent>
        </SidePanelContainer>
      )}
    </AnimatePresence>
  );
};

export default SidePanel;
