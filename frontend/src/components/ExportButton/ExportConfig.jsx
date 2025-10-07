import React, { useState } from "react";
import { useKanban } from "../../context/KanbanContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const CAMPOS = [
  { key: "titulo", label: "Título" },
  { key: "descripcion", label: "Descripción" },
  { key: "columna", label: "Columna" },
  { key: "prioridad", label: "Prioridad" },
  { key: "fechaCreacion", label: "Fecha de creación" },
];

export default function ExportConfig() {
  const { columns, tasks } = useKanban();
  const { user, getAuthHeaders, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [email, setEmail] = useState(user?.email || "");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [selectedFields, setSelectedFields] = useState(CAMPOS.map(c => c.key));
  const [mensaje, setMensaje] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const handleFieldChange = (field) => {
    setSelectedFields(prev =>
      prev.includes(field)
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  const handleExport = async () => {
    if (!email || !email.includes("@")) {
      addToast({ title: "Email inválido", description: "Ingresa un email válido.", type: "error" });
      return;
    }
    if (selectedFields.length === 0) {
      addToast({ title: "Campos requeridos", description: "Selecciona al menos un campo.", type: "error" });
      return;
    }
    setIsExporting(true);
    try {
      const response = await fetch("http://localhost:3000/api/export/backlog", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          to: email,
          userName: user?.name || "",
          column: selectedColumn,
          fields: selectedFields,
          mensaje,
        }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Error en la exportación");
      }
      addToast({
        title: "Exportación iniciada",
        description: "n8n procesará el CSV y lo enviará al email indicado.",
        type: "success",
      });
    } catch (err) {
      addToast({ title: "Error", description: err.message, type: "error" });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div style={{ padding: 20, border: "1px solid #eee", borderRadius: 8, background: "#fafafa", maxWidth: 400 }}>
      <h3>Configuración de Exportación</h3>
      <div style={{ marginBottom: 12 }}>
        <label>Email destino:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="ejemplo@correo.com"
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
        <small>Puedes usar tu email o escribir otro.</small>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Selecciona columna (opcional):</label>
        <select
          value={selectedColumn}
          onChange={e => setSelectedColumn(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        >
          <option value="">Todas</option>
          {columns.map(col => (
            <option key={col._id || col.name} value={col.name}>{col.name}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Campos a exportar:</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {CAMPOS.map(campo => (
            <label key={campo.key}>
              <input
                type="checkbox"
                checked={selectedFields.includes(campo.key)}
                onChange={() => handleFieldChange(campo.key)}
              /> {campo.label}
            </label>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Mensaje adicional (opcional):</label>
        <textarea
          value={mensaje}
          onChange={e => setMensaje(e.target.value)}
          rows={3}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
          placeholder="Mensaje para el destinatario"
        />
      </div>
      <button
        onClick={handleExport}
        disabled={isExporting || !isAuthenticated()}
        style={{ padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer" }}
      >
        {isExporting ? "Procesando..." : "Exportar CSV por Email"}
      </button>
    </div>
  );
}