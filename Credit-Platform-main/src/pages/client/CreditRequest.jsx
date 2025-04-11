"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { theme } from "../../styles/theme"
import {
  FiCreditCard,
  FiFileText,
  FiInfo,
  FiCheck,
  FiArrowRight,
  FiArrowLeft,
  FiUpload,
  FiX,
  FiAlertCircle,
  FiUser,
  FiBriefcase,
  FiDollarSign,
  FiHome,
  FiTruck,
  FiShoppingBag,
} from "react-icons/fi"
import TableauCharges from "../../components/credit/TableauCharges" // Import du composant TableauCharges

/**
 * Composants stylisés pour la page de demande de crédit
 */
const RequestContainer = styled.div`
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

// Conteneur des étapes
const StepsContainer = styled.div`
  margin-bottom: 2rem;
`

// Barre de progression
const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 2rem;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #E5E7EB;
    transform: translateY(-50%);
    z-index: 0;
  }

  .progress {
    position: absolute;
    top: 50%;
    left: 0;
    height: 2px;
    background-color: ${theme.colors.primary[600]};
    transform: translateY(-50%);
    z-index: 1;
    transition: width 0.3s ease;
  }
`

// Étape
const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;

  .step-circle {
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-bottom: 0.5rem;
    transition: all 0.3s ease;

    &.active {
      background-color: ${theme.colors.primary[600]};
      color: white;
    }

    &.completed {
      background-color: ${theme.colors.primary[600]};
      color: white;
    }

    &.pending {
      background-color: white;
      color: #6B7280;
      border: 2px solid #E5E7EB;
    }
  }

  .step-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #6B7280;

    &.active {
      color: ${theme.colors.primary[600]};
    }

    &.completed {
      color: ${theme.colors.primary[600]};
    }
  }
`

// Carte de formulaire
const FormCard = styled.div`
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 2rem;

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

    .card-subtitle {
      font-size: 0.875rem;
      color: #6B7280;
      margin-top: 0.25rem;
    }
  }

  .card-body {
    padding: 1.5rem;
  }
`

// Grille de formulaire
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

// Groupe de formulaire
const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  &.full-width {
    grid-column: 1 / -1;
  }

  .form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  .form-input {
    width: 100%;
    padding: 0.625rem 0.75rem;
    border: 1px solid #D1D5DB;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary[400]};
      box-shadow: 0 0 0 2px ${theme.colors.primary[100]};
    }

    &.error {
      border-color: #EF4444;
    }
  }

  .form-select {
    width: 100%;
    padding: 0.625rem 0.75rem;
    border: 1px solid #D1D5DB;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    background-color: white;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary[400]};
      box-shadow: 0 0 0 2px ${theme.colors.primary[100]};
    }
  }

  .form-helper {
    font-size: 0.75rem;
    color: #6B7280;
    margin-top: 0.25rem;
  }

  .form-error {
    font-size: 0.75rem;
    color: #EF4444;
    margin-top: 0.25rem;
  }
`

// Zone de téléchargement de fichier
const FileUpload = styled.div`
  border: 2px dashed #E5E7EB;
  border-radius: 0.5rem;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary[400]};
    background-color: ${theme.colors.primary[50]};
  }

  .upload-icon {
    width: 48px;
    height: 48px;
    border-radius: 9999px;
    background-color: ${theme.colors.primary[100]};
    color: ${theme.colors.primary[600]};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
  }

  .upload-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: #111827;
    margin-bottom: 0.5rem;
  }

  .upload-subtitle {
    font-size: 0.75rem;
    color: #6B7280;
  }

  input[type="file"] {
    display: none;
  }
`

// Liste de fichiers
const FileList = styled.div`
  margin-top: 1.5rem;

  .file-item {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.375rem;
    margin-bottom: 0.5rem;

    .file-icon {
      width: 36px;
      height: 36px;
      border-radius: 0.25rem;
      background-color: #F3F4F6;
      color: #6B7280;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.75rem;
    }

    .file-info {
      flex: 1;

      .file-name {
        font-size: 0.875rem;
        font-weight: 500;
        color: #111827;
        margin-bottom: 0.25rem;
      }

      .file-size {
        font-size: 0.75rem;
        color: #6B7280;
      }
    }

    .file-remove {
      width: 28px;
      height: 28px;
      border-radius: 9999px;
      background-color: #F3F4F6;
      color: #6B7280;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: #FEE2E2;
        color: #EF4444;
      }
    }
  }
`

// Carte d'information
const InfoCard = styled.div`
  background-color: ${theme.colors.primary[50]};
  border: 1px solid ${theme.colors.primary[100]};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;

  .info-content {
    display: flex;

    .info-icon {
      width: 36px;
      height: 36px;
      border-radius: 9999px;
      background-color: ${theme.colors.primary[100]};
      color: ${theme.colors.primary[600]};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.75rem;
      flex-shrink: 0;
    }

    .info-text {
      flex: 1;

      .info-title {
        font-size: 0.875rem;
        font-weight: 500;
        color: #111827;
        margin-bottom: 0.25rem;
      }

      .info-description {
        font-size: 0.75rem;
        color: #6B7280;
      }
    }
  }
`

