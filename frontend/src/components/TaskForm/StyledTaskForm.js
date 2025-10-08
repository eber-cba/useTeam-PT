import styled from "styled-components";
import { motion } from "framer-motion";

export const FormOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  backdrop-filter: blur(8px) saturate(180%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
  pointer-events: auto !important;
  padding: ${(props) => props.theme.spacing.lg};
  animation: overlayFade 0.3s ease-out;

  @keyframes overlayFade {
    from {
      opacity: 0;
      backdrop-filter: blur(0px);
    }
    to {
      opacity: 1;
      backdrop-filter: blur(8px) saturate(180%);
    }
  }
`;

export const FormContainer = styled(motion.div)`
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(255, 255, 255, 0.95) 50%,
    rgba(248, 250, 252, 0.98) 100%
  );
  backdrop-filter: blur(25px) saturate(180%);
  border-radius: 28px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15), 0 12px 24px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 520px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;

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
      rgba(102, 126, 234, 0.6) 50%,
      transparent 100%
    );
    animation: formShimmer 3s ease-in-out infinite;
  }

  @keyframes formShimmer {
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
`;

export const FormHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing.xl};
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.08) 0%,
    rgba(118, 75, 162, 0.05) 50%,
    rgba(240, 147, 251, 0.08) 100%
  );
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    transition: width 0.4s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const FormTitle = styled(motion.h3)`
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  font-size: 1.6rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  animation: titleGlow 3s ease-in-out infinite;

  @keyframes titleGlow {
    0%,
    100% {
      filter: drop-shadow(0 0 0px rgba(102, 126, 234, 0.3));
    }
    50% {
      filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.6));
    }
  }
`;

export const CloseButton = styled(motion.button)`
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(248, 250, 252, 0.05) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 1.4rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.textSecondary};
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: 16px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(239, 68, 68, 0.1) 0%,
      rgba(220, 38, 38, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: linear-gradient(
      145deg,
      rgba(239, 68, 68, 0.15) 0%,
      rgba(220, 38, 38, 0.1) 100%
    );
    color: ${(props) => props.theme.colors.error};
    transform: scale(1.1) rotate(90deg);
    border-color: rgba(239, 68, 68, 0.3);
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.2);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: scale(1.05) rotate(90deg);
  }
`;

export const FormContent = styled(motion.form)`
  padding: ${(props) => props.theme.spacing.xl};
  overflow-y: auto;
  flex: 1;
  position: relative;

  /* Scrollbar personalizado */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(248, 250, 252, 0.05) 100%
    );
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%);
  }
`;

export const FormGroup = styled(motion.div)`
  margin-bottom: ${(props) => props.theme.spacing.lg};
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FormLabel = styled(motion.label)`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  position: relative;

  &::after {
    content: ${(props) => (props.required ? '"*"' : '""')};
    color: ${(props) => props.theme.colors.error};
    margin-left: 6px;
    font-size: 1.2rem;
    animation: ${(props) =>
      props.required ? "requiredPulse 2s ease-in-out infinite" : "none"};
  }

  @keyframes requiredPulse {
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
`;

export const FormInput = styled(motion.input).withConfig({
  shouldForwardProp: (prop) => !["hasError"].includes(prop),
})`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid
    ${(props) => (props.hasError ? "#ef4444" : "rgba(255, 255, 255, 0.3)")};
  border-radius: 16px;
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(248, 250, 252, 0.9) 100%
  );
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  position: relative;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#ef4444" : "#667eea")};
    box-shadow: 0 0 0 4px
        ${(props) =>
          props.hasError
            ? "rgba(239, 68, 68, 0.15)"
            : "rgba(102, 126, 234, 0.15)"},
      0 12px 35px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5);
    transform: translateY(-2px) scale(1.02);
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.98) 0%,
      rgba(248, 250, 252, 0.95) 100%
    );
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-weight: 500;
  }

  /* Efecto de brillo en focus */
  &:focus::before {
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
    animation: inputShimmer 0.6s ease-out;
  }

  @keyframes inputShimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

export const FormTextarea = styled(motion.textarea).withConfig({
  shouldForwardProp: (prop) => !["hasError"].includes(prop),
})`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid
    ${(props) => (props.hasError ? "#ef4444" : "rgba(255, 255, 255, 0.3)")};
  border-radius: 16px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(248, 250, 252, 0.9) 100%
  );
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  position: relative;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#ef4444" : "#667eea")};
    box-shadow: 0 0 0 4px
        ${(props) =>
          props.hasError
            ? "rgba(239, 68, 68, 0.15)"
            : "rgba(102, 126, 234, 0.15)"},
      0 12px 35px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5);
    transform: translateY(-2px) scale(1.02);
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.98) 0%,
      rgba(248, 250, 252, 0.95) 100%
    );
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-weight: 500;
  }
