"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import { useAuth } from "../../contexts/AuthContext"
import Header from "../../components/public/Header"
import Footer from "../../components/public/Footer"

const OtpVerificationPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { verifyOtp } = useAuth()

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  const inputRefs = useRef([])

  // Récupérer l'email depuis l'état de navigation
  const email = location.state?.email

  // Rediriger si l'email n'est pas disponible
  useEffect(() => {
    if (!email) {
      navigate("/login")
    }
  }, [email, navigate])

  // Gérer le compte à rebours pour la réexpédition du code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  // Focus sur le premier champ au chargement
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (index, value) => {
    // Accepter uniquement les chiffres
    if (!/^\d*$/.test(value)) return

    // Mettre à jour le code OTP
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Passer au champ suivant si un chiffre est entré
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Passer au champ précédent sur Backspace si le champ est vide
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")

    // Vérifier si les données collées sont des chiffres
    if (!/^\d+$/.test(pastedData)) return

    // Remplir les champs avec les chiffres collés
    const digits = pastedData.slice(0, 6).split("")
    const newOtp = [...otp]

    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit
      }
    })

    setOtp(newOtp)

    // Focus sur le dernier champ rempli ou le suivant
    const lastIndex = Math.min(digits.length, 5)
    if (inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const otpValue = otp.join("")

    if (otpValue.length !== 6) {
      setError("Veuillez saisir le code à 6 chiffres complet")
      return
    }

    try {
      setLoading(true)
      setError("")

      const result = await verifyOtp(email, otpValue)

      if (result.success) {
        // Rediriger vers le tableau de bord client
        navigate("/client/dashboard")
      } else {
        setError(result.error || "Code OTP invalide")
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = () => {
    // Implémenter la logique pour renvoyer le code OTP
    setCountdown(60)
    setCanResend(false)
    // Appel API pour renvoyer le code
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Vérification à deux facteurs</h2>
            <p className="mt-2 text-sm text-gray-600">Un code à 6 chiffres a été envoyé à {email}</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} onPaste={handlePaste}>
            <div>
              <label htmlFor="otp" className="sr-only">
                Code OTP
              </label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-primary-700 hover:text-primary-800 font-medium"
                  >
                    Renvoyer le code
                  </button>
                ) : (
                  <span>
                    Renvoyer le code dans <span className="font-medium">{countdown}</span> secondes
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="flex items-center text-sm font-medium text-primary-700 hover:text-primary-800"
              >
                <FiArrowLeft className="mr-1" />
                Retour à la connexion
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || otp.join("").length !== 6}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Vérification en cours..." : "Vérifier"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default OtpVerificationPage

