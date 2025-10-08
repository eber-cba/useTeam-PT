// StyledTask.js
import styled from "styled-components";
import { motion } from "framer-motion";

// Función para obtener colores de prioridad
const getPriorityColors = (priority) => {
  const colors = {
    alta: {
      gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      glow: "rgba(239, 68, 68, 0.4)",
      light: "rgba(239, 68, 68, 0.1)",
      shadow: "rgba(239, 68, 68, 0.3)",
    },
    media: {
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      glow: "rgba(245, 158, 11, 0.4)",
      light: "rgba(245, 158, 11, 0.1)",
      shadow: "rgba(245, 158, 11, 0.3)",
    },
    baja: {
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      glow: "rgba(16, 185, 129, 0.4)",
      light: "rgba(16, 185, 129, 0.1)",
      shadow: "rgba(16, 185, 129, 0.3)",
    },
    default: {
      gradient: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
      glow: "rgba(102, 126, 234, 0.4)",
      light: "rgba(102, 126, 234, 0.1)",
      shadow: "rgba(102, 126, 234, 0.3)",
    },
  };
  return colors[priority] || colors.default;
};

// Función para colores de estado
const getStatusColors = (status) => {
  const colors = {
    completada: {
      background: "rgba(16, 185, 129, 0.2)",
      color: "#10b981",
      border: "rgba(16, 185, 129, 0.3)",
    },
    progreso: {
      background: "rgba(59, 130, 246, 0.2)",
      color: "#3b82f6",
      border: "rgba(59, 130, 246, 0.3)",
    },
    pendiente: {
      background: "rgba(245, 158, 11, 0.2)",
      color: "#f59e0b",
      border: "rgba(245, 158, 11, 0.3)",
    },
    default: {
      background: "rgba(255, 255, 255, 0.1)",
      color: "rgba(255, 255, 255, 0.8)",
      border: "rgba(255, 255, 255, 0.2)",
    },
  };
  return colors[status] || colors.default;
};

