import styled from 'styled-components';
import { motion } from 'framer-motion';

export const FormOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2147483647;
  pointer-events: auto !important;
  padding: ${props => props.theme.spacing.lg};
`;

export const FormContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.xl};
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const FormHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, rgba(66, 153, 225, 0.05) 0%, rgba(159, 122, 234, 0.05) 100%);
`;

export const FormTitle = styled(motion.h3)`
  margin: 0;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(135deg, #4299e1 0%, #9f7aea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const CloseButton = styled(motion.button)`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.textSecondary};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: ${props => props.theme.colors.text};
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const FormContent = styled(motion.form)`
  padding: ${props => props.theme.spacing.xl};
  overflow-y: auto;
  flex: 1;
`;

export const FormGroup = styled(motion.div)`
  margin-bottom: ${props => props.theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const FormLabel = styled(motion.label)`
  display: block;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-size: 0.95rem;
  
  &::after {
    content: ${props => props.required ? '"*"' : '""'};
    color: ${props => props.theme.colors.error};
    margin-left: 4px;
  }
`;

export const FormInput = styled(motion.input).withConfig({
  shouldForwardProp: (prop) => !['hasError'].includes(prop),
})`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.hasError ? '#e53e3e' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e53e3e' : props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(229, 62, 62, 0.1)' : 'rgba(66, 153, 225, 0.1)'};
  }
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

export const FormTextarea = styled(motion.textarea).withConfig({
  shouldForwardProp: (prop) => !['hasError'].includes(prop),
})`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.hasError ? '#e53e3e' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e53e3e' : props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(229, 62, 62, 0.1)' : 'rgba(66, 153, 225, 0.1)'};
  }
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

export const FormSelect = styled(motion.select)`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.hasError ? props.theme.colors.error : 'rgba(0, 0, 0, 0.1)'};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? props.theme.colors.error : props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(245, 101, 101, 0.1)' : 'rgba(66, 153, 225, 0.1)'};
    background: rgba(255, 255, 255, 0.95);
    transform: translateY(-1px);
  }
`;

export const FormRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

export const FormActions = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.xl};
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(10px);
`;

export const FormButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  background: ${props => {
    switch (props.variant) {
      case 'primary': return 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)';
      case 'secondary': return 'transparent';
      default: return 'rgba(113, 128, 150, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'primary': return 'white';
      case 'secondary': return props.theme.colors.text;
      default: return props.theme.colors.text;
    }
  }};
  border: ${props => {
    switch (props.variant) {
      case 'primary': return 'none';
      case 'secondary': return `2px solid ${props.theme.colors.border}`;
      default: return `1px solid ${props.theme.colors.border}`;
    }
  }};
  padding: 12px 24px;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
    background: ${props => {
      switch (props.variant) {
        case 'primary': return 'linear-gradient(135deg, #3182ce 0%, #2c5aa0 100%)';
        case 'secondary': return 'rgba(113, 128, 150, 0.05)';
        default: return 'rgba(113, 128, 150, 0.2)';
      }
    }};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ErrorMessage = styled(motion.div)`
  color: ${props => props.theme.colors.error};
  font-size: 0.85rem;
  margin-top: ${props => props.theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

export const ValidationIcon = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  font-size: 0.7rem;
  
  ${props => props.isValid ? `
    background: ${props.theme.colors.success};
    color: white;
  ` : `
    background: ${props.theme.colors.error};
    color: white;
  `}
`;