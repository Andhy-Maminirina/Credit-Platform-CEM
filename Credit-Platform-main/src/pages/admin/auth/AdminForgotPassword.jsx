"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FiMail, FiArrowLeft, FiCheckCircle } from "react-icons/fi"
import { motion } from "framer-motion"
import Button from "../../../components/ui/Button"
import { api } from "../../../services/api"
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
const ForgotPasswordCard = styled(motion.div)`
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
`

// Message de succès
const SuccessMessage = styled.div`
  padding: 0.75rem;
  background-color: #dcfce7;
  border: 1px solid #22c55e;
  border-radius: 8px;
  color: #15803d;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

// Lien de retour
const BackLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 1.5rem;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    color: #e53e3e;
  }
`

/**
 * Composant de récupération de mot de passe administrateur
 * Permet aux administrateurs de réinitialiser leur mot de passe via email
 */
const AdminForgotPassword = () => {
  // État pour l'email
  const [email, setEmail] = useState("")

  // États pour la gestion du formulaire
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  /**
   * Gère la soumission du formulaire de récupération de mot de passe
   * @param {Event} e - L'événement de soumission
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation de l'email
    if (!email) {
      setError("Veuillez entrer votre adresse e-mail")
      return
    }

    // Validation du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse e-mail valide")
      return
    }

    try {
      setLoading(true)
      setError("")

      // Appel à l'API pour demander la réinitialisation du mot de passe
      const response = await api.post("/auth/admin/forgot-password", { email })

      if (response.data.success) {
        setSuccess(true)

        // Redirection vers la page de vérification OTP après un court délai
        setTimeout(() => {
          navigate("/admin/reset-password", {
            state: {
              email,
              isAdmin: true,
            },
          })
        }, 3000)
      }
    } catch (err) {
      console.error("Erreur lors de la demande de réinitialisation:", err)
      setError(err.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour revenir à la page de connexion
  const handleBackToLogin = () => {
    navigate("/admin/login")
  }

  return (
    <Container>
      <ForgotPasswordCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Logo>
          <img src={LogoCEM} alt="Logo CEM" />
        </Logo>

        <Title>Mot de passe oublié</Title>
        <Subtitle>Entrez votre adresse e-mail pour recevoir un code de réinitialisation</Subtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {success && (
          <SuccessMessage>
            <FiCheckCircle size={18} />
            Instructions envoyées! Vérifiez votre boîte de réception.
          </SuccessMessage>
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
                disabled={loading || success}
                required
              />
            </InputWrapper>
          </FormGroup>

          <Button type="submit" disabled={loading || success} isLoading={loading} variant="primary" fullWidth>
            {loading ? "Envoi en cours..." : "Envoyer les instructions"}
          </Button>
        </Form>

        <BackLink onClick={handleBackToLogin}>
          <FiArrowLeft size={16} />
          Retour à la connexion
        </BackLink>
      </ForgotPasswordCard>
    </Container>
  )
}

export default AdminForgotPassword

