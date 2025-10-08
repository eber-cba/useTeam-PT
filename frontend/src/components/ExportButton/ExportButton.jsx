import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import ExportConfig from "./ExportConfig";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const FloatingExportButton = styled(motion.button)`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1200;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 18px 32px;
  font-size: 1.1rem;
  font-weight: 700;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.18);
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s;
  outline: none;

  &:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 16px 40px rgba(102, 126, 234, 0.22);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 600px) {
    right: 16px;
    bottom: 16px;
    padding: 14px 18px;
    font-size: 0.95rem;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 24px;
  box-shadow: 0 16px 48px rgba(102, 126, 234, 0.18);
  max-width: 480px;
  width: 100%;
  padding: 0;
  position: relative;
  overflow: hidden;
  @media (max-width: 600px) {
    max-width: 98vw;
    padding: 0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: transparent;
  border: none;
  color: #667eea;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  transition: color 0.2s;
  &:hover {
    color: #ef4444;
  }
`;

export default function ExportButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FloatingExportButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(true)}
        aria-label="Exportar CSV por email"
      >
        <FiDownload style={{ fontSize: "1.3rem" }} />
        Exportar CSV
      </FloatingExportButton>
      <AnimatePresence>
        {open && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <ModalContent
              initial={{ scale: 0.92, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 40 }}
              transition={{ duration: 0.25, type: "spring", stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setOpen(false)} title="Cerrar">
                ×
              </CloseButton>
              <ExportConfig />
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}
