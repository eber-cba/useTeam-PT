import React, { useState } from "react";
import { useKanban } from "../../context/KanbanContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export default function ExportButton() {
  const { tasks } = useKanban();
  const { getAuthHeaders, user, isAuthenticated } = useAuth();
  const [isExporting, setIsExporting] = useState(false);
  const { addToast } = useToast();

  const handleExport = async () => {
    if (!user || !user.email) {
      addToast({
        title: "Autenticación requerida",
        description: "Debes iniciar sesión para exportar por email.",
        type: "warning",
      });
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
        addToast({
          title: "Exportación iniciada",
          description: "🚀 n8n procesará el CSV y te lo enviará por email.",
          type: "success",
        });
      } else {
        addToast({
          title: "Error exportando",
          description: result.error || JSON.stringify(result),
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
      addToast({
        title: "Error",
        description: "Error al exportar el backlog: " + err.message,
        type: "error",
      });
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
