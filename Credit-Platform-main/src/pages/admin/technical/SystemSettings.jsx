"use client"

import { useState } from "react"
import { FiSave, FiRefreshCw, FiAlertTriangle, FiCheck, FiInfo } from "react-icons/fi"
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
    color: ${(props) => (props.disabled ? "#9ca3af" : "#4b5563")};
    border: 1px solid ${(props) => (props.disabled ? "#e5e7eb" : "#d1d5db")};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    
    &:hover:not(:disabled) {
      background-color: #f9fafb;
    }
  }
  
  svg {
    margin-right: 0.5rem;
  }
`

// Améliorer les boutons dans SystemSettings

// Ajouter ce style
const ActionIconButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
    color: #111827;
  }
  
  svg {
    margin-right: 0.5rem;
    color: #6b7280;
  }
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
  
  &.info {
    background-color: #eff6ff;
    border-left: 4px solid #3b82f6;
  }
  
  svg {
    color: ${(props) => {
      switch (props.type) {
        case "success":
          return "#10b981"
        case "warning":
          return "#f59e0b"
        case "info":
          return "#3b82f6"
        default:
          return "#6b7280"
      }
    }};
    margin-right: 0.75rem;
    flex-shrink: 0;
  }
  
  .content {
    .title {
      font-weight: 500;
      color: ${(props) => {
        switch (props.type) {
          case "success":
            return "#065f46"
          case "warning":
            return "#92400e"
          case "info":
            return "#1e40af"
          default:
            return "#111827"
        }
      }};
      margin-bottom: 0.25rem;
    }
    
    .message {
      color: ${(props) => {
        switch (props.type) {
          case "success":
            return "#065f46"
          case "warning":
            return "#92400e"
          case "info":
            return "#1e40af"
          default:
            return "#4b5563"
        }
      }};
      font-size: 0.875rem;
    }
  }
`

const SettingsCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 1.5rem;
`

const SettingsCardHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
  }
`

const SettingsCardBody = styled.div`
  padding: 1.5rem;
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
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
  
  input, select {
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

const ToggleField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .label-group {
    label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }
    
    .description {
      font-size: 0.75rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }
  }
`

const Toggle = styled.button`
  position: relative;
  width: 2.75rem;
  height: 1.5rem;
  border-radius: 9999px;
  background-color: ${(props) => (props.active ? "#dc2626" : "#e5e7eb")};
  transition: background-color 0.2s;
  border: none;
  cursor: pointer;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
  }
  
  .toggle-handle {
    position: absolute;
    top: 0.125rem;
    left: ${(props) => (props.active ? "calc(100% - 1.25rem - 0.125rem)" : "0.125rem")};
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 9999px;
    background-color: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: left 0.2s;
  }
`

