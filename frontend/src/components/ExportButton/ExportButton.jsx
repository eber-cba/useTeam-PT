import React, { useState } from "react";
import { useKanban } from "../../context/KanbanContext";
import { useAuth } from "../../context/AuthContext";

export default function ExportButton() {
  const { tasks } = useKanban();
  const { getAuthHeaders, user, isAuthenticated } = useAuth();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!user || !user.email) {
      alert("Debes iniciar sesión para exportar por email.");
      return;
    }

    setIsExporting(true);
    try {
      const response = await fetch("http://localhost:3000/api/export/backlog", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ to: user.email, userName: user.name }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Error en la exportación");
      }

      const result = await response.json();

      if (result.success) {
        alert(
          "🚀 Exportación procesada por n8n. Revisa tu email para descargar el CSV adjunto."
        );
      } else {
        alert("Error al exportar: " + (result.error || JSON.stringify(result)));
      }
    } catch (err) {
      console.error(err);
      alert("Error al exportar el backlog: " + err.message);
    } finally {
      setIsExporting(false);
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
    <button
      onClick={handleExport}
      style={btnStyle}
      disabled={isExporting || !isAuthenticated()}
      title={
        !isAuthenticated() ? "Inicia sesión para poder exportar" : undefined
      }
    >
      {isExporting ? "🚀 Procesando con n8n..." : "📧 Exportar CSV por Email"}
    </button>
  );
}
