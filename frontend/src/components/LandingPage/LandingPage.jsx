// src/components/LandingPage/LandingPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import AuthModal from "../Auth/AuthModal";

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

const AppContainer = styled(motion.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const AppTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
`;

const AppSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
`;

// Componente de página de inicio
const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  return (
    <>
      <AppContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
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
            >
              Kanban Team
            </AppTitle>
            <AppSubtitle
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
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

export default LandingPage;
