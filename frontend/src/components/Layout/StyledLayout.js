import styled from 'styled-components';
import { motion } from 'framer-motion';

export const MainLayout = styled(motion.div)`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

export const TopBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

export const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

export const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  @media (max-width: 768px) {
    gap: ${props => props.theme.spacing.xs};
  }
`;

export const AppLogo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};

  @media (max-width: 768px) {
    font-size: ${props => props.theme.fontSizes.md};
  }
`;

export const MainContent = styled(motion.div)`
  flex: 1;
  padding-top: 80px; /* Space for fixed top bar */
  padding-bottom: 20px;
  min-height: calc(100vh - 80px);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const SidePanel = styled(motion.div)`
  position: fixed;
  top: 70px;
  right: ${(props) => (props.isOpen ? "0" : "-400px")};
  width: 400px;
  height: calc(100vh - 70px);
  background: rgba(255, 255, 255, 0.9);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 999;
  transition: right 0.3s ease;
  overflow-y: auto;
  box-shadow: ${(props) => (props.isOpen ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "none")};

  @media (max-width: 768px) {
    width: 100%;
    right: ${(props) => (props.isOpen ? "0" : "-100%")};
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  }
`;

export const FloatingActions = styled(motion.div)`
  position: fixed;
  bottom: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  z-index: 998;

  @media (max-width: 768px) {
    bottom: ${props => props.theme.spacing.md};
    right: ${props => props.theme.spacing.md};
  }
`;

export const FloatingButton = styled(motion.button)`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: ${props => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes.lg};
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.large};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const StatusBar = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 32px;
  background: ${props => props.theme.colors.surface};
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.textSecondary};
  z-index: 997;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  backdrop-filter: blur(2px);
`;

export const BoardContainer = styled(motion.div)`
  padding: ${props => props.theme.spacing.lg};
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const QuickActions = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.lg};
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.sm};

  &:hover {
    background: ${props => props.theme.colors.primaryLight}10;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;