import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TaskCard = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['isDragging', 'priority'].includes(prop),
})`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.sm};
  box-shadow: ${props => props.isDragging ? props.theme.shadows.xl : props.theme.shadows.md};
  border-left: 4px solid ${props => {
    switch (props.priority) {
      case 'alta': return '#e53e3e';
      case 'media': return '#dd6b20';
      case 'baja': return '#38a169';
      default: return '#cbd5e0';
    }
  }};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  opacity: ${props => props.isDragging ? 0.5 : 1};
  transform: ${props => props.isDragging ? 'rotate(5deg)' : 'rotate(0deg)'};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.lg};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const TaskHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.md};
  gap: ${props => props.theme.spacing.sm};
`;

export const TaskTitle = styled(motion.h4)`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
  flex: 1;
  line-height: 1.4;
  word-break: break-word;
`;

export const TaskActions = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  opacity: 0;
  transition: opacity 0.2s ease;
  
  ${TaskCard}:hover & {
    opacity: 1;
  }
`;

export const ActionButton = styled(motion.button)`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => {
      switch (props.variant) {
        case 'edit': return 'rgba(66, 153, 225, 0.1)';
        case 'delete': return 'rgba(245, 101, 101, 0.1)';
        default: return props.theme.colors.background;
      }
    }};
    color: ${props => {
      switch (props.variant) {
        case 'edit': return props.theme.colors.primary;
        case 'delete': return props.theme.colors.error;
        default: return props.theme.colors.text;
      }
    }};
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const TaskDescription = styled(motion.p)`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0 0 ${props => props.theme.spacing.md} 0;
  line-height: 1.5;
  word-break: break-word;
`;

export const TaskMeta = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`;

export const PriorityBadge = styled(motion.span)`
  background: ${props => {
    switch (props.priority) {
      case 'alta': return 'linear-gradient(135deg, #dc3545, #c82333)';
      case 'media': return 'linear-gradient(135deg, #ffc107, #e0a800)';
      case 'baja': return 'linear-gradient(135deg, #28a745, #1e7e34)';
      default: return 'linear-gradient(135deg, #6c757d, #545b62)';
    }
  }};
  color: white;
  padding: 4px 10px;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: ${props => props.theme.shadows.sm};
`;

export const TaskDate = styled(motion.span)`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
  
  svg {
    font-size: 0.9rem;
  }
`;

export const AssignedUser = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  
  svg {
    font-size: 0.9rem;
  }
`;

export const AvatarCircle = styled(motion.div)`
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 50%;
  background: rgba(66, 153, 225, 0.15);
  border: 1px solid rgba(66, 153, 225, 0.3);
  color: ${props => props.theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TaskFooter = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => props.theme.spacing.md};
  padding-top: ${props => props.theme.spacing.sm};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

export const TaskTags = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin-top: ${props => props.theme.spacing.sm};
`;

export const Tag = styled(motion.span)`
  background: rgba(66, 153, 225, 0.1);
  color: ${props => props.theme.colors.primary};
  padding: 2px 8px;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(66, 153, 225, 0.2);
`;

export const DragIndicator = styled(motion.div)`
  position: absolute;
  top: ${props => props.theme.spacing.sm};
  right: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.8rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  
  ${TaskCard}:hover & {
    opacity: 0.5;
  }
`;