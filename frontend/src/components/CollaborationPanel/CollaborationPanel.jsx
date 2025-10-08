import React, { useState } from "react";
import { FiUsers, FiX } from "react-icons/fi";
import CollaborationFeed from "../CollaborationFeed/CollaborationFeed";
import ConnectedUsers from "../ConnectedUsers/ConnectedUsers";
import {
  CollaborationToggle,
  CollaborationPanelContainer,
  PanelHeader,
  PanelTitle,
  CloseButton,
  PanelTabs,
  Tab,
  PanelContent
} from "./StyledCollaborationPanel";

export default function CollaborationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("activity");

  return (
    <>
      <CollaborationToggle
        onClick={() => setIsOpen(!isOpen)}
        title="Panel de colaboración"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiUsers />
      </CollaborationToggle>

      <CollaborationPanelContainer
        isOpen={isOpen}
        initial={{ x: 400 }}
        animate={{ x: isOpen ? 0 : 400 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <PanelHeader>
          <PanelTitle>Colaboración</PanelTitle>
          <CloseButton
            onClick={() => setIsOpen(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX />
          </CloseButton>
        </PanelHeader>

        <PanelTabs>
          <Tab
            active={activeTab === "activity"}
            onClick={() => setActiveTab("activity")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Actividad
          </Tab>
          <Tab
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Usuarios
          </Tab>
        </PanelTabs>

        <PanelContent>
          {activeTab === "activity" && <CollaborationFeed />}
          {activeTab === "users" && <ConnectedUsers />}
        </PanelContent>
      </CollaborationPanelContainer>
    </>
  );
}
