"use client"

import { createContext, useState, useContext, useEffect } from "react"

// Créer le contexte
const CreditParamsContext = createContext()

// Hook personnalisé pour utiliser le contexte
export const useCreditParams = () => useContext(CreditParamsContext)

// Fournisseur du contexte
export const CreditParamsProvider = ({ children }) => {
  const [creditParams, setCreditParams] = useState({
    safidy: {
      interestRate: 5.2,
      minAmount: 1000000,
      maxAmount: 50000000,
      minDuration: 6,
      maxDuration: 60,
      processingFee: 2.0,
      earlyRepaymentFee: 3.0,
      latePaymentFee: 5.0,
      eligibilityCriteria: {
        minIncome: 300000,
        minEmploymentDuration: 6,
        maxDebtToIncomeRatio: 40,
      },
    },
    avotraAinga: {
      interestRate: 6.5,
      minAmount: 500000,
      maxAmount: 10000000,
      minDuration: 3,
      maxDuration: 36,
      processingFee: 1.5,
      earlyRepaymentFee: 2.0,
      latePaymentFee: 4.0,
      eligibilityCriteria: {
        minIncome: 200000,
        minEmploymentDuration: 3,
        maxDebtToIncomeRatio: 45,
      },
    },
    avotraMihary: {
      interestRate: 7.0,
      minAmount: 1500000,
      maxAmount: 30000000,
      minDuration: 12,
      maxDuration: 48,
      processingFee: 2.5,
      earlyRepaymentFee: 3.5,
      latePaymentFee: 5.5,
      eligibilityCriteria: {
        minIncome: 400000,
        minBusinessDuration: 12,
        maxDebtToIncomeRatio: 50,
      },
    },
    avotraRoso: {
      interestRate: 5.8,
      minAmount: 3000000,
      maxAmount: 100000000,
      minDuration: 24,
      maxDuration: 84,
      processingFee: 2.0,
      earlyRepaymentFee: 4.0,
      latePaymentFee: 6.0,
      eligibilityCriteria: {
        minIncome: 600000,
        minBusinessDuration: 24,
        maxDebtToIncomeRatio: 35,
      },
    },
  })

  // Fonction pour mettre à jour les paramètres de crédit
  const updateCreditParams = (creditType, newParams) => {
    setCreditParams((prevParams) => ({
      ...prevParams,
      [creditType]: {
        ...prevParams[creditType],
        ...newParams,
      },
    }))
  }

  // Fonction pour mettre à jour les critères d'éligibilité
  const updateEligibilityCriteria = (creditType, newCriteria) => {
    setCreditParams((prevParams) => ({
      ...prevParams,
      [creditType]: {
        ...prevParams[creditType],
        eligibilityCriteria: {
          ...prevParams[creditType].eligibilityCriteria,
          ...newCriteria,
        },
      },
    }))
  }

  // Simuler le chargement des paramètres depuis une API
  useEffect(() => {
    // Dans une application réelle, vous feriez un appel API ici
    // api.getCreditParams().then(data => setCreditParams(data));
    // Pour l'instant, nous utilisons les données fictives définies ci-dessus
  }, [])

  return (
    <CreditParamsContext.Provider
      value={{
        creditParams,
        updateCreditParams,
        updateEligibilityCriteria,
      }}
    >
      {children}
    </CreditParamsContext.Provider>
  )
}