// Carte de résumé
const SummaryCard = styled.div`
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 2rem;

  .summary-header {
    padding: 1.5rem;
    border-bottom: 1px solid #E5E7EB;

    .summary-title {
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

  .summary-body {
    padding: 1.5rem;
  }

  .summary-list {
    .summary-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #E5E7EB;

      &:last-child {
        border-bottom: none;
      }

      .item-label {
        font-size: 0.875rem;
        color: #6B7280;
      }

      .item-value {
        font-size: 0.875rem;
        font-weight: 500;
        color: #111827;
      }
    }
  }
`

// Boutons de navigation
const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  .action-button {
    display: inline-flex;
    align-items: center;
    padding: 0.625rem 1.25rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;
    cursor: pointer;

    &.primary {
      background-color: ${theme.colors.primary[600]};
      color: white;

      &:hover {
        background-color: ${theme.colors.primary[700]};
      }

      &:disabled {
        background-color: #9CA3AF;
        cursor: not-allowed;
      }
    }

    &.secondary {
      background-color: white;
      color: #4B5563;
      border: 1px solid #D1D5DB;

      &:hover {
        background-color: #F9FAFB;
        color: #111827;
      }
    }

    .button-icon {
      &.left {
        margin-right: 0.5rem;
      }

      &.right {
        margin-left: 0.5rem;
      }
    }
  }
`

// Carte de confirmation
const ConfirmationCard = styled.div`
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 3rem 2rem;
  text-align: center;

  .confirmation-icon {
    width: 72px;
    height: 72px;
    border-radius: 9999px;
    background-color: ${theme.colors.primary[100]};
    color: ${theme.colors.primary[600]};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;

    svg {
      width: 36px;
      height: 36px;
    }
  }

  .confirmation-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.75rem;
  }

  .confirmation-description {
    font-size: 1rem;
    color: #6B7280;
    margin-bottom: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .confirmation-reference {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #F3F4F6;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 2rem;
  }

  .confirmation-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    @media (min-width: 640px) {
      flex-direction: row;
      justify-content: center;
    }

    .action-button {
      display: inline-flex;
      align-items: center;
      padding: 0.625rem 1.25rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s ease;
      text-decoration: none;

      &.primary {
        background-color: ${theme.colors.primary[600]};
        color: white;

        &:hover {
          background-color: ${theme.colors.primary[700]};
        }
      }

      &.secondary {
        background-color: white;
        color: #4B5563;
        border: 1px solid #D1D5DB;

        &:hover {
          background-color: #F9FAFB;
          color: #111827;
        }
      }

      .button-icon {
        margin-left: 0.5rem;
      }
    }
  }
