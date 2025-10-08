import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./theme/GlobalTheme";
import {
  FiGrid,
  FiMenu,
  FiX,
  FiArrowRight,
  FiUsers,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { KanbanProvider } from "./context/KanbanContext";
import { ToastProvider } from "./context/ToastContext";
import Board from "./components/Board/Board";
import ExportButton from "./components/ExportButton/ExportButton";
import ConnectionStatus from "./components/ConnectionStatus/ConnectionStatus";
import AuthModal from "./components/Auth/AuthModal";
import UserInfo from "./components/UserInfo/UserInfo";
import CollaborationPanel from "./components/CollaborationPanel/CollaborationPanel";
import {
  AppContainer,
  AppTitle,
  AppSubtitle,
  Button,
} from "./components/UI/StyledComponents";
import {
  MainLayout,
  TopBar,
  TopBarLeft,
  TopBarRight,
  AppLogo,
  MainContent,
  SidePanel,
  FloatingActions,
  StatusBar,
  Overlay,
  BoardContainer,
  QuickActions,
  MobileMenuButton,
} from "./components/Layout/StyledLayout";
import { motion } from "framer-motion";
import styled from "styled-components";

// Styled components para la página de inicio
const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  opacity: 0.7;
  pointer-events: none;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
`;

const LandingContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  z-index: 2;
  position: relative;
  padding: 2rem;
`;

const LogoSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
`;

const AnimatedLogo = styled(motion.div)`
  font-size: 4rem;
  margin-bottom: 1rem;
  display: inline-block;
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  width: 100%;
  max-width: 1000px;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
`;

const ActionsSection = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3rem;
`;

const PrimaryButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
`;

const ButtonIcon = styled.span`
  font-size: 1.2rem;
`;

// Componente de página de inicio
const LandingPage = ({ onLogin, onRegister }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  return (
    <>
      <AppContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Fondo animado mejorado */}
        <AnimatedBackground>
          <FloatingElement
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ top: "10%", left: "10%" }}
          >
            ✨
          </FloatingElement>
          <FloatingElement
            animate={{
              y: [0, 15, 0],
              x: [0, -15, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ top: "20%", right: "15%" }}
          >
            🚀
          </FloatingElement>
          <FloatingElement
            animate={{
              y: [0, -25, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ bottom: "20%", left: "20%" }}
          >
            💼
          </FloatingElement>
          <FloatingElement
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0],
              rotate: [0, 8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ bottom: "15%", right: "10%" }}
          >
            📊
          </FloatingElement>
        </AnimatedBackground>

        <LandingContent
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <LogoSection
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatedLogo
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              📋
            </AnimatedLogo>
            <AppTitle
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{
                fontSize: "3.5rem",
                fontWeight: "800",
                background: "linear-gradient(45deg, #fff, #f0f0f0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "10px",
              }}
            >
              Kanban Team
            </AppTitle>
            <AppSubtitle
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                fontSize: "1.3rem",
                color: "rgba(255,255,255,0.9)",
                fontWeight: "300",
              }}
            >
              Organiza tu trabajo de manera inteligente
            </AppSubtitle>
          </LogoSection>

          <FeaturesGrid
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <FeatureCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FeatureIcon>🎯</FeatureIcon>
              <FeatureTitle>Gestión Visual</FeatureTitle>
              <FeatureDescription>
                Visualiza el progreso de tus proyectos con tableros Kanban
                intuitivos
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FeatureIcon>⚡</FeatureIcon>
              <FeatureTitle>Tiempo Real</FeatureTitle>
              <FeatureDescription>
                Colabora con tu equipo en tiempo real y mantente siempre
                sincronizado
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FeatureIcon>📈</FeatureIcon>
              <FeatureTitle>Productividad</FeatureTitle>
              <FeatureDescription>
                Aumenta la eficiencia de tu equipo con herramientas inteligentes
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>

          <ActionsSection
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <PrimaryButton
              onClick={() => {
                setShowAuthModal(true);
                setAuthMode("login");
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <ButtonIcon>🚀</ButtonIcon>
              Iniciar Sesión
            </PrimaryButton>

            <SecondaryButton
              onClick={() => {
                setShowAuthModal(true);
                setAuthMode("register");
              }}
              whileHover={{
                scale: 1.05,
                y: -2,
                background: "rgba(255,255,255,0.15)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <ButtonIcon>✨</ButtonIcon>
              Crear Cuenta
            </SecondaryButton>
          </ActionsSection>
        </LandingContent>
      </AppContainer>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

function AppContent() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' o 'register'
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const LoadingContainer = motion.div;

  if (isLoading) {
    return (
      <AppContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LoadingContainer
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            style={{
              width: "60px",
              height: "60px",
              border: "4px solid rgba(255,255,255,0.3)",
              borderTop: "4px solid white",
              borderRadius: "50%",
              marginBottom: "20px",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            style={{ fontSize: "1.3rem", fontWeight: "300" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Cargando tu espacio de trabajo...
          </motion.p>
        </LoadingContainer>
      </AppContainer>
    );
  }

  // Si no está autenticado, mostrar página de inicio
  if (!user) {
    return <LandingPage />;
  }

  // Usuario autenticado - mostrar aplicación principal
  return (
    <KanbanProvider>
      <MainLayout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TopBar
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <TopBarLeft>
            <AppLogo whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <FiGrid />
              <span>Kanban Team</span>
            </AppLogo>
          </TopBarLeft>

          <TopBarRight>
            <QuickActions>
              <UserInfo />
            </QuickActions>
            <MobileMenuButton
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showMobileMenu ? <FiX /> : <FiMenu />}
            </MobileMenuButton>
          </TopBarRight>
        </TopBar>

        <MainContent>
          <BoardContainer>
            <Board />
          </BoardContainer>
        </MainContent>

        <SidePanel isOpen={showSidePanel || showMobileMenu}>
          <CollaborationPanel />
          <ExportButton />
        </SidePanel>

        {(showSidePanel || showMobileMenu) && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowSidePanel(false);
              setShowMobileMenu(false);
            }}
          />
        )}

        <StatusBar
          initial={{ y: 32 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <span>Tablero Kanban Colaborativo v1.0</span>
        </StatusBar>
      </MainLayout>
    </KanbanProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
