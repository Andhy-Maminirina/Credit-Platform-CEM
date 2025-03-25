"use client"

import { useState } from "react"
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiSave,
  FiAlertTriangle,
  FiCheck,
  FiX,
  FiEye,
  FiEyeOff,
  FiRefreshCw,
} from "react-icons/fi"

// Ajouter ces imports au début du fichier
import styled from "styled-components"

// Ajouter ces composants stylisés
const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
`

const PageDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`

const AlertBox = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 0.375rem;
  display: flex;
  
  &.success {
    background-color: #ecfdf5;
    border-left: 4px solid #10b981;
  }
  
  &.warning {
    background-color: #fffbeb;
    border-left: 4px solid #f59e0b;
  }
  
  &.error {
    background-color: #fee2e2;
    border-left: 4px solid #dc2626;
  }
  
  svg {
    color: ${(props) => {
      switch (props.type) {
        case "success":
          return "#10b981"
        case "warning":
          return "#f59e0b"
        case "error":
          return "#dc2626"
        default:
          return "#6b7280"
      }
    }};
    margin-right: 0.75rem;
    flex-shrink: 0;
  }
  
  .message {
    color: ${(props) => {
      switch (props.type) {
        case "success":
          return "#065f46"
        case "warning":
          return "#92400e"
        case "error":
          return "#b91c1c"
        default:
          return "#4b5563"
      }
    }};
    font-size: 0.875rem;
  }
`

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 2fr;
  }
`

const ProfileCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const ProfileCardHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
  }
`

const ProfileCardBody = styled.div`
  padding: 1.5rem;
`

const ProfileAvatar = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 9999px;
  background-color: #dc2626;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1.5rem;
`

const ProfileName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  text-align: center;
  margin-bottom: 0.25rem;
`

const ProfileRole = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  margin-bottom: 1.5rem;
`

const ProfileInfoList = styled.div`
  margin-top: 1.5rem;
  
  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    
    svg {
      color: #9ca3af;
      margin-right: 0.75rem;
      flex-shrink: 0;
    }
    
    .info-content {
      .label {
        font-size: 0.75rem;
        color: #6b7280;
      }
      
      .value {
        font-size: 0.875rem;
        font-weight: 500;
        color: #111827;
      }
    }
  }
`

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  color: #4b5563;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f9fafb;
  }
  
  svg {
    margin-right: 0.5rem;
  }
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const FormField = styled.div`
  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.25rem;
  }
  
  input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    
    &:focus {
      outline: none;
      border-color: #dc2626;
      box-shadow: 0 0 0 1px #dc2626;
    }
  }
`

const PasswordField = styled.div`
  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.25rem;
  }
  
  .input-wrapper {
    position: relative;
    
    input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      padding-right: 2.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      
      &:focus {
        outline: none;
        border-color: #dc2626;
        box-shadow: 0 0 0 1px #dc2626;
      }
    }
    
    button {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;
      
      &:hover {
        color: #4b5563;
      }
    }
  }
  
  .hint {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s;
  
  &.primary {
    background-color: ${(props) => (props.disabled ? "#f87171" : "#dc2626")};
    color: white;
    border: none;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    
    &:hover:not(:disabled) {
      background-color: #b91c1c;
    }
  }
  
  &.secondary {
    background-color: white;
    color: #4b5563;
    border: 1px solid #d1d5db;
    
    &:hover {
      background-color: #f9fafb;
    }
  }
  
  svg {
    margin-right: 0.5rem;
  }
`

const ActionGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
`

const AdminProfile = () => {
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  // Données fictives pour le profil
  const [profileData, setProfileData] = useState({
    firstName: "Admin",
    lastName: "Technique",
    email: "admin.technique@cem.mg",
    phone: "+261 34 12 34 567",
    role: "technical",
    lastLogin: "2024-03-20T09:30:00",
  })

  // Données pour le formulaire de mot de passe
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
    setPasswordError("")
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simuler une sauvegarde
    setTimeout(() => {
      setLoading(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  const handleSavePassword = (e) => {
    e.preventDefault()

    // Vérifier que les mots de passe correspondent
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas")
      return
    }

    // Vérifier la complexité du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(passwordData.newPassword)) {
      setPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
      )
      return
    }

    setLoading(true)
    // Simuler une sauvegarde
    setTimeout(() => {
      setLoading(false)
      setShowSuccess(true)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setShowPasswordForm(false)
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <PageHeader>
        <div>
          <PageTitle>Profil administrateur</PageTitle>
          <PageDescription>Gérez vos informations personnelles et de sécurité</PageDescription>
        </div>
      </PageHeader>

      {/* Success Message */}
      {showSuccess && (
        <AlertBox type="success">
          <FiCheck size={20} />
          <p className="message">Les modifications ont été enregistrées avec succès.</p>
        </AlertBox>
      )}

      <ProfileGrid>
        {/* Profile Card */}
        <ProfileCard>
          <ProfileCardHeader>
            <h3>Informations du profil</h3>
          </ProfileCardHeader>
          <ProfileCardBody>
            <div className="flex flex-col items-center">
              <ProfileAvatar>
                {profileData.firstName.charAt(0)}
                {profileData.lastName.charAt(0)}
              </ProfileAvatar>
              <ProfileName>
                {profileData.firstName} {profileData.lastName}
              </ProfileName>
              <ProfileRole>Administrateur Technique</ProfileRole>

              <ProfileInfoList>
                <div className="info-item">
                  <FiMail size={18} />
                  <div className="info-content">
                    <p className="label">Email</p>
                    <p className="value">{profileData.email}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FiPhone size={18} />
                  <div className="info-content">
                    <p className="label">Téléphone</p>
                    <p className="value">{profileData.phone}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FiUser size={18} />
                  <div className="info-content">
                    <p className="label">Dernière connexion</p>
                    <p className="value">{formatDate(profileData.lastLogin)}</p>
                  </div>
                </div>
              </ProfileInfoList>

              <ProfileButton onClick={() => setShowPasswordForm(!showPasswordForm)}>
                <FiLock size={16} />
                Changer le mot de passe
              </ProfileButton>
            </div>
          </ProfileCardBody>
        </ProfileCard>

        {/* Edit Profile Form */}
        <div>
          <ProfileCard>
            <ProfileCardHeader>
              <h3>Modifier le profil</h3>
            </ProfileCardHeader>
            <ProfileCardBody>
              <form onSubmit={handleSaveProfile}>
                <FormGrid>
                  <FormField>
                    <label htmlFor="firstName">Prénom</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                    />
                  </FormField>
                  <FormField>
                    <label htmlFor="lastName">Nom</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                    />
                  </FormField>
                  <FormField>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />
                  </FormField>
                  <FormField>
                    <label htmlFor="phone">Téléphone</label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                    />
                  </FormField>
                </FormGrid>

                <ActionGroup>
                  <ActionButton type="submit" className="primary" disabled={loading}>
                    {loading ? (
                      <>
                        <FiRefreshCw className="animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <FiSave />
                        Enregistrer les modifications
                      </>
                    )}
                  </ActionButton>
                </ActionGroup>
              </form>
            </ProfileCardBody>
          </ProfileCard>

          {/* Change Password Form */}
          {showPasswordForm && (
            <ProfileCard>
              <ProfileCardHeader>
                <h3>Changer le mot de passe</h3>
              </ProfileCardHeader>
              <ProfileCardBody>
                {passwordError && (
                  <AlertBox type="error">
                    <FiAlertTriangle size={20} />
                    <p className="message">{passwordError}</p>
                  </AlertBox>
                )}

                <form onSubmit={handleSavePassword}>
                  <div className="space-y-6">
                    <PasswordField>
                      <label htmlFor="currentPassword">Mot de passe actuel</label>
                      <div className="input-wrapper">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          name="currentPassword"
                          id="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                        <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                          {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </PasswordField>

                    <PasswordField>
                      <label htmlFor="newPassword">Nouveau mot de passe</label>
                      <div className="input-wrapper">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          id="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                          {showNewPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                      <p className="hint">
                        Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et
                        un caractère spécial.
                      </p>
                    </PasswordField>

                    <PasswordField>
                      <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</label>
                      <div className="input-wrapper">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          id="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </PasswordField>
                  </div>

                  <ActionGroup>
                    <ActionButton type="button" className="secondary" onClick={() => setShowPasswordForm(false)}>
                      <FiX />
                      Annuler
                    </ActionButton>
                    <ActionButton type="submit" className="primary" disabled={loading}>
                      {loading ? (
                        <>
                          <FiRefreshCw className="animate-spin" />
                          Enregistrement...
                        </>
                      ) : (
                        <>
                          <FiSave />
                          Changer le mot de passe
                        </>
                      )}
                    </ActionButton>
                  </ActionGroup>
                </form>
              </ProfileCardBody>
            </ProfileCard>
          )}
        </div>
      </ProfileGrid>
    </div>
  )
}

export default AdminProfile

