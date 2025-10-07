import React, { useState } from "react";
import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { KanbanProvider } from "./context/KanbanContext";
import Board from "./components/Board/Board";
import ExportButton from "./components/ExportButton/ExportButton";
import ConnectionStatus from "./components/ConnectionStatus/ConnectionStatus";
import AuthModal from "./components/Auth/AuthModal";
import UserInfo from "./components/UserInfo/UserInfo";
import CollaborationPanel from "./components/CollaborationPanel/CollaborationPanel";

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <div className="login-screen">
        <div className="login-container">
          <h1>Tablero Kanban Colaborativo</h1>
          <p>Inicia sesión para acceder al tablero</p>
          <button
            className="btn-primary"
            onClick={() => setShowAuthModal(true)}
          >
            Iniciar Sesión
          </button>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    );
  }

  return (
    <KanbanProvider>
      <div className="app">
        <ConnectionStatus />
        <UserInfo />
        <CollaborationPanel />
        <ExportButton />
        <Board />
      </div>
    </KanbanProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
