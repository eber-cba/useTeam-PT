import styled from 'styled-components';
import { motion } from 'framer-motion';

// Filtrar todas las props de framer-motion para evitar warnings
const filterMotionProps = (prop) => !['initial', 'animate', 'transition', 'whileHover', 'whileTap', 'exit', 'variants', 'drag', 'dragConstraints', 'onDragEnd', 'variant', 'size', '$isConnected'].includes(prop);

export const AppContainer = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

export const AppHeader = styled(motion.header).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  text-align: center;
  margin-bottom: 2rem;
`;

export const AppTitle = styled(motion.h1).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 1rem 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const AppSubtitle = styled(motion.p).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  margin: 0;
`;

export const Button = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !['variant', 'size', ...['initial', 'animate', 'transition', 'whileHover', 'whileTap', 'exit', 'variants', 'drag', 'dragConstraints', 'onDragEnd']].includes(prop),
})`
  background: ${props => {
    switch (props.variant) {
      case 'primary': return 'rgba(255,255,255,0.9)';
      case 'secondary': return 'transparent';
      default: return 'rgba(255,255,255,0.9)';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'primary': return '#667eea';
      case 'secondary': return 'white';
      default: return '#667eea';
    }
  }};
  border: ${props => {
    switch (props.variant) {
      case 'primary': return 'none';
      case 'secondary': return '2px solid rgba(255,255,255,0.3)';
      default: return 'none';
    }
  }};
  padding: ${props => {
    switch (props.size) {
      case 'large': return '15px 40px';
      case 'small': return '8px 16px';
      default: return '12px 24px';
    }
  }};
  font-size: ${props => {
    switch (props.size) {
      case 'large': return '1.1rem';
      case 'small': return '0.9rem';
      default: return '1rem';
    }
  }};
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.15);
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

// Resto de componentes con filtros similares...
export const KanbanContainer = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
`;

export const BoardHeader = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const BoardTitle = styled(motion.h2).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;

export const StyledInput = styled(motion.input).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  padding: 12px 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const ColumnsContainer = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 20px 0;
  min-height: 600px;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

export const ModalOverlay = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
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
  z-index: 1000;
`;

export const ModalContent = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  background: white;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

export const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

export const ModalText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
  line-height: 1.6;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;