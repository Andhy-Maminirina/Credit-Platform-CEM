"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"
import { FiMail, FiArrowLeft, FiCheck, FiX } from "react-icons/fi"
import { useAuth } from "../../contexts/AuthContext"
import LogoCEM from "../../assets/LOGO-CEM-WEB.png"

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, 
    ${(props) => props.theme.colors.primary[600]} 0%, 
    ${(props) => props.theme.colors.primary[500]} 100%);
`

const LeftPanel = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: white;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.05);
    border-bottom-left-radius: 100px;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 64px;
    height: 64px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    margin-left: -20px;
    margin-bottom: -20px;
    z-index: 0;
  }
`

const RightPanel = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 2rem;
`

const Logo = styled.img`
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary[600]};
  margin-bottom: 2rem;
  box-shadow: 0 10px 25px rgba(255, 65, 54, 0.2);
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  text-align: center;
  position: relative;
  z-index: 1;
`

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  max-width: 400px;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
`

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
`

const FormSubtitle = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.gray[500]};
  margin-bottom: 2rem;
  text-align: center;
`

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid ${(props) => (props.error ? props.theme.colors.error : props.theme.colors.gray[300])};
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary[600]};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary[100]};
  }
`

const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.gray[400]};
`

const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => props.theme.colors.primary[600]};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary[700]};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors.gray[600]};
  font-size: 0.875rem;
  margin-top: 1.5rem;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colors.gray[900]};
  }
`

const SuccessMessage = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.success}20;
  border-left: 4px solid ${(props) => props.theme.colors.success};
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 4px;

  svg {
    color: ${(props) => props.theme.colors.success};
    flex-shrink: 0;
  }

  p {
    color: ${(props) => props.theme.colors.gray[700]};
    font-size: 0.875rem;
  }
`

const ErrorMessage = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.error}20;
  border-left: 4px solid ${(props) => props.theme.colors.error};
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 4px;

  svg {
    color: ${(props) => props.theme.colors.error};
    flex-shrink: 0;
  }

  p {
    color: ${(props) => props.theme.colors.gray[700]};
    font-size: 0.875rem;
  }
`

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const { forgotPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setError("Veuillez saisir votre adresse e-mail")
      return
    }

    try {
      setLoading(true)
      setError("")

      const result = await forgotPassword(email)

      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.error || "Une erreur est survenue. Veuillez réessayer.")
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <LeftPanel initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Logo src={LogoCEM}></Logo>
        <Title>Mot de passe oublié ?</Title>
        <Subtitle>Pas de panique ! Nous allons vous aider à récupérer l'accès à votre compte.</Subtitle>
      </LeftPanel>

      <RightPanel
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Réinitialisation du mot de passe</FormTitle>
            <FormSubtitle>Saisissez votre adresse e-mail pour recevoir un lien de réinitialisation</FormSubtitle>

            {error && (
              <ErrorMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <FiX />
                <p>{error}</p>
              </ErrorMessage>
            )}

            {success ? (
              <SuccessMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <FiCheck />
                <p>Un e-mail de réinitialisation a été envoyé à {email}. Veuillez vérifier votre boîte de réception.</p>
              </SuccessMessage>
            ) : (
              <InputGroup>
                <InputIcon>
                  <FiMail />
                </InputIcon>
                <Input
                  type="email"
                  placeholder="Adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            )}

            {!success && (
              <Button type="submit" disabled={loading}>
                {loading ? "Envoi en cours..." : "Envoyer le lien"}
              </Button>
            )}

            <BackLink to="/login">
              <FiArrowLeft />
              Retour à la connexion
            </BackLink>
          </Form>
        </FormContainer>
      </RightPanel>
    </Container>
  )
}

export default ForgotPasswordPage

