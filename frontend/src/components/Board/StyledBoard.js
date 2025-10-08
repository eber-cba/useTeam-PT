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

export const BoardContainer = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 24px;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  /* Efecto de partículas flotantes */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 20%,
        rgba(102, 126, 234, 0.03) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 80%,
        rgba(240, 147, 251, 0.03) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 60%,
        rgba(79, 172, 254, 0.02) 0%,
        transparent 50%
      );
    z-index: -1;
    animation: floatingParticles 20s ease-in-out infinite;
  }

  @keyframes floatingParticles {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
      opacity: 0.5;
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
      opacity: 0.8;
    }
  }
`;

export const ModernBoardHeader = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  gap: 24px;
  padding: 24px 32px;
  margin-bottom: 32px;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(248, 250, 252, 0.1) 100%
  );
  backdrop-filter: blur(25px) saturate(180%);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;

  /* Efecto de brillo superior */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.6) 50%,
      transparent 100%
    );
    animation: headerShimmer 3s ease-in-out infinite;
  }

  @keyframes headerShimmer {
    0% {
      left: -100%;
    }
    50% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }

  /* Efecto de ondas de fondo */
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(
      circle,
      rgba(102, 126, 234, 0.1) 0%,
      transparent 70%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s ease;
  }

  &:hover::after {
    width: 300px;
    height: 300px;
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

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const KanbanIcon = styled.div`
  font-size: 2.8rem;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
  animation: iconFloat 4s ease-in-out infinite;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(102, 126, 234, 0.2) 0%,
      transparent 70%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: iconGlow 2s ease-in-out infinite;
  }

  @keyframes iconFloat {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-8px) rotate(5deg);
    }
  }

  @keyframes iconGlow {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 1;
    }
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 800;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #f0f8ff 25%,
    #e6f3ff 50%,
    #f0f8ff 75%,
    #ffffff 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: titleShimmer 3s ease-in-out infinite;
  position: relative;

  @keyframes titleShimmer {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    transition: width 0.6s ease;
    border-radius: 2px;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const UserBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0.12) 100%
  );
  backdrop-filter: blur(15px);
  padding: 10px 18px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);

    &::before {
      left: 100%;
    }
  }
`;

export const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.3) 0%,
      transparent 70%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
  }

  &:hover::before {
    width: 100px;
    height: 100px;
  }
`;

export const UserName = styled.span`
  color: rgba(255, 255, 255, 0.95);
  font-weight: 600;
  font-size: 0.95rem;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ModernActionButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) =>
    ![
      "variant",
      "initial",
      "animate",
      "transition",
      "whileHover",
      "whileTap",
      "exit",
      "variants",
    ].includes(prop),
})`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border: none;
  border-radius: 16px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  min-height: 48px;

  background: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      case "success":
        return "linear-gradient(135deg, #10b981 0%, #059669 100%)";
      case "warning":
        return "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
      default:
        return "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)";
    }
  }};

  color: white;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 0.85rem;
    min-height: 44px;
  }
`;

export const ButtonIcon = styled.span`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;

  ${ModernActionButton}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`;

export const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  background: ${(props) =>
    props.$isConnected
      ? "linear-gradient(145deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.2) 100%)"
      : "linear-gradient(145deg, rgba(239, 68, 68, 0.25) 0%, rgba(220, 38, 38, 0.2) 100%)"};
  backdrop-filter: blur(15px);
  border-radius: 24px;
  border: 1px solid
    ${(props) =>
      props.$isConnected
        ? "rgba(16, 185, 129, 0.4)"
        : "rgba(239, 68, 68, 0.4)"};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;
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
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    transition: left 0.6s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

export const StatusDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => (props.$isConnected ? "#10b981" : "#ef4444")};
  box-shadow: 0 0 12px
      ${(props) => (props.$isConnected ? "#10b981" : "#ef4444")},
    0 0 24px
      ${(props) =>
        props.$isConnected
          ? "rgba(16, 185, 129, 0.3)"
          : "rgba(239, 68, 68, 0.3)"};
  animation: ${(props) =>
    props.$isConnected
      ? "pulse 2s infinite, glow 3s ease-in-out infinite"
      : "none"};
  position: relative;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.1);
    }
  }

  @keyframes glow {
    0%,
    100% {
      box-shadow: 0 0 12px
          ${(props) => (props.$isConnected ? "#10b981" : "#ef4444")},
        0 0 24px
          ${(props) =>
            props.$isConnected
              ? "rgba(16, 185, 129, 0.3)"
              : "rgba(239, 68, 68, 0.3)"};
    }
    50% {
      box-shadow: 0 0 16px
          ${(props) => (props.$isConnected ? "#10b981" : "#ef4444")},
        0 0 32px
          ${(props) =>
            props.$isConnected
              ? "rgba(16, 185, 129, 0.5)"
              : "rgba(239, 68, 68, 0.5)"};
    }
  }
`;

