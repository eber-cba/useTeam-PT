import styled from 'styled-components';
import { motion } from 'framer-motion';

// Filtrar props de framer-motion
const filterMotionProps = (prop) => !['initial', 'animate', 'transition', 'whileHover', 'whileTap', 'exit', 'variants', 'variant', '$isConnected'].includes(prop);

export const BoardContainer = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
`;

export const ModernBoardHeader = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  gap: 20px;
  padding: 20px 30px;
  margin-bottom: 30px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 15px;
    text-align: center;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

export const HeaderCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
`;

export const KanbanIcon = styled.div`
  font-size: 2.5rem;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
`;

export const HeaderTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #f0f8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const UserBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 25px;
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4299e1 0%, #9f7aea 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
`;

export const UserName = styled.span`
  color: rgba(255,255,255,0.9);
  font-weight: 500;
  font-size: 0.9rem;
  
  @media (max-width: 480px) {
    display: none;
  }
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ModernActionButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !['variant', 'initial', 'animate', 'transition', 'whileHover', 'whileTap', 'exit', 'variants'].includes(prop),
})`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  
  background: ${props => {
    switch (props.variant) {
      case 'primary': return 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)';
      case 'success': return 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
      case 'warning': return 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)';
      default: return 'linear-gradient(135deg, #718096 0%, #4a5568 100%)';
    }
  }};
  
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 0.8rem;
  }
`;

export const ButtonIcon = styled.span`
  font-size: 1.1rem;
  display: flex;
  align-items: center;
`;

export const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${(props) =>
    props.$isConnected
      ? "rgba(72, 187, 120, 0.2)"
      : "rgba(245, 101, 101, 0.2)"};
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid ${(props) =>
    props.$isConnected
      ? "rgba(72, 187, 120, 0.3)"
      : "rgba(245, 101, 101, 0.3)"};
`;

export const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => (props.$isConnected ? "#48bb78" : "#f56565")};
  box-shadow: 0 0 8px ${(props) => (props.$isConnected ? "#48bb78" : "#f56565")};
  animation: ${(props) => (props.$isConnected ? "pulse 2s infinite" : "none")};

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
`;

export const StatusText = styled.span`
  color: rgba(255,255,255,0.9);
  font-size: 0.8rem;
  font-weight: 500;
  
  @media (max-width: 480px) {
    display: none;
  }
`;

// Resto de componentes existentes...
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

export const DragOverlayCard = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-left: 4px solid #4299e1;
  transform: rotate(5deg);
  opacity: 0.9;
`;

export const EmptyState = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.7);
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: rgba(255, 255, 255, 0.9);
  }
  
  p {
    font-size: 1rem;
    margin: 0;
  }
`;