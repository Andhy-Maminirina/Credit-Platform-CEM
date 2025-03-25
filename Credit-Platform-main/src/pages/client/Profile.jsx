"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { theme } from "../../styles/theme"
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLock,
  FiSave,
  FiAlertCircle,
  FiCheck,
  FiX,
  FiEye,
  FiEyeOff,
  FiCamera,
} from "react-icons/fi"
import { useAuth } from "../../contexts/AuthContext"
import { toast } from "react-toastify"

/**
 * Composants stylisés pour la page de profil
 */
const ProfileContainer = styled.div`
  animation: fadeIn 0.5s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

// En-tête de la page
const PageHeader = styled.div`
  margin-bottom: 2rem;
  
  .page-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.5rem;
  }
  
  .page-description {
    font-size: 1rem;
    color: #6B7280;
  }
`

// Grille de profil
const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 2fr;
  }
`

// Carte de profil
const ProfileCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  
  .card-header {
    padding: 1.5rem;
    border-bottom: 1px solid #E5E7EB;
    
    .card-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
      display: flex;
      align-items: center;
      
      .title-icon {
        margin-right: 0.75rem;
        color: ${theme.colors.primary[600]};
      }
    }
  }
  
  .card-body {
    padding: 1.5rem;
  }
`

// Carte d'utilisateur
const UserCard = styled(ProfileCard)`
  .user-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    .user-avatar {
      position: relative;
      width: 120px;
      height: 120px;
      border-radius: 9999px;
      background-color: ${theme.colors.primary[100]};
      color: ${theme.colors.primary[600]};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .avatar-edit {
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: ${theme.colors.primary[500]};
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        
        &:hover {
          background-color: ${theme.colors.primary[600]};
        }
      }
    }
    
    .user-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
      margin-bottom: 0.25rem;
    }
    
    .user-role {
      font-size: 0.875rem;
      color: #6B7280;
      margin-bottom: 1.5rem;
    }
    
    .user-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      width: 100%;
      
      .stat-item {
        background-color: #F9FAFB;
        padding: 1rem;
        border-radius: 0.375rem;
        
        .stat-value {
          font-size: 1.25rem;
          font-weight: 600;
          color: ${theme.colors.primary[600]};
          margin-bottom: 0.25rem;
        }
        
        .stat-label {
          font-size: 0.75rem;
          color: #6B7280;
        }
      }
    }
  }
`

// Formulaire
const Form = styled.form`
  .form-group {
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }
    
    .form-input-group {
      position: relative;
      
      .form-input {
        width: 100%;
        padding: 0.75rem 1rem;
        padding-left: 2.5rem;
        border: 1px solid #D1D5DB;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        transition: all 0.2s;
        
        &:focus {
          outline: none;
          border-color: ${theme.colors.primary[500]};
          box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
        }
        
        &.is-invalid {
          border-color: #EF4444;
        }
      }
      
      .form-input-icon {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: #9CA3AF;
      }
      
      .form-input-action {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: #9CA3AF;
        cursor: pointer;
        
        &:hover {
          color: #6B7280;
        }
      }
    }
    
    .form-error {
      margin-top: 0.5rem;
      font-size: 0.75rem;
      color: #EF4444;
      display: flex;
      align-items: center;
      
      .error-icon {
        margin-right: 0.25rem;
      }
    }
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
  }
`

// Bouton
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s;
  
  &.btn-primary {
    background-color: ${theme.colors.primary[600]};
    color: white;
    
    &:hover {
      background-color: ${theme.colors.primary[700]};
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
    }
    
    &:disabled {
      background-color: ${theme.colors.primary[300]};
      cursor: not-allowed;
    }
    
    .btn-icon {
      margin-right: 0.5rem;
    }
  }
`

// Message d'alerte
const Alert = styled.div`
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  &.alert-success {
    background-color: #ECFDF5;
    color: #065F46;
    
    .alert-icon {
      color: #10B981;
    }
  }
  
  &.alert-error {
    background-color: #FEF2F2;
    color: #991B1B;
    
    .alert-icon {
      color: #EF4444;
    }
  }
  
  .alert-icon {
    margin-right: 0.75rem;
    flex-shrink: 0;
  }
  
  .alert-content {
    flex: 1;
  }
  
  .alert-close {
    margin-left: 0.75rem;
    cursor: pointer;
    color: currentColor;
    opacity: 0.5;
    
    &:hover {
      opacity: 0.75;
    }
  }
`