export const StatusText = styled.span`
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.85rem;
  font-weight: 600;

  @media (max-width: 480px) {
    display: none;
  }
`;

// Resto de componentes existentes...
export const ColumnsContainer = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 24px 0;
  min-height: 600px;
  position: relative;

  /* Efecto de desenfoque en los bordes */
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.8) 0%,
      transparent 100%
    );
  }

  &::after {
    right: 0;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.8) 0%,
      transparent 100%
    );
  }

  &::-webkit-scrollbar {
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(248, 250, 252, 0.05) 100%
    );
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    border-radius: 8px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    transition: all 0.4s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%);
    transform: scaleY(1.2);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

export const DragOverlayCard = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(255, 255, 255, 0.95) 100%
  );
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.3), 0 16px 32px rgba(0, 0, 0, 0.2),
    0 8px 16px rgba(0, 0, 0, 0.1);
  border-left: 8px solid #667eea;
  transform: rotate(12deg) scale(1.08);
  opacity: 0.98;
  backdrop-filter: blur(25px);
  border: 2px solid rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
  cursor: grabbing;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.15) 0%,
      rgba(240, 147, 251, 0.1) 100%
    );
    opacity: 1;
    animation: dragGlow 1s ease-in-out infinite alternate;
  }

  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(102, 126, 234, 0.1) 0%,
      transparent 70%
    );
    animation: dragShimmer 2s ease-in-out infinite;
  }

  @keyframes dragGlow {
    0% {
      opacity: 0.8;
      background: linear-gradient(
        135deg,
        rgba(102, 126, 234, 0.15) 0%,
        rgba(240, 147, 251, 0.1) 100%
      );
    }
    100% {
      opacity: 1;
      background: linear-gradient(
        135deg,
        rgba(102, 126, 234, 0.25) 0%,
        rgba(240, 147, 251, 0.15) 100%
      );
    }
  }

  @keyframes dragShimmer {
    0%,
    100% {
      transform: rotate(0deg) scale(1);
      opacity: 0.5;
    }
    50% {
      transform: rotate(180deg) scale(1.1);
      opacity: 0.8;
    }
  }

  h4 {
    margin: 0 0 8px 0;
    font-size: 1.2rem;
    font-weight: 700;
    color: #1f2937;
    position: relative;
    z-index: 2;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #6b7280;
    position: relative;
    z-index: 2;
  }
`;

export const EmptyState = styled(motion.div).withConfig({
  shouldForwardProp: filterMotionProps,
})`
  text-align: center;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.8);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    background: radial-gradient(
      circle,
      rgba(102, 126, 234, 0.1) 0%,
      transparent 70%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: emptyStateFloat 6s ease-in-out infinite;
  }

  @keyframes emptyStateFloat {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.5;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.8;
    }
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 12px;
    color: rgba(255, 255, 255, 0.95);
    background: linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
    position: relative;
    z-index: 1;
  }

  p {
    font-size: 1.1rem;
    margin: 0;
    font-weight: 500;
    position: relative;
    z-index: 1;
  }
`;
