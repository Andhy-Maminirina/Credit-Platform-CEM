// Service d'éligibilité pour les demandes de crédit
// Ce service vérifie si un client est éligible à un crédit en fonction de différents critères

/**
 * Tableau des charges pour les différents types de crédit
 * Contient les taux d'intérêt, frais, et autres paramètres pour chaque type de crédit
 */
const CREDIT_CHARGES = {
  // Crédit SAFIDY - pour les salariés et fonctionnaires
  SAFIDY: {
    interestRate: 1.85, // Taux d'intérêt mensuel en %
    fileFeesRate: 2.0, // Frais de dossier en % du montant
    solidarityFundRate: 1.0, // Fonds de solidarité en % du montant
    guaranteeRate: 120, // Garantie requise en % du montant
    penaltyRate: 2.0, // Taux de pénalité en cas de retard
    maxDebtToIncomeRatio: 0.33, // Ratio dette/revenu maximum (33%)
    minEmploymentDuration: 6, // Durée d'emploi minimum en mois
    minCreditScore: 500, // Score de crédit minimum
  },

  // Crédit AVOTRA AINGA - pour les micro-entreprises
  AVOTRA_AINGA: {
    interestRate: 2.2,
    fileFeesRate: 2.5,
    solidarityFundRate: 1.0,
    guaranteeRate: 140,
    penaltyRate: 2.75,
    maxDebtToIncomeRatio: 0.4, // Ratio dette/revenu maximum (40%)
    minBusinessDuration: 12, // Durée d'activité minimum en mois
    minCreditScore: 450,
    personalContributionRate: 0.2, // Taux d'apport personnel pour investissement
  },

  // Crédit AVOTRA MIHARY - pour les très petites entreprises
  AVOTRA_MIHARY: {
    interestRate: 2.0,
    fileFeesRate: 2.35,
    solidarityFundRate: 1.5,
    guaranteeRate: 130,
    penaltyRate: 2.5,
    maxDebtToIncomeRatio: 0.4,
    minBusinessDuration: 12,
    minCreditScore: 500,
    personalContributionRate: 0.2,
  },

  // Crédit AVOTRA ROSO - pour les PME catégorie I
  AVOTRA_ROSO: {
    interestRate: 1.8,
    fileFeesRate: 2.2,
    solidarityFundRate: 2.0,
    guaranteeRate: 120,
    penaltyRate: 2.25,
    maxDebtToIncomeRatio: 0.4,
    minBusinessDuration: 12,
    minCreditScore: 550,
    personalContributionRate: 0.2,
  },

  // Crédit AVOTRA AMBOARA - pour les PME catégorie II
  AVOTRA_AMBOARA: {
    interestRate: 1.7,
    fileFeesRate: 2.0,
    solidarityFundRate: 2.0,
    guaranteeRate: 120,
    penaltyRate: 2.0,
    maxDebtToIncomeRatio: 0.4,
    minBusinessDuration: 18,
    minCreditScore: 600,
    personalContributionRate: 0.2,
  },
}

/**
 * Fonction principale pour vérifier l'éligibilité d'un client
 * @param {Object} clientData - Données du client et de sa demande de crédit
 * @returns {Promise} - Promesse contenant le résultat de l'éligibilité
 */
export const checkEligibility = async (clientData) => {
  try {
    // En production, cette fonction ferait un appel API
    // return await api.post("/eligibility/check", clientData);

    // Pour le développement, nous simulons la vérification
    return simulateEligibilityCheck(clientData)
  } catch (error) {
    console.error("Erreur lors de la vérification d'éligibilité:", error)
    throw error
  }
}

/**
 * Simulation de vérification d'éligibilité pour le développement
 * @param {Object} clientData - Données du client et de sa demande de crédit
 * @returns {Promise} - Promesse contenant le résultat de l'éligibilité
 */
