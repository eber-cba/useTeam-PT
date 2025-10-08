// src/components/LoadingScreen/LoadingScreen.jsx
import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  position: relative;
  overflow: hidden;
`;

const LoadingSpinner = styled(motion.div)`
  width: 80px;
  height: 80px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #667eea;
  border-radius: 50%;
  margin-bottom: 2rem;
`;

const LoadingText = styled(motion.p)`
  font-size: 1.3rem;
  font-weight: 300;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`;

const FloatingOrbs = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(102, 126, 234, 0.1) 0%,
    transparent 70%
  );
  filter: blur(20px);
`;

const LoadingScreen = () => {
  return (
    <LoadingContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <FloatingOrbs
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "20%", left: "20%" }}
      />

      <FloatingOrbs
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ bottom: "30%", right: "25%" }}
      />

      <LoadingSpinner
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />

      <LoadingText
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Cargando tu espacio de trabajo...
      </LoadingText>
    </LoadingContainer>
  );
};

export default LoadingScreen;
