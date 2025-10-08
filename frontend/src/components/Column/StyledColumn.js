import styled from "styled-components";
import { motion } from "framer-motion";

export const ColumnContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["isOver"].includes(prop),
})`
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(255, 255, 255, 0.95) 50%,
    rgba(248, 250, 252, 0.98) 100%
  );
  backdrop-filter: blur(25px) saturate(180%);
  border-radius: 28px;
  padding: ${(props) => props.theme.spacing.lg};
  min-width: 340px;
  max-width: 400px;
  min-height: 480px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08), 0 12px 24px rgba(0, 0, 0, 0.04),
    0 6px 12px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid
    ${(props) =>
      props.isOver ? "rgba(99, 102, 241, 0.4)" : "rgba(255, 255, 255, 0.3)"};
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;

  /* Efecto de cristal esmerilado */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: ${(props) =>
      props.isOver
        ? "linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
        : "linear-gradient(90deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 50%, rgba(240, 147, 251, 0.3) 100%)"};
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 28px 28px 0 0;
  }

  /* Efecto de brillo animado */
  &::after {
    content: "";
    position: absolute;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(99, 102, 241, 0.05) 30%,
      transparent 70%
    );
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    pointer-events: none;
    animation: shimmer 3s ease-in-out infinite;
  }

  /* Animación de brillo */
  @keyframes shimmer {
    0%,
    100% {
      opacity: 0;
      transform: translateX(-100%) translateY(-100%) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: translateX(-50%) translateY(-50%) rotate(180deg);
    }
  }

  /* Efecto de partículas flotantes */
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1), 0 12px 24px rgba(0, 0, 0, 0.06),
      0 6px 12px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.5),
      inset 0 -1px 0 rgba(0, 0, 0, 0.06);
    border-color: rgba(99, 102, 241, 0.4);

    &::before {
      height: 10px;
      background: linear-gradient(
        90deg,
        #667eea 0%,
        #764ba2 25%,
        #f093fb 50%,
        #f5576c 75%,
        #4facfe 100%
      );
      animation: gradientShift 2s ease-in-out infinite;
    }

    &::after {
      opacity: 0.8;
      animation-duration: 2s;
    }
  }

  /* Animación del gradiente superior */
  @keyframes gradientShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  /* Efecto de ondas cuando se arrastra sobre */
  ${(props) =>
    props.isOver &&
    `
    animation: pulse 0.6s ease-in-out;
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `}

  /* Efectos especiales durante el drag de columnas */
  &[data-dragging="true"] {
    transform: rotate(5deg) scale(1.05) !important;
    z-index: 1000 !important;
    cursor: grabbing !important;

    &::before {
      height: 15px !important;
      background: linear-gradient(
        90deg,
        #667eea 0%,
        #764ba2 25%,
        #f093fb 50%,
        #f5576c 75%,
        #4facfe 100%
      ) !important;
      animation: columnDragPulse 1s ease-in-out infinite !important;
    }

    &::after {
      opacity: 1 !important;
      animation: columnDragShimmer 1.5s ease-in-out infinite !important;
    }

    box-shadow: 0 35px 70px rgba(0, 0, 0, 0.2), 0 18px 35px rgba(0, 0, 0, 0.15),
      0 9px 18px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7),
      inset 0 -1px 0 rgba(0, 0, 0, 0.1) !important;
    border-color: rgba(102, 126, 234, 0.7) !important;

    @keyframes columnDragPulse {
      0%,
      100% {
        background-position: 0% 50%;
        opacity: 1;
      }
      50% {
        background-position: 100% 50%;
        opacity: 0.8;
      }
    }

    @keyframes columnDragShimmer {
      0%,
      100% {
        transform: translateX(-100%) translateY(-100%) rotate(0deg);
        opacity: 0.7;
      }
      50% {
        transform: translateX(-50%) translateY(-50%) rotate(180deg);
        opacity: 1;
      }
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    min-width: 100%;
    max-width: 100%;
    margin-bottom: ${(props) => props.theme.spacing.lg};
    transform: none !important;
  }

  /* Efecto de profundidad en dispositivos móviles */
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
`;

export const ColumnHeader = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  padding-bottom: ${(props) => props.theme.spacing.md};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 0 0 3px 3px;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const ColumnTitle = styled(motion.h3).withConfig({
  shouldForwardProp: (prop) => !["editable"].includes(prop),
})`
  font-size: 1.4rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  flex: 1;
  cursor: ${(props) => (props.editable ? "pointer" : "default")};
  padding: 12px 16px;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  z-index: 2;

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
      rgba(102, 126, 234, 0.1) 50%,
      transparent 100%
    );
    transition: left 0.6s ease;
    z-index: -1;
  }

  &:hover {
    background: ${(props) =>
      props.editable
        ? "linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 50%, rgba(240, 147, 251, 0.08) 100%)"
        : "transparent"};
    transform: ${(props) => (props.editable ? "translateX(4px)" : "none")};
    color: ${(props) => (props.editable ? "#667eea" : "#1f2937")};

    &::before {
      left: 100%;
    }
  }
`;

export const ColumnTitleInput = styled(motion.input)`
  font-size: 1.4rem;
  font-weight: 700;
  color: #1f2937;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #667eea;
  border-radius: 16px;
  padding: 12px 16px;
  flex: 1;
  outline: none;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  z-index: 3;

  &:focus {
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2),
      0 8px 25px rgba(102, 126, 234, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
    transform: scale(1.01);
    border-color: #4f46e5;
  }

  &::placeholder {
    color: #9ca3af;
    font-weight: 500;
  }
`;

