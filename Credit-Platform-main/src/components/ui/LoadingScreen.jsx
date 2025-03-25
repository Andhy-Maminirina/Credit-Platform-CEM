"use client"
import styled, { keyframes } from "styled-components"
import { motion } from "framer-motion"
import LogoCEM from "../../assets/LOGO-CEM-WEB.png"


const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const spinnerAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-in-out;
`

const LogoContainer = styled(motion.div)`
  margin-bottom: 2rem;
`

// Modifiez le composant Logo pour utiliser des valeurs par défaut si le thème n'est pas disponible
const Logo = styled.img`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, 
    ${(props) => props.theme?.colors?.primary?.[600] || "#FF4136"} 0%, 
    ${(props) => props.theme?.colors?.primary?.[500] || "#FF6B61"} 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  box-shadow: 0 10px 25px rgba(255, 65, 54, 0.3);
`

// Modifiez également le Spinner pour utiliser des valeurs par défaut
const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 65, 54, 0.1);
  border-radius: 50%;
  border-top-color: ${(props) => props.theme?.colors?.primary?.[600] || "#FF4136"};
  animation: ${spinnerAnimation} 1s linear infinite;
`

// Et le Text
const Text = styled(motion.p)`
  margin-top: 1rem;
  font-size: 1rem;
  color: ${(props) => props.theme?.colors?.gray?.[600] || "#4B5563"};
`

const LoadingScreen = () => {
  return (
    <Container>
      <LogoContainer
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Logo src={LogoCEM}></Logo>
      </LogoContainer>

      <Spinner />

      <Text initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
        Chargement...
      </Text>
    </Container>
  )
}

export default LoadingScreen

