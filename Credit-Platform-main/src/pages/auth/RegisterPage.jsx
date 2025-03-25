"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
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
  overflow-y: auto;
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

const TermsCheckbox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`

const Checkbox = styled.input`
  margin-right: 0.5rem;
  margin-top: 0.25rem;
`

const TermsText = styled.label`
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

const LoginLink = styled.div`
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

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [errors, setErrors] = useState({})

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis"
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis"
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email est invalide"
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis"
    } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Le numéro de téléphone est invalide"
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères"
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
    }

    // Validate terms acceptance
    if (!acceptTerms) {
      newErrors.terms = "Vous devez accepter les conditions d'utilisation"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      setError("")

      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      })

      if (result.success) {
        navigate("/otp-verification", { state: { email: formData.email } })
      } else {
        setError(result.error || "Une erreur est survenue lors de l'inscription")
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
        <Title>Rejoignez-nous !</Title>
        <Subtitle>Inscrivez-vous pour commencer votre voyage avec nous.</Subtitle>
      </LeftPanel>

      <RightPanel
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FormContainer>
          <FormTitle>Inscription</FormTitle>
          <FormSubtitle>Créez votre compte en quelques étapes simples</FormSubtitle>

          {error && (
            <Alert variant="error" style={{ marginBottom: "1.5rem" }}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleChange}
                icon={<FiUser />}
                error={errors.firstName}
              />
            </InputGroup>

            <InputGroup>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Nom"
                value={formData.lastName}
                onChange={handleChange}
                icon={<FiUser />}
                error={errors.lastName}
              />
            </InputGroup>

            <InputGroup>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Adresse e-mail"
                value={formData.email}
                onChange={handleChange}
                icon={<FiMail />}
                error={errors.email}
              />
            </InputGroup>

            <InputGroup>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Téléphone (+261 XX XXX XX)"
                value={formData.phone}
                onChange={handleChange}
                icon={<FiPhone />}
                error={errors.phone}
              />
            </InputGroup>

            <InputGroup>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                icon={<FiLock />}
                error={errors.password}
              />
              <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </PasswordToggle>
            </InputGroup>

            <InputGroup>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmer le mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                icon={<FiLock />}
                error={errors.confirmPassword}
              />
              <PasswordToggle type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </PasswordToggle>
            </InputGroup>

            <TermsCheckbox>
              <Checkbox
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
              />
              <TermsText htmlFor="terms">
                J'accepte les <a href="#">conditions d'utilisation</a> et la{" "}
                <a href="#">politique de confidentialité</a>
              </TermsText>
            </TermsCheckbox>
            {errors.terms && (
              <Alert variant="error" style={{ marginBottom: "1.5rem" }}>
                {errors.terms}
              </Alert>
            )}

            <Button type="submit" fullWidth isLoading={loading} disabled={loading}>
              S'inscrire
            </Button>
          </Form>

          <LoginLink>
            Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
          </LoginLink>
        </FormContainer>
      </RightPanel>
    </Container>
  )
}

export default RegisterPage

