"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import { useAuth } from "../../contexts/AuthContext"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import Alert from "../../components/ui/Alert"

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

const Form = styled.form`
  margin-top: 2rem;
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

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.gray[500]};
  cursor: pointer;
  
  &:hover {
    color: ${(props) => props.theme.colors.gray[700]};
  }
`

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const RememberMe = styled.div`
  display: flex;
  align-items: center;
`

const Checkbox = styled.input`
  margin-right: 0.5rem;
`

const ForgotPassword = styled(Link)`
  color: ${(props) => props.theme.colors.primary[600]};
  font-size: 0.875rem;
  
  &:hover {
    text-decoration: underline;
  }
`

const SignupLink = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.gray[600]};
  
  a {
    color: ${(props) => props.theme.colors.primary[600]};
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Veuillez remplir tous les champs")
      return
    }

    try {
      setLoading(true)
      setError("")

      const result = await login(email, password)

      if (result.success) {
        if (result.needOtp) {
          navigate("/otp-verification", { state: { email } })
        } else {
          navigate("/client/dashboard")
        }
      } else {
        setError(result.error || "Identifiants incorrects")
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
        <Title>Bienvenue !</Title>
        <Subtitle>Connectez-vous pour accéder à votre compte et profiter de nos services.</Subtitle>
      </LeftPanel>

      <RightPanel
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FormContainer>
          <FormTitle>Connexion</FormTitle>
          <FormSubtitle>Entrez vos identifiants pour vous connecter</FormSubtitle>

          {error && (
            <Alert variant="error" style={{ marginBottom: "1.5rem" }}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                id="email"
                type="email"
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<FiMail />}
                required
              />
            </InputGroup>

            <InputGroup>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<FiLock />}
                required
              />
              <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </PasswordToggle>
            </InputGroup>

            <RememberForgot>
              <RememberMe>
                <Checkbox
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember-me">Se souvenir de moi</label>
              </RememberMe>

              <ForgotPassword to="/forgot-password">Mot de passe oublié ?</ForgotPassword>
            </RememberForgot>

            <Button type="submit" fullWidth isLoading={loading} disabled={loading}>
              Se connecter
            </Button>
          </Form>

          <SignupLink>
            Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link>
          </SignupLink>
        </FormContainer>
      </RightPanel>
    </Container>
  )
}

export default LoginPage