const simulateEligibilityCheck = (clientData) => {
  const {
    monthlySalary = 0,
    amount = 0,
    duration = 12,
    creditType = "SAFIDY",
    monthlyPayment = 0,
    existingLoans = [],
    businessAge = 0,
    employmentDuration = Math.floor(Math.random() * 120), // Simuler une durée d'emploi en mois
    creditScore = Math.floor(Math.random() * 850), // Simuler un score de crédit entre 0 et 850
    financingType = "",
    apportPersonnel = 0,
  } = clientData

  // Résultat par défaut
  const result = {
    isEligible: true,
    reasons: [],
    warnings: [],
    details: {
      debtToIncomeRatio: 0,
      maxLoanAmount: 0,
      creditScore,
      existingLoans,
      employmentDuration,
      businessAge,
    },
  }

  // Déterminer le type de crédit et ses paramètres
  const creditTypeKey = creditType.replace("_", " ").includes(" ") ? creditType.replace(" ", "_") : creditType

  const creditParams = CREDIT_CHARGES[creditTypeKey] || CREDIT_CHARGES.SAFIDY

  // 1. Vérification du ratio dette/revenu
  if (monthlySalary && amount && duration) {
    // Utiliser la mensualité fournie ou la calculer
    const calculatedMonthlyPayment =
      monthlyPayment || calculateMonthlyPayment(amount, creditParams.interestRate / 100 / 12, duration)

    // Calculer le total des mensualités existantes
    const totalExistingMonthlyPayments = existingLoans.reduce((total, loan) => total + loan.monthlyPayment, 0)

    // Calculer le ratio dette/revenu total (nouveau crédit + crédits existants)
    const totalMonthlyPayment = calculatedMonthlyPayment + totalExistingMonthlyPayments
    const debtToIncomeRatio = totalMonthlyPayment / monthlySalary

    result.details.debtToIncomeRatio = debtToIncomeRatio
    result.details.monthlyPayment = calculatedMonthlyPayment
    result.details.totalMonthlyPayment = totalMonthlyPayment
    result.details.totalExistingMonthlyPayments = totalExistingMonthlyPayments

    // Calculer le montant maximum de prêt basé sur le revenu
    const maxMonthlyPayment = monthlySalary * creditParams.maxDebtToIncomeRatio - totalExistingMonthlyPayments
    result.details.maxMonthlyPayment = maxMonthlyPayment

    // Vérification si le ratio dépasse la limite
    if (debtToIncomeRatio > creditParams.maxDebtToIncomeRatio) {
      result.isEligible = false
      result.reasons.push({
        code: "DTI_RATIO_EXCEEDED",
        message: `La mensualité (${formatCurrency(totalMonthlyPayment)}) dépasse ${creditParams.maxDebtToIncomeRatio * 100}% de votre revenu mensuel. Maximum autorisé: ${formatCurrency(monthlySalary * creditParams.maxDebtToIncomeRatio)}`,
      })
    } else if (debtToIncomeRatio > creditParams.maxDebtToIncomeRatio * 0.8) {
      // Avertissement si le ratio est proche de la limite
      result.warnings.push({
        code: "DTI_RATIO_HIGH",
        message: `La mensualité représente ${Math.round(debtToIncomeRatio * 100)}% de votre revenu mensuel, ce qui est élevé`,
      })
    }
  }

  // 2. Vérification des prêts existants
  if (existingLoans && existingLoans.length > 0) {
    // Vérifier si le client a des prêts en retard de paiement
    const hasLatePayments = existingLoans.some((loan) => loan.status === "late")
    if (hasLatePayments) {
      result.isEligible = false
      result.reasons.push({
        code: "LATE_PAYMENTS",
        message: "Vous avez des retards de paiement sur vos prêts existants",
      })
    }

    // Vérifier le nombre de prêts actifs
    if (existingLoans.length >= 3) {
      result.warnings.push({
        code: "MULTIPLE_LOANS",
        message: "Vous avez déjà plusieurs prêts en cours, ce qui pourrait affecter votre capacité de remboursement",
      })
    }
  }

  // 3. Vérification du score de crédit
  if (creditScore < creditParams.minCreditScore) {
    result.isEligible = false
    result.reasons.push({
      code: "LOW_CREDIT_SCORE",
      message: "Votre score de crédit est insuffisant pour ce type de prêt",
    })
  } else if (creditScore < creditParams.minCreditScore + 100) {
    result.warnings.push({
      code: "MEDIUM_CREDIT_SCORE",
      message: "Votre score de crédit est moyen, ce qui pourrait affecter les conditions du prêt",
    })
  }

  // 4. Vérifications spécifiques selon le type de crédit
  if (creditType === "SAFIDY") {
    // Vérification de la durée d'emploi pour SAFIDY
    if (employmentDuration < creditParams.minEmploymentDuration) {
      result.isEligible = false
      result.reasons.push({
        code: "EMPLOYMENT_DURATION",
        message: `Vous devez avoir au moins ${creditParams.minEmploymentDuration} mois d'ancienneté dans votre emploi actuel`,
      })
    }
  } else if (creditType.startsWith("AVOTRA")) {
    // Vérification de l'âge de l'entreprise pour AVOTRA
    if (businessAge < creditParams.minBusinessDuration) {
      result.isEligible = false
      result.reasons.push({
        code: "BUSINESS_AGE",
        message: `Votre entreprise doit avoir au moins ${creditParams.minBusinessDuration / 12} an(s) d'existence`,
      })
    }

    // Vérification de l'apport personnel pour les investissements
    if ((financingType === "investment" || financingType === "both") && creditParams.personalContributionRate) {
      const requiredContribution = amount * creditParams.personalContributionRate

      if (apportPersonnel < requiredContribution) {
        result.isEligible = false
        result.reasons.push({
          code: "INSUFFICIENT_CONTRIBUTION",
          message: `Pour un financement d'investissement, un apport personnel d'au moins ${creditParams.personalContributionRate * 100}% (${formatCurrency(requiredContribution)}) est requis`,
        })
      }
    }
  }

  // 5. Vérification du montant demandé par rapport aux limites du produit
  const creditLimits = getCreditLimits(creditType)
  if (amount < creditLimits.minAmount) {
    result.isEligible = false
    result.reasons.push({
      code: "AMOUNT_TOO_LOW",
      message: `Le montant minimum pour ce type de crédit est de ${formatCurrency(creditLimits.minAmount)}`,
    })
  } else if (amount > creditLimits.maxAmount) {
    result.isEligible = false
    result.reasons.push({
      code: "AMOUNT_TOO_HIGH",
      message: `Le montant maximum pour ce type de crédit est de ${formatCurrency(creditLimits.maxAmount)}`,
    })
  }

  return Promise.resolve({ data: result })
}