export const ColumnActions = styled(motion.div)`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  align-items: center;
  margin-left: ${(props) => props.theme.spacing.md};
`;

export const ActionIcon = styled(motion.button)`
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(248, 250, 252, 0.1) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.25);
  cursor: pointer;
  padding: 12px;
  border-radius: 16px;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1.2rem;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  min-width: 44px;
  min-height: 44px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) => {
      switch (props.variant) {
        case "edit":
          return "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)";
        case "delete":
          return "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
        case "drag":
          return "linear-gradient(135deg, #ec4899 0%, #db2777 100%)";
        default:
          return "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)";
      }
    }};
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &::after {
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
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }

  &:hover {
    background: ${(props) => {
      switch (props.variant) {
        case "edit":
          return "linear-gradient(145deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.15) 100%)";
        case "delete":
          return "linear-gradient(145deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.15) 100%)";
        case "drag":
          return "linear-gradient(145deg, rgba(236, 72, 153, 0.2) 0%, rgba(219, 39, 119, 0.15) 100%)";
        default:
          return "linear-gradient(145deg, rgba(255, 255, 255, 0.25) 0%, rgba(248, 250, 252, 0.2) 100%)";
      }
    }};
    color: ${(props) => {
      switch (props.variant) {
        case "edit":
          return props.theme.colors.info;
        case "delete":
          return props.theme.colors.error;
        case "drag":
          return props.theme.colors.secondary;
        default:
          return props.theme.colors.text;
      }
    }};
    transform: translateY(-4px) scale(1.1)
      rotate(
        ${(props) => {
          switch (props.variant) {
            case "edit":
              return "5deg";
            case "delete":
              return "-5deg";
            case "drag":
              return "10deg";
            default:
              return "0deg";
          }
        }}
      );
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15), 0 6px 15px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border-color: ${(props) => {
      switch (props.variant) {
        case "edit":
          return "rgba(59, 130, 246, 0.4)";
        case "delete":
          return "rgba(239, 68, 68, 0.4)";
        case "drag":
          return "rgba(236, 72, 153, 0.4)";
        default:
          return "rgba(255, 255, 255, 0.4)";
      }
    }};

    &::before {
      opacity: 0.1;
    }

    &::after {
      width: 100px;
      height: 100px;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.05);
  }

  /* Efecto de pulso para acciones importantes */
  ${(props) =>
    props.variant === "delete" &&
    `
    &:hover {
      animation: dangerPulse 0.6s ease-in-out;
    }
    
    @keyframes dangerPulse {
      0%, 100% { box-shadow: 0 12px 30px rgba(239, 68, 68, 0.15); }
      50% { box-shadow: 0 12px 30px rgba(239, 68, 68, 0.3); }
    }
  `}
`;

export const TasksContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  min-height: 200px;
  max-height: 600px;
  overflow-y: auto;
  padding-right: ${(props) => props.theme.spacing.xs};
  position: relative;

  /* Scrollbar personalizado mejorado */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(248, 250, 252, 0.05) 100%
    );
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    border-radius: 8px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%);
    transform: scaleX(1.2);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  /* Efecto de desenfoque en los bordes */
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 20px;
    pointer-events: none;
    z-index: 1;
  }

  &::before {
    top: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.8) 0%,
      transparent 100%
    );
  }

  &::after {
    bottom: 0;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 0.8) 0%,
      transparent 100%
    );
  }
`;

export const EmptyColumnMessage = styled(motion.div)`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xl};
  color: ${(props) => props.theme.colors.textSecondary};
  font-style: italic;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(248, 250, 252, 0.05) 100%
  );
  border-radius: 20px;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(102, 126, 234, 0.08) 0%,
      rgba(118, 75, 162, 0.05) 30%,
      transparent 70%
    );
    animation: float 8s ease-in-out infinite;
  }

  &::after {
    content: "✨";
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 1.5rem;
    opacity: 0.6;
    animation: sparkle 3s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0) rotate(0deg) scale(1);
    }
    33% {
      transform: translateY(-15px) rotate(120deg) scale(1.1);
    }
    66% {
      transform: translateY(10px) rotate(240deg) scale(0.9);
    }
  }

  @keyframes sparkle {
    0%,
    100% {
      opacity: 0.6;
      transform: scale(1) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1.2) rotate(180deg);
    }
  }

  p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.6;
    position: relative;
    z-index: 1;
    font-weight: 500;
  }

  p:first-child {
    font-size: 1.1rem;
    margin-bottom: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
  }
`;

export const DragHandle = styled(motion.div)`
  cursor: grab;
  padding: 12px;
  border-radius: 16px;
  color: ${(props) => props.theme.colors.textSecondary};
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(248, 250, 252, 0.1) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(
      circle,
      rgba(236, 72, 153, 0.2) 0%,
      transparent 70%
    );
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }

  &:hover {
    background: linear-gradient(
      145deg,
      rgba(236, 72, 153, 0.2) 0%,
      rgba(219, 39, 119, 0.15) 100%
    );
    color: ${(props) => props.theme.colors.secondary};
    transform: translateY(-4px) scale(1.1) rotate(15deg);
    box-shadow: 0 12px 30px rgba(236, 72, 153, 0.25),
      0 6px 15px rgba(236, 72, 153, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border-color: rgba(236, 72, 153, 0.4);

    &::before {
      opacity: 0.1;
    }

    &::after {
      width: 100px;
      height: 100px;
    }
  }

  &:active {
    cursor: grabbing;
    transform: translateY(-2px) scale(1.05);
  }

  /* Efecto de ondas al arrastrar */
  &:active {
    animation: dragWave 0.3s ease-out;
  }

  @keyframes dragWave {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;