/**
 * Composant de profil utilisateur
 */
const Profile = () => {
  const { user, updateProfile } = useAuth()

  // États pour les formulaires
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  })

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // États pour les erreurs de validation
  const [personalInfoErrors, setPersonalInfoErrors] = useState({})
  const [securityErrors, setSecurityErrors] = useState({})

  // États pour les alertes
  const [personalInfoAlert, setPersonalInfoAlert] = useState(null)
  const [securityAlert, setSecurityAlert] = useState(null)

  // État pour l'affichage des mots de passe
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // État pour le chargement
  const [isPersonalInfoLoading, setIsPersonalInfoLoading] = useState(false)
  const [isSecurityLoading, setIsSecurityLoading] = useState(false)

  // Charger les données utilisateur
  useEffect(() => {
    if (user) {
      setPersonalInfo({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      })
    }
  }, [user])

  /**
   * Gérer les changements dans le formulaire d'informations personnelles
   */
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Effacer l'erreur pour ce champ
    if (personalInfoErrors[name]) {
      setPersonalInfoErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  /**
   * Gérer les changements dans le formulaire de sécurité
   */
  const handleSecurityChange = (e) => {
    const { name, value } = e.target
    setSecurity((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Effacer l'erreur pour ce champ
    if (securityErrors[name]) {
      setSecurityErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  /**
   * Valider le formulaire d'informations personnelles
   */
  const validatePersonalInfo = () => {
    const errors = {}

    if (!personalInfo.firstName.trim()) {
      errors.firstName = "Le prénom est requis"
    }

    if (!personalInfo.lastName.trim()) {
      errors.lastName = "Le nom est requis"
    }

    if (!personalInfo.email.trim()) {
      errors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) {
      errors.email = "L'email n'est pas valide"
    }

    if (!personalInfo.phone.trim()) {
      errors.phone = "Le numéro de téléphone est requis"
    } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(personalInfo.phone)) {
      errors.phone = "Le numéro de téléphone n'est pas valide"
    }

    if (!personalInfo.address.trim()) {
      errors.address = "L'adresse est requise"
    }

    setPersonalInfoErrors(errors)
    return Object.keys(errors).length === 0
  }

  /**
   * Valider le formulaire de sécurité
   */
  const validateSecurity = () => {
    const errors = {}

    if (!security.currentPassword) {
      errors.currentPassword = "Le mot de passe actuel est requis"
    }

    if (!security.newPassword) {
      errors.newPassword = "Le nouveau mot de passe est requis"
    } else if (security.newPassword.length < 8) {
      errors.newPassword = "Le mot de passe doit contenir au moins 8 caractères"
    }

    if (!security.confirmPassword) {
      errors.confirmPassword = "La confirmation du mot de passe est requise"
    } else if (security.newPassword !== security.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas"
    }

    setSecurityErrors(errors)
    return Object.keys(errors).length === 0
  }

  /**
   * Soumettre le formulaire d'informations personnelles
   */
  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault()

    if (!validatePersonalInfo()) {
      return
    }

    setIsPersonalInfoLoading(true)

    try {
      // Simuler une requête API
      // Dans un environnement réel, remplacer par une vraie requête API
      // const response = await axios.put(`${API_URL}/users/${user.id}`, personalInfo);

      // Simuler un délai de réponse
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mettre à jour le contexte utilisateur
      updateProfile({
        ...user,
        ...personalInfo,
      })

      // Afficher l'alerte de succès
      setPersonalInfoAlert({
        type: "success",
        message: "Vos informations personnelles ont été mises à jour avec succès.",
      })

      // Masquer l'alerte après 5 secondes
      setTimeout(() => {
        setPersonalInfoAlert(null)
      }, 5000)

      // Afficher une notification toast
      toast.success("Profil mis à jour avec succès")
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error)

      // Afficher l'alerte d'erreur
      setPersonalInfoAlert({
        type: "error",
        message: "Une erreur est survenue lors de la mise à jour de vos informations. Veuillez réessayer.",
      })
    } finally {
      setIsPersonalInfoLoading(false)
    }
  }

  /**
   * Soumettre le formulaire de sécurité
   */
  const handleSecuritySubmit = async (e) => {
    e.preventDefault()

    if (!validateSecurity()) {
      return
    }

    setIsSecurityLoading(true)

    try {
      // Simuler une requête API
      // Dans un environnement réel, remplacer par une vraie requête API
      // const response = await axios.put(`${API_URL}/users/${user.id}/password`, {
      //   currentPassword: security.currentPassword,
      //   newPassword: security.newPassword
      // });

      // Simuler un délai de réponse
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Réinitialiser le formulaire
      setSecurity({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      // Afficher l'alerte de succès
      setSecurityAlert({
        type: "success",
        message: "Votre mot de passe a été mis à jour avec succès.",
      })

      // Masquer l'alerte après 5 secondes
      setTimeout(() => {
        setSecurityAlert(null)
      }, 5000)

      // Afficher une notification toast
      toast.success("Mot de passe mis à jour avec succès")
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error)

      // Afficher l'alerte d'erreur
      setSecurityAlert({
        type: "error",
        message:
          "Une erreur est survenue lors de la mise à jour de votre mot de passe. Veuillez vérifier votre mot de passe actuel et réessayer.",
      })
    } finally {
      setIsSecurityLoading(false)
    }
  }

  /**
   * Fermer une alerte
   */
  const closeAlert = (alertSetter) => {
    alertSetter(null)
  }

  // Calculer les initiales de l'utilisateur pour l'avatar
  const getUserInitials = () => {
    if (!user) return ""

    const firstName = user.firstName || personalInfo.firstName || ""
    const lastName = user.lastName || personalInfo.lastName || ""

    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <ProfileContainer>
      <PageHeader>
        <h1 className="page-title">Profil Utilisateur</h1>
        <p className="page-description">Gérez vos informations personnelles et paramètres de sécurité</p>
      </PageHeader>

      <ProfileGrid>
        {/* Carte utilisateur */}
        <UserCard>
          <div className="card-header">
            <h2 className="card-title">
              <FiUser className="title-icon" />
              Mon Profil
            </h2>
          </div>

          <div className="card-body">
            <div className="user-profile">
              <div className="user-avatar">
                {user?.profileImage ? (
                  <img src={user.profileImage || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                ) : (
                  getUserInitials()
                )}
                <div className="avatar-edit">
                  <FiCamera size={16} />
                </div>
              </div>

              <h3 className="user-name">{`${user?.firstName || personalInfo.firstName} ${user?.lastName || personalInfo.lastName}`}</h3>
              <p className="user-role">Client</p>

              <div className="user-stats">
                <div className="stat-item">
                  <div className="stat-value">{user?.creditRequests?.length || 0}</div>
                  <div className="stat-label">Demandes de crédit</div>
                </div>

                <div className="stat-item">
                  <div className="stat-value">{user?.approvedCredits?.length || 0}</div>
                  <div className="stat-label">Crédits approuvés</div>
                </div>
              </div>
            </div>
          </div>
        </UserCard>

        {/* Informations personnelles */}
        <ProfileCard>
          <div className="card-header">
            <h2 className="card-title">
              <FiUser className="title-icon" />
              Informations Personnelles
            </h2>
          </div>

          <div className="card-body">
            {personalInfoAlert && (
              <Alert className={`alert-${personalInfoAlert.type}`}>
                {personalInfoAlert.type === "success" ? (
                  <FiCheck className="alert-icon" size={20} />
                ) : (
                  <FiAlertCircle className="alert-icon" size={20} />
                )}
                <div className="alert-content">{personalInfoAlert.message}</div>
                <FiX className="alert-close" size={16} onClick={() => closeAlert(setPersonalInfoAlert)} />
              </Alert>
            )}

            <Form onSubmit={handlePersonalInfoSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">
                  Prénom
                </label>
                <div className="form-input-group">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`form-input ${personalInfoErrors.firstName ? "is-invalid" : ""}`}
                    value={personalInfo.firstName}
                    onChange={handlePersonalInfoChange}
                  />
                  <FiUser className="form-input-icon" size={16} />
                </div>
                {personalInfoErrors.firstName && (
                  <div className="form-error">
                    <FiAlertCircle className="error-icon" size={12} />
                    {personalInfoErrors.firstName}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="lastName">
                  Nom
                </label>
                <div className="form-input-group">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`form-input ${personalInfoErrors.lastName ? "is-invalid" : ""}`}
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                  />
                  <FiUser className="form-input-icon" size={16} />
                </div>
                {personalInfoErrors.lastName && (
                  <div className="form-error">
                    <FiAlertCircle className="error-icon" size={12} />
                    {personalInfoErrors.lastName}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <div className="form-input-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${personalInfoErrors.email ? "is-invalid" : ""}`}
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                  />
                  <FiMail className="form-input-icon" size={16} />
                </div>
                {personalInfoErrors.email && (
                  <div className="form-error">
                    <FiAlertCircle className="error-icon" size={12} />
                    {personalInfoErrors.email}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Téléphone
                </label>
                <div className="form-input-group">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`form-input ${personalInfoErrors.phone ? "is-invalid" : ""}`}
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                  />
                  <FiPhone className="form-input-icon" size={16} />
                </div>
                {personalInfoErrors.phone && (
                  <div className="form-error">
                    <FiAlertCircle className="error-icon" size={12} />
                    {personalInfoErrors.phone}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="address">
                  Adresse
                </label>
                <div className="form-input-group">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className={`form-input ${personalInfoErrors.address ? "is-invalid" : ""}`}
                    value={personalInfo.address}
                    onChange={handlePersonalInfoChange}
                  />
                  <FiMapPin className="form-input-icon" size={16} />
                </div>
                {personalInfoErrors.address && (
                  <div className="form-error">
                    <FiAlertCircle className="error-icon" size={12} />
                    {personalInfoErrors.address}
                  </div>
                )}
              </div>

              <div className="form-actions">
                <Button type="submit" className="btn-primary" disabled={isPersonalInfoLoading}>
                  {isPersonalInfoLoading ? (
                    "Enregistrement..."
                  ) : (
                    <>
                      <FiSave className="btn-icon" size={16} />
                      Enregistrer les modifications
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </ProfileCard>

        {/* Sécurité */}
        <ProfileCard style={{ gridColumn: "1 / -1" }}>
          <div className="card-header">
            <h2 className="card-title">
              <FiLock className="title-icon" />
              Sécurité
            </h2>
          </div>

          <div className="card-body">
            {securityAlert && (
              <Alert className={`alert-${securityAlert.type}`}>
                {securityAlert.type === "success" ? (
                  <FiCheck className="alert-icon" size={20} />
                ) : (
                  <FiAlertCircle className="alert-icon" size={20} />
                )}
                <div className="alert-content">{securityAlert.message}</div>
                <FiX className="alert-close" size={16} onClick={() => closeAlert(setSecurityAlert)} />
              </Alert>
            )}

            <Form onSubmit={handleSecuritySubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="currentPassword">
                  Mot de passe actuel
                </label>
                <div className="form-input-group">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    className={`form-input ${securityErrors.currentPassword ? "is-invalid" : ""}`}
                    value={security.currentPassword}
                    onChange={handleSecurityChange}
                  />
                  <FiLock className="form-input-icon" size={16} />
                  <div className="form-input-action" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                    {showCurrentPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </div>
                </div>
                {securityErrors.currentPassword && (
                  <div className="form-error">
                    <FiAlertCircle className="error-icon" size={12} />
                    {securityErrors.currentPassword}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="newPassword">
                  Nouveau mot de passe
                </label>
                <div className="form-input-group">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    className={`form-input ${securityErrors.newPassword ? "is-invalid" : ""}`}
                    value={security.newPassword}
                    onChange={handleSecurityChange}
                  />
                  <FiLock className="form-input-icon" size={16} />
                  <div className="form-input-action" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </div>
                </div>
                {securityErrors.newPassword && (
                  <div className="form-error">
                    <FiAlertCircle className="error-icon" size={12} />
                    {securityErrors.newPassword}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirmer le nouveau mot de passe
                </label>
                <div className="form-input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form-input ${securityErrors.confirmPassword ? "is-invalid" : ""}`}
                    value={security.confirmPassword}
                    onChange={handleSecurityChange}
                  />
                  <FiLock className="form-input-icon" size={16} />
                  <div className="form-input-action" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </div>
                </div>
                {securityErrors.confirmPassword && (
                  <div className="form-error">
                    <FiAlertCircle className="error-icon" size={12} />
                    {securityErrors.confirmPassword}
                  </div>
                )}
              </div>

              <div className="form-actions">
                <Button type="submit" className="btn-primary" disabled={isSecurityLoading}>
                  {isSecurityLoading ? (
                    "Enregistrement..."
                  ) : (
                    <>
                      <FiSave className="btn-icon" size={16} />
                      Mettre à jour le mot de passe
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </ProfileCard>
      </ProfileGrid>
    </ProfileContainer>
  )
}

export default Profile