`

// Définition des configurations pour chaque type de crédit
const creditTypeConfigs = {
  SAFIDY: {
    title: "SAFIDY - Crédit à la consommation",
    description: "Crédit à la consommation pour financer vos projets personnels",
    icon: <FiShoppingBag />,
    minAmount: 500000,
    maxAmount: 10000000,
    durations: [6, 12, 24],
    interestRate: 1.85,
    purposes: ["Achat équipement", "Rénovation", "Éducation", "Santé", "Événement familial", "Autre"],
    eligibility: {
      minAge: 21,
      maxAge: 60,
      employmentStatuses: ["Salarié", "Fonctionnaire"],
      minEmploymentDuration: 6, // en mois
    },
    requiredDocuments: [
      "Pièce d'identité",
      "Certificat de résidence",
      "3 dernières fiches de paie",
      "Relevés bancaires des 3 derniers mois",
      "Justificatif de domicile",
    ],
    guarantees: ["Caution solidaire"],
  },
  "AVOTRA AINGA": {
    title: "AVOTRA AINGA - Micro entreprise",
    description: "Crédit pour les micro-entreprises avec 1 an d'ancienneté",
    icon: <FiHome />,
    minAmount: 300000,
    maxAmount: 5000000,
    durations: [3, 6, 9, 12],
    interestRate: 2.2,
    purposes: ["Besoin en fonds de roulement", "Investissement", "Les deux à la fois"],
    eligibility: {
      minAge: 21,
      maxAge: 60,
      employmentStatuses: ["Entrepreneur", "Auto-entrepreneur", "Commerçant"],
      minBusinessDuration: 12, // en mois
    },
    requiredDocuments: [
      "Pièce d'identité",
      "Certificat de résidence",
      "Justificatif d'activité",
      "Carte fiscale",
      "Carte statistique",
      "Déclaration de patrimoine",
    ],
    guarantees: ["Matériel", "Véhicule", "Propriété"],
  },
  "AVOTRA MIHARY": {
    title: "AVOTRA MIHARY - Très petite entreprise",
    description: "Crédit pour les très petites entreprises (TPE)",
    icon: <FiBriefcase />,
    minAmount: 5000001,
    maxAmount: 20000000,
    durations: [6, 12, 18],
    interestRate: 2.0,
    purposes: ["Renforcement de trésorerie", "Investissement", "Les deux à la fois"],
    eligibility: {
      minAge: 21,
      maxAge: 60,
      employmentStatuses: ["Entrepreneur", "Gérant de TPE"],
      minBusinessDuration: 12, // en mois
    },
    requiredDocuments: [
      "Pièce d'identité",
      "Certificat de résidence",
      "Justificatif d'activité",
      "Carte fiscale",
      "Carte statistique",
      "États financiers",
      "Déclaration de patrimoine",
    ],
    guarantees: ["Matériel", "Véhicule", "Propriété"],
  },
  "AVOTRA ROSO": {
    title: "AVOTRA ROSO - Petite et moyenne entreprise Cat I",
    description: "Crédit pour les petites et moyennes entreprises (PME) Catégorie I",
    icon: <FiTruck />,
    minAmount: 20000001,
    maxAmount: 50000000,
    durations: [12, 18, 24],
    interestRate: 1.8,
    purposes: ["Renforcement de trésorerie", "Investissement", "Les deux à la fois"],
    eligibility: {
      minAge: 21,
      maxAge: 60,
      employmentStatuses: ["Entrepreneur", "Gérant de PME"],
      minBusinessDuration: 12, // en mois
    },
    requiredDocuments: [
      "Pièce d'identité",
      "Certificat de résidence",
      "Justificatif d'activité",
      "Carte fiscale",
      "Carte statistique",
      "États financiers",
      "Plan d'affaires",
      "Déclaration de patrimoine",
    ],
    guarantees: ["Matériel", "Véhicule", "Propriété", "Nantissement de fonds de commerce"],
  },
  "AVOTRA AMBOARA": {
    title: "AVOTRA AMBOARA - Petite et moyenne entreprise Cat II",
    description: "Crédit pour les petites et moyennes entreprises (PME) Catégorie II",
    icon: <FiDollarSign />,
    minAmount: 50000001,
    maxAmount: 100000000,
    durations: [12, 18, 24],
    interestRate: 1.7,
    purposes: ["Renforcement de trésorerie", "Investissement", "Les deux à la fois"],
    eligibility: {
      minAge: 21,
      maxAge: 60,
      employmentStatuses: ["Entrepreneur", "Gérant de PME"],
      minBusinessDuration: 18, // en mois
    },
    requiredDocuments: [
      "Pièce d'identité",
      "Certificat de résidence",
      "Justificatif d'activité",
      "Carte fiscale",
      "Carte statistique",
      "États financiers",
      "Plan d'affaires",
      "Déclaration de patrimoine",
      "Historique bancaire",
    ],
    guarantees: ["Matériel", "Véhicule", "Propriété", "Nantissement de fonds de commerce"],
  },
}

/**
 * Composant CreditRequest
 *
 * Ce composant permet aux clients de soumettre une demande de crédit
 * en suivant un processus en plusieurs étapes.
 */
const CreditRequest = () => {
  // États
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    creditType: "",
    amount: "",
    duration: "",
    purpose: "",
    employmentStatus: "",
    monthlyIncome: "",
    otherLoans: "non",
    otherLoansAmount: "",
    businessDuration: "",
    businessType: "",
    businessRevenue: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Madagascar",
    guaranteeType: "",
    guaranteeValue: "",
    apportPersonnel: "",
  })
  const [files, setFiles] = useState([])
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const [selectedCreditConfig, setSelectedCreditConfig] = useState(null)
  const [tableauData, setTableauData] = useState(null) // State pour stocker les données du TableauCharges

  // Définition des étapes
  const steps = [
    { id: 1, label: "Informations du crédit" },
    { id: 2, label: "Informations personnelles" },
    { id: 3, label: "Documents requis" },
    { id: 4, label: "Vérification" },
    { id: 5, label: "Confirmation" },
  ]

  // Mettre à jour la configuration du crédit lorsque le type de crédit change
  useEffect(() => {
    if (formData.creditType && creditTypeConfigs[formData.creditType]) {
      setSelectedCreditConfig(creditTypeConfigs[formData.creditType])
    } else {
      setSelectedCreditConfig(null)
    }
  }, [formData.creditType])

  /**
   * Calcule la largeur de la barre de progression
   * @returns {string} - La largeur en pourcentage
   */
  const getProgressWidth = () => {
    return `${((currentStep - 1) / (steps.length - 1)) * 100}%`
  }

  /**
   * Gère les changements dans les champs du formulaire
   * @param {Event} e - L'événement de changement
   */
  const handleChange = (e) => {
    const { name, value } = e.target

    // Réinitialiser certains champs si le type de crédit change
    if (name === "creditType") {
      setFormData({
        ...formData,
        [name]: value,
        duration: "",
        purpose: "",
        amount: "",
        guaranteeType: "",
        guaranteeValue: "",
        apportPersonnel: "",
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }

    // Effacer l'erreur lorsque l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  /**
   * Gère le téléchargement de fichiers
   * @param {Event} e - L'événement de téléchargement
   */
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files)
    setFiles([...files, ...uploadedFiles])
  }

  /**
   * Supprime un fichier de la liste
   * @param {number} index - L'index du fichier à supprimer
   */
  const removeFile = (index) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  /**
   * Formate la taille du fichier
   * @param {number} size - La taille en octets
   * @returns {string} - La taille formatée
   */
  const formatFileSize = (size) => {
    if (size < 1024) {
      return size + " octets"
    } else if (size < 1024 * 1024) {
      return Math.round(size / 1024) + " Ko"
    } else {
      return Math.round(size / (1024 * 1024)) + " Mo"
    }
  }

  /**
   * Valide les champs du formulaire pour l'étape actuelle
   * @returns {boolean} - Vrai si les champs sont valides
   */
  const validateStep = () => {
    const newErrors = {}

    if (currentStep === 1) {
      if (!formData.creditType) newErrors.creditType = "Veuillez sélectionner un type de crédit"
      if (!formData.amount) newErrors.amount = "Veuillez entrer un montant"
      if (!formData.duration) newErrors.duration = "Veuillez sélectionner une durée"
      if (!formData.purpose) newErrors.purpose = "Veuillez indiquer l'objet du crédit"

      // Validation spécifique selon le type de crédit
      if (selectedCreditConfig) {
        // Vérifier le montant minimum et maximum
        const amount = Number.parseFloat(formData.amount)
        if (amount < selectedCreditConfig.minAmount) {
          newErrors.amount = `Le montant minimum pour ce type de crédit est de ${selectedCreditConfig.minAmount.toLocaleString()} Ar`
        }
        if (amount > selectedCreditConfig.maxAmount) {
          newErrors.amount = `Le montant maximum pour ce type de crédit est de ${selectedCreditConfig.maxAmount.toLocaleString()} Ar`
        }

        // Vérifications spécifiques pour les crédits professionnels
        if (formData.creditType !== "SAFIDY") {
          if (!formData.businessDuration)
            newErrors.businessDuration = "Veuillez indiquer l'ancienneté de votre activité"
          if (!formData.businessType) newErrors.businessType = "Veuillez indiquer le type d'activité"
          if (!formData.businessRevenue) newErrors.businessRevenue = "Veuillez indiquer le chiffre d'affaires annuel"
          if (!formData.guaranteeType) newErrors.guaranteeType = "Veuillez sélectionner un type de garantie"

          // Vérifier l'apport personnel pour les investissements
          if (formData.purpose === "Investissement" || formData.purpose === "Les deux à la fois") {
            if (!formData.apportPersonnel) newErrors.apportPersonnel = "Veuillez indiquer votre apport personnel"
            else {
              const apport = Number.parseFloat(formData.apportPersonnel)
              const amount = Number.parseFloat(formData.amount)
              if (apport < amount * 0.2) {
                newErrors.apportPersonnel = "L'apport personnel doit être au moins égal à 20% du montant demandé"
              }
            }
          }
        } else {
          if (!formData.employmentStatus)
            newErrors.employmentStatus = "Veuillez sélectionner votre statut professionnel"
          if (!formData.monthlyIncome) newErrors.monthlyIncome = "Veuillez indiquer votre revenu mensuel"
        }
      }
    } else if (currentStep === 2) {
      if (!formData.firstName) newErrors.firstName = "Veuillez entrer votre prénom"
      if (!formData.lastName) newErrors.lastName = "Veuillez entrer votre nom"
      if (!formData.email) newErrors.email = "Veuillez entrer votre email"
      if (!formData.phone) newErrors.phone = "Veuillez entrer votre numéro de téléphone"
      if (!formData.address) newErrors.address = "Veuillez entrer votre adresse"
      if (!formData.city) newErrors.city = "Veuillez entrer votre ville"
    } else if (currentStep === 3) {
      if (files.length === 0) newErrors.files = "Veuillez télécharger au moins un document"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Passe à l'étape suivante
   */
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  /**
   * Revient à l'étape précédente
   */
  const prevStep = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }

  /**
   * Soumet le formulaire
   */
  const submitForm = () => {
    // Ici, vous enverriez les données au serveur
    console.log("Données du formulaire:", formData)
    console.log("Fichiers:", files)

    // Passer à l'étape de confirmation
    setCurrentStep(5)
    window.scrollTo(0, 0)
  }

  /**
   * Redirige vers le tableau de bord
   */
  const goToDashboard = () => {
    navigate("/client/dashboard")
  }

  /**
   * Redirige vers la page de statut des demandes
   */
  const goToCreditStatus = () => {
    navigate("/client/credit-status")
  }

  /**
   * Rend les champs spécifiques au type de crédit sélectionné
   */
  const renderCreditTypeSpecificFields = () => {
    if (!selectedCreditConfig) return null

    if (formData.creditType === "SAFIDY") {
      return (
        <>
          <FormGroup>
            <label className="form-label" htmlFor="employmentStatus">
              Statut professionnel *
            </label>
            <select
              id="employmentStatus"
              name="employmentStatus"
              className={`form-select ${errors.employmentStatus ? "error" : ""}`}
              value={formData.employmentStatus}
              onChange={handleChange}
            >
              <option value="">Sélectionnez votre statut</option>
              {selectedCreditConfig.eligibility.employmentStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.employmentStatus && <div className="form-error">{errors.employmentStatus}</div>}
          </FormGroup>

          <FormGroup>
            <label className="form-label" htmlFor="monthlyIncome">
              Revenu mensuel (Ar) *
            </label>
            <input
              type="number"
              id="monthlyIncome"
              name="monthlyIncome"
              className={`form-input ${errors.monthlyIncome ? "error" : ""}`}
              placeholder="Ex: 1500000"
              value={formData.monthlyIncome}
              onChange={handleChange}
            />
            {errors.monthlyIncome && <div className="form-error">{errors.monthlyIncome}</div>}
          </FormGroup>

          <FormGroup>
            <label className="form-label" htmlFor="otherLoans">
              Avez-vous d'autres crédits en cours ?
            </label>
            <select
              id="otherLoans"
              name="otherLoans"
              className="form-select"
              value={formData.otherLoans}
              onChange={handleChange}
            >
              <option value="non">Non</option>
              <option value="oui">Oui</option>
            </select>
          </FormGroup>

          {formData.otherLoans === "oui" && (
            <FormGroup>
              <label className="form-label" htmlFor="otherLoansAmount">
                Montant total des mensualités (Ar)
              </label>
              <input
                type="number"
                id="otherLoansAmount"
                name="otherLoansAmount"
                className="form-input"
                placeholder="Ex: 300000"
                value={formData.otherLoansAmount}
                onChange={handleChange}
              />
            </FormGroup>
          )}
        </>
      )
    } else {
      // Champs pour les crédits professionnels (AVOTRA)
      return (
        <>
          <FormGroup>
            <label className="form-label" htmlFor="businessType">
              Type d'activité *
            </label>
            <select
              id="businessType"
              name="businessType"
              className={`form-select ${errors.businessType ? "error" : ""}`}
              value={formData.businessType}
              onChange={handleChange}
            >
              <option value="">Sélectionnez le type d'activité</option>
              <option value="Commerce">Commerce</option>
              <option value="Service">Service</option>
              <option value="Production">Production</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Élevage">Élevage</option>
              <option value="Artisanat">Artisanat</option>
              <option value="Transport">Transport</option>
              <option value="Autre">Autre</option>
            </select>
            {errors.businessType && <div className="form-error">{errors.businessType}</div>}
          </FormGroup>

          <FormGroup>
            <label className="form-label" htmlFor="businessDuration">
              Ancienneté de l'activité (mois) *
            </label>
            <input
              type="number"
              id="businessDuration"
              name="businessDuration"
              className={`form-input ${errors.businessDuration ? "error" : ""}`}
              placeholder="Ex: 24"
              value={formData.businessDuration}
              onChange={handleChange}
            />
            {errors.businessDuration && <div className="form-error">{errors.businessDuration}</div>}
            <div className="form-helper">
              Minimum requis: {selectedCreditConfig.eligibility.minBusinessDuration} mois
            </div>
          </FormGroup>

          <FormGroup>
            <label className="form-label" htmlFor="businessRevenue">
              Chiffre d'affaires annuel (Ar) *
            </label>
            <input
              type="number"
              id="businessRevenue"
              name="businessRevenue"
              className={`form-input ${errors.businessRevenue ? "error" : ""}`}
              placeholder="Ex: 50000000"
              value={formData.businessRevenue}
              onChange={handleChange}
            />
            {errors.businessRevenue && <div className="form-error">{errors.businessRevenue}</div>}
          </FormGroup>

          <FormGroup>
            <label className="form-label" htmlFor="guaranteeType">
              Type de garantie *
            </label>
            <select
              id="guaranteeType"
              name="guaranteeType"
              className={`form-select ${errors.guaranteeType ? "error" : ""}`}
              value={formData.guaranteeType}
              onChange={handleChange}
            >
              <option value="">Sélectionnez un type de garantie</option>
              {selectedCreditConfig.guarantees.map((guarantee) => (
                <option key={guarantee} value={guarantee}>
                  {guarantee}
                </option>
              ))}
            </select>
            {errors.guaranteeType && <div className="form-error">{errors.guaranteeType}</div>}
          </FormGroup>

          <FormGroup>
            <label className="form-label" htmlFor="guaranteeValue">
              Valeur de la garantie (Ar)
            </label>
            <input
              type="number"
              id="guaranteeValue"
              name="guaranteeValue"
              className={`form-input ${errors.guaranteeValue ? "error" : ""}`}
              placeholder="Ex: 10000000"
              value={formData.guaranteeValue}
              onChange={handleChange}
            />
            {errors.guaranteeValue && <div className="form-error">{errors.guaranteeValue}</div>}
            <div className="form-helper">
              La garantie doit représenter au moins{" "}
              {formData.creditType === "AVOTRA AINGA" ? "140" : formData.creditType === "AVOTRA MIHARY" ? "130" : "120"}
              % du montant du crédit
            </div>
          </FormGroup>

          {(formData.purpose === "Investissement" || formData.purpose === "Les deux à la fois") && (
            <FormGroup>
              <label className="form-label" htmlFor="apportPersonnel">
                Apport personnel (Ar) *
              </label>
              <input
                type="number"
                id="apportPersonnel"
                name="apportPersonnel"
                className={`form-input ${errors.apportPersonnel ? "error" : ""}`}
                placeholder="Ex: 2000000"
                value={formData.apportPersonnel}
                onChange={handleChange}
              />
              {errors.apportPersonnel && <div className="form-error">{errors.apportPersonnel}</div>}
              <div className="form-helper">L'apport personnel doit être au moins égal à 20% du montant demandé</div>
            </FormGroup>
          )}
        </>
      )
    }
  }

  // Fonction pour récupérer les données du TableauCharges
  const handleTableauDataChange = (data) => {
    setTableauData(data)
  }

  // Rendu du contenu en fonction de l'étape actuelle
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormCard>
            <div className="card-header">
              <div className="card-title">
                <FiCreditCard className="title-icon" size={20} />
                Informations du crédit
              </div>
              <div className="card-subtitle">Veuillez fournir les détails de votre demande de crédit</div>
            </div>
            <div className="card-body">
              <InfoCard>
                <div className="info-content">
                  <div className="info-icon">
                    <FiInfo size={18} />
                  </div>
                  <div className="info-text">
                    <div className="info-title">Besoin d'aide pour choisir le bon crédit ?</div>
                    <div className="info-description">
                      Consultez notre guide des produits de crédit pour comprendre les différentes options disponibles.
                    </div>
                  </div>
                </div>
              </InfoCard>

              {/* Intégration du TableauCharges */}
              <TableauCharges onDataChange={handleTableauDataChange} />

              <FormGrid>
                <FormGroup>
                  <label className="form-label" htmlFor="creditType">
                    Type de crédit *
                  </label>
                  <select
                    id="creditType"
                    name="creditType"
                    className={`form-select ${errors.creditType ? "error" : ""}`}
                    value={formData.creditType}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionnez un type de crédit</option>
                    <option value="SAFIDY">SAFIDY</option>
                    <option value="AVOTRA AINGA">AVOTRA AINGA</option>
                    <option value="AVOTRA MIHARY">AVOTRA MIHARY</option>
                    <option value="AVOTRA ROSO">AVOTRA ROSO</option>
                    <option value="AVOTRA AMBOARA">AVOTRA AMBOARA</option>
                  </select>
                  {errors.creditType && <div className="form-error">{errors.creditType}</div>}
                </FormGroup>

                {selectedCreditConfig && (
                  <>
                    <FormGroup>
                      <label className="form-label" htmlFor="amount">
                        Montant souhaité (Ar) *
                      </label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        className={`form-input ${errors.amount ? "error" : ""}`}
                        placeholder={`Ex: ${selectedCreditConfig.minAmount.toLocaleString()}`}
                        value={formData.amount}
                        onChange={handleChange}
                      />
                      {errors.amount && <div className="form-error">{errors.amount}</div>}
                      <div className="form-helper">
                        Montant: {selectedCreditConfig.minAmount.toLocaleString()} Ar à{" "}
                        {selectedCreditConfig.maxAmount.toLocaleString()} Ar
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <label className="form-label" htmlFor="duration">
                        Durée du crédit *
                      </label>
                      <select
                        id="duration"
                        name="duration"
                        className={`form-select ${errors.duration ? "error" : ""}`}
                        value={formData.duration}
                        onChange={handleChange}
                      >
                        <option value="">Sélectionnez une durée</option>
                        {selectedCreditConfig.durations.map((duration) => (
                          <option key={duration} value={duration}>
                            {duration} mois
                          </option>
                        ))}
                      </select>
                      {errors.duration && <div className="form-error">{errors.duration}</div>}
                    </FormGroup>

                    <FormGroup>
                      <label className="form-label" htmlFor="purpose">
                        Objet du crédit *
                      </label>
                      <select
                        id="purpose"
                        name="purpose"
                        className={`form-select ${errors.purpose ? "error" : ""}`}
                        value={formData.purpose}
                        onChange={handleChange}
                      >
                        <option value="">Sélectionnez un objet</option>
                        {selectedCreditConfig.purposes.map((purpose) => (
                          <option key={purpose} value={purpose}>
                            {purpose}
                          </option>
                        ))}
                      </select>
                      {errors.purpose && <div className="form-error">{errors.purpose}</div>}
                    </FormGroup>

                    {renderCreditTypeSpecificFields()}
                  </>
                )}
              </FormGrid>
            </div>
          </FormCard>
        )

      case 2:
        return (
          <FormCard>
            <div className="card-header">
              <div className="card-title">
                <FiUser className="title-icon" size={20} />
                Informations personnelles
              </div>
              <div className="card-subtitle">Veuillez fournir vos informations personnelles</div>
            </div>
            <div className="card-body">
              <FormGrid>
                <FormGroup>
                  <label className="form-label" htmlFor="firstName">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`form-input ${errors.firstName ? "error" : ""}`}
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <div className="form-error">{errors.firstName}</div>}
                </FormGroup>

                <FormGroup>
                  <label className="form-label" htmlFor="lastName">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`form-input ${errors.lastName ? "error" : ""}`}
                    placeholder="Votre nom"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <div className="form-error">{errors.lastName}</div>}
                </FormGroup>

                <FormGroup>
                  <label className="form-label" htmlFor="email">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${errors.email ? "error" : ""}`}
                    placeholder="votre.email@exemple.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </FormGroup>

                <FormGroup>
                  <label className="form-label" htmlFor="phone">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`form-input ${errors.phone ? "error" : ""}`}
                    placeholder="Ex: 034 12 345 67"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <div className="form-error">{errors.phone}</div>}
                </FormGroup>

                <FormGroup className="full-width">
                  <label className="form-label" htmlFor="address">
                    Adresse *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className={`form-input ${errors.address ? "error" : ""}`}
                    placeholder="Votre adresse"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && <div className="form-error">{errors.address}</div>}
                </FormGroup>

                <FormGroup>
                  <label className="form-label" htmlFor="city">
                    Ville *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className={`form-input ${errors.city ? "error" : ""}`}
                    placeholder="Votre ville"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <div className="form-error">{errors.city}</div>}
                </FormGroup>

                <FormGroup>
                  <label className="form-label" htmlFor="postalCode">
                    Code postal
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    className="form-input"
                    placeholder="Votre code postal"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label className="form-label" htmlFor="country">
                    Pays
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    className="form-input"
                    value={formData.country}
                    onChange={handleChange}
                    disabled
                  />
                </FormGroup>
              </FormGrid>
            </div>
          </FormCard>
        )

      case 3:
        return (
          <FormCard>
            <div className="card-header">
              <div className="card-title">
                <FiFileText className="title-icon" size={20} />
                Documents requis
              </div>
              <div className="card-subtitle">Veuillez télécharger les documents nécessaires pour votre demande</div>
            </div>
            <div className="card-body">
              <InfoCard>
                <div className="info-content">
                  <div className="info-icon">
                    <FiInfo size={18} />
                  </div>
                  <div className="info-text">
                    <div className="info-title">Documents à fournir</div>
                    <div className="info-description">
                      {selectedCreditConfig ? (
                        <div>
                          Pour traiter votre demande de crédit {formData.creditType}, nous avons besoin des documents
                          suivants:
                          <ul className="mt-2 ml-4 list-disc">
                            {selectedCreditConfig.requiredDocuments.map((doc, index) => (
                              <li key={index} className="text-sm text-gray-600">
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        "Veuillez sélectionner un type de crédit pour voir les documents requis."
                      )}
                    </div>
                  </div>
                </div>
              </InfoCard>

              <FileUpload onClick={() => document.getElementById("file-upload").click()}>
                <input type="file" id="file-upload" multiple onChange={handleFileUpload} />
                <div className="upload-icon">
                  <FiUpload size={24} />
                </div>
                <div className="upload-title">Glissez-déposez vos fichiers ici ou cliquez pour parcourir</div>
                <div className="upload-subtitle">Formats acceptés : PDF, JPG, PNG (max. 10 Mo par fichier)</div>
              </FileUpload>

              {errors.files && <div className="form-error mt-2">{errors.files}</div>}

              {files.length > 0 && (
                <FileList>
                  {files.map((file, index) => (
                    <div className="file-item" key={index}>
                      <div className="file-icon">
                        <FiFileText size={18} />
                      </div>
                      <div className="file-info">
                        <div className="file-name">{file.name}</div>
                        <div className="file-size">{formatFileSize(file.size)}</div>
                      </div>
                      <div className="file-remove" onClick={() => removeFile(index)}>
                        <FiX size={16} />
                      </div>
                    </div>
                  ))}
                </FileList>
              )}
            </div>
          </FormCard>
        )

      case 4:
        return (
          <>
            <FormCard>
              <div className="card-header">
                <div className="card-title">
                  <FiCheck className="title-icon" size={20} />
                  Vérification de votre demande
                </div>
                <div className="card-subtitle">Veuillez vérifier les informations avant de soumettre votre demande</div>
              </div>
              <div className="card-body">
                <SummaryCard>
                  <div className="summary-header">
                    <div className="summary-title">
                      <FiCreditCard className="title-icon" size={18} />
                      Informations du crédit
                    </div>
                  </div>
                  <div className="summary-body">
                    <div className="summary-list">
                      <div className="summary-item">
                        <div className="item-label">Type de crédit</div>
                        <div className="item-value">{formData.creditType}</div>
                      </div>
                      <div className="summary-item">
                        <div className="item-label">Montant</div>
                        <div className="item-value">
                          {new Intl.NumberFormat("fr-MG", { style: "currency", currency: "MGA" })
                            .format(formData.amount)
                            .replace("MGA", "Ar")}
                        </div>
                      </div>
                      <div className="summary-item">
                        <div className="item-label">Durée</div>
                        <div className="item-value">{formData.duration} mois</div>
                      </div>
                      <div className="summary-item">
                        <div className="item-label">Objet du crédit</div>
                        <div className="item-value">{formData.purpose}</div>
                      </div>

                      {formData.creditType === "SAFIDY" ? (
                        <>
                          <div className="summary-item">
                            <div className="item-label">Statut professionnel</div>
                            <div className="item-value">{formData.employmentStatus}</div>
                          </div>
                          <div className="summary-item">
                            <div className="item-label">Revenu mensuel</div>
                            <div className="item-value">
                              {new Intl.NumberFormat("fr-MG", { style: "currency", currency: "MGA" })
                                .format(formData.monthlyIncome)
                                .replace("MGA", "Ar")}
                            </div>
                          </div>
                          <div className="summary-item">
                            <div className="item-label">Autres crédits en cours</div>
                            <div className="item-value">{formData.otherLoans === "oui" ? "Oui" : "Non"}</div>
                          </div>
                          {formData.otherLoans === "oui" && (
                            <div className="summary-item">
                              <div className="item-label">Montant des mensualités</div>
                              <div className="item-value">
                                {new Intl.NumberFormat("fr-MG", { style: "currency", currency: "MGA" })
                                  .format(formData.otherLoansAmount)
                                  .replace("MGA", "Ar")}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="summary-item">
                            <div className="item-label">Type d'activité</div>
                            <div className="item-value">{formData.businessType}</div>
                          </div>
                          <div className="summary-item">
                            <div className="item-label">Ancienneté de l'activité</div>
                            <div className="item-value">{formData.businessDuration} mois</div>
                          </div>
                          <div className="summary-item">
                            <div className="item-label">Chiffre d'affaires annuel</div>
                            <div className="item-value">
                              {new Intl.NumberFormat("fr-MG", { style: "currency", currency: "MGA" })
                                .format(formData.businessRevenue)
                                .replace("MGA", "Ar")}
                            </div>
                          </div>
                          <div className="summary-item">
                            <div className="item-label">Type de garantie</div>
                            <div className="item-value">{formData.guaranteeType}</div>
                          </div>
                          {formData.guaranteeValue && (
                            <div className="summary-item">
                              <div className="item-label">Valeur de la garantie</div>
                              <div className="item-value">
                                {new Intl.NumberFormat("fr-MG", { style: "currency", currency: "MGA" })
                                  .format(formData.guaranteeValue)
                                  .replace("MGA", "Ar")}
                              </div>
                            </div>
                          )}
                          {formData.apportPersonnel && (
                            <div className="summary-item">
                              <div className="item-label">Apport personnel</div>
                              <div className="item-value">
                                {new Intl.NumberFormat("fr-MG", { style: "currency", currency: "MGA" })
                                  .format(formData.apportPersonnel)
                                  .replace("MGA", "Ar")}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </SummaryCard>

                <SummaryCard>
                  <div className="summary-header">
                    <div className="summary-title">
                      <FiUser className="title-icon" size={18} />
                      Informations personnelles
                    </div>
                  </div>
                  <div className="summary-body">
                    <div className="summary-list">
                      <div className="summary-item">
                        <div className="item-label">Nom complet</div>
                        <div className="item-value">
                          {formData.firstName} {formData.lastName}
                        </div>
                      </div>
                      <div className="summary-item">
                        <div className="item-label">Email</div>
                        <div className="item-value">{formData.email}</div>
                      </div>
                      <div className="summary-item">
                        <div className="item-label">Téléphone</div>
                        <div className="item-value">{formData.phone}</div>
                      </div>
                      <div className="summary-item">
                        <div className="item-label">Adresse</div>
                        <div className="item-value">{formData.address}</div>
                      </div>
                      <div className="summary-item">
                        <div className="item-label">Ville</div>
                        <div className="item-value">{formData.city}</div>
                      </div>
                      <div className="summary-item">
                        <div className="item-label">Code postal</div>
                        <div className="item-value">{formData.postalCode || "Non spécifié"}</div>
                      </div>
                      <div className="summary-item">
                        <div className="item-label">Pays</div>
                        <div className="item-value">{formData.country}</div>
                      </div>
                    </div>
                  </div>
                </SummaryCard>

                <SummaryCard>
                  <div className="summary-header">
                    <div className="summary-title">
                      <FiFileText className="title-icon" size={18} />
                      Documents fournis
                    </div>
                  </div>
                  <div className="summary-body">
                    {files.length > 0 ? (
                      <div className="summary-list">
                        {files.map((file, index) => (
                          <div className="summary-item" key={index}>
                            <div className="item-label">Document {index + 1}</div>
                            <div className="item-value">
                              {file.name} ({formatFileSize(file.size)})
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">Aucun document fourni</div>
                    )}
                  </div>
                </SummaryCard>

                <InfoCard>
                  <div className="info-content">
                    <div className="info-icon">
                      <FiAlertCircle size={18} />
                    </div>
                    <div className="info-text">
                      <div className="info-title">Important</div>
                      <div className="info-description">
                        En soumettant cette demande, vous confirmez que toutes les informations fournies sont exactes et
                        complètes. Toute information erronée peut entraîner le rejet de votre demande.
                      </div>
                    </div>
                  </div>
                </InfoCard>
              </div>
            </FormCard>
          </>
        )

      case 5:
        return (
          <ConfirmationCard>
            <div className="confirmation-icon">
              <FiCheck size={36} />
            </div>
            <h2 className="confirmation-title">Demande soumise avec succès !</h2>
            <p className="confirmation-description">
              Votre demande de crédit a été soumise avec succès. Nous l'examinerons dans les plus brefs délais et vous
              tiendrons informé de son avancement.
            </p>
            <div className="confirmation-reference">
              Référence: CR-2023-
              {Math.floor(Math.random() * 1000)
                .toString()
                .padStart(3, "0")}
            </div>
            <div className="confirmation-actions">
              <button className="action-button primary" onClick={goToCreditStatus}>
                Suivre ma demande
                <FiArrowRight className="button-icon" size={16} />
              </button>
              <button className="action-button secondary" onClick={goToDashboard}>
                Retour au tableau de bord
              </button>
            </div>
          </ConfirmationCard>
        )

      default:
        return null
    }
  }

  return (
    <RequestContainer>
      <PageHeader>
        <h1 className="page-title">Demande de crédit</h1>
        <p className="page-description">Complétez le formulaire ci-dessous pour soumettre votre demande de crédit</p>
      </PageHeader>

      {currentStep < 5 && (
        <StepsContainer>
          <ProgressBar>
            <div className="progress" style={{ width: getProgressWidth() }}></div>
            {steps.map((step) => (
              <Step key={step.id}>
                <div
                  className={`step-circle ${currentStep === step.id ? "active" : currentStep > step.id ? "completed" : "pending"}`}
                >
                  {currentStep > step.id ? <FiCheck size={18} /> : step.id}
                </div>
                <div
                  className={`step-label ${currentStep === step.id ? "active" : currentStep > step.id ? "completed" : ""}`}
                >
                  {step.label}
                </div>
              </Step>
            ))}
          </ProgressBar>
        </StepsContainer>
      )}

      {renderStepContent()}

      {currentStep < 5 && (
        <FormActions>
          {currentStep > 1 && (
            <button className="action-button secondary" onClick={prevStep}>
              <FiArrowLeft className="button-icon left" size={16} />
              Précédent
            </button>
          )}

          {currentStep < 4 ? (
            <button className="action-button primary" onClick={nextStep}>
              Suivant
              <FiArrowRight className="button-icon right" size={16} />
            </button>
          ) : (
            <button className="action-button primary" onClick={submitForm}>
              Soumettre la demande
              <FiCheck className="button-icon right" size={16} />
            </button>
          )}
        </FormActions>
      )}
    </RequestContainer>
  )
}

export default CreditRequest
