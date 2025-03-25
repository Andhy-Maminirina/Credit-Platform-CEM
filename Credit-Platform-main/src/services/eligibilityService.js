// Fonction principale pour vérifier l'éligibilité d'un client
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
  
  // Simulation de vérification d'éligibilité pour le développement
  const simulateEligibilityCheck = (clientData) => {
    const {
      monthlySalary,
      amount,
      duration,
      creditType,
      existingLoans = [],
      creditScore = Math.floor(Math.random() * 850), // Simuler un score de crédit entre 0 et 850
      employmentDuration = Math.floor(Math.random() * 120), // Simuler une durée d'emploi en mois
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
      },
    }
  
    // 1. Vérification du ratio dette/revenu
    // La mensualité ne doit pas dépasser 33% du revenu mensuel pour SAFIDY
    // et 40% pour AVOTRA
    if (monthlySalary && amount && duration) {
      // Calcul du taux d'intérêt mensuel selon le type de crédit
      let monthlyInterestRate
      if (creditType === "SAFIDY") {
        monthlyInterestRate = 0.0185 / 12 // 1.85% annuel
        result.details.maxDebtToIncomeRatio = 0.33 // 33%
      } else {
        // AVOTRA et autres types
        monthlyInterestRate = 0.02 / 12 // 2% annuel par défaut
        result.details.maxDebtToIncomeRatio = 0.4 // 40%
      }
  
      // Calcul de la mensualité approximative
      const monthlyPayment = calculateMonthlyPayment(amount, monthlyInterestRate, duration)
  
      // Calcul du ratio dette/revenu
      const debtToIncomeRatio = monthlyPayment / monthlySalary
      result.details.debtToIncomeRatio = debtToIncomeRatio
      result.details.monthlyPayment = monthlyPayment
  
      // Calcul du montant maximum de prêt basé sur le revenu
      const maxMonthlyPayment = monthlySalary * result.details.maxDebtToIncomeRatio
      result.details.maxMonthlyPayment = maxMonthlyPayment
  
      // Vérification si le ratio dépasse la limite
      if (debtToIncomeRatio > result.details.maxDebtToIncomeRatio) {
        result.isEligible = false
        result.reasons.push({
          code: "DTI_RATIO_EXCEEDED",
          message: `La mensualité (${formatCurrency(monthlyPayment)}) dépasse ${result.details.maxDebtToIncomeRatio * 100}% de votre revenu mensuel (${formatCurrency(maxMonthlyPayment)})`,
        })
      } else if (debtToIncomeRatio > result.details.maxDebtToIncomeRatio * 0.8) {
        // Avertissement si le ratio est proche de la limite
        result.warnings.push({
          code: "DTI_RATIO_HIGH",
          message: `La mensualité représente ${Math.round(debtToIncomeRatio * 100)}% de votre revenu mensuel, ce qui est élevé`,
        })
      }
    }
  
    // 2. Vérification des prêts existants
    if (existingLoans && existingLoans.length > 0) {
      const totalExistingMonthlyPayments = existingLoans.reduce((total, loan) => total + loan.monthlyPayment, 0)
  
      result.details.totalExistingMonthlyPayments = totalExistingMonthlyPayments
  
      // Si les prêts existants dépassent déjà 20% du revenu
      if (monthlySalary && totalExistingMonthlyPayments / monthlySalary > 0.2) {
        result.isEligible = false
        result.reasons.push({
          code: "EXISTING_LOANS_EXCEEDED",
          message: "Vous avez déjà des prêts en cours qui représentent une part importante de votre revenu",
        })
      }
  
      // Vérifier si le client a des prêts en retard de paiement
      const hasLatePayments = existingLoans.some((loan) => loan.status === "late")
      if (hasLatePayments) {
        result.isEligible = false
        result.reasons.push({
          code: "LATE_PAYMENTS",
          message: "Vous avez des retards de paiement sur vos prêts existants",
        })
      }
    }
  
    // 3. Vérification du score de crédit
    if (creditScore < 500) {
      result.isEligible = false
      result.reasons.push({
        code: "LOW_CREDIT_SCORE",
        message: "Votre score de crédit est insuffisant pour ce type de prêt",
      })
    } else if (creditScore < 650) {
      result.warnings.push({
        code: "MEDIUM_CREDIT_SCORE",
        message: "Votre score de crédit est moyen, ce qui pourrait affecter les conditions du prêt",
      })
    }
  
    // 4. Vérification de la durée d'emploi (pour SAFIDY)
    if (creditType === "SAFIDY" && employmentDuration < 6) {
      result.isEligible = false
      result.reasons.push({
        code: "EMPLOYMENT_DURATION",
        message: "Vous devez avoir au moins 6 mois d'ancienneté dans votre emploi actuel",
      })
    }
  
    // 5. Vérification de l'âge de l'entreprise (pour AVOTRA)
    if (creditType.startsWith("AVOTRA") && clientData.businessAge) {
      const minBusinessAge = creditType.includes("AMBOARA") ? 18 : 12 // 1.5 ans pour AMBOARA, 1 an pour les autres
  
      if (clientData.businessAge < minBusinessAge) {
        result.isEligible = false
        result.reasons.push({
          code: "BUSINESS_AGE",
          message: `Votre entreprise doit avoir au moins ${minBusinessAge / 12} an(s) d'existence`,
        })
      }
    }
  
    return Promise.resolve({ data: result })
  }
  
  // Fonction utilitaire pour calculer la mensualité
  const calculateMonthlyPayment = (amount, monthlyRate, duration) => {
    if (monthlyRate === 0) return amount / duration
  
    const numerator = amount * monthlyRate * Math.pow(1 + monthlyRate, duration)
    const denominator = Math.pow(1 + monthlyRate, duration) - 1
  
    return numerator / denominator
  }
  
  // Fonction utilitaire pour formater les montants en devise
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(Math.round(value))
  }
  
  // Fonction pour récupérer les prêts existants d'un client
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
  
  // Simulation de récupération des prêts existants
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
  
  