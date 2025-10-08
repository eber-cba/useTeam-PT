// StyledUserInfo.js
import styled from "styled-components";
import { motion } from "framer-motion";

export const UserInfoContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: 1000;
`;

export const UserAvatar = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["$isActive"].includes(prop),
})`
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  color: white;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(255, 255, 255, 0.1);
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
      rgba(255, 255, 255, 0.2) 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .avatar-content {
    position: relative;
    z-index: 2;
  }

  .avatar-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.4) 0%,
      transparent 70%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
  }

  &:hover {
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
    transform: scale(1.1);

    &::before {
      opacity: 1;
    }

    .avatar-glow {
      width: 80px;
      height: 80px;
    }
  }

  ${(props) =>
    props.$isActive &&
    `
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.5), 0 12px 35px rgba(102, 126, 234, 0.6);
    transform: scale(1.1);
    
    .avatar-glow {
      width: 80px;
      height: 80px;
    }
  `}
`;

export const OnlineIndicator = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: 2px solid rgba(255, 255, 255, 0.9);
  z-index: 3;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.6);

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: rgba(16, 185, 129, 0.4);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(1);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.5);
      opacity: 0;
    }
  }
`;

export const MenuBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 999;
`;

export const UserMenu = styled(motion.div)`
  position: absolute;
  top: 60px;
  right: 0;
  width: 320px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  overflow: hidden;
  z-index: 1000;

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    right: 20px;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    transform: rotate(45deg);
    border-bottom: none;
    border-right: none;
  }
`;

export const UserMenuHeader = styled.div`
  padding: 24px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const UserAvatarLarge = styled(motion.div)`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  color: white;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  .avatar-content {
    position: relative;
    z-index: 2;
  }

  .avatar-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.3) 0%,
      transparent 70%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: rotateGlow 4s linear infinite;
  }

  @keyframes rotateGlow {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

export const UserDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

export const UserName = styled(motion.h4)`
  margin: 0 0 4px 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserEmail = styled(motion.p)`
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserStats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 20px 24px;
`;

export const StatItem = styled(motion.div)`
  text-align: center;
  padding: 12px 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  .stat-icon {
    font-size: 1.2rem;
    color: #667eea;
    margin-bottom: 6px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(102, 126, 234, 0.3);
    transform: translateY(-2px);
  }
`;

export const StatValue = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 2px;
`;

export const StatLabel = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
`;

export const MenuDivider = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  margin: 8px 24px;
`;

export const MenuItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 0;

  &:hover {
    color: rgba(255, 255, 255, 0.95);
  }

  &:active {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const MenuIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #667eea;
`;

export const ThemeToggle = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  transition: all 0.3s ease;

  .toggle-switch {
    margin-left: auto;
    width: 44px;
    height: 24px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;

    &.active {
      background: rgba(102, 126, 234, 0.3);
      border-color: rgba(102, 126, 234, 0.5);
    }
  }

  .toggle-handle {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    .active & {
      left: 22px;
      background: #667eea;
    }
  }

  &:hover {
    color: rgba(255, 255, 255, 0.95);

    .toggle-switch {
      background: rgba(255, 255, 255, 0.15);
    }
  }
`;

export const UserMenuActions = styled(motion.div)`
  padding: 16px 24px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const LogoutButton = styled(motion.button)`
  width: 100%;
  padding: 12px 20px;
  background: linear-gradient(
    135deg,
    rgba(239, 68, 68, 0.2) 0%,
    rgba(220, 38, 38, 0.15) 100%
  );
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  color: rgba(239, 68, 68, 0.9);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(239, 68, 68, 0.3) 0%,
      rgba(220, 38, 38, 0.25) 100%
    );
    border-color: rgba(239, 68, 68, 0.5);
    color: rgba(239, 68, 68, 1);
  }

  svg {
    font-size: 1.1rem;
  }
`;
