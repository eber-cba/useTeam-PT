import styled from "styled-components";
import { motion } from "framer-motion";

export const TaskCard = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["isDragging", "priority"].includes(prop),
})`
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(255, 255, 255, 0.95) 50%,
    rgba(248, 250, 252, 0.98) 100%
  );
  backdrop-filter: blur(25px) saturate(180%);
  border-radius: 24px;
  padding: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.md};
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08), 0 6px 16px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.25);
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  opacity: ${(props) => (props.isDragging ? 0.8 : 1)};
  transform: ${(props) =>
    props.isDragging ? "rotate(8deg) scale(1.05)" : "rotate(0deg) scale(1)"};
  z-index: ${(props) => (props.isDragging ? 1000 : 1)};
  cursor: ${(props) => (props.isDragging ? "grabbing" : "grab")};

  /* Borde superior con gradiente animado */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: ${(props) => {
      switch (props.priority) {
        case "alta":
          return "linear-gradient(90deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)";
        case "media":
          return "linear-gradient(90deg, #f59e0b 0%, #d97706 50%, #b45309 100%)";
        case "baja":
          return "linear-gradient(90deg, #10b981 0%, #059669 50%, #047857 100%)";
        default:
          return "linear-gradient(90deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 50%, rgba(240, 147, 251, 0.3) 100%)";
      }
    }};
    border-radius: 24px 24px 0 0;
    transition: all 0.4s ease;
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
      rgba(255, 255, 255, 0.08) 0%,
      rgba(102, 126, 234, 0.03) 30%,
      transparent 70%
    );
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    pointer-events: none;
    animation: taskShimmer 4s ease-in-out infinite;
  }

  @keyframes taskShimmer {
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

  &:hover {
    transform: translateY(-12px) scale(1.03) rotateX(2deg);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12), 0 12px 24px rgba(0, 0, 0, 0.08),
      0 6px 12px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.4),
      inset 0 -1px 0 rgba(0, 0, 0, 0.05);
    border-color: rgba(102, 126, 234, 0.4);

    &::before {
      height: 10px;
      background: ${(props) => {
        switch (props.priority) {
          case "alta":
            return "linear-gradient(90deg, #ef4444 0%, #dc2626 25%, #b91c1c 50%, #991b1b 75%, #7f1d1d 100%)";
          case "media":
            return "linear-gradient(90deg, #f59e0b 0%, #d97706 25%, #b45309 50%, #92400e 75%, #78350f 100%)";
          case "baja":
            return "linear-gradient(90deg, #10b981 0%, #059669 25%, #047857 50%, #065f46 75%, #064e3b 100%)";
          default:
            return "linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)";
        }
      }};
      animation: priorityPulse 2s ease-in-out infinite;
    }

    &::after {
      opacity: 1;
      animation-duration: 2s;
    }
  }

  @keyframes priorityPulse {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  &:active {
    transform: translateY(-8px) scale(1.02);
  }

  /* Efecto de pulso para tareas de alta prioridad */
  ${(props) =>
    props.priority === "alta" &&
    `
    &::before {
      animation: highPriorityGlow 2s ease-in-out infinite;
    }
    
    @keyframes highPriorityGlow {
      0%, 100% { 
        box-shadow: 0 0 5px rgba(239, 68, 68, 0.3);
      }
      50% { 
        box-shadow: 0 0 15px rgba(239, 68, 68, 0.6);
      }
    }
  `}

  /* Efectos especiales durante el drag */
  ${(props) =>
    props.isDragging &&
    `
    &::before {
      height: 12px !important;
      background: linear-gradient(90deg, 
        #667eea 0%, 
        #764ba2 25%, 
        #f093fb 50%, 
        #f5576c 75%, 
        #4facfe 100%
      ) !important;
      animation: dragPriorityPulse 0.8s ease-in-out infinite !important;
    }

    &::after {
      opacity: 1 !important;
      animation: dragShimmer 1s ease-in-out infinite !important;
    }

    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.2),
      0 15px 30px rgba(0, 0, 0, 0.15),
      0 8px 16px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      inset 0 -1px 0 rgba(0, 0, 0, 0.1) !important;
    border-color: rgba(102, 126, 234, 0.6) !important;

    @keyframes dragPriorityPulse {
      0%, 100% { 
        background-position: 0% 50%;
        opacity: 1;
      }
      50% { 
        background-position: 100% 50%;
        opacity: 0.8;
      }
    }

    @keyframes dragShimmer {
      0%, 100% { 
        transform: translateX(-100%) translateY(-100%) rotate(0deg);
        opacity: 0.6;
      }
      50% { 
        transform: translateX(-50%) translateY(-50%) rotate(180deg);
        opacity: 1;
      }
    }
  `}
`;

export const TaskHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  gap: ${(props) => props.theme.spacing.md};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 0 0 2px 2px;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const TaskTitle = styled(motion.h4)`
  font-size: 1.3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  flex: 1;
  line-height: 1.4;
  word-break: break-word;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;

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
  }

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateX(6px) scale(1.02);

    &::before {
      left: 100%;
    }
  }
`;

