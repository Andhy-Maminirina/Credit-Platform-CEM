"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"
import { FiCheckCircle, FiAlertCircle, FiRefreshCw } from "react-icons/fi"
import { motion } from "framer-motion"
import Button from "../../../components/ui/Button"
import { api } from "../../../services/api"
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
const OtpCard = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
`

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

// Minuteur
const Timer = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: ${(props) => (props.expired ? "#e53e3e" : "#6b7280")};
`

// Lien de renvoi
const ResendLink = styled.button`
  background: none;
  border: none;
  font-size: 0.875rem;
  color: #e53e3e;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0 auto;
  padding: 0;
  
  &:disabled {
    color: #9ca3af;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    text-decoration: underline;
  }
`

/**
 * Composant de vérification OTP pour administrateurs
 * Permet de vérifier l'identité via un code à 6 chiffres
 */
const AdminOtpVerification = () => {
  // États pour le code OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""])

  // États pour la gestion du formulaire
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // États pour le minuteur
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [resending, setResending] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { completeLogin } = useAuth()

  // Récupération des données depuis l'état de navigation
  const email = location.state?.email || ""
  const adminType = location.state?.adminType || "advisor"

  // Référence pour le minuteur
  const timerRef = useRef(null)

  // Initialisation du minuteur
  useEffect(() => {
    startTimer()

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  /**
   * Démarre le minuteur pour le renvoi du code
   */
  const startTimer = () => {
    setTimer(60)
    setCanResend(false)

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

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

    // Vérifier automatiquement si tous les champs sont remplis
    if (value && index === 5) {
      const completeOtp = [...newOtp.slice(0, 5), value].join("")
      if (completeOtp.length === 6) {
        setTimeout(() => verifyOtp(), 300)
      }
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
      const response = await api.post("/auth/admin/verify-otp", {
        email,
        otp: otpCode,
        adminType,
      })

      if (response.data.success) {
        setSuccess(true)

        // Compléter la connexion avec le token reçu
        await completeLogin(response.data.token, true, adminType)

        // Redirection vers le tableau de bord approprié
        setTimeout(() => {
          if (adminType === "technical") {
            navigate("/admin/technical/dashboard")
          } else {
            navigate("/admin/advisor/dashboard")
          }
        }, 1500)
      }
    } catch (err) {
      console.error("Erreur lors de la vérification du code:", err)
      setError(err.response?.data?.message || "Code invalide. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  /**
   * Renvoie un nouveau code OTP
   */
  const resendOtp = async () => {
    if (!canResend || resending) return

    try {
      setResending(true)
      setError("")

      // Appel à l'API pour renvoyer un code OTP
      const response = await api.post("/auth/admin/resend-otp", {
        email,
        adminType,
      })

      if (response.data.success) {
        // Réinitialiser le minuteur
        startTimer()
      }
    } catch (err) {
      console.error("Erreur lors du renvoi du code:", err)
      setError(err.response?.data?.message || "Impossible de renvoyer le code. Veuillez réessayer.")
    } finally {
      setResending(false)
    }
  }

  // Formater le minuteur en MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Container>
      <OtpCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Logo>
          <img src={LogoCEM} alt="Logo CEM" />
        </Logo>

        <Title>Vérification à deux facteurs</Title>
        <Subtitle>Entrez le code à 6 chiffres envoyé à votre adresse e-mail</Subtitle>

        {error && (
          <ErrorMessage>
            <FiAlertCircle size={18} />
            {error}
          </ErrorMessage>
        )}

        {success && (
          <SuccessMessage>
            <FiCheckCircle size={18} />
            Vérification réussie! Redirection en cours...
          </SuccessMessage>
        )}

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
              disabled={loading || success}
            />
          ))}
        </OtpContainer>

        <Timer expired={timer === 0}>
          {timer > 0
            ? `Vous pourrez renvoyer un code dans ${formatTime(timer)}`
            : "Le code a expiré. Veuillez en demander un nouveau."}
        </Timer>

        <ResendLink onClick={resendOtp} disabled={!canResend || resending}>
          {resending ? "Envoi en cours..." : "Renvoyer le code"}
          {resending && <FiRefreshCw size={16} className="animate-spin" />}
        </ResendLink>

        <Button
          onClick={verifyOtp}
          disabled={loading || success || otp.some((digit) => !digit)}
          isLoading={loading}
          variant="primary"
          fullWidth
          style={{ marginTop: "1.5rem" }}
        >
          Vérifier
        </Button>
      </OtpCard>
    </Container>
  )
}

export default AdminOtpVerification

