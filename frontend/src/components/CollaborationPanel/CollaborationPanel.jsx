import React, { useState } from "react";
import CollaborationFeed from "../CollaborationFeed/CollaborationFeed";
import ConnectedUsers from "../ConnectedUsers/ConnectedUsers";

export default function CollaborationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("activity");

  return (
    <>
      <button
        className="collaboration-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Panel de colaboración"
      >
        👥
      </button>

      <div className={`collaboration-panel ${isOpen ? "open" : ""}`}>
        <div className="panel-header">
          <h3>Colaboración</h3>
          <button className="close-panel" onClick={() => setIsOpen(false)}>
            ×
          </button>
        </div>

        <div className="panel-tabs">
          <button
            className={`tab ${activeTab === "activity" ? "active" : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            Actividad
          </button>
          <button
            className={`tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Usuarios
          </button>
        </div>

        <div className="panel-content">
          {activeTab === "activity" && <CollaborationFeed />}
          {activeTab === "users" && <ConnectedUsers />}
        </div>
      </div>
    </>
  );
}
