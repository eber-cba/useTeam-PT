import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiMail, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing.lg};
`;

const ModalContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  max-width: 500px;
  width: 100%;
  box-shadow: ${props => props.theme.shadows.xl};
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.lg};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.2rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(245, 101, 101, 0.1);
    color: ${props => props.theme.colors.error};
    transform: scale(1.1);
  }
`;

const ModalHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const IconContainer = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  color: white;
  font-size: 2rem;
  box-shadow: ${props => props.theme.shadows.lg};
`;

const ModalTitle = styled(motion.h2)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
`;

const ModalDescription = styled(motion.p)`
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  line-height: 1.6;
`;

const ExportDetails = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin: ${props => props.theme.spacing.lg} 0;
  border: 1px solid ${props => props.theme.colors.border};
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const DetailValue = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const ModalActions = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  margin-top: ${props => props.theme.spacing.xl};
`;

const ActionButton = styled(motion.button)`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.3s ease;
  min-width: 140px;
  justify-content: center;
  
  ${props => props.variant === 'primary' && `
    background: linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary});
    color: white;
    box-shadow: ${props.theme.shadows.md};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows.lg};
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background: transparent;
    color: ${props.theme.colors.textSecondary};
    border: 2px solid ${props.theme.colors.border};
    
    &:hover {
      background: ${props.theme.colors.background};
      color: ${props.theme.colors.text};
      border-color: ${props.theme.colors.textSecondary};
    }
  `}
  
  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  exportConfig,
  isLoading = false 
}) => {
  const getSelectedFieldsText = () => {
    if (!exportConfig?.selectedFields || exportConfig.selectedFields.length === 0) {
      return 'Ningún campo seleccionado';
    }
    
    const fieldLabels = {
      titulo: 'Título',
      descripcion: 'Descripción',
      columna: 'Columna',
      prioridad: 'Prioridad',
      fechaCreacion: 'Fecha de creación'
    };
    
    return exportConfig.selectedFields
      .map(field => fieldLabels[field] || field)
      .join(', ');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiX />
            </CloseButton>

            <ModalHeader>
              <IconContainer
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
              >
                <FiDownload />
              </IconContainer>
              
              <ModalTitle
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                Confirmar Exportación
              </ModalTitle>
              
              <ModalDescription
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                ¿Estás seguro de que deseas exportar el tablero con la siguiente configuración?
              </ModalDescription>
            </ModalHeader>

            <ExportDetails
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <DetailRow>
                <DetailLabel>
                  <FiMail />
                  Email destino:
                </DetailLabel>
                <DetailValue>{exportConfig?.email || 'No especificado'}</DetailValue>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>
                  <FiAlertCircle />
                  Columna:
                </DetailLabel>
                <DetailValue>
                  {exportConfig?.selectedColumn || 'Todas las columnas'}
                </DetailValue>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>
                  <FiCheck />
                  Campos:
                </DetailLabel>
                <DetailValue>{getSelectedFieldsText()}</DetailValue>
              </DetailRow>
              
              {exportConfig?.mensaje && (
                <DetailRow>
                  <DetailLabel>Mensaje:</DetailLabel>
                  <DetailValue>"{exportConfig.mensaje}"</DetailValue>
                </DetailRow>
              )}
            </ExportDetails>

            <ModalActions
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <ActionButton
                variant="secondary"
                onClick={onClose}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiX />
                Cancelar
              </ActionButton>
              
              <ActionButton
                variant="primary"
                onClick={onConfirm}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload />
                {isLoading ? 'Exportando...' : 'Confirmar Exportación'}
              </ActionButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;