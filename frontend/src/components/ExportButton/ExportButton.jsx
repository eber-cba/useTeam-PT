import React from "react";
import { useKanban } from "../../context/KanbanContext";

export default function ExportButton() {
  const { tasks } = useKanban();

  const handleExport = async () => {
    try {
      await fetch("http://localhost:3000/api/export/backlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks }),
      });
      alert("Exportación solicitada. Revisa tu email.");
    } catch (err) {
      console.error(err);
      alert("Error al exportar el backlog");
    }
  };

  const btnStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "20px",
  };

  return (
    <button onClick={handleExport} style={btnStyle}>
      Exportar Backlog
    </button>
  );
}