const SystemSettings = () => {
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const [settings, setSettings] = useState({
    general: {
      siteName: "CEM - Crédit En Ligne",
      contactEmail: "contact@cem.mg",
      supportPhone: "+261 34 00 00 000",
      maintenanceMode: false,
    },
    security: {
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordExpiryDays: 90,
      twoFactorAuth: true,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      adminAlerts: true,
      creditRequestNotifications: true,
    },
    system: {
      debugMode: false,
      logLevel: "error",
      backupFrequency: "daily",
      apiTimeout: 30,
    },
  })

  const [originalSettings, setOriginalSettings] = useState({ ...settings })

  const handleToggle = (category, setting) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: !settings[category][setting],
      },
    })
    setHasChanges(true)
  }

  const handleInputChange = (category, setting, value) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: value,
      },
    })
    setHasChanges(true)
  }

  const handleSaveChanges = () => {
    setLoading(true)
    // Simuler une sauvegarde
    setTimeout(() => {
      setLoading(false)
      setShowSuccess(true)
      setOriginalSettings({ ...settings })
      setHasChanges(false)
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  const handleResetChanges = () => {
    setSettings({ ...originalSettings })
    setHasChanges(false)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <PageHeader>
        <div>
          <PageTitle>Paramètres système</PageTitle>
          <PageDescription>Configurez les paramètres généraux du système</PageDescription>
        </div>
        {/* Remplacer les boutons existants par ceux-ci */}
        <div className="flex space-x-2 mt-4 md:mt-0">
          <ActionIconButton onClick={handleResetChanges} disabled={!hasChanges}>
            <FiRefreshCw size={14} />
            Réinitialiser
          </ActionIconButton>
          <ActionButton onClick={handleSaveChanges} disabled={!hasChanges || loading} className="primary">
            {loading ? <FiRefreshCw className="mr-2 animate-spin" size={16} /> : <FiSave size={14} />}
            {loading ? "Enregistrement..." : "Enregistrer"}
          </ActionButton>
        </div>
      </PageHeader>

      {/* Success Message */}
      {showSuccess && (
        <AlertBox type="success" className="success">
          <FiCheck size={20} />
          <div className="content">
            <p className="title">Succès</p>
            <p className="message">Les paramètres système ont été mis à jour avec succès.</p>
          </div>
        </AlertBox>
      )}

      {/* Warning Message */}
      {hasChanges && (
        <AlertBox type="warning" className="warning">
          <FiAlertTriangle size={20} />
          <div className="content">
            <p className="title">Attention</p>
            <p className="message">
              Certaines modifications peuvent affecter le fonctionnement de l'application. Assurez-vous de comprendre
              les conséquences avant d'enregistrer.
            </p>
          </div>
        </AlertBox>
      )}

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* General Settings */}
        <SettingsCard>
          <SettingsCardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Paramètres généraux</h3>
          </SettingsCardHeader>
          <SettingsCardBody>
            <FormGrid>
              <FormField>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du site</label>
                <input
                  type="text"
                  value={settings.general.siteName}
                  onChange={(e) => handleInputChange("general", "siteName", e.target.value)}
                  className="focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>
              <FormField>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email de contact</label>
                <input
                  type="email"
                  value={settings.general.contactEmail}
                  onChange={(e) => handleInputChange("general", "contactEmail", e.target.value)}
                  className="focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>
              <FormField>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone de support</label>
                <input
                  type="text"
                  value={settings.general.supportPhone}
                  onChange={(e) => handleInputChange("general", "supportPhone", e.target.value)}
                  className="focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>
              <FormField>
                <ToggleField>
                  <div className="label-group">
                    <label className="block text-sm font-medium text-gray-700">Mode maintenance</label>
                    <p className="mt-1 text-xs text-gray-500">
                      Lorsque activé, le site affichera une page de maintenance pour tous les utilisateurs
                      non-administrateurs.
                    </p>
                  </div>
                  <Toggle
                    active={settings.general.maintenanceMode}
                    onClick={() => handleToggle("general", "maintenanceMode")}
                  >
                    <span className="toggle-handle" />
                  </Toggle>
                </ToggleField>
              </FormField>
            </FormGrid>
          </SettingsCardBody>
        </SettingsCard>

        {/* Security Settings */}
        <SettingsCard>
          <SettingsCardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Paramètres de sécurité</h3>
          </SettingsCardHeader>
          <SettingsCardBody>
            <FormGrid>
              <FormField>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Délai d'expiration de session (minutes)
                </label>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleInputChange("security", "sessionTimeout", Number.parseInt(e.target.value))}
                  className="focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>
              <FormField>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tentatives de connexion maximales
                </label>
                <input
                  type="number"
                  min="3"
                  max="10"
                  value={settings.security.maxLoginAttempts}
                  onChange={(e) => handleInputChange("security", "maxLoginAttempts", Number.parseInt(e.target.value))}
                  className="focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>
              <FormField>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration du mot de passe (jours)
                </label>
                <input
                  type="number"
                  min="30"
                  max="365"
                  value={settings.security.passwordExpiryDays}
                  onChange={(e) => handleInputChange("security", "passwordExpiryDays", Number.parseInt(e.target.value))}
                  className="focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>
              <FormField>
                <ToggleField>
                  <div className="label-group">
                    <label className="block text-sm font-medium text-gray-700">Authentification à deux facteurs</label>
                    <p className="mt-1 text-xs text-gray-500">
                      Exige une vérification supplémentaire lors de la connexion pour tous les utilisateurs.
                    </p>
                  </div>
                  <Toggle
                    active={settings.security.twoFactorAuth}
                    onClick={() => handleToggle("security", "twoFactorAuth")}
                  >
                    <span className="toggle-handle" />
                  </Toggle>
                </ToggleField>
              </FormField>
            </FormGrid>
          </SettingsCardBody>
        </SettingsCard>

        {/* Notification Settings */}
        <SettingsCard>
          <SettingsCardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Paramètres de notification</h3>
          </SettingsCardHeader>
          <SettingsCardBody>
            <FormGrid>
              <FormField>
                <ToggleField>
                  <div className="label-group">
                    <label className="block text-sm font-medium text-gray-700">Notifications par email</label>
                    <p className="mt-1 text-xs text-gray-500">Envoyer des notifications par email aux utilisateurs.</p>
                  </div>
                  <Toggle
                    active={settings.notifications.emailNotifications}
                    onClick={() => handleToggle("notifications", "emailNotifications")}
                  >
                    <span className="toggle-handle" />
                  </Toggle>
                </ToggleField>
              </FormField>
              <FormField>
                <ToggleField>
                  <div className="label-group">
                    <label className="block text-sm font-medium text-gray-700">Notifications par SMS</label>
                    <p className="mt-1 text-xs text-gray-500">Envoyer des notifications par SMS aux utilisateurs.</p>
                  </div>
                  <Toggle
                    active={settings.notifications.smsNotifications}
                    onClick={() => handleToggle("notifications", "smsNotifications")}
                  >
                    <span className="toggle-handle" />
                  </Toggle>
                </ToggleField>
              </FormField>
              <FormField>
                <ToggleField>
                  <div className="label-group">
                    <label className="block text-sm font-medium text-gray-700">Alertes administrateur</label>
                    <p className="mt-1 text-xs text-gray-500">
                      Envoyer des alertes aux administrateurs pour les événements importants.
                    </p>
                  </div>
                  <Toggle
                    active={settings.notifications.adminAlerts}
                    onClick={() => handleToggle("notifications", "adminAlerts")}
                  >
                    <span className="toggle-handle" />
                  </Toggle>
                </ToggleField>
              </FormField>
              <FormField>
                <ToggleField>
                  <div className="label-group">
                    <label className="block text-sm font-medium text-gray-700">
                      Notifications de demande de crédit
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      Envoyer des notifications pour les mises à jour de demande de crédit.
                    </p>
                  </div>
                  <Toggle
                    active={settings.notifications.creditRequestNotifications}
                    onClick={() => handleToggle("notifications", "creditRequestNotifications")}
                  >
                    <span className="toggle-handle" />
                  </Toggle>
                </ToggleField>
              </FormField>
            </FormGrid>
          </SettingsCardBody>
        </SettingsCard>

        {/* System Settings */}
        <SettingsCard>
          <SettingsCardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Paramètres système avancés</h3>
          </SettingsCardHeader>
          <SettingsCardBody>
            <FormGrid>
              <FormField>
                <ToggleField>
                  <div className="label-group">
                    <label className="block text-sm font-medium text-gray-700">Mode débogage</label>
                    <p className="mt-1 text-xs text-gray-500">
                      Affiche des informations de débogage détaillées. À utiliser uniquement en développement.
                    </p>
                  </div>
                  <Toggle active={settings.system.debugMode} onClick={() => handleToggle("system", "debugMode")}>
                    <span className="toggle-handle" />
                  </Toggle>
                </ToggleField>
              </FormField>
              <FormField>
                <label className="block text-sm font-medium text-gray-700 mb-1">Niveau de journalisation</label>
                <select
                  value={settings.system.logLevel}
                  onChange={(e) => handleInputChange("system", "logLevel", e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                >
                  <option value="error">Erreur</option>
                  <option value="warning">Avertissement</option>
                  <option value="info">Information</option>
                  <option value="debug">Débogage</option>
                </select>
              </FormField>
              <FormField>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fréquence de sauvegarde</label>
                <select
                  value={settings.system.backupFrequency}
                  onChange={(e) => handleInputChange("system", "backupFrequency", e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                >
                  <option value="hourly">Toutes les heures</option>
                  <option value="daily">Quotidienne</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuelle</option>
                </select>
              </FormField>
              <FormField>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Délai d'expiration API (secondes)
                </label>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={settings.system.apiTimeout}
                  onChange={(e) => handleInputChange("system", "apiTimeout", Number.parseInt(e.target.value))}
                  className="focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>
            </FormGrid>
          </SettingsCardBody>
        </SettingsCard>
      </div>

      {/* Info Section */}
      <AlertBox type="info" className="info">
        <FiInfo size={20} />
        <div className="content">
          <p className="title">Information</p>
          <p className="message">
            Les modifications des paramètres système sont enregistrées dans l'historique et peuvent être consultées dans
            les journaux d'audit.
          </p>
        </div>
      </AlertBox>
    </div>
  )
}

export default SystemSettings

