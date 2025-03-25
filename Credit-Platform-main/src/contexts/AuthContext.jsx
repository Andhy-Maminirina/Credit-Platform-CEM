"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { api } from "../services/api"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token")

        if (token) {
          // Vérifier la validité du token
          const response = await api.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          setUser(response.data.user)
          setIsAdmin(response.data.user.role === "admin")
        }
      } catch (err) {
        console.error("Erreur lors de la vérification de l'authentification:", err)
        localStorage.removeItem("token")
        setUser(null)
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      setError(null)
      const response = await api.post("/auth/login", { email, password })

      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        setUser(response.data.user)
        setIsAdmin(response.data.user.role === "admin")
        return { success: true, needOtp: response.data.needOtp }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la connexion")
      return { success: false, error: err.response?.data?.message || "Erreur lors de la connexion" }
    }
  }

  // Fonction de connexion admin
  const adminLogin = async (email, password) => {
    try {
      setError(null)
      const response = await api.post("/auth/admin/login", { email, password })

      if (response.data.needOtp) {
        // Stocker temporairement les informations pour la vérification OTP
        sessionStorage.setItem("adminEmail", email)
        return { success: true, needOtp: true }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la connexion")
      return { success: false, error: err.response?.data?.message || "Erreur lors de la connexion" }
    }
  }

  // Fonction de vérification OTP pour admin
  const verifyAdminOtp = async (otp) => {
    try {
      setError(null)
      const email = sessionStorage.getItem("adminEmail")

      if (!email) {
        throw new Error("Session expirée, veuillez vous reconnecter")
      }

      const response = await api.post("/auth/admin/verify-otp", { email, otp })

      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        setUser(response.data.user)
        setIsAdmin(true)
        sessionStorage.removeItem("adminEmail")
        return { success: true }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Code OTP invalide")
      return { success: false, error: err.response?.data?.message || "Code OTP invalide" }
    }
  }

  // Fonction de vérification OTP pour client
  const verifyOtp = async (email, otp) => {
    try {
      setError(null)
      const response = await api.post("/auth/verify-otp", { email, otp })

      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        setUser(response.data.user)
        setIsAdmin(false)
        return { success: true }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Code OTP invalide")
      return { success: false, error: err.response?.data?.message || "Code OTP invalide" }
    }
  }

  // Fonction d'inscription
  const register = async (userData) => {
    try {
      setError(null)
      const response = await api.post("/auth/register", userData)

      if (response.data.success) {
        return { success: true, email: userData.email }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription")
      return { success: false, error: err.response?.data?.message || "Erreur lors de l'inscription" }
    }
  }

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setIsAdmin(false)
  }

  // Fonction de récupération de mot de passe
  const forgotPassword = async (email) => {
    try {
      setError(null)
      const response = await api.post("/auth/forgot-password", { email })

      if (response.data.success) {
        return { success: true }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la récupération du mot de passe")
      return { success: false, error: err.response?.data?.message || "Erreur lors de la récupération du mot de passe" }
    }
  }

  // Fonction de réinitialisation de mot de passe
  const resetPassword = async (token, password) => {
    try {
      setError(null)
      const response = await api.post("/auth/reset-password", { token, password })

      if (response.data.success) {
        return { success: true }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la réinitialisation du mot de passe")
      return {
        success: false,
        error: err.response?.data?.message || "Erreur lors de la réinitialisation du mot de passe",
      }
    }
  }

  // Fonction de mise à jour du profil
  const updateProfile = async (userData) => {
    try {
      setError(null)
      const response = await api.put("/users/profile", userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.data.success) {
        setUser({ ...user, ...userData })
        return { success: true }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la mise à jour du profil")
      return { success: false, error: err.response?.data?.message || "Erreur lors de la mise à jour du profil" }
    }
  }

  // Ajouter cette fonction dans le contexte AuthContext
  const isTechnicalAdmin = () => {
    return user && user.role === "technical"
  }

  const value = {
    user,
    isAdmin,
    loading,
    error,
    login,
    adminLogin,
    verifyAdminOtp,
    verifyOtp,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    isTechnicalAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

