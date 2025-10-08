// StyledBoard.js
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
  overflow: hidden;
`;

export const BoardBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at 20% 80%,
      rgba(120, 119, 198, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 119, 198, 0.08) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 40% 40%,
      rgba(120, 219, 255, 0.05) 0%,
      transparent 50%
    );
  pointer-events: none;
  z-index: 0;
`;

export const FloatingParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 20%;
    left: 10%;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: 60%;
    right: 15%;
    width: 6px;
    height: 6px;
    background: rgba(102, 126, 234, 0.5);
    border-radius: 50%;
    animation: float 8s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0) translateX(0);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-20px) translateX(10px);
      opacity: 0.8;
    }
  }
`;

export const ModernBoardHeader = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 32px;
  padding: 24px 32px;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(25px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  z-index: 2;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
    text-align: center;
    padding: 20px 24px;
  }
`;

export const HeaderGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.1) 0%,
    rgba(118, 75, 162, 0.05) 50%,
    rgba(240, 147, 251, 0.08) 100%
  );
  opacity: 0;
  transition: opacity 0.6s ease;

  ${ModernBoardHeader}:hover & {
    opacity: 1;
  }
`;

export const AnimatedOrb = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(
    circle,
    rgba(102, 126, 234, 0.2) 0%,
    transparent 70%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.8s ease;

  ${ModernBoardHeader}:hover & {
    width: 200px;
    height: 200px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  z-index: 3;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

export const HeaderCenter = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 3;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  z-index: 3;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const KanbanIcon = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  .icon-inner {
    font-size: 2.5rem;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    animation: float 3s ease-in-out infinite;
    position: relative;
    z-index: 2;
  }

  .icon-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(
      circle,
      rgba(102, 126, 234, 0.4) 0%,
      transparent 70%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s ease;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-8px) rotate(5deg);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      width: 0;
      height: 0;
      opacity: 0;
    }
    50% {
      width: 80px;
      height: 80px;
      opacity: 0.6;
    }
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  position: relative;

  span {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: width 0.6s ease;
    border-radius: 2px;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
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

export const ModernActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  border: none;
  border-radius: 16px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(15px);
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
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);

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
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 0.85rem;
  }
`;

export const ButtonIcon = styled.span`
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;

  ${ModernActionButton}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`;

export const BoardStats = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  min-width: 80px;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

export const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const StatLabel = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  z-index: 1;

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
  backdrop-filter: blur(25px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3), 0 12px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transform: rotate(8deg) scale(1.05);
  cursor: grabbing;
  max-width: 280px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
    border-radius: 20px 20px 0 0;
  }

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    animation: bounce 2s ease-in-out infinite;
  }

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
    max-width: 400px;
    line-height: 1.6;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-10px) scale(1.05);
    }
  }
`;

// Componentes para el modal
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

export const ModalOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
`;

export const ModalContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(25px);
  padding: 2.5rem;
  border-radius: 24px;
  min-width: 400px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3), 0 12px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 1001;

  @media (max-width: 480px) {
    min-width: 320px;
    margin: 0 20px;
    padding: 2rem;
  }
`;

export const ModalHeader = styled.h3`
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: white;
    transform: translateY(-1px);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const ModalButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  background: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      case "secondary":
        return "rgba(0, 0, 0, 0.08)";
      default:
        return "rgba(0, 0, 0, 0.08)";
    }
  }};

  color: ${(props) => (props.variant === "primary" ? "white" : "#374151")};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