export const TaskActions = styled(motion.div)`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateY(-15px) scale(0.9);

  ${TaskCard}:hover & {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const ActionButton = styled(motion.button)`
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(248, 250, 252, 0.1) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.25);
  cursor: pointer;
  padding: 10px;
  border-radius: 14px;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  min-width: 40px;
  min-height: 40px;

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
        default:
          return props.theme.colors.text;
      }
    }};
    transform: translateY(-3px) scale(1.15)
      rotate(
        ${(props) => {
          switch (props.variant) {
            case "edit":
              return "5deg";
            case "delete":
              return "-5deg";
            default:
              return "0deg";
          }
        }}
      );
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border-color: ${(props) => {
      switch (props.variant) {
        case "edit":
          return "rgba(59, 130, 246, 0.4)";
        case "delete":
          return "rgba(239, 68, 68, 0.4)";
        default:
          return "rgba(255, 255, 255, 0.4)";
      }
    }};

    &::before {
      opacity: 0.1;
    }

    &::after {
      width: 80px;
      height: 80px;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.05);
  }

  /* Efecto especial para botón de eliminar */
  ${(props) =>
    props.variant === "delete" &&
    `
    &:hover {
      animation: dangerShake 0.5s ease-in-out;
    }
    
    @keyframes dangerShake {
      0%, 100% { transform: translateY(-3px) scale(1.15) rotate(-5deg); }
      25% { transform: translateY(-3px) scale(1.15) rotate(-8deg); }
      75% { transform: translateY(-3px) scale(1.15) rotate(-2deg); }
    }
  `}
`;

export const TaskDescription = styled(motion.p)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.textSecondary};
  margin: 0 0 ${(props) => props.theme.spacing.lg} 0;
  line-height: 1.6;
  word-break: break-word;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(248, 250, 252, 0.05) 100%
  );
  padding: ${(props) => props.theme.spacing.md};
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  position: relative;
  transition: all 0.4s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    border-radius: 16px 0 0 16px;
    transition: width 0.4s ease;
  }

  &:hover {
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(248, 250, 252, 0.08) 100%
    );
    border-color: rgba(102, 126, 234, 0.2);
    transform: translateX(4px);

    &::before {
      width: 6px;
    }
  }
`;

export const TaskMeta = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const PriorityBadge = styled(motion.span)`
  background: ${(props) => {
    switch (props.priority) {
      case "alta":
        return "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
      case "media":
        return "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
      case "baja":
        return "linear-gradient(135deg, #10b981 0%, #059669 100%)";
      default:
        return "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)";
    }
  }};
  color: white;
  padding: 10px 18px;
  border-radius: 24px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;

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
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);

    &::before {
      left: 100%;
    }
  }

  /* Efecto de pulso para alta prioridad */
  ${(props) =>
    props.priority === "alta" &&
    `
    animation: priorityPulse 2s ease-in-out infinite;
    
    @keyframes priorityPulse {
      0%, 100% { 
        box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
      }
      50% { 
        box-shadow: 0 6px 20px rgba(239, 68, 68, 0.5);
      }
    }
  `}
`;

export const TaskDate = styled(motion.span)`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(248, 250, 252, 0.05) 100%
  );
  padding: 8px 14px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  transition: all 0.4s ease;
  font-weight: 500;

  svg {
    font-size: 1.1rem;
    color: ${(props) => props.theme.colors.primary};
    transition: transform 0.3s ease;
  }

  &:hover {
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(248, 250, 252, 0.08) 100%
    );
    border-color: rgba(102, 126, 234, 0.2);
    transform: translateY(-2px);

    svg {
      transform: scale(1.1) rotate(5deg);
    }
  }
`;

export const AssignedUser = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.textSecondary};
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(248, 250, 252, 0.05) 100%
  );
  padding: 10px 14px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  transition: all 0.4s ease;
  font-weight: 500;

  svg {
    font-size: 1.1rem;
    color: ${(props) => props.theme.colors.primary};
    transition: transform 0.3s ease;
  }

  &:hover {
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(248, 250, 252, 0.08) 100%
    );
    border-color: rgba(102, 126, 234, 0.2);
    transform: translateY(-2px);

    svg {
      transform: scale(1.1) rotate(-5deg);
    }
  }
`;

export const AvatarCircle = styled(motion.div)`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border: 2px solid rgba(255, 255, 255, 0.4);
  color: white;
  font-size: 0.9rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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

  &:hover {
    transform: scale(1.15) rotate(10deg);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);

    &::before {
      width: 100px;
      height: 100px;
    }
  }
`;

export const TaskFooter = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.lg};
  padding-top: ${(props) => props.theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 0 0 2px 2px;
  }

  &:hover::before {
    width: 100%;
  }
`;

export const TaskTags = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.xs};
  margin-top: ${(props) => props.theme.spacing.sm};
`;

export const Tag = styled(motion.span)`
  background: linear-gradient(
    145deg,
    rgba(102, 126, 234, 0.15) 0%,
    rgba(118, 75, 162, 0.1) 100%
  );
  color: ${(props) => props.theme.colors.primary};
  padding: 4px 12px;
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(102, 126, 234, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
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
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    transition: left 0.5s ease;
  }

  &:hover {
    background: linear-gradient(
      145deg,
      rgba(102, 126, 234, 0.2) 0%,
      rgba(118, 75, 162, 0.15) 100%
    );
    border-color: rgba(102, 126, 234, 0.3);
    transform: translateY(-2px) scale(1.05);

    &::before {
      left: 100%;
    }
  }
`;

export const DragIndicator = styled(motion.div)`
  position: absolute;
  top: ${(props) => props.theme.spacing.md};
  right: ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1.1rem;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(248, 250, 252, 0.08) 100%
  );
  padding: 8px;
  border-radius: 12px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: grab;

  ${TaskCard}:hover & {
    opacity: 0.9;
    transform: scale(1.15) rotate(15deg);
    color: ${(props) => props.theme.colors.primary};
    background: linear-gradient(
      145deg,
      rgba(102, 126, 234, 0.15) 0%,
      rgba(118, 75, 162, 0.1) 100%
    );
    border-color: rgba(102, 126, 234, 0.3);
  }

  &:active {
    cursor: grabbing;
    transform: scale(1.2) rotate(20deg);
  }
`;
