import React, { useState } from "react";
import { FiDownload, FiMail } from "react-icons/fi";
import { useKanban } from "../../context/KanbanContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import ConfirmationModal from "./ConfirmationModal";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

import {
  ExportConfigContainer,
  ExportHeader,
  ExportTitle,
  ExportIcon,
  FormSection,
  SectionTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  CheckboxGroup,
  CheckboxItem,
  FormTextarea,
  ExportButton,
  HelpText
} from "./StyledExportConfig";

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleFieldChange = (field) => {
    setSelectedFields(prev =>
      prev.includes(field)
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  const handleExportClick = () => {
    if (!email || !email.includes("@")) {
      addToast({ title: "Email inválido", description: "Ingresa un email válido.", type: "error" });
      return;
    }
    if (selectedFields.length === 0) {
      addToast({ title: "Campos requeridos", description: "Selecciona al menos un campo.", type: "error" });
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmExport = async () => {
    setShowConfirmModal(false);
    setIsExporting(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/export/backlog`,
        {
          to: email,
          userName: user?.name || "",
          column: selectedColumn,
          fields: selectedFields,
          mensaje,
        },
        { headers: getAuthHeaders() }
      );
      if (response.status !== 200) {
        throw new Error(response.data?.message || "Error en la exportación");
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
    <ExportConfigContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ExportHeader>
        <ExportIcon>
          <FiDownload />
        </ExportIcon>
        <ExportTitle>Configuración de Exportación</ExportTitle>
      </ExportHeader>

      <FormSection>
        <SectionTitle>
          <FiMail style={{ marginRight: '8px' }} />
          Destino del Email
        </SectionTitle>
        <FormGroup>
          <FormLabel>Email destino:</FormLabel>
          <FormInput
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
          />
          <HelpText>Puedes usar tu email o escribir otro.</HelpText>
        </FormGroup>
      </FormSection>

      <FormSection>
        <SectionTitle>Filtros de Exportación</SectionTitle>
        <FormGroup>
          <FormLabel>Selecciona columna (opcional):</FormLabel>
          <FormSelect
            value={selectedColumn}
            onChange={e => setSelectedColumn(e.target.value)}
          >
            <option value="">Todas las columnas</option>
            {columns.map(col => (
              <option key={col._id || col.name} value={col.name}>{col.name}</option>
            ))}
          </FormSelect>
        </FormGroup>
      </FormSection>

      <FormSection>
        <SectionTitle>Campos a Exportar</SectionTitle>
        <CheckboxGroup>
          {CAMPOS.map(campo => (
            <CheckboxItem key={campo.key}>
              <input
                type="checkbox"
                checked={selectedFields.includes(campo.key)}
                onChange={() => handleFieldChange(campo.key)}
              />
              <span>{campo.label}</span>
            </CheckboxItem>
          ))}
        </CheckboxGroup>
      </FormSection>

      <FormSection>
        <SectionTitle>Mensaje Adicional</SectionTitle>
        <FormGroup>
          <FormLabel>Mensaje adicional (opcional):</FormLabel>
          <FormTextarea
            value={mensaje}
            onChange={e => setMensaje(e.target.value)}
            rows={3}
            placeholder="Mensaje para el destinatario"
          />
        </FormGroup>
      </FormSection>

      <ExportButton
        onClick={handleExportClick}
        disabled={isExporting || !isAuthenticated()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FiDownload />
        {isExporting ? "Procesando..." : "Exportar CSV por Email"}
      </ExportButton>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmExport}
        isLoading={isExporting}
        exportConfig={{
          email,
          column: selectedColumn || "Todas las columnas",
          fields: selectedFields.map(field => CAMPOS.find(c => c.key === field)?.label || field),
          message: mensaje
        }}
      />
    </ExportConfigContainer>
  );
}