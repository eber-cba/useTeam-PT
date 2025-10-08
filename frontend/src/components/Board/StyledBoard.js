import styled from "styled-components";
import { motion } from "framer-motion";

// Filtrar props de framer-motion
const filterMotionProps = (prop) =>
  ![
    "initial",
    "animate",
    "transition",
    "whileHover",
    "whileTap",
    "exit",
    "variants",
    "variant",
    "$isConnected",
  ].includes(prop);

export const BoardContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  padding: 24px 0 0 0;
  background: transparent;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
`;

export const ModernBoardHeader = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 32px;
  padding: 20px 32px;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
    text-align: center;
    padding: 20px 24px;
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
  gap: 16px;

  @media (max-width: 1024px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const KanbanIcon = styled.div`
  font-size: 2.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-4px);
    }
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const UserBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
`;

export const UserName = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const ModernActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  isolation: isolate;

  background: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      case "success":
        return "linear-gradient(135deg, #10b981 0%, #059669 100%)";
      case "warning":
        return "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
      case "secondary":
        return "rgba(255, 255, 255, 0.1)";
      default:
        return "rgba(255, 255, 255, 0.1)";
    }
  }};

  color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.6s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

    &::before {
      left: 100%;
    }
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
    font-size: 0.85rem;
  }
`;

export const ButtonIcon = styled.span`
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;

  ${ModernActionButton}:hover & {
    transform: scale(1.1);
  }
`;

export const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${(props) =>
    props.$isConnected
      ? "rgba(16, 185, 129, 0.15)"
      : "rgba(239, 68, 68, 0.15)"};
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid
    ${(props) =>
      props.$isConnected
        ? "rgba(16, 185, 129, 0.3)"
        : "rgba(239, 68, 68, 0.3)"};
  transition: all 0.3s ease;
`;

export const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => (props.$isConnected ? "#10b981" : "#ef4444")};
  box-shadow: 0 0 12px
    ${(props) => (props.$isConnected ? "#10b981" : "#ef4444")};
  animation: ${(props) => (props.$isConnected ? "pulse 2s infinite" : "none")};

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export const StatusText = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 500;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const ColumnsContainer = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 24px 0;
  min-height: 600px;
  position: relative;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  }

  .ghost-placeholder {
    min-width: 320px;
    min-height: 400px;
    margin: 8px;
    border-radius: 16px;
    border: 2px dashed #667eea;
    background: rgba(102, 126, 234, 0.05);
    opacity: 0.6;
    pointer-events: none;
  }
`;

export const DragOverlayCard = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25), 0 8px 16px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform: rotate(8deg) scale(1.05);
  cursor: grabbing;
  max-width: 280px;

  h4 {
    margin: 0 0 8px 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #1f2937;
  }

  p {
    margin: 0 0 12px 0;
    font-size: 0.9rem;
    color: #6b7280;
    line-height: 1.4;
  }

  .priority-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;

    &.alta {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
    }
    &.media {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
    }
    &.baja {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }
  }
`;

export const EmptyState = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  text-align: center;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.8);
  width: 100%;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 12px;
    color: rgba(255, 255, 255, 0.95);
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    margin: 0;
    font-weight: 500;
    opacity: 0.8;
  }
`;

// Nuevos componentes para el modal
export const ColumnModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 20px;
  min-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1001;

  @media (max-width: 480px) {
    min-width: 320px;
    margin: 0 20px;
    padding: 1.5rem;
  }
`;

export const ModalHeader = styled.h3`
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: white;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  background: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      case "secondary":
        return "rgba(0, 0, 0, 0.1)";
      default:
        return "rgba(0, 0, 0, 0.1)";
    }
  }};

  color: ${(props) => (props.variant === "primary" ? "white" : "#374151")};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