/**
 * Fonction pour obtenir les limites de montant pour chaque type de crédit
 * @param {string} creditType - Type de crédit
 * @returns {Object} - Limites de montant min et max
 */
const getCreditLimits = (creditType) => {
  switch (creditType) {
    case "SAFIDY":
      return { minAmount: 300000, maxAmount: 50000000 }
    case "AVOTRA_AINGA":
    case "AVOTRA AINGA":
      return { minAmount: 300000, maxAmount: 5000000 }
    case "AVOTRA_MIHARY":
    case "AVOTRA MIHARY":
      return { minAmount: 5000001, maxAmount: 20000000 }
    case "AVOTRA_ROSO":
    case "AVOTRA ROSO":
      return { minAmount: 20000001, maxAmount: 50000000 }
    case "AVOTRA_AMBOARA":
    case "AVOTRA AMBOARA":
      return { minAmount: 50000001, maxAmount: 100000000 }
    default:
      return { minAmount: 300000, maxAmount: 50000000 }
  }
}

/**
 * Fonction utilitaire pour calculer la mensualité
 * @param {number} amount - Montant du prêt
 * @param {number} monthlyRate - Taux d'intérêt mensuel (en décimal)
 * @param {number} duration - Durée du prêt en mois
 * @returns {number} - Mensualité calculée
 */
const calculateMonthlyPayment = (amount, monthlyRate, duration) => {
  if (monthlyRate === 0) return amount / duration

  const numerator = amount * monthlyRate * Math.pow(1 + monthlyRate, duration)
  const denominator = Math.pow(1 + monthlyRate, duration) - 1

  return numerator / denominator
}

/**
 * Fonction utilitaire pour formater les montants en devise
 * @param {number} value - Montant à formater
 * @returns {string} - Montant formaté
 */
const formatCurrency = (value) => {
  return new Intl.NumberFormat("fr-MG", {
    style: "currency",
    currency: "MGA",
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}

/**
 * Fonction pour récupérer les prêts existants d'un client
 * @param {string} clientId - Identifiant du client
 * @returns {Promise} - Promesse contenant les prêts existants
 */
export const getExistingLoans = async (clientId) => {
  try {
    // En production, cette fonction ferait un appel API
    // return await api.get(`/clients/${clientId}/loans`);

    // Pour le développement, nous simulons les données
    return simulateExistingLoans(clientId)
  } catch (error) {
    console.error("Erreur lors de la récupération des prêts existants:", error)
    throw error
  }
}

/**
 * Simulation de récupération des prêts existants
 * @param {string} clientId - Identifiant du client
 * @returns {Promise} - Promesse contenant les prêts existants simulés
 */
const simulateExistingLoans = (clientId) => {
  // Générer aléatoirement 0 à 2 prêts existants
  const loanCount = Math.floor(Math.random() * 3)
  const loans = []

  for (let i = 0; i < loanCount; i++) {
    loans.push({
      id: `loan-${i}-${clientId}`,
      type: Math.random() > 0.5 ? "SAFIDY" : "AVOTRA",
      amount: Math.floor(Math.random() * 10000000) + 1000000,
      remainingAmount: Math.floor(Math.random() * 8000000) + 500000,
      monthlyPayment: Math.floor(Math.random() * 300000) + 50000,
      status: Math.random() > 0.9 ? "late" : "current", // 10% de chance d'avoir un retard
      startDate: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)),
      endDate: new Date(Date.now() + Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)),
    })
  }

  return Promise.resolve({ data: loans })
}

/**
 * Fonction pour calculer le taux d'endettement
 * @param {number} monthlySalary - Salaire mensuel
 * @param {number} totalMonthlyPayments - Total des mensualités
 * @returns {number} - Taux d'endettement en pourcentage
 */
export const calculateDebtRatio = (monthlySalary, totalMonthlyPayments) => {
  if (!monthlySalary || monthlySalary === 0) return 0
  return (totalMonthlyPayments / monthlySalary) * 100
}

/**
 * Fonction pour vérifier si un montant est dans les limites d'un type de crédit
 * @param {string} creditType - Type de crédit
 * @param {number} amount - Montant à vérifier
 * @returns {boolean} - Vrai si le montant est dans les limites
 */
export const isAmountInLimits = (creditType, amount) => {
  const limits = getCreditLimits(creditType)
  return amount >= limits.minAmount && amount <= limits.maxAmount
}

/**
 * Fonction pour obtenir le taux d'intérêt d'un type de crédit
 * @param {string} creditType - Type de crédit
 * @returns {number} - Taux d'intérêt
 */
export const getInterestRate = (creditType) => {
  const creditTypeKey = creditType.replace("_", " ").includes(" ") ? creditType.replace(" ", "_") : creditType

  const creditParams = CREDIT_CHARGES[creditTypeKey] || CREDIT_CHARGES.SAFIDY
  return creditParams.interestRate
}

/**
 * Fonction pour obtenir tous les paramètres d'un type de crédit
 * @param {string} creditType - Type de crédit
 * @returns {Object} - Paramètres du crédit
 */
export const getCreditParameters = (creditType) => {
  const creditTypeKey = creditType.replace("_", " ").includes(" ") ? creditType.replace(" ", "_") : creditType

  return CREDIT_CHARGES[creditTypeKey] || CREDIT_CHARGES.SAFIDY
}
