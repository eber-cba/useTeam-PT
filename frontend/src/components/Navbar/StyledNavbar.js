// components/Navbar/StyledNavbar.js
import styled from "styled-components";
import { motion } from "framer-motion";

export const NavbarBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.95) 0%,
    rgba(15, 23, 42, 0.8) 50%,
    transparent 100%
  );
  backdrop-filter: blur(20px);
  z-index: 98;
  pointer-events: none;
`;

export const NavbarContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["$isScrolled"].includes(prop),
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => (props.$isScrolled ? "1rem 2rem" : "2rem")};
  background: ${(props) =>
    props.$isScrolled ? "rgba(255, 255, 255, 0.05)" : "transparent"};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  ${(props) =>
    props.$isScrolled &&
    `
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  `}

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const NavbarCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
  gap: 1rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: flex-end;
`;

export const AppLogo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

export const LogoIcon = styled(motion.div)`
  font-size: 1.8rem;
  color: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const SearchContainer = styled(motion.div)`
  position: relative;
  overflow: hidden;
`;

export const SearchInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  color: white;
  font-size: 0.9rem;
  width: 100%;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: rgba(102, 126, 234, 0.5);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const QuickActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const QuickActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
`;

export const ActionIcon = styled.span`
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

export const NavButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 1);
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const NotificationBadge = styled(motion.span)`
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(15, 23, 42, 0.9);
`;

export const MobileMenuButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !["$active"].includes(prop),
})`
  display: none;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  backdrop-filter: blur(10px);

  ${(props) =>
    props.$active &&
    `
    background: rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.3);
    color: rgba(255, 255, 255, 1);
  `}

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    font-size: 1.2rem;
  }
`;
