// components/StatusBar/StyledStatusBar.js
import styled from "styled-components";
import { motion } from "framer-motion";

export const StatusBarContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
`;

export const StatusText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const VersionInfo = styled.span`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 700;
`;

export const StatusItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
