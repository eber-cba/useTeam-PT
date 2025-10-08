import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./theme/GlobalTheme";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { KanbanProvider } from "./context/KanbanContext";
import { ToastProvider } from "./context/ToastContext";
import Board from "./components/Board/Board";
import LandingPage from "./components/LandingPage/LandingPage";
import AppLayout from "./components/Layout/AppLayout";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

function AppContent() {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <KanbanProvider>
      <AppLayout>
        <Board />
      </AppLayout>
    </KanbanProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
