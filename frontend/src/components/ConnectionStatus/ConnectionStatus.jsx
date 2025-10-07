import React from "react";
import { useKanban } from "../../context/KanbanContext";

export default function ConnectionStatus() {
  const { isConnected } = useKanban();

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        padding: "8px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "500",
        backgroundColor: isConnected ? "#28a745" : "#dc3545",
        color: "white",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "white",
          animation: isConnected ? "pulse 2s infinite" : "none",
        }}
      />
      {isConnected ? "Conectado" : "Desconectado"}
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
