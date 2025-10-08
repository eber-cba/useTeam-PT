// StyledColumn.js
import styled from "styled-components";
import { motion } from "framer-motion";

/**
 * Note: usamos optional chaining en theme para evitar romper si no hay theme definido.
 * Filtramos la prop `isOver` para que no se pase al DOM.
 */
export const ColumnContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["isOver"].includes(prop),
})`
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  padding: ${(p) => p.theme?.spacing?.lg ?? "18px"};
  min-width: 320px;
  max-width: 420px;
  min-height: 420px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.55),
    rgba(255, 255, 255, 0.35)
  );
  backdrop-filter: blur(8px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 10px 30px rgba(16, 24, 40, 0.06);
  transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1),
    box-shadow 0.35s ease, border-color 0.35s ease;
  will-change: transform, box-shadow;
  -webkit-tap-highlight-color: transparent;

  /* top glow bar */
  &::before {
    content: "";
    position: absolute;
    left: 12px;
    right: 12px;
    top: 12px;
    height: 6px;
    border-radius: 10px;
    background: ${(p) =>
      p.isOver
        ? "linear-gradient(90deg,#7c3aed,#4f46e5,#06b6d4)"
        : "linear-gradient(90deg, rgba(99,102,241,0.25), rgba(168,85,247,0.2))"};
    transition: all 400ms cubic-bezier(0.2, 0.9, 0.3, 1);
    pointer-events: none;
    z-index: 1;
  }

  /* shimmer overlay (appears more on hover/drag) */
  &::after {
    content: "";
    position: absolute;
    inset: -30% -30%;
    background: radial-gradient(
        circle at 10% 10%,
        rgba(255, 255, 255, 0.08),
        transparent 8%
      ),
      radial-gradient(
        circle at 90% 90%,
        rgba(255, 255, 255, 0.03),
        transparent 12%
      );
    opacity: 0;
    transform: scale(0.98);
    transition: opacity 300ms ease, transform 300ms ease;
    pointer-events: none;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 30px 60px rgba(16, 24, 40, 0.16);
    border-color: rgba(79, 70, 229, 0.12);
  }

  &:hover::after {
    opacity: 1;
    transform: scale(1);
  }

  /* estado cuando se arrastra */
  &[data-dragging="true"] {
    transform: rotate(-1.5deg) scale(1.03) !important;
    box-shadow: 0 50px 90px rgba(16, 24, 40, 0.2) !important;
    z-index: 1200 !important;
    border-color: rgba(99, 102, 241, 0.28) !important;

    &::before {
      height: 10px;
      left: 6px;
      right: 6px;
      background: linear-gradient(90deg, #7c3aed, #6366f1, #06b6d4) !important;
    }

    &::after {
      opacity: 0.9;
      transition-duration: 200ms;
    }
  }

  @media (max-width: 900px) {
    min-width: 92vw;
    max-width: 92vw;
    padding: ${(p) => p.theme?.spacing?.md ?? "12px"};
  }
`;

/* Header */
export const ColumnHeader = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 8px;
  padding-bottom: 10px;
  position: relative;
  z-index: 3;
`;

/* Title (horizontal, pill-like) */
export const ColumnTitle = styled(motion.h3).withConfig({
  shouldForwardProp: (prop) => !["editable"].includes(prop),
})`
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  padding: 8px 14px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.4)
  );
  box-shadow: 0 3px 10px rgba(15, 23, 42, 0.06);
  cursor: ${(p) => (p.editable ? "text" : "default")};
  display: inline-flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 60%;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  }

  @media (max-width: 900px) {
    max-width: 100%;
    font-size: 1rem;
  }
`;

/* Input para renombrar */
export const ColumnTitleInput = styled(motion.input)`
  font-size: 1.05rem;
  font-weight: 700;
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid rgba(79, 70, 229, 0.14);
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  width: 100%;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.06);
`;

/* acciones en header */
export const ColumnActions = styled(motion.div)`
  display: flex;
  gap: 8px;
  align-items: center;
`;

/* boton icono reutilizable */
export const ActionIcon = styled(motion.button)`
  position: relative;
  border: none;
  background: rgba(255, 255, 255, 0.6);
  padding: 8px;
  border-radius: 10px;
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(2, 6, 23, 0.06);
  transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;
  color: #374151;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px) scale(1.04);
    box-shadow: 0 12px 30px rgba(2, 6, 23, 0.12);
  }

  svg {
    font-size: 18px;
  }
`;

/* drag handle */
export const DragHandle = styled(motion.div)`
  cursor: grab;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 10px;
  min-width: 44px;
  min-height: 44px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.4)
  );
  border: 1px solid rgba(15, 23, 42, 0.04);
  color: #6b7280;
  transition: transform 180ms ease, background 180ms ease;
  &:hover {
    transform: translateY(-3px) scale(1.06);
    color: #4f46e5;
    background: rgba(79, 70, 229, 0.06);
  }
`;

/* contenedor de tareas */
export const TasksContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 6px;
  padding: 6px;
  min-height: 120px;
  max-height: 560px;
  overflow-y: auto;
  position: relative;
  z-index: 2;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #a78bfa, #7c3aed);
    border-radius: 8px;
  }

  /* fade top/bottom for depth */
  &::before,
  &::after {
    content: "";
    position: sticky;
    left: 0;
    right: 0;
    height: 18px;
    pointer-events: none;
    z-index: 3;
  }
  &::before {
    top: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.85),
      transparent
    );
  }
  &::after {
    bottom: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.85), transparent);
  }
`;

/* mensaje vacío */
export const EmptyColumnMessage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  justify-content: center;
  padding: 18px;
  border-radius: 12px;
  color: #6b7280;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.06),
    rgba(168, 85, 247, 0.04)
  );
  border: 1px dashed rgba(99, 102, 241, 0.12);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
`;

/* una Card simple (puedes usarla si renderizas tareas desde aquí) */
export const TaskCard = styled(motion.div)`
  padding: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: grab;
  transition: transform 180ms ease, box-shadow 180ms ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 32px rgba(15, 23, 42, 0.12);
  }
`;