`;

export const FormSelect = styled(motion.select)`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid
    ${(props) =>
      props.hasError ? props.theme.colors.error : "rgba(255, 255, 255, 0.3)"};
  border-radius: 16px;
  font-size: 1rem;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(248, 250, 252, 0.9) 100%
  );
  backdrop-filter: blur(15px);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  box-sizing: border-box;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  position: relative;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.hasError ? props.theme.colors.error : "#667eea"};
    box-shadow: 0 0 0 4px
        ${(props) =>
          props.hasError
            ? "rgba(239, 68, 68, 0.15)"
            : "rgba(102, 126, 234, 0.15)"},
      0 12px 35px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5);
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.98) 0%,
      rgba(248, 250, 252, 0.95) 100%
    );
    transform: translateY(-2px) scale(1.02);
  }

  &:hover {
    border-color: ${(props) =>
      props.hasError ? props.theme.colors.error : "rgba(102, 126, 234, 0.5)"};
    transform: translateY(-1px);
  }
`;

export const FormRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.lg};

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.md};
  }
`;

export const FormActions = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.xl};
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(
    135deg,
    rgba(248, 250, 252, 0.9) 0%,
    rgba(255, 255, 255, 0.8) 100%
  );
  backdrop-filter: blur(15px);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    transition: width 0.4s ease;
  }

  &:hover::before {
    width: 100%;
  }
`;

export const FormButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !["variant"].includes(prop),
})`
  background: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      case "secondary":
        return "linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(248, 250, 252, 0.05) 100%)";
      default:
        return "linear-gradient(145deg, rgba(113, 128, 150, 0.1) 0%, rgba(113, 128, 150, 0.05) 100%)";
    }
  }};
  color: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "white";
      case "secondary":
        return props.theme.colors.text;
      default:
        return props.theme.colors.text;
    }
  }};
  border: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "none";
      case "secondary":
        return "2px solid rgba(255, 255, 255, 0.3)";
      default:
        return "1px solid rgba(255, 255, 255, 0.2)";
    }
  }};
  padding: 14px 28px;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  min-width: 120px;
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1),
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
    background: ${(props) => {
      switch (props.variant) {
        case "primary":
          return "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)";
        case "secondary":
          return "linear-gradient(145deg, rgba(255, 255, 255, 0.15) 0%, rgba(248, 250, 252, 0.1) 100%)";
        default:
          return "linear-gradient(145deg, rgba(113, 128, 150, 0.2) 0%, rgba(113, 128, 150, 0.1) 100%)";
      }
    }};

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

  /* Efecto especial para botón primario */
  ${(props) =>
    props.variant === "primary" &&
    `
    &:hover {
      animation: primaryGlow 0.6s ease-in-out;
    }
    
    @keyframes primaryGlow {
      0%, 100% { 
        box-shadow: 
          0 16px 40px rgba(102, 126, 234, 0.2),
          0 8px 20px rgba(102, 126, 234, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.3);
      }
      50% { 
        box-shadow: 
          0 16px 40px rgba(102, 126, 234, 0.4),
          0 8px 20px rgba(102, 126, 234, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.4);
      }
    }
  `}
`;

export const ErrorMessage = styled(motion.div)`
  color: ${(props) => props.theme.colors.error};
  font-size: 0.9rem;
  margin-top: ${(props) => props.theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  background: linear-gradient(
    145deg,
    rgba(239, 68, 68, 0.1) 0%,
    rgba(220, 38, 38, 0.05) 100%
  );
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  backdrop-filter: blur(10px);
  font-weight: 600;
`;

export const ValidationIcon = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 700;
  transition: all 0.3s ease;

  ${(props) =>
    props.isValid
      ? `
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  `
      : `
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  `}

  &:hover {
    transform: scale(1.1);
  }
`;
