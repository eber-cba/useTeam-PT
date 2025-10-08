import styled from "styled-components";
import { motion } from "framer-motion";

export const TaskCard = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["isDragging", "priority"].includes(prop),
})`
  background: ${(props) => props.theme.colors.backgroundCard};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.md};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  opacity: ${(props) => (props.isDragging ? 0.6 : 1)};
  transform: ${(props) =>
    props.isDragging ? "rotate(8deg) scale(1.05)" : "rotate(0deg) scale(1)"};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(props) => {
      switch (props.priority) {
        case "alta":
          return props.theme.colors.gradientError;
        case "media":
          return props.theme.colors.gradientWarning;
        case "baja":
          return props.theme.colors.gradientSuccess;
        default:
          return props.theme.colors.gradientGlass;
      }
    }};
    border-radius: 20px 20px 0 0;
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
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border-color: rgba(99, 102, 241, 0.3);

    &::after {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-4px) scale(1.01);
  }
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
    bottom: -8px;
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

export const TaskTitle = styled(motion.h4)`
  font-size: 1.2rem;
  font-weight: 700;
  background: ${(props) => props.theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  flex: 1;
  line-height: 1.4;
  word-break: break-word;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
  }
`;

export const TaskActions = styled(motion.div)`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(-10px);

  ${TaskCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ActionButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  padding: 8px;
  border-radius: 12px;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1rem;
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
        default:
          return props.theme.colors.text;
      }
    }};
    transform: translateY(-2px) scale(1.1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: ${(props) => {
      switch (props.variant) {
        case "edit":
          return "rgba(59, 130, 246, 0.3)";
        case "delete":
          return "rgba(239, 68, 68, 0.3)";
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

export const TaskDescription = styled(motion.p)`
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.textSecondary};
  margin: 0 0 ${(props) => props.theme.spacing.lg} 0;
  line-height: 1.6;
  word-break: break-word;
  background: rgba(255, 255, 255, 0.05);
  padding: ${(props) => props.theme.spacing.md};
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: ${(props) => props.theme.colors.gradientPrimary};
    border-radius: 12px 0 0 12px;
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
        return props.theme.colors.gradientError;
      case "media":
        return props.theme.colors.gradientWarning;
      case "baja":
        return props.theme.colors.gradientSuccess;
      default:
        return props.theme.colors.gradientGlass;
    }
  }};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

export const TaskDate = styled(motion.span)`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.05);
  padding: 6px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  svg {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const AssignedUser = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.textSecondary};
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  svg {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const AvatarCircle = styled(motion.div)`
  width: 28px;
  height: 28px;
  min-width: 28px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.gradientPrimary};
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
  }
`;

export const TaskFooter = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.lg};
  padding-top: ${(props) => props.theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: ${(props) => props.theme.colors.gradientPrimary};
    transition: width 0.3s ease;
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
  background: rgba(66, 153, 225, 0.1);
  color: ${(props) => props.theme.colors.primary};
  padding: 2px 8px;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(66, 153, 225, 0.2);
`;

export const DragIndicator = styled(motion.div)`
  position: absolute;
  top: ${(props) => props.theme.spacing.md};
  right: ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1rem;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.1);
  padding: 6px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  ${TaskCard}:hover & {
    opacity: 0.8;
    transform: scale(1.1);
    color: ${(props) => props.theme.colors.primary};
  }
`;
