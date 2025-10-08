import styled from "styled-components";
import { motion } from "framer-motion";

export const ColumnContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["isOver"].includes(prop),
})`
  background: ${(props) => props.theme.colors.backgroundCard};
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: ${(props) => props.theme.spacing.lg};
  min-width: 320px;
  max-width: 380px;
  min-height: 450px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid
    ${(props) =>
      props.isOver ? "rgba(99, 102, 241, 0.3)" : "rgba(255, 255, 255, 0.2)"};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: ${(props) =>
      props.isOver
        ? props.theme.colors.gradientPrimary
        : props.theme.colors.gradientGlass};
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
      rgba(99, 102, 241, 0.05) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 32px 64px rgba(0, 0, 0, 0.15), 0 16px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border-color: rgba(99, 102, 241, 0.4);

    &::after {
      opacity: 1;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    min-width: 100%;
    max-width: 100%;
    margin-bottom: ${(props) => props.theme.spacing.lg};
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
    height: 2px;
    background: ${(props) => props.theme.colors.gradientPrimary};
    transition: width 0.3s ease;
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
  background: ${(props) => props.theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  flex: 1;
  cursor: ${(props) => (props.editable ? "pointer" : "default")};
  padding: 12px 16px;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    background: ${(props) =>
      props.editable
        ? "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)"
        : "transparent"};
    transform: ${(props) => (props.editable ? "translateX(4px)" : "none")};
  }
`;

export const ColumnTitleInput = styled(motion.input)`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 16px;
  padding: 12px 16px;
  flex: 1;
  outline: none;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.2);

  &:focus {
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const ColumnActions = styled(motion.div)`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  align-items: center;
  margin-left: ${(props) => props.theme.spacing.md};
`;

export const ActionIcon = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  padding: 10px;
  border-radius: 12px;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

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
          return props.theme.colors.gradientInfo;
        case "delete":
          return props.theme.colors.gradientError;
        case "drag":
          return props.theme.colors.gradientSecondary;
        default:
          return props.theme.colors.gradientGlass;
      }
    }};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: ${(props) => {
      switch (props.variant) {
        case "edit":
          return "rgba(59, 130, 246, 0.15)";
        case "delete":
          return "rgba(239, 68, 68, 0.15)";
        case "drag":
          return "rgba(236, 72, 153, 0.15)";
        default:
          return "rgba(255, 255, 255, 0.2)";
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
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: ${(props) => {
      switch (props.variant) {
        case "edit":
          return "rgba(59, 130, 246, 0.3)";
        case "delete":
          return "rgba(239, 68, 68, 0.3)";
        case "drag":
          return "rgba(236, 72, 153, 0.3)";
        default:
          return "rgba(255, 255, 255, 0.3)";
      }
    }};

    &::before {
      opacity: 0.1;
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
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

  /* Scrollbar personalizado */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.gradientPrimary};
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.gradientSecondary};
    transform: scaleY(1.1);
  }
`;

export const EmptyColumnMessage = styled(motion.div)`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xl};
  color: ${(props) => props.theme.colors.textSecondary};
  font-style: italic;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(99, 102, 241, 0.05) 0%,
      transparent 70%
    );
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-10px) rotate(180deg);
    }
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    position: relative;
    z-index: 1;
  }
`;

export const DragHandle = styled(motion.div)`
  cursor: grab;
  padding: 10px;
  border-radius: 12px;
  color: ${(props) => props.theme.colors.textSecondary};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) => props.theme.colors.gradientSecondary};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(236, 72, 153, 0.15);
    color: ${(props) => props.theme.colors.secondary};
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(236, 72, 153, 0.2);
    border-color: rgba(236, 72, 153, 0.3);

    &::before {
      opacity: 0.1;
    }
  }

  &:active {
    cursor: grabbing;
    transform: translateY(0) scale(0.98);
  }
`;
