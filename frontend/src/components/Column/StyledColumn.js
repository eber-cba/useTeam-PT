import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ColumnContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['isOver'].includes(prop),
})`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.lg};
  min-width: 320px;
  max-width: 350px;
  min-height: 400px;
  box-shadow: ${props => props.theme.shadows.lg};
  border: 2px solid ${props => props.isOver ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.2)'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.isOver ? 
      `linear-gradient(90deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})` : 
      'transparent'
    };
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-width: 100%;
    max-width: 100%;
  }
`;

export const ColumnHeader = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 2px solid ${props => props.theme.colors.border};
  position: relative;
`;

export const ColumnTitle = styled(motion.h3).withConfig({
  shouldForwardProp: (prop) => !['editable'].includes(prop),
})`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0;
  flex: 1;
  cursor: ${props => props.editable ? 'pointer' : 'default'};
  padding: 8px 12px;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.editable ? 'rgba(66, 153, 225, 0.1)' : 'transparent'};
  }
`;

export const ColumnTitleInput = styled(motion.input)`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  background: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm};
  flex: 1;
  outline: none;
  
  &:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }
`;

export const TaskCount = styled(motion.span)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  padding: 4px 12px;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.85rem;
  font-weight: 600;
  margin-left: ${props => props.theme.spacing.sm};
  box-shadow: ${props => props.theme.shadows.sm};
`;

export const ColumnActions = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  align-items: center;
  margin-left: ${props => props.theme.spacing.sm};
`;

export const ActionIcon = styled(motion.button)`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.1rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => {
      switch (props.variant) {
        case 'edit': return 'rgba(66, 153, 225, 0.1)';
        case 'delete': return 'rgba(245, 101, 101, 0.1)';
        case 'drag': return 'rgba(128, 90, 213, 0.1)';
        default: return props.theme.colors.background;
      }
    }};
    color: ${props => {
      switch (props.variant) {
        case 'edit': return props.theme.colors.primary;
        case 'delete': return props.theme.colors.error;
        case 'drag': return props.theme.colors.secondary;
        default: return props.theme.colors.text;
      }
    }};
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const TasksContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  min-height: 200px;
  max-height: 600px;
  overflow-y: auto;
  padding-right: ${props => props.theme.spacing.xs};
  
  /* Scrollbar personalizado */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: 3px;
    transition: background 0.3s ease;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.textSecondary};
  }
`;

export const EmptyColumnMessage = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textSecondary};
  font-style: italic;
  
  p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

export const DragHandle = styled(motion.div)`
  cursor: grab;
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.textSecondary};
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(128, 90, 213, 0.1);
    color: ${props => props.theme.colors.secondary};
  }
  
  &:active {
    cursor: grabbing;
  }
`;