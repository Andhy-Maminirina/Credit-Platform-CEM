"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"
import {
  FiInfo,
  FiAlertTriangle,
  FiCheck,
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiArrowRight,
} from "react-icons/fi"

// Importer le service d'éligibilité
import { checkEligibility, getExistingLoans } from "../../services/eligibilityService"
import TableauCharges from "./TableauCharges" // Import du composant TableauCharges

const SimulatorContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

const SimulatorHeader = styled.div`
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary[600]} 0%, ${(props) => props.theme.colors.primary[500]} 100%);
  padding: 1.5rem;
  color: white;
`

const SimulatorTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const SimulatorDescription = styled.p`
  font-size: 0.875rem;
  opacity: 0.9;
`

const SimulatorBody = styled.div`
  padding: 1.5rem;
`

const SimulatorForm = styled.form`
  display: grid;
  gap: 1.5rem;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-weight: 500;
  color: ${(props) => props.theme.colors.gray[700]};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${(props) => props.theme.colors.primary[500]};
  }
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.gray[300]};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary[600]};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary[100]};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.gray[400]};
  }
`

const InputWithIcon = styled.div`
  position: relative;

  input {
    padding-left: 2.5rem;
  }

  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${(props) => props.theme.colors.gray[400]};
  }
`

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.gray[300]};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary[600]};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary[100]};
  }
`

const Button = styled.button`
  width: 100%;
  padding: 0.875rem 1.5rem;
  background-color: ${(props) => props.theme.colors.primary[600]};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary[700]};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 65, 54, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

const Divider = styled.div`
  height: 1px;
  background-color: ${(props) => props.theme.colors.gray[200]};
  margin: 1.5rem 0;
`

const ResultContainer = styled(motion.div)`
  margin-top: 1.5rem;
`

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`

const ResultTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray[900]};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${(props) => props.theme.colors.primary[600]};
  }
`

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const ResultItem = styled.div`
  padding: 1.25rem;
  background: ${(props) => (props.highlight ? props.theme.colors.primary[50] : props.theme.colors.gray[50])};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid ${(props) => (props.highlight ? props.theme.colors.primary[100] : props.theme.colors.gray[100])};
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`

const ResultLabel = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.gray[500]};
  margin-bottom: 0.5rem;
`

const ResultValue = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => (props.highlight ? props.theme.colors.primary[700] : props.theme.colors.gray[900])};
`

const AmortizationTable = styled.div`
  margin-top: 2rem;
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray[200]};
  }

  th {
    background-color: ${(props) => props.theme.colors.gray[50]};
    font-weight: 600;
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors.gray[700]};
  }

  td {
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors.gray[700]};
  }

  tr:hover td {
    background-color: ${(props) => props.theme.colors.gray[50]};
  }
`

const InfoBox = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: ${(props) => (props.type === "warning" ? props.theme.colors.warning + "10" : props.type === "success" ? props.theme.colors.success + "10" : props.theme.colors.info + "10")};
  border-left: 4px solid ${(props) => (props.type === "warning" ? props.theme.colors.warning : props.type === "success" ? props.theme.colors.success : props.theme.colors.info)};
  border-radius: 8px;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;

  svg {
    color: ${(props) => (props.type === "warning" ? props.theme.colors.warning : props.type === "success" ? props.theme.colors.success : props.theme.colors.info)};
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  p {
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors.gray[700]};
  }
`

const RecommendationBox = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 8px;
  text-align: center;
`

const RecommendationTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: #166534;
  margin-bottom: 1rem;
`

const RecommendationText = styled.p`
  font-size: 1rem;
  color: #166534;
  margin-bottom: 1.5rem;
`

const RecommendationButton = styled(Button)`
  max-width: 250px;
  margin: 0 auto;
  background-color: #166534;

  &:hover {
    background-color: #14532d;
  }
`

const EligibilityBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: ${(props) => (props.isEligible ? "#10B98120" : "#EF444420")};
  color: ${(props) => (props.isEligible ? "#10B981" : "#EF4444")};

  svg {
    flex-shrink: 0;
  }
`

