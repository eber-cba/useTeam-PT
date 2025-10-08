// components/Layout/StyledAppLayout.js
import styled from "styled-components";
import { motion } from "framer-motion";

export const MainLayout = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        rgba(120, 119, 198, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(255, 119, 198, 0.08) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 40%,
        rgba(120, 219, 255, 0.05) 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  position: relative;
  z-index: 2;
  padding: 0;
`;

export const BoardContainer = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 90;
`;
