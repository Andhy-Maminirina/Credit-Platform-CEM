"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"
import { FiLock, FiCheckCircle, FiArrowLeft } from "react-icons/fi"
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
const ResetPasswordCard = styled(motion.div)`
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

// Conteneur OTP
const OtpContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
`

// Champ OTP
const OtpInput = styled.input`
  width: 3rem;
  height: 3rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  
  &:focus {
    outline: none;
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
  }
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
 * Composant de réinitialisation de mot de passe administrateur
 * Permet aux administrateurs de définir un nouveau mot de passe après vérification OTP
 */
const AdminResetPassword = () => {
  // États pour le code OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""])

  // États pour le nouveau mot de passe
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // États pour la gestion du formulaire
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  // Récupération de l'email depuis l'état de navigation
  const email = location.state?.email || ""

  /**
   * Gère la modification d'un champ OTP
   * @param {number} index - L'index du champ OTP
   * @param {string} value - La valeur saisie
   */
  const handleOtpChange = (index, value) => {
    // Vérifier que la valeur est un chiffre
    if (value && !/^\d*$/.test(value)) {
      return
    }

    // Mettre à jour le tableau OTP
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Passer au champ suivant si un chiffre est entré
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus()
    }
  }

  /**
   * Gère la touche de suppression dans les champs OTP
   * @param {number} index - L'index du champ OTP
   * @param {KeyboardEvent} e - L'événement clavier
   */
  const handleKeyDown = (index, e) => {
    // Si touche de suppression et champ vide, passer au champ précédent
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus()
    }
  }

  /**
   * Vérifie le code OTP
   */
  const verifyOtp = async () => {
    // Vérifier que tous les champs sont remplis
    if (otp.some((digit) => !digit)) {
      setError("Veuillez entrer le code complet à 6 chiffres")
      return
    }

    const otpCode = otp.join("")

    try {
      setLoading(true)
      setError("")

      // Appel à l'API pour vérifier le code OTP
      const response = await api.post("/auth/admin/verify-reset-otp", {
        email,
        otp: otpCode,
      })

      if (response.data.success) {
        setOtpVerified(true)
      }
    } catch (err) {
      console.error("Erreur lors de la vérification du code:", err)
      setError(err.response?.data?.message || "Code invalide. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  /**
   * Réinitialise le mot de passe
   * @param {Event} e - L'événement de soumission
   */
  const handleResetPassword = async (e) => {
    e.preventDefault()

    // Validation des mots de passe
    if (!password || !confirmPassword) {
      setError("Veuillez remplir tous les champs")
      return
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères")
      return
    }

    try {
      setLoading(true)
      setError("")

      // Appel à l'API pour réinitialiser le mot de passe
      const response = await api.post("/auth/admin/reset-password", {
        email,
        otp: otp.join(""),
        password,
      })

      if (response.data.success) {
        setSuccess(true)

        // Redirection vers la page de connexion après un court délai
        setTimeout(() => {
          navigate("/admin/login")
        }, 3000)
      }
    } catch (err) {
      console.error("Erreur lors de la réinitialisation du mot de passe:", err)
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
      <ResetPasswordCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Logo>
          <img src={LogoCEM} alt="Logo CEM" />
        </Logo>

        <Title>Réinitialisation du mot de passe</Title>
        {!otpVerified ? (
          <Subtitle>Entrez le code à 6 chiffres envoyé à votre adresse e-mail</Subtitle>
        ) : (
          <Subtitle>Définissez votre nouveau mot de passe</Subtitle>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {success && (
          <SuccessMessage>
            <FiCheckCircle size={18} />
            Mot de passe réinitialisé avec succès! Redirection vers la connexion...
          </SuccessMessage>
        )}

        {!otpVerified ? (
          <>
            <OtpContainer>
              {otp.map((digit, index) => (
                <OtpInput
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  autoFocus={index === 0}
                  disabled={loading}
                />
              ))}
            </OtpContainer>

            <Button onClick={verifyOtp} disabled={loading} isLoading={loading} variant="primary" fullWidth>
              Vérifier le code
            </Button>
          </>
        ) : (
          <Form onSubmit={handleResetPassword}>
            <FormGroup>
              <Label htmlFor="password">Nouveau mot de passe</Label>
              <InputWrapper>
                <Icon>
                  <FiLock size={20} />
                </Icon>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nouveau mot de passe"
                  disabled={loading || success}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <InputWrapper>
                <Icon>
                  <FiLock size={20} />
                </Icon>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmer le mot de passe"
                  disabled={loading || success}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <Button type="submit" disabled={loading || success} isLoading={loading} variant="primary" fullWidth>
              Réinitialiser le mot de passe
            </Button>
          </Form>
        )}

        <BackLink onClick={handleBackToLogin}>
          <FiArrowLeft size={16} />
          Retour à la connexion
        </BackLink>
      </ResetPasswordCard>
    </Container>
  )
}

export default AdminResetPassword