const Slider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 6px;
  border-radius: 3px;
  background: ${(props) => props.theme.colors.gray[200]};
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.primary[600]};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.2);
      background: ${(props) => props.theme.colors.primary[700]};
    }
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.primary[600]};
    cursor: pointer;
    transition: all 0.2s;
    border: none;

    &:hover {
      transform: scale(1.2);
      background: ${(props) => props.theme.colors.primary[700]};
    }
  }
`

const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;

  span {
    font-size: 0.75rem;
    color: ${(props) => props.theme.colors.gray[500]};
  }
`

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

// Ajouter les props pour les données des types de crédit
const CreditSimulator = ({
  type = "", // Vide pour le simulateur général
  businessType = "",
  showBusinessTypeSelector = true,
  showSalaryField = true,
  isGeneralSimulator = false,
  showFinancingTypeField = false, // Nouveau prop pour afficher le type de financement
  creditTypesData = [], // Données complètes des types de crédit
}) => {
  const navigate = useNavigate()
  // Ajouter les nouveaux champs et mettre à jour les calculs avec les données précises
  // Ajouter le type de financement dans le state
  const [formData, setFormData] = useState({
    amount: "",
    duration: "12",
    monthlySalary: "",
    employmentType: "",
    businessType: businessType || "",
    annualRevenue: "",
    hasFixedIncome: "",
    isBusinessOwner: "",
    financingType: "", // Nouveau champ pour le type de financement
  })

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showAmortizationTable, setShowAmortizationTable] = useState(false)
  const [recommendedCredit, setRecommendedCredit] = useState(null)
  const [tableauData, setTableauData] = useState(null) // State pour stocker les données du TableauCharges

  // Définir les limites selon le type de crédit
  const [limits, setLimits] = useState({
    minAmount: 300000,
    maxAmount: 50000000,
    minDuration: 6,
    maxDuration: 24,
    interestRate: 1.85,
  })

  useEffect(() => {
    // Mettre à jour les limites en fonction du type de crédit
    if (type === "SAFIDY") {
      setLimits({
        minAmount: 300000,
        maxAmount: 50000000,
        minDuration: 6,
        maxDuration: 24,
        interestRate: 1.85,
      })
    } else if (type === "AVOTRA") {
      // Les limites dépendent du sous-type d'AVOTRA
      const businessType = formData.businessType

      if (businessType === "ainga") {
        setLimits({
          minAmount: 300000,
          maxAmount: 5000000,
          minDuration: 3,
          maxDuration: 12,
          interestRate: 2.2,
        })
      } else if (businessType === "mihary") {
        setLimits({
          minAmount: 5000001,
          maxAmount: 20000000,
          minDuration: 6,
          maxDuration: 18,
          interestRate: 2.0,
        })
      } else if (businessType === "roso") {
        setLimits({
          minAmount: 20000001,
          maxAmount: 50000000,
          minDuration: 6,
          maxDuration: 24,
          interestRate: 1.8,
        })
      } else if (businessType === "amboara") {
        setLimits({
          minAmount: 50000001,
          maxAmount: 100000000,
          minDuration: 12,
          maxDuration: 24,
          interestRate: 1.7,
        })
      } else {
        // Valeurs par défaut pour AVOTRA
        setLimits({
          minAmount: 300000,
          maxAmount: 50000000,
          minDuration: 3,
          maxDuration: 24,
          interestRate: 2.0,
        })
      }
    } else {
      // Simulateur général - valeurs par défaut
      setLimits({
        minAmount: 300000,
        maxAmount: 50000000,
        minDuration: 3,
        maxDuration: 24,
        interestRate: 2.0,
      })
    }
  }, [type, formData.businessType])

  // Mettre à jour le montant max en fonction du salaire pour SAFIDY
  useEffect(() => {
    if ((type === "SAFIDY" || isGeneralSimulator) && formData.monthlySalary) {
      const monthlySalary = Number.parseFloat(formData.monthlySalary)
      if (!isNaN(monthlySalary)) {
        // La quotité cessible est de 33% du salaire mensuel
        const maxMonthlyPayment = monthlySalary * 0.33
        setLimits((prev) => ({
          ...prev,
          maxMonthlySalaryBased: maxMonthlyPayment,
        }))
      }
    }
  }, [type, formData.monthlySalary, isGeneralSimulator])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Réinitialiser les résultats quand les données changent
    setResult(null)
    setRecommendedCredit(null)
  }

  const formatCurrency = (value) => {
    try {
      // Arrondir à l'entier le plus proche pour éviter les problèmes de précision
      const roundedValue = Math.round(value)

      return new Intl.NumberFormat("fr-MG", {
        style: "currency",
        currency: "MGA",
        maximumFractionDigits: 0,
      }).format(roundedValue)
    } catch (error) {
      console.error("Erreur de formatage de devise:", error)
      return value.toLocaleString() + " Ar" // Fallback en cas d'erreur
    }
  }

  const calculateMonthlyPayment = (amount, rate, duration) => {
    try {
      // Vérifier que les paramètres sont valides
      if (!amount || amount <= 0 || !duration || duration <= 0) {
        console.error("Paramètres invalides pour le calcul de mensualité:", { amount, rate, duration })

        return 0
      }

      const monthlyRate = rate / 100 / 12

      // Formule standard de calcul d'un prêt à annuités constantes
      if (monthlyRate === 0 || monthlyRate < 0.0001) {
        return amount / duration // Si taux = 0, simple division
      }

      const numerator = amount * monthlyRate * Math.pow(1 + monthlyRate, duration)
      const denominator = Math.pow(1 + monthlyRate, duration) - 1

      if (denominator === 0 || Math.abs(denominator) < 0.0001) {
        console.error("Erreur: dénominateur proche de zéro dans le calcul de mensualité")
        return amount / duration // Fallback en cas d'erreur
      }

      const result = numerator / denominator

      // Vérifier que le résultat est valide
      if (isNaN(result) || !isFinite(result) || result <= 0) {
        console.error("Résultat de calcul de mensualité invalide:", result)
        return amount / duration // Fallback en cas d'erreur
      }

      return result
    } catch (error) {
      console.error("Erreur dans le calcul de mensualité:", error)
      return amount / duration // Fallback en cas d'erreur
    }
  }

  const generateAmortizationTable = (amount, rate, duration, monthlyPayment) => {
    try {
      const table = []
      let remainingAmount = amount
      const monthlyRate = rate / 100 / 12

      for (let month = 1; month <= duration; month++) {
        const interestPayment = remainingAmount * monthlyRate
        const principalPayment = monthlyPayment - interestPayment
        remainingAmount = Math.max(0, remainingAmount - principalPayment)

        table.push({
          month,
          principalPayment: Math.max(0, principalPayment),
          interestPayment: Math.max(0, interestPayment),
          totalPayment: monthlyPayment,
          remainingAmount,
        })

        // Si le montant restant est proche de zéro, on considère le prêt comme remboursé
        if (remainingAmount < 0.01) {
          remainingAmount = 0
          // Si c'est le dernier mois, on s'arrête là
          if (month === duration) break
        }
      }

      return table
    } catch (error) {
      console.error("Erreur dans la génération du tableau d'amortissement:", error)
      return [] // Retourne un tableau vide en cas d'erreur
    }
  }

  // Fonction pour déterminer le type de crédit recommandé
  const determineRecommendedCredit = () => {
    // Logique de recommandation
    const amount = Number.parseFloat(formData.amount)
    const hasFixedIncome = formData.hasFixedIncome === "yes"
    const isBusinessOwner = formData.isBusinessOwner === "yes"

    // Critères de décision
    if (isBusinessOwner) {
      // Si c'est un entrepreneur, recommander AVOTRA
      let avotraType = "AVOTRA"

      // Déterminer le sous-type d'AVOTRA en fonction du montant
      if (amount <= 5000000) {
        avotraType = "AVOTRA AINGA"
      } else if (amount <= 20000000) {
        avotraType = "AVOTRA MIHARY"
      } else if (amount <= 50000000) {
        avotraType = "AVOTRA ROSO"
      } else {
        avotraType = "AVOTRA AMBOARA"
      }

      return {
        type: "AVOTRA",
        subType: avotraType,
        path: "/credit/avotra",
        reason:
          "Vous êtes entrepreneur et ce type de crédit est spécialement conçu pour financer les besoins des entreprises.",
      }
    } else if (hasFixedIncome) {
      // Si c'est un salarié ou fonctionnaire, recommander SAFIDY
      return {
        type: "SAFIDY",
        path: "/credit/safidy",
        reason: "Vous avez un revenu fixe et ce type de crédit est adapté aux salariés et fonctionnaires.",
      }
    } else {
      // Par défaut, recommander SAFIDY si le montant est petit, sinon AVOTRA
      if (amount <= 10000000) {
        return {
          type: "SAFIDY",
          path: "/credit/safidy",
          reason: "Basé sur le montant demandé, ce type de crédit est le plus adapté à votre situation.",
        }
      } else {
        return {
          type: "AVOTRA",
          subType: "AVOTRA",
          path: "/credit/avotra",
          reason:
            "Le montant demandé est élevé et ce type de crédit offre des conditions plus adaptées pour les montants importants.",
        }
      }
    }
  }

  // Modifier la fonction handleSubmit pour intégrer la vérification d'éligibilité
  const handleSubmit = (e) => {
    e.preventDefault() // Empêche le rechargement de la page
    setLoading(true)

    // Vérifier que les champs obligatoires sont remplis
    if (!formData.amount) {
      alert("Veuillez entrer un montant")
      setLoading(false)
      return
    }

    // Simuler un délai de calcul
    setTimeout(async () => {
      try {
        // Convertir les valeurs en nombres
        const amount = Number.parseFloat(formData.amount) || 0
        const duration = Number.parseInt(formData.duration) || 12

        // Utiliser le salaire mensuel du TableauCharges si disponible, sinon celui du formulaire
        const monthlySalary = tableauData?.revenus?.salaireClient || Number.parseFloat(formData.monthlySalary) || 0

        // Vérifier que les valeurs sont valides
        if (amount <= 0) {
          alert("Le montant doit être supérieur à 0")
          setLoading(false)
          return
        }

        // Déterminer le taux d'intérêt et autres frais à utiliser
        let interestRate = limits.interestRate
        let fileFeesRate = 2.0 // Valeur par défaut
        let solidarityFundRate = 1.0 // Valeur par défaut
        let guaranteeRate = 120 // Valeur par défaut en pourcentage
        let penaltyRate = 2.0 // Valeur par défaut
        const creditType = type
        let creditSubType = ""

        // Si c'est le simulateur général, déterminer le type de crédit recommandé
        if (isGeneralSimulator) {
          const recommendation = determineRecommendedCredit()
          setRecommendedCredit(recommendation)
          return // Arrêter ici pour afficher la recommandation
        }

        // Si c'est AVOTRA, utiliser les taux spécifiques au sous-type
        if (type === "AVOTRA") {
          const businessType = formData.businessType

          if (businessType === "ainga") {
            interestRate = 2.2
            fileFeesRate = 2.5
            solidarityFundRate = 1.0
            guaranteeRate = 140
            penaltyRate = 2.75
            creditSubType = "AINGA"
          } else if (businessType === "mihary") {
            interestRate = 2.0
            fileFeesRate = 2.35
            solidarityFundRate = 1.5
            guaranteeRate = 130
            penaltyRate = 2.5
            creditSubType = "MIHARY"
          } else if (businessType === "roso") {
            interestRate = 1.8
            fileFeesRate = 2.2
            solidarityFundRate = 2.0
            guaranteeRate = 120
            penaltyRate = 2.25
            creditSubType = "ROSO"
          } else if (businessType === "amboara") {
            interestRate = 1.7
            fileFeesRate = 2.0
            solidarityFundRate = 2.0
            guaranteeRate = 120
            penaltyRate = 2.0
            creditSubType = "AMBOARA"
          }
        }

        // Calculer la mensualité
        const monthlyPayment = calculateMonthlyPayment(amount, interestRate, duration)
        const totalAmount = monthlyPayment * duration
        const totalInterest = totalAmount - amount

        // Frais de dossier
        const fileFees = amount * (fileFeesRate / 100)

        // Fonds de solidarité
        const solidarityFund = amount * (solidarityFundRate / 100)

        // Garantie requise
        const guaranteeAmount = amount * (guaranteeRate / 100)

        // Apport personnel requis
        let personalContribution = 0
        if (formData.financingType === "investment" || formData.financingType === "both") {
          personalContribution = amount * 0.2 // 20% pour investissement
        }

        // Coût total du crédit
        const totalCost = totalAmount + fileFees + solidarityFund

        // Taux effectif global (TEG)
        const effectiveRate = ((totalInterest + fileFees + solidarityFund) / amount) * 100 * (12 / duration)

        // Vérifier l'éligibilité avec le nouveau service
        let isEligible = true
        let eligibilityMessage = ""
        let eligibilityReasons = []
        let eligibilityWarnings = []

        // Récupérer les prêts existants (simulation)
        const clientId = localStorage.getItem("userId") || "guest-user"
        const existingLoansResponse = await getExistingLoans(clientId)
        const existingLoans = existingLoansResponse.data || []

        // Préparer les données pour la vérification d'éligibilité
        const eligibilityData = {
          monthlySalary,
          amount,
          duration,
          creditType: creditSubType ? `${creditType}_${creditSubType}` : creditType,
          monthlyPayment,
          existingLoans,
          businessAge: formData.businessAge ? Number.parseInt(formData.businessAge) : undefined,
          employmentType: formData.employmentType,
          financingType: formData.financingType,
        }

        // Vérifier l'éligibilité
        const eligibilityResponse = await checkEligibility(eligibilityData)
        const eligibilityResult = eligibilityResponse.data

        // Mettre à jour l'éligibilité
        isEligible = eligibilityResult.isEligible
        eligibilityReasons = eligibilityResult.reasons || []
        eligibilityWarnings = eligibilityResult.warnings || []

        if (!isEligible && eligibilityReasons.length > 0) {
          eligibilityMessage = eligibilityReasons[0].message
        }

        // Générer le tableau d'amortissement
        const amortizationTable = generateAmortizationTable(amount, interestRate, duration, monthlyPayment)

        // Définir le résultat
        const resultData = {
          amount,
          duration,
          interestRate,
          monthlyPayment,
          totalAmount,
          totalInterest,
          fileFees,
          fileFeesRate,
          solidarityFund,
          solidarityFundRate,
          guaranteeAmount,
          guaranteeRate,
          personalContribution,
          totalCost,
          effectiveRate,
          isEligible,
          eligibilityMessage,
          eligibilityReasons,
          eligibilityWarnings,
          amortizationTable,
          creditType,
          creditSubType,
          penaltyRate,
          financingType: formData.financingType,
          existingLoans,
        }

        console.log("Résultat calculé:", resultData)
        setResult(resultData)
      } catch (error) {
        console.error("Erreur lors du calcul:", error)
        alert("Une erreur s'est produite lors du calcul. Veuillez réessayer.")
      } finally {
        setLoading(false)
      }
    }, 500)
  }

  const handleContinueToRecommended = () => {
    if (recommendedCredit) {
      navigate(recommendedCredit.path)
    }
  }

  // Fonction pour récupérer les données du TableauCharges
  const handleTableauDataChange = (data) => {
    setTableauData(data)
  }

  // 3. Ajouter une vérification pour s'assurer que le résultat est affiché
  useEffect(() => {
    if (result) {
      console.log("Résultat mis à jour:", result)
    }
  }, [result])

  // 4. Ajouter une fonction de débogage pour aider à identifier les problèmes
  const debugFormData = () => {
    console.log("État actuel du formulaire:", {
      formData,
      limits,
      type,
      businessType,
      isGeneralSimulator,
    })
  }

  return (
    <SimulatorContainer>
      <SimulatorHeader>
        <SimulatorTitle>
          {isGeneralSimulator ? "Simulateur de crédit intelligent" : `Simulateur de crédit ${type}`}
        </SimulatorTitle>
        <SimulatorDescription>
          {isGeneralSimulator
            ? "Nous analyserons votre profil pour vous recommander le crédit le plus adapté"
            : type === "SAFIDY"
              ? "Estimez vos mensualités et le coût total de votre crédit à la consommation"
              : "Calculez le financement adapté à votre entreprise"}
        </SimulatorDescription>
      </SimulatorHeader>

      <SimulatorBody>
        <SimulatorForm onSubmit={handleSubmit}>
          {/* Intégration du TableauCharges */}
          <TableauCharges onDataChange={handleTableauDataChange} />

          {isGeneralSimulator && (
            <>
              <FormRow>
                <FormGroup>
                  <Label>
                    <FiUser size={16} />
                    Avez-vous un revenu fixe mensuel ? (salarié, fonctionnaire)
                  </Label>
                  <Select name="hasFixedIncome" value={formData.hasFixedIncome} onChange={handleChange} required>
                    <option value="">Sélectionnez</option>
                    <option value="yes">Oui</option>
                    <option value="no">Non</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FiBriefcase size={16} />
                    Êtes-vous entrepreneur ou propriétaire d'entreprise ?
                  </Label>
                  <Select name="isBusinessOwner" value={formData.isBusinessOwner} onChange={handleChange} required>
                    <option value="">Sélectionnez</option>
                    <option value="yes">Oui</option>
                    <option value="no">Non</option>
                  </Select>
                </FormGroup>
              </FormRow>
            </>
          )}

          {type === "AVOTRA" && showBusinessTypeSelector && (
            <FormGroup>
              <Label>
                <FiBriefcase size={16} />
                Type d'entreprise
              </Label>
              <Select name="businessType" value={formData.businessType} onChange={handleChange} required>
                <option value="">Sélectionnez votre type d'entreprise</option>
                <option value="ainga">Micro-entreprise (AINGA)</option>
                <option value="mihary">Très petite entreprise (MIHARY)</option>
                <option value="roso">PME Catégorie I (ROSO)</option>
                <option value="amboara">PME Catégorie II (AMBOARA)</option>
              </Select>
            </FormGroup>
          )}

          {type === "AVOTRA" && showFinancingTypeField && (
            <FormGroup>
              <Label>
                <FiBriefcase size={16} />
                Objet du financement
              </Label>
              <Select name="financingType" value={formData.financingType} onChange={handleChange} required>
                <option value="">Sélectionnez l'objet du financement</option>
                <option value="workingCapital">Besoin en fonds de roulement</option>
                <option value="investment">Investissement pour développement</option>
                <option value="both">Les deux à la fois</option>
              </Select>
            </FormGroup>
          )}

          {(type === "SAFIDY" || showSalaryField) && (
            <FormRow>
              {type === "SAFIDY" && (
                <FormGroup>
                  <Label>
                    <FiUser size={16} />
                    Type d'emploi
                  </Label>
                  <Select name="employmentType" value={formData.employmentType} onChange={handleChange} required>
                    <option value="">Sélectionnez</option>
                    <option value="private">Salarié du secteur privé</option>
                    <option value="public">Fonctionnaire</option>
                  </Select>
                </FormGroup>
              )}

              <FormGroup>
                <Label>
                  <FiDollarSign size={16} />
                  Salaire mensuel (Ar)
                </Label>
                <InputWithIcon>
                  <FiDollarSign size={16} />
                  <Input
                    type="number"
                    name="monthlySalary"
                    value={formData.monthlySalary}
                    onChange={handleChange}
                    placeholder="Ex: 1 500 000"
                    required={type === "SAFIDY"} // Obligatoire pour SAFIDY, optionnel pour AVOTRA
                  />
                </InputWithIcon>
              </FormGroup>
            </FormRow>
          )}

          <FormRow>
            <FormGroup>
              <Label>
                <FiDollarSign size={16} />
                Montant souhaité (Ar)
              </Label>
              <InputWithIcon>
                <FiDollarSign size={16} />
                <Input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder={`${formatCurrency(limits.minAmount)} - ${formatCurrency(limits.maxAmount)}`}
                  min={limits.minAmount}
                  max={limits.maxAmount}
                  required
                />
              </InputWithIcon>
              <Slider
                type="range"
                min={limits.minAmount}
                max={limits.maxAmount}
                step={100000}
                value={formData.amount || limits.minAmount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
              <SliderLabels>
                <span>{formatCurrency(limits.minAmount)}</span>
                <span>{formatCurrency(limits.maxAmount)}</span>
              </SliderLabels>
            </FormGroup>

            <FormGroup>
              <Label>
                <FiCalendar size={16} />
                Durée (mois)
              </Label>
              <Select name="duration" value={formData.duration} onChange={handleChange} required>
                {Array.from(
                  { length: (limits.maxDuration - limits.minDuration) / 3 + 1 },
                  (_, i) => limits.minDuration + i * 3,
                ).map((duration) => (
                  <option key={duration} value={duration}>
                    {duration} mois
                  </option>
                ))}
              </Select>
            </FormGroup>
          </FormRow>

          <InfoBox>
            <FiInfo size={20} />
            <p>
              {isGeneralSimulator
                ? "Nous analyserons vos informations pour vous recommander le type de crédit le plus adapté à votre situation."
                : type === "SAFIDY"
                  ? "Le montant du crédit est calculé sur base de la quotité cessible (1/3 du salaire mensuel net) et du revenu disponible après charges."
                  : "Le type de crédit AVOTRA et le taux d'intérêt dépendent de la taille de votre entreprise et du montant demandé."}
            </p>
          </InfoBox>

          <Button type="submit" disabled={loading}>
            {loading ? <LoadingSpinner /> : "Simuler mon crédit"}
          </Button>
        </SimulatorForm>

        {recommendedCredit && (
          <RecommendationBox>
            <RecommendationTitle>Recommandation de crédit</RecommendationTitle>
            <RecommendationText>
              Après analyse de notre algorithme, le crédit le plus adapté pour vous est:{" "}
              <strong>{recommendedCredit.subType || recommendedCredit.type}</strong>
            </RecommendationText>
            <RecommendationText>{recommendedCredit.reason}</RecommendationText>
            <RecommendationButton onClick={handleContinueToRecommended}>
              Continuer <FiArrowRight />
            </RecommendationButton>
          </RecommendationBox>
        )}

        {/* Modifier la partie d'affichage des résultats pour montrer les raisons de non-éligibilité */}
        {result && !recommendedCredit && (
          <ResultContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Divider />

            <ResultHeader>
              <ResultTitle>
                <FiCheck size={20} />
                Résultat de la simulation {result.creditSubType ? `AVOTRA ${result.creditSubType}` : result.creditType}
              </ResultTitle>

              {result.isEligible ? (
                <EligibilityBadge isEligible={true}>
                  <FiCheck size={16} />
                  Éligible
                </EligibilityBadge>
              ) : (
                <EligibilityBadge isEligible={false}>
                  <FiAlertTriangle size={16} />
                  Non éligible
                </EligibilityBadge>
              )}
            </ResultHeader>

            <ResultGrid>
              <ResultItem highlight={true}>
                <ResultLabel>Mensualité</ResultLabel>
                <ResultValue highlight={true}>{formatCurrency(result.monthlyPayment)}</ResultValue>
              </ResultItem>

              <ResultItem>
                <ResultLabel>Montant emprunté</ResultLabel>
                <ResultValue>{formatCurrency(result.amount)}</ResultValue>
              </ResultItem>

              <ResultItem>
                <ResultLabel>Durée</ResultLabel>
                <ResultValue>{result.duration} mois</ResultValue>
              </ResultItem>

              <ResultItem>
                <ResultLabel>Taux d'intérêt</ResultLabel>
                <ResultValue>{result.interestRate.toFixed(2)}%</ResultValue>
              </ResultItem>
            </ResultGrid>

            <ResultGrid>
              <ResultItem>
                <ResultLabel>Frais de dossier ({result.fileFeesRate}%)</ResultLabel>
                <ResultValue>{formatCurrency(result.fileFees)}</ResultValue>
              </ResultItem>

              <ResultItem>
                <ResultLabel>Fonds de solidarité ({result.solidarityFundRate}%)</ResultLabel>
                <ResultValue>{formatCurrency(result.solidarityFund)}</ResultValue>
              </ResultItem>

              {result.financingType && (
                <ResultItem>
                  <ResultLabel>Apport personnel requis</ResultLabel>
                  <ResultValue>{formatCurrency(result.personalContribution)}</ResultValue>
                </ResultItem>
              )}

              <ResultItem highlight={true}>
                <ResultLabel>Coût total du crédit</ResultLabel>
                <ResultValue highlight={true}>{formatCurrency(result.totalCost)}</ResultValue>
              </ResultItem>
            </ResultGrid>

            {result.creditType === "AVOTRA" && (
              <ResultGrid>
                <ResultItem>
                  <ResultLabel>Garantie requise ({result.guaranteeRate}%)</ResultLabel>
                  <ResultValue>{formatCurrency(result.guaranteeAmount)}</ResultValue>
                </ResultItem>

                <ResultItem>
                  <ResultLabel>Pénalité de retard</ResultLabel>
                  <ResultValue>{result.penaltyRate}% mensuel</ResultValue>
                </ResultItem>

                {result.financingType && (
                  <ResultItem>
                    <ResultLabel>Type de financement</ResultLabel>
                    <ResultValue>
                      {result.financingType === "workingCapital" && "Fonds de roulement"}
                      {result.financingType === "investment" && "Investissement"}
                      {result.financingType === "both" && "Mixte"}
                    </ResultValue>
                  </ResultItem>
                )}
              </ResultGrid>
            )}

            {/* Affichage des messages d'éligibilité */}
            {!result.isEligible && result.eligibilityReasons && result.eligibilityReasons.length > 0 && (
              <InfoBox type="warning">
                <FiAlertTriangle size={20} />
                <div>
                  <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
                    Vous n'êtes pas éligible pour les raisons suivantes :
                  </p>
                  <ul style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                    {result.eligibilityReasons.map((reason, index) => (
                      <li key={index}>{reason.message}</li>
                    ))}
                  </ul>
                </div>
              </InfoBox>
            )}

            {/* Affichage des avertissements */}
            {result.isEligible && result.eligibilityWarnings && result.eligibilityWarnings.length > 0 && (
              <InfoBox type="info">
                <FiInfo size={20} />
                <div>
                  <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Points d'attention :</p>
                  <ul style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                    {result.eligibilityWarnings.map((warning, index) => (
                      <li key={index}>{warning.message}</li>
                    ))}
                  </ul>
                </div>
              </InfoBox>
            )}

            {/* Affichage des prêts existants */}
            {result.existingLoans && result.existingLoans.length > 0 && (
              <div style={{ marginTop: "1.5rem" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "1rem" }}>Prêts existants</h4>
                <Table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Montant initial</th>
                      <th>Reste à payer</th>
                      <th>Mensualité</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.existingLoans.map((loan, index) => (
                      <tr key={index}>
                        <td>{loan.type}</td>
                        <td>{formatCurrency(loan.amount)}</td>
                        <td>{formatCurrency(loan.remainingAmount)}</td>
                        <td>{formatCurrency(loan.monthlyPayment)}</td>
                        <td style={{ color: loan.status === "late" ? "#EF4444" : "#10B981" }}>
                          {loan.status === "late" ? "En retard" : "À jour"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            <Button
              type="button"
              onClick={() => setShowAmortizationTable(!showAmortizationTable)}
              style={{ marginTop: "1.5rem", backgroundColor: "#f3f4f6", color: "#374151" }}
            >
              {showAmortizationTable ? "Masquer" : "Afficher"} le tableau d'amortissement
            </Button>

            {showAmortizationTable && (
              <AmortizationTable>
                <Table>
                  <thead>
                    <tr>
                      <th>Mois</th>
                      <th>Capital remboursé</th>
                      <th>Intérêts</th>
                      <th>Mensualité</th>
                      <th>Capital restant dû</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.amortizationTable.map((row) => (
                      <tr key={row.month}>
                        <td>{row.month}</td>
                        <td>{formatCurrency(row.principalPayment)}</td>
                        <td>{formatCurrency(row.interestPayment)}</td>
                        <td>{formatCurrency(row.totalPayment)}</td>
                        <td>{formatCurrency(row.remainingAmount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </AmortizationTable>
            )}
          </ResultContainer>
        )}
      </SimulatorBody>
    </SimulatorContainer>
  )
}

export default CreditSimulator
