import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useKanban } from "../../context/KanbanContext";

const StatusContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) =>
      props.$isConnected
        ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
        : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"};
    opacity: 0.9;
    z-index: -1;
  }
`;

const StatusDot = styled(motion.div)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: white;
    transform: translate(-50%, -50%);
    animation: ${(props) =>
      props.$isConnected ? "pulse 2s infinite" : "none"};
  }

  @keyframes pulse {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      opacity: 0.3;
      transform: translate(-50%, -50%) scale(1.5);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const StatusText = styled(motion.span)`
  color: white;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

export default function ConnectionStatus() {
  const { isConnected } = useKanban();

  return (
    <StatusContainer
      $isConnected={isConnected}
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 300 },
      }}
    >
      <StatusDot
        $isConnected={isConnected}
        animate={{
          scale: isConnected ? [1, 1.2, 1] : 1,
          rotate: isConnected ? [0, 180, 360] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isConnected ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
      <StatusText
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        {isConnected ? "Conectado" : "Desconectado"}
      </StatusText>
    </StatusContainer>
  );
}