export const TaskCard = styled(motion.div).withConfig({
  shouldForwardProp: (prop) =>
    !["$isDragging", "$priority", "$isHovered"].includes(prop),
})`
  position: relative;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 0;
  margin-bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  cursor: grab;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-style: preserve-3d;
  perspective: 1000px;
  overflow: hidden;

  /* Estados */
  ${(props) =>
    props.$isHovered &&
    `
    transform: translateY(-8px) scale(1.02) rotateX(2deg);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.15),
      0 8px 32px rgba(255, 255, 255, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  `}

  ${(props) =>
    props.$isDragging &&
    `
    transform: rotate(8deg) scale(1.05) rotateX(10deg) !important;
    box-shadow: 
      0 40px 80px rgba(0, 0, 0, 0.25),
      0 20px 40px rgba(255, 255, 255, 0.1) !important;
    cursor: grabbing;
    z-index: 1000 !important;
    border-color: ${getPriorityColors(props.$priority).glow} !important;
  `}

  @media (max-width: 768px) {
    margin-bottom: 12px;
    border-radius: 16px;
  }
`;

export const TaskLayers = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

export const DepthLayer = styled.div.attrs((props) => ({
  style: {
    transform: `translateZ(${props.$depth * 2}px)`,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  border-radius: inherit;
  transition: transform 0.3s ease;
`;

export const ShimmerLayer = styled.div.attrs((props) => ({
  style: {
    opacity: props.$active ? 1 : 0,
  },
}))`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  transform: rotate(30deg)
    translateY(${(props) => (props.$active ? "100%" : "0%")});
  transition: transform 0.8s ease, opacity 0.4s ease;
`;

export const HoverEffect = styled.div.attrs((props) => ({
  style: {
    opacity: props.$active ? 0.6 : 0,
    background: `radial-gradient(circle at center, ${props.$glowColor} 0%, transparent 70%)`,
  },
}))`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 150%;
  transform: translate(-50%, -50%);
  transition: opacity 0.4s ease;
  filter: blur(20px);
`;

export const TaskGlow = styled.div.attrs((props) => ({
  style: {
    background: getPriorityColors(props.$priority).gradient,
    opacity: props.$isHovered ? 0.8 : 0.4,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  transition: all 0.4s ease;
`;

export const TaskContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 16px;
    gap: 12px;
  }
`;

export const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;

  .title-section {
    flex: 1;
    min-width: 0;

    .mobile-meta {
      display: none;

      @media (max-width: 768px) {
        display: flex;
        gap: 8px;
        margin-top: 8px;
      }
    }
  }
`;

export const TaskTitle = styled(motion.h4).withConfig({
  shouldForwardProp: (prop) => !["$priority"].includes(prop),
})`
  font-size: 1.1rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  line-height: 1.4;
  word-break: break-word;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  /* Prevenir selección de texto durante drag */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &::before {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${(props) => getPriorityColors(props.$priority).gradient};
    transition: width 0.3s ease;
  }

  &:hover {
    transform: translateX(4px);

    &::before {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.3;
  }
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  opacity: 0;
  transition: all 0.3s ease;

  ${TaskCard}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    opacity: 1;
  }
`;

export const ActionButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !["variant"].includes(prop),
})`
  background: ${(props) => {
    switch (props.variant) {
      case "edit":
        return "rgba(59, 130, 246, 0.2)";
      case "delete":
        return "rgba(239, 68, 68, 0.2)";
      case "menu":
        return "transparent";
      default:
        return "rgba(255, 255, 255, 0.1)";
    }
  }};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 8px;
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; /* Mantener cursor pointer para botones */
  color: ${(props) => {
    switch (props.variant) {
      case "edit":
        return "#3b82f6";
      case "delete":
        return "#ef4444";
      case "menu":
        return props.style?.color || "rgba(255, 255, 255, 0.7)";
      default:
        return "rgba(255, 255, 255, 0.7)";
    }
  }};
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-size: 14px;
  gap: 6px;

  /* Prevenir que los botones activen drag */
  touch-action: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    background: ${(props) => {
      switch (props.variant) {
        case "edit":
          return "rgba(59, 130, 246, 0.3)";
        case "delete":
          return "rgba(239, 68, 68, 0.3)";
        case "menu":
          return "rgba(255, 255, 255, 0.15)";
        default:
          return "rgba(255, 255, 255, 0.15)";
      }
    }};
    border-color: rgba(255, 255, 255, 0.2);
  }

  span {
    font-size: 12px;
    font-weight: 500;
  }
`;

export const MenuButton = styled(ActionButton).withConfig({
  shouldForwardProp: (prop) => !["$active"].includes(prop),
})`
  ${(props) =>
    props.$active &&
    `
    background: rgba(255, 255, 255, 0.15) !important;
    border-color: rgba(255, 255, 255, 0.2) !important;
  `}

  /* Prevenir drag */
  touch-action: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const DragIndicator = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["$isHovered"].includes(prop),
})`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 8px;
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  /* Aplicar los listeners de drag SOLO a este elemento */
  ${(props) =>
    props.$isHovered &&
    `
    background: rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.3);
    color: rgba(255, 255, 255, 0.9);
  `}

  &:active {
    cursor: grabbing;
  }

  /* Remover cualquier efecto de prevención de drag aquí */
`;

export const TaskDescription = styled(motion.p)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  word-break: break-word;
  background: rgba(255, 255, 255, 0.05);
  padding: 12px;
  border-radius: 12px;
  border-left: 3px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-left-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 10px;
  }
`;

export const TaskMeta = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export const PriorityBadge = styled(motion.span).withConfig({
  shouldForwardProp: (prop) => !["$priority"].includes(prop),
})`
  background: ${(props) => getPriorityColors(props.$priority).gradient};
  color: white;
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 4px 12px ${(props) => getPriorityColors(props.$priority).shadow};
  border: 1px solid rgba(255, 255, 255, 0.2);

  svg {
    font-size: 10px;
  }
`;

export const StatusIndicator = styled(motion.span).withConfig({
  shouldForwardProp: (prop) => !["$status", "$large"].includes(prop),
})`
  background: ${(props) => getStatusColors(props.$status).background};
  color: ${(props) => getStatusColors(props.$status).color};
  padding: ${(props) => (props.$large ? "8px 12px" : "6px 10px")};
  border-radius: 12px;
  font-size: ${(props) => (props.$large ? "0.8rem" : "0.75rem")};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${(props) => getStatusColors(props.$status).border};
  backdrop-filter: blur(10px);

  svg {
    font-size: ${(props) => (props.$large ? "12px" : "10px")};
  }

  ${(props) =>
    props.$large &&
    `
    align-self: flex-start;
    margin-top: 4px;
  `}
`;

export const TaskTags = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Tag = styled(motion.span).withConfig({
  shouldForwardProp: (prop) => !["$color"].includes(prop),
})`
  background: ${(props) =>
    props.$color ? `${props.$color}20` : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => props.$color || "rgba(255, 255, 255, 0.8)"};
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 600;
  border: 1px solid
    ${(props) =>
      props.$color ? `${props.$color}40` : "rgba(255, 255, 255, 0.1)"};
  backdrop-filter: blur(10px);
`;

export const TaskFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  .footer-left,
  .footer-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    .footer-right {
      align-self: flex-end;
    }
  }
`;

export const AssignedUser = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .user-name {
      font-size: 0.8rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
    }

    .user-role {
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.6);
    }
  }
`;

export const AvatarCircle = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["$isCurrentUser"].includes(prop),
})`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) =>
    props.$isCurrentUser
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)"};
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid
    ${(props) =>
      props.$isCurrentUser
        ? "rgba(102, 126, 234, 0.4)"
        : "rgba(255, 255, 255, 0.2)"};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

export const TaskDate = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;

  svg {
    font-size: 12px;
  }
`;

export const FloatingMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(30, 30, 40, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 8px;
  z-index: 1000;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  min-width: 180px;
`;

export const QuickActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
