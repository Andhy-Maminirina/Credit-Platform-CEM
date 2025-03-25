"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FiMail, FiLock, FiUser, FiAlertCircle } from "react-icons/fi"
import { motion } from "framer-motion"
import Button from "../../../components/ui/Button"
import { useAuth } from "../../../contexts/AuthContext"
import LogoCEM from "../../../assets/LOGO-CEM-WEB.png"

// Conteneur principal
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  padding: 1rem;
`

// Carte du formulaire
const LoginCard = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
`

// Logo
const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  img {
    height: 60px;
    border-radius: 12px;
    width: 80px;
  height: 80px;
  }
`

// Titre
const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin-bottom: 0.5rem;
`

// Sous-titre
const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  margin-bottom: 2rem;
`

// Formulaire
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

// Groupe de formulaire
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

// Étiquette
const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`

// Conteneur d'entrée
const InputWrapper = styled.div`
  position: relative;
`

// Champ de saisie
const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #111827;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`

// Icône
const Icon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
`

// Message d'erreur
const ErrorMessage = styled.div`
  padding: 0.75rem;
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  border-radius: 8px;
  color: #b91c1c;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

// Sélecteur de type d'administrateur
const AdminTypeSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

// Option de type d'administrateur
const AdminTypeOption = styled.div`
  flex: 1;
  padding: 1rem;
  border: 1px solid ${(props) => (props.selected ? "#e53e3e" : "#d1d5db")};
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.selected ? "#fff5f5" : "white")};
  
  &:hover {
    border-color: ${(props) => (props.selected ? "#e53e3e" : "#9ca3af")};
  }
`

// Titre de l'option
const OptionTitle = styled.div`
  font-weight: 600;
  color: #111827;
  margin-top: 0.5rem;
`

// Lien de mot de passe oublié
const ForgotPasswordLink = styled.a`
  font-size: 0.875rem;
  color: #e53e3e;
  text-align: right;
  margin-top: -1rem;
  cursor: pointer;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`

/**
 * Composant de connexion administrateur
 * Permet aux administrateurs de se connecter en distinguant les types (technique/conseiller)
 */
const AdminLogin = () => {
  // État pour le type d'administrateur
  const [adminType, setAdminType] = useState("advisor") // "advisor" ou "technical"

  // États pour les champs du formulaire
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // États pour la gestion du formulaire
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { login } = useAuth()

  /**
   * Gère la soumission du formulaire de connexion
   * @param {Event} e - L'événement de soumission
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation des champs
    if (!email || !password) {
      setError("Veuillez remplir tous les champs")
      return
    }

    try {
      setLoading(true)
      setError("")

      // Appel à la fonction de connexion du contexte d'authentification
      const response = await login(email, password, true, adminType)

      if (response.success) {
        // Redirection vers la page de vérification OTP
        navigate("/admin/otp-verification", {
          state: {
            email,
            adminType,
          },
        })
      }
    } catch (err) {
      console.error("Erreur de connexion:", err)
      setError(err.message || "Identifiants incorrects. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour naviguer vers la page de mot de passe oublié
  const handleForgotPassword = () => {
    navigate("/admin/forgot-password")
  }

  return (
    <Container>
      <LoginCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Logo>
          <img src={LogoCEM} alt="Logo CEM" />
        </Logo>

        <Title>Connexion Administrateur</Title>
        <Subtitle>Connectez-vous à votre compte administrateur</Subtitle>

        {/* Sélecteur de type d'administrateur */}
        <AdminTypeSelector>
          <AdminTypeOption selected={adminType === "advisor"} onClick={() => setAdminType("advisor")}>
            <FiUser size={24} color={adminType === "advisor" ? "#e53e3e" : "#6b7280"} />
            <OptionTitle>Conseiller</OptionTitle>
          </AdminTypeOption>

          <AdminTypeOption selected={adminType === "technical"} onClick={() => setAdminType("technical")}>
            <FiUser size={24} color={adminType === "technical" ? "#e53e3e" : "#6b7280"} />
            <OptionTitle>Technique</OptionTitle>
          </AdminTypeOption>
        </AdminTypeSelector>

        {error && (
          <ErrorMessage>
            <FiAlertCircle size={18} />
            {error}
          </ErrorMessage>
        )}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Adresse e-mail</Label>
            <InputWrapper>
              <Icon>
                <FiMail size={20} />
              </Icon>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="adresse@exemple.com"
                disabled={loading}
                required
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Mot de passe</Label>
            <InputWrapper>
              <Icon>
                <FiLock size={20} />
              </Icon>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Votre mot de passe"
                disabled={loading}
                required
              />
            </InputWrapper>
          </FormGroup>

          <ForgotPasswordLink onClick={handleForgotPassword}>Mot de passe oublié?</ForgotPasswordLink>
          
          <Button type="submit" disabled={loading} isLoading={loading} variant="primary" fullWidth>
            {loading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </Form>
      </LoginCard>
    </Container>
  )
}

export default AdminLogin

