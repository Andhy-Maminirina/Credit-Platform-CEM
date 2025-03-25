"use client"
import styled from "styled-components"
import { motion } from "framer-motion"

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
`

const LeftPanel = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, 
    ${(props) => props.theme.colors.primary[600]} 0%, 
    ${(props) => props.theme.colors.primary[500]} 100%);
  color: white;
  text-align: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const RightPanel = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: white;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const Subtitle = styled.p`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
`

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <Container>
      <LeftPanel initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </LeftPanel>

      <RightPanel
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FormContainer>{children}</FormContainer>
      </RightPanel>
    </Container>
  )
}

export default AuthLayout

