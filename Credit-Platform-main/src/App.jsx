"use client"

import { useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { useAuth } from "./contexts/AuthContext"
import GlobalStyles from "./styles/GlobalStyles"
import theme from "./theme"

// Pages publiques
import HomePage from "./pages/public/HomePage"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"
import OtpVerificationPage from "./pages/public/OtpVerificationPage"

// Pages crédit
import GeneralSimulator from "./pages/credit/GeneralSimulator"
import SafidyPage from "./pages/credit/SafidyPage"
import AvotraPage from "./pages/credit/AvotraPage"

// Pages client
import CreditRequest from "./pages/client/CreditRequest"
import Dashboard from "./pages/client/Dashboard"
import Profile from "./pages/client/Profile"
import CreditStatus from "./pages/client/CreditStatus"
import ClientNotifications from "./pages/client/ClientNotifications"
import ChatHistory from "./pages/client/ChatHistory"
import Chat from "./pages/client/Chat"
import ClientMessages from "./pages/client/ClientMessages"
import CreditDetails from "./pages/client/CreditDetails"
import Help from "./pages/client/Help"


// Pages admin - Auth
import AdminLogin from "./pages/admin/auth/AdminLogin"
import AdminRegister from "./pages/admin/auth/AdminRegister"
import AdminForgotPassword from "./pages/admin/auth/AdminForgotPassword"
import AdminResetPassword from "./pages/admin/auth/AdminResetPassword"
import AdminOtpVerification from "./pages/admin/auth/AdminOtpVerification"

// Pages admin technique
import TechnicalDashboard from "./pages/admin/technical/Dashboard"
import TechnicalUserManagement from "./pages/admin/technical/UserManagement"
import TechnicalCreditSettings from "./pages/admin/technical/CreditSettings"
import TechnicalSystemSettings from "./pages/admin/technical/SystemSettings"
import TechnicalAdminProfile from "./pages/admin/technical/AdminProfile"


// Pages admin conseiller
import AdvisorDashboard from "./pages/admin/advisor/Dashboard"
import AdvisorCreditRequests from "./pages/admin/advisor/CreditRequests"
import AdvisorCreditRequestDetail from "./pages/admin/advisor/CreditRequestDetail"
import AdvisorMessages from "./pages/admin/advisor/Messages"
import AdvisorProfile from "./pages/admin/advisor/Profile"


// Layout
import ClientLayout from "./layouts/ClientLayout"
//import AdminLayout from "./components/layout/AdminLayout"
import TechnicalAdminLayout from "./layouts/TechnicalAdminLayout"
import LoadingScreen from "./components/ui/LoadingScreen"
import AdvisorLayout from "./layouts/AdvisorLayout"

// Chat
import ChatBot from "./components/chat/ChatBot"

function App() {
  const { user, isAdmin, loading } = useAuth()
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    // Simuler un temps de chargement pour l'animation
    const timer = setTimeout(() => {
      setAppReady(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Placez le LoadingScreen à l'intérieur du ThemeProvider
  if (loading || !appReady) {
    return (
      <ThemeProvider theme={theme}>
        <LoadingScreen />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp-verification" element={<OtpVerificationPage />} />
       

       {/* Routes admin - Auth */}
       <Route path="/admin/login" element={<AdminLogin />} />
       <Route path="/admin/register" element={<AdminRegister />} />
       <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
       <Route path="/admin/reset-password" element={<AdminResetPassword />} />
       <Route path="/admin/otp-verification" element={<AdminOtpVerification />} />

        {/*Test Admin*/}
        <Route
          path="/admin/technical/*"
          element={
            <TechnicalAdminLayout>
                <Routes>
                  <Route path="dashboard" element={<TechnicalDashboard />} />
                  <Route path="users" element={<TechnicalUserManagement />} />
                  <Route path="credit-settings" element={<TechnicalCreditSettings />} />
                  <Route path="system-settings" element={<TechnicalSystemSettings />} />
                  <Route path="profile" element={<TechnicalAdminProfile />} />
                </Routes>
            </TechnicalAdminLayout>
        } 
        />
      {/*Admin Conseiller*/}
      <Route path="/admin/advisor" element={<AdvisorLayout />}>
        <Route index element={<Navigate to="/admin/advisor/dashboard" replace />} />
        <Route path="dashboard" element={<AdvisorDashboard />} />
        <Route path="credit-requests" element={<AdvisorCreditRequests />} />
        <Route path="credit-requests/:id" element={<AdvisorCreditRequestDetail />} />
        <Route path="messages" element={<AdvisorMessages />} />
        <Route path="profile" element={<AdvisorProfile />} />
      </Route>

     
        
        {/*Test Client*/}
        {/* Routes client */}
        <Route path="/client" element={<ClientLayout />}>
              <Route index element={<Navigate to="/client/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="client-notifications" element={<ClientNotifications />} />
              <Route path="credit-request" element={<CreditRequest />} />
              <Route path="credit-status" element={<CreditStatus />} />
              <Route path="credit-status/:id" element={<CreditDetails />} />
              <Route path="profile" element={<Profile />} />
              <Route path="chat" element={<Chat />} />
              <Route path="chat-history" element={<ChatHistory />} />
              <Route path="help" element={<Help />} />
            </Route>

        {/* Routes crédit */}
        <Route path="/credit-simulation" element={<GeneralSimulator />} />
        <Route path="/credit-type/safidy" element={<SafidyPage />} />
        <Route path="/credit-type/avotra" element={<AvotraPage />} />

        {/* Routes client (protégées) */}
        {/* <Route
          path="/client/*"
          element={
            user && !isAdmin ? (
              <ClientLayout>
                <Routes>
                  <Route path="dashboard" element={<ClientDashboard />} />
                  <Route path="profile" element={<ClientProfile />} />
                  <Route path="credit-request" element={<ClientCreditRequest />} />
                  <Route path="credit-status" element={<ClientCreditStatus />} />
                  <Route path="credit-status/:id" element={<ClientCreditStatus />} />
                  <Route path="notifications" element={<ClientNotifications />} />
                  <Route path="messages" element={<ClientMessages />} />
                </Routes>
              </ClientLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        /> */}

        {/* Routes admin (protégées) */}
       {/*  <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/otp-verification" element={<AdminOtpVerification />} />
        <Route
          path="/admin/*"
          element={
            user && isAdmin ? (
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="credit-requests" element={<AdminCreditRequests />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="statistics" element={<AdminStatistics />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="messages" element={<AdminMessages />} />
                </Routes>
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        /> */}

        {/* Route par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Afficher le ChatBot flottant uniquement pour les utilisateurs non-admin */}
      {user && !isAdmin && !window.location.pathname.includes("/client/messages") && <ChatBot />}
    </ThemeProvider>
  )
}

export default App

