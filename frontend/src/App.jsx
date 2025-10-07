import React from "react";
import { KanbanProvider } from "./context/KanbanContext";
import Board from "./components/Board/Board";
import ExportButton from "./components/ExportButton/ExportButton";

export default function App() {
  const appStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#e9ecef",
    minHeight: "100vh",
  };

  return (
    <KanbanProvider>
      <div style={appStyle}>
        <ExportButton />
        <Board />
      </div>
    </KanbanProvider>
  );
}
