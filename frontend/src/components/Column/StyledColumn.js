// StyledColumn.js
import styled from "styled-components";
import { motion } from "framer-motion";

// Función para generar colores basados en índice
const getColumnGradient = (index) => {
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  ];
  return gradients[index % gradients.length];
};

const getColumnGlow = (index) => {
  const glows = [
    "rgba(102, 126, 234, 0.4)",
    "rgba(240, 147, 251, 0.4)",
    "rgba(79, 172, 254, 0.4)",
    "rgba(67, 233, 123, 0.4)",
    "rgba(250, 112, 154, 0.4)",
  ];
  return glows[index % glows.length];
};

export const ColumnContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) =>
    !["$isOver", "$isDragging", "$isHovered"].includes(prop),
})`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  padding: 0;
  min-width: 340px;
  max-width: 380px;
  min-height: 520px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-style: preserve-3d;
  perspective: 1000px;

  /* Estados interactivos */
  ${(props) =>
    props.$isHovered &&
    `
    transform: translateY(-8px) scale(1.02) rotateX(2deg);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.15),
      0 8px 32px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  `}

  ${(props) =>
    props.$isDragging &&
    `
    transform: rotate(5deg) scale(1.05) rotateX(10deg);
    box-shadow: 
      0 40px 80px rgba(0, 0, 0, 0.25),
      0 20px 40px rgba(255, 255, 255, 0.1);
    z-index: 1000 !important;
  `}

  ${(props) =>
    props.$isOver &&
    `
    &::before {
      opacity: 1;
      transform: scale(1.02);
    }
  `}

  @media (max-width: 900px) {
    min-width: 300px;
    max-width: 300px;
    min-height: 480px;
  }
`;

export const ColumnGradient = styled.div.attrs((props) => ({
  style: {
    background: getColumnGradient(props.$colorIndex),
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  opacity: 0.8;
  transition: all 0.3s ease;
`;

export const FloatingParticles = styled.div.attrs((props) => ({
  style: {
    opacity: props.$visible ? 0.6 : 0,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 20% 80%,
      rgba(120, 119, 198, 0.3) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 119, 198, 0.3) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 40% 40%,
      rgba(120, 219, 255, 0.2) 0%,
      transparent 50%
    );
  transition: opacity 0.6s ease;
  pointer-events: none;
`;

export const ShimmerEffect = styled.div.attrs((props) => ({
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
  pointer-events: none;
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
  pointer-events: none;
  transition: transform 0.3s ease;
`;

export const GlowBorder = styled.div.attrs((props) => ({
  style: {
    opacity: props.$active ? 1 : 0,
  },
}))`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 26px;
  background: conic-gradient(
    from 0deg,
    #667eea,
    #764ba2,
    #f093fb,
    #f5576c,
    #667eea
  );
  filter: blur(8px);
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: -1;
`;

export const ColumnHeader = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 20px 16px;
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .header-content {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
  }
`;

export const ColumnTitle = styled(motion.h3).withConfig({
  shouldForwardProp: (prop) => !["$editable"].includes(prop),
})`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  padding: 8px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  cursor: ${(props) => (props.$editable ? "pointer" : "default")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

export const ColumnTitleInput = styled(motion.input)`
  font-size: 1.25rem;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 16px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  background: rgba(255, 255, 255, 0.9);
  color: #1f2937;
  outline: none;
  width: 100%;
  transition: all 0.3s ease;

  &:focus {
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const ColumnActions = styled(motion.div)`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const ActionIcon = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !["$variant"].includes(prop),
})`
  position: relative;
  border: none;
  background: ${(props) => {
    switch (props.$variant) {
      case "primary":
        return "rgba(102, 126, 234, 0.2)";
      case "success":
        return "rgba(16, 185, 129, 0.2)";
      case "danger":
        return "rgba(239, 68, 68, 0.2)";
      case "warning":
        return "rgba(245, 158, 11, 0.2)";
      default:
        return "rgba(255, 255, 255, 0.1)";
    }
  }};
  padding: 8px;
  border-radius: 12px;
  min-width: 36px;
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => {
    switch (props.$variant) {
      case "primary":
        return "#667eea";
      case "success":
        return "#10b981";
      case "danger":
        return "#ef4444";
      case "warning":
        return "#f59e0b";
      default:
        return "rgba(255, 255, 255, 0.8)";
    }
  }};
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${(props) => {
      switch (props.$variant) {
        case "primary":
          return "rgba(102, 126, 234, 0.3)";
        case "success":
          return "rgba(16, 185, 129, 0.3)";
        case "danger":
          return "rgba(239, 68, 68, 0.3)";
        case "warning":
          return "rgba(245, 158, 11, 0.3)";
        default:
          return "rgba(255, 255, 255, 0.15)";
      }
    }};
    border-color: rgba(255, 255, 255, 0.2);
  }

  svg {
    font-size: 16px;
  }
`;

export const DragHandle = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["$isHovered"].includes(prop),
})`
  cursor: grab;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 12px;
  min-width: 36px;
  min-height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.9);
  }

  ${(props) =>
    props.$isHovered &&
    `
    background: rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.3);
  `}
`;

export const ColumnContent = styled.div`
  position: relative;
  z-index: 5;
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
`;

export const TasksContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  flex: 1;
  overflow-y: auto;
  max-height: 440px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #5a67d8, #6b46c1);
  }
`;

export const TaskCard = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["$priority"].includes(prop),
})`
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: grab;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${(props) => {
      switch (props.$priority) {
        case "alta":
          return "linear-gradient(90deg, #ef4444, #dc2626)";
        case "media":
          return "linear-gradient(90deg, #f59e0b, #d97706)";
        case "baja":
          return "linear-gradient(90deg, #10b981, #059669)";
        default:
          return "linear-gradient(90deg, #6b7280, #4b5563)";
      }
    }};
    border-radius: 16px 16px 0 0;
  }

  .task-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;

    h4 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.95);
      line-height: 1.4;
      flex: 1;
    }

    .priority-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${(props) => {
        switch (props.$priority) {
          case "alta":
            return "#ef4444";
          case "media":
            return "#f59e0b";
          case "baja":
            return "#10b981";
          default:
            return "#6b7280";
        }
      }};
      flex-shrink: 0;
      margin-top: 6px;
    }
  }

  p {
    margin: 0 0 12px 0;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.5;
  }

  .task-footer {
    .task-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .priority-badge {
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;

      &.alta {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
      }
      &.media {
        background: rgba(245, 158, 11, 0.2);
        color: #f59e0b;
      }
      &.baja {
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
      }
    }

    .task-date {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

export const TaskCounter = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["$count"].includes(prop),
})`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 12px;
  padding: 6px 10px;
  font-size: 0.875rem;
  font-weight: 700;
  min-width: 32px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const AddTaskButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &.floating-add {
    position: absolute;
    bottom: 16px;
    right: 16px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    padding: 0;
    justify-content: center;
    background: linear-gradient(135deg, #667eea, #764ba2);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
    z-index: 20;

    svg {
      font-size: 20px;
    }
  }
`;

export const EmptyColumnMessage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  height: 100%;

  .empty-icon {
    font-size: 3rem;
    margin-bottom: 16px;
    opacity: 0.6;
  }

  h4 {
    margin: 0 0 8px 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
  }

  p {
    margin: 0 0 20px 0;
    font-size: 0.875rem;
    opacity: 0.8;
  }
`;
