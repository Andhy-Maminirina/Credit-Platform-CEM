"use client"

import { useState, useEffect } from "react"
import {
  FiSettings,
  FiSave,
  FiRefreshCw,
  FiAlertTriangle,
  FiInfo,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
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

const CreditCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 1.5rem;
`

const CreditCardHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  
  .left {
    display: flex;
    align-items: center;
    
    .icon {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 9999px;
      background-color: #fee2e2;
      color: #dc2626;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.75rem;
    }
    
    .info {
      .title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
      }
      
      .subtitle {
        font-size: 0.875rem;
        color: #6b7280;
      }
    }
  }
`

const CreditCardBody = styled.div`
  padding: 1.5rem;
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
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
  
  .input-wrapper {
    position: relative;
    
    input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      padding-right: ${(props) => (props.suffix ? "3rem" : "0.75rem")};
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      
      &:focus {
        outline: none;
        border-color: #dc2626;
        box-shadow: 0 0 0 1px #dc2626;
      }
    }
    
    .suffix {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
      font-size: 0.875rem;
      pointer-events: none;
    }
  }
  
  .hint {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }
`

const SectionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  margin-bottom: 1rem;
  grid-column: 1 / -1;
`

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

const CreditSettings = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [expandedSection, setExpandedSection] = useState("safidy")
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
    avotraAmboara: {
      interestRate: 4.9,
      minAmount: 2000000,
      maxAmount: 75000000,
      minDuration: 18,
      maxDuration: 72,
      processingFee: 1.8,
      earlyRepaymentFee: 3.0,
      latePaymentFee: 5.0,
      eligibilityCriteria: {
        minIncome: 450000,
        minBusinessDuration: 18,
        maxDebtToIncomeRatio: 40,
      },
    },
  })

  const [originalParams, setOriginalParams] = useState({})
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    // Simuler un chargement des données
    setTimeout(() => {
      setLoading(false)
      setOriginalParams(JSON.parse(JSON.stringify(creditParams)))
    }, 1000)
  }, [])

  useEffect(() => {
    // Vérifier s'il y a des changements
    if (Object.keys(originalParams).length > 0) {
      const isChanged = JSON.stringify(originalParams) !== JSON.stringify(creditParams)
      setHasChanges(isChanged)
    }
  }, [creditParams, originalParams])

  const handleInputChange = (creditType, field, value) => {
    setCreditParams((prev) => ({
      ...prev,
      [creditType]: {
        ...prev[creditType],
        [field]: Number.parseFloat(value),
      },
    }))
  }

  const handleEligibilityChange = (creditType, field, value) => {
    setCreditParams((prev) => ({
      ...prev,
      [creditType]: {
        ...prev[creditType],
        eligibilityCriteria: {
          ...prev[creditType].eligibilityCriteria,
          [field]: Number.parseFloat(value),
        },
      },
    }))
  }

  const handleSaveChanges = () => {
    setSaving(true)
    // Simuler une sauvegarde
    setTimeout(() => {
      setSaving(false)
      setShowSuccess(true)
      setOriginalParams(JSON.parse(JSON.stringify(creditParams)))
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  const handleResetChanges = () => {
    setCreditParams(JSON.parse(JSON.stringify(originalParams)))
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <PageHeader>
        <div>
          <PageTitle>Paramètres des crédits</PageTitle>
          <PageDescription>Configurez les taux d'intérêt, montants et critères d'éligibilité</PageDescription>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <ActionIconButton onClick={handleResetChanges} disabled={!hasChanges}>
            <FiRefreshCw size={16} />
            Réinitialiser
          </ActionIconButton>
          <ActionButton onClick={handleSaveChanges} disabled={!hasChanges || saving} className="primary">
            {saving ? <FiRefreshCw className="mr-2 animate-spin" size={16} /> : <FiSave className="mr-2" size={16} />}
            {saving ? "Enregistrement..." : "Enregistrer les modifications"}
          </ActionButton>
        </div>
      </PageHeader>

      {/* Success Message */}
      {showSuccess && (
        <AlertBox type="success">
          <FiCheck size={20} />
          <div className="content">
            <div className="title">Succès</div>
            <div className="message">
              Les paramètres ont été mis à jour avec succès. Les changements sont maintenant actifs dans toute
              l'application.
            </div>
          </div>
        </AlertBox>
      )}

      {/* Warning Message */}
      {hasChanges && (
        <AlertBox type="warning">
          <FiAlertTriangle size={20} />
          <div className="content">
            <div className="title">Attention</div>
            <div className="message">
              Les modifications des paramètres de crédit affecteront toutes les nouvelles demandes. Les demandes
              existantes ne seront pas affectées.
            </div>
          </div>
        </AlertBox>
      )}

      {/* Credit Settings Sections */}
      <div className="space-y-6">
        {/* SAFIDY */}
        <CreditCard>
          <CreditCardHeader onClick={() => toggleSection("safidy")}>
            <div className="left">
              <div className="icon">
                <FiSettings size={20} />
              </div>
              <div className="info">
                <div className="title">Crédit SAFIDY</div>
                <div className="subtitle">Crédit immobilier</div>
              </div>
            </div>
            <div>
              {expandedSection === "safidy" ? (
                <FiChevronUp size={20} className="text-gray-500" />
              ) : (
                <FiChevronDown size={20} className="text-gray-500" />
              )}
            </div>
          </CreditCardHeader>

          {expandedSection === "safidy" && (
            <CreditCardBody>
              <FormGrid>
                <FormField suffix="%">
                  <label>Taux d'intérêt (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={creditParams.safidy.interestRate}
                      onChange={(e) => handleInputChange("safidy", "interestRate", e.target.value)}
                    />
                    <span className="suffix">%</span>
                  </div>
                </FormField>

                <FormField suffix="Ar">
                  <label>Montant minimum</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="100000"
                      min="0"
                      value={creditParams.safidy.minAmount}
                      onChange={(e) => handleInputChange("safidy", "minAmount", e.target.value)}
                    />
                    <span className="suffix">Ar</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Actuellement: {formatCurrency(creditParams.safidy.minAmount)}
                  </p>
                </FormField>

                <FormField suffix="Ar">
                  <label>Montant maximum</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1000000"
                      min="0"
                      value={creditParams.safidy.maxAmount}
                      onChange={(e) => handleInputChange("safidy", "maxAmount", e.target.value)}
                    />
                    <span className="suffix">Ar</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Actuellement: {formatCurrency(creditParams.safidy.maxAmount)}
                  </p>
                </FormField>

                <FormField suffix="mois">
                  <label>Durée minimum (mois)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value={creditParams.safidy.minDuration}
                      onChange={(e) => handleInputChange("safidy", "minDuration", e.target.value)}
                    />
                    <span className="suffix">mois</span>
                  </div>
                </FormField>

                <FormField suffix="mois">
                  <label>Durée maximum (mois)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value={creditParams.safidy.maxDuration}
                      onChange={(e) => handleInputChange("safidy", "maxDuration", e.target.value)}
                    />
                    <span className="suffix">mois</span>
                  </div>
                </FormField>

                <FormField suffix="%">
                  <label>Frais de dossier (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={creditParams.safidy.processingFee}
                      onChange={(e) => handleInputChange("safidy", "processingFee", e.target.value)}
                    />
                    <span className="suffix">%</span>
                  </div>
                </FormField>
              </FormGrid>

              <SectionTitle>Critères d'éligibilité</SectionTitle>
              <FormGrid>
                <FormField suffix="Ar">
                  <label>Revenu minimum</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="10000"
                      min="0"
                      value={creditParams.safidy.eligibilityCriteria.minIncome}
                      onChange={(e) => handleEligibilityChange("safidy", "minIncome", e.target.value)}
                    />
                    <span className="suffix">Ar</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Actuellement: {formatCurrency(creditParams.safidy.eligibilityCriteria.minIncome)}
                  </p>
                </FormField>

                <FormField suffix="mois">
                  <label>Durée d'emploi minimum (mois)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      value={creditParams.safidy.eligibilityCriteria.minEmploymentDuration}
                      onChange={(e) => handleEligibilityChange("safidy", "minEmploymentDuration", e.target.value)}
                    />
                    <span className="suffix">mois</span>
                  </div>
                </FormField>

                <FormField suffix="%">
                  <label>Ratio dette/revenu maximum (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      value={creditParams.safidy.eligibilityCriteria.maxDebtToIncomeRatio}
                      onChange={(e) => handleEligibilityChange("safidy", "maxDebtToIncomeRatio", e.target.value)}
                    />
                    <span className="suffix">%</span>
                  </div>
                </FormField>
              </FormGrid>
            </CreditCardBody>
          )}
        </CreditCard>

        {/* AVOTRA AINGA */}
        <CreditCard>
          <CreditCardHeader onClick={() => toggleSection("avotraAinga")}>
            <div className="left">
              <div className="icon">
                <FiSettings size={20} />
              </div>
              <div className="info">
                <div className="title">Crédit AVOTRA AINGA</div>
                <div className="subtitle">Crédit personnel</div>
              </div>
            </div>
            <div>
              {expandedSection === "avotraAinga" ? (
                <FiChevronUp size={20} className="text-gray-500" />
              ) : (
                <FiChevronDown size={20} className="text-gray-500" />
              )}
            </div>
          </CreditCardHeader>

          {expandedSection === "avotraAinga" && (
            <CreditCardBody>
              <FormGrid>
                <FormField suffix="%">
                  <label>Taux d'intérêt (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={creditParams.avotraAinga.interestRate}
                      onChange={(e) => handleInputChange("avotraAinga", "interestRate", e.target.value)}
                    />
                    <span className="suffix">%</span>
                  </div>
                </FormField>

                <FormField suffix="Ar">
                  <label>Montant minimum</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="100000"
                      min="0"
                      value={creditParams.avotraAinga.minAmount}
                      onChange={(e) => handleInputChange("avotraAinga", "minAmount", e.target.value)}
                    />
                    <span className="suffix">Ar</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Actuellement: {formatCurrency(creditParams.avotraAinga.minAmount)}
                  </p>
                </FormField>

                <FormField suffix="Ar">
                  <label>Montant maximum</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1000000"
                      min="0"
                      value={creditParams.avotraAinga.maxAmount}
                      onChange={(e) => handleInputChange("avotraAinga", "maxAmount", e.target.value)}
                    />
                    <span className="suffix">Ar</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Actuellement: {formatCurrency(creditParams.avotraAinga.maxAmount)}
                  </p>
                </FormField>

                <FormField suffix="mois">
                  <label>Durée minimum (mois)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value={creditParams.avotraAinga.minDuration}
                      onChange={(e) => handleInputChange("avotraAinga", "minDuration", e.target.value)}
                    />
                    <span className="suffix">mois</span>
                  </div>
                </FormField>

                <FormField suffix="mois">
                  <label>Durée maximum (mois)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value={creditParams.avotraAinga.maxDuration}
                      onChange={(e) => handleInputChange("avotraAinga", "maxDuration", e.target.value)}
                    />
                    <span className="suffix">mois</span>
                  </div>
                </FormField>

                <FormField suffix="%">
                  <label>Frais de dossier (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={creditParams.avotraAinga.processingFee}
                      onChange={(e) => handleInputChange("avotraAinga", "processingFee", e.target.value)}
                    />
                    <span className="suffix">%</span>
                  </div>
                </FormField>
              </FormGrid>

              <SectionTitle>Critères d'éligibilité</SectionTitle>
              <FormGrid>
                <FormField suffix="Ar">
                  <label>Revenu minimum</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="10000"
                      min="0"
                      value={creditParams.avotraAinga.eligibilityCriteria.minIncome}
                      onChange={(e) => handleEligibilityChange("avotraAinga", "minIncome", e.target.value)}
                    />
                    <span className="suffix">Ar</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Actuellement: {formatCurrency(creditParams.avotraAinga.eligibilityCriteria.minIncome)}
                  </p>
                </FormField>

                <FormField suffix="mois">
                  <label>Durée d'emploi minimum (mois)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      value={creditParams.avotraAinga.eligibilityCriteria.minEmploymentDuration}
                      onChange={(e) => handleEligibilityChange("avotraAinga", "minEmploymentDuration", e.target.value)}
                    />
                    <span className="suffix">mois</span>
                  </div>
                </FormField>

                <FormField suffix="%">
                  <label>Ratio dette/revenu maximum (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      value={creditParams.avotraAinga.eligibilityCriteria.maxDebtToIncomeRatio}
                      onChange={(e) => handleEligibilityChange("avotraAinga", "maxDebtToIncomeRatio", e.target.value)}
                    />
                    <span className="suffix">%</span>
                  </div>
                </FormField>
              </FormGrid>
            </CreditCardBody>
          )}
        </CreditCard>

        {/* AVOTRA MIHARY */}
        <CreditCard>
          <CreditCardHeader onClick={() => toggleSection("avotraMihary")}>
            <div className="left">
              <div className="icon">
                <FiSettings size={20} />
              </div>
              <div className="info">
                <div className="title">Crédit AVOTRA MIHARY</div>
                <div className="subtitle">Crédit professionnel</div>
              </div>
            </div>
            <div>
              {expandedSection === "avotraMihary" ? (
                <FiChevronUp size={20} className="text-gray-500" />
              ) : (
                <FiChevronDown size={20} className="text-gray-500" />
              )}
            </div>
          </CreditCardHeader>

          {expandedSection === "avotraMihary" && (
            <CreditCardBody>
              <FormGrid>
                <FormField suffix="%">
                  <label>Taux d'intérêt (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={creditParams.avotraMihary.interestRate}
                      onChange={(e) => handleInputChange("avotraMihary", "interestRate", e.target.value)}
                    />
                    <span className="suffix">%</span>
                  </div>
                </FormField>

                <FormField suffix="Ar">
                  <label>Montant minimum</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="100000"
                      min="0"
                      value={creditParams.avotraMihary.minAmount}
                      onChange={(e) => handleInputChange("avotraMihary", "minAmount", e.target.value)}
                    />
                    <span className="suffix">Ar</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Actuellement: {formatCurrency(creditParams.avotraMihary.minAmount)}
                  </p>
                </FormField>

                <FormField suffix="Ar">
                  <label>Montant maximum</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1000000"
                      min="0"
                      value={creditParams.avotraMihary.maxAmount}
                      onChange={(e) => handleInputChange("avotraMihary", "maxAmount", e.target.value)}
                    />
                    <span className="suffix">Ar</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Actuellement: {formatCurrency(creditParams.avotraMihary.maxAmount)}
                  </p>
                </FormField>

                <FormField suffix="mois">
                  <label>Durée minimum (mois)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value={creditParams.avotraMihary.minDuration}
                      onChange={(e) => handleInputChange("avotraMihary", "minDuration", e.target.value)}
                    />
                    <span className="suffix">mois</span>
                  </div>
                </FormField>

                <FormField suffix="mois">
                  <label>Durée maximum (mois)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value={creditParams.avotraMihary.maxDuration}
                      onChange={(e) => handleInputChange("avotraMihary", "maxDuration", e.target.value)}
                    />
                    <span className="suffix">mois</span>
                  </div>
                </FormField>

                <FormField suffix="%">
                  <label>Frais de dossier (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={creditParams.avotraMihary.processingFee}
                      onChange={(e) => handleInputChange("avotraMihary", "processingFee", e.target.value)}
                    />
                    <span className="suffix">%</span>
                  </div>
                </FormField>
              </FormGrid>

              <SectionTitle>Critères d'éligibilité</SectionTitle>
              <FormGrid>
                <FormField suffix="Ar">
                  <label>Revenu minimum</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="10000"
                      min="0"
                      value={creditParams.avotraMihary.eligibilityCriteria.minIncome}
                      onChange={(e) => handleEligibilityChange("avotraMihary", "minIncome", e.target.value)}
                    />
                    <span className="suffix">Ar</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Actuellement: {formatCurrency(creditParams.avotraMihary.eligibilityCriteria.minIncome)}
                  </p>
                </FormField>

                <FormField suffix="mois">
                  <label>Durée d'activité minimum (mois)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      value={creditParams.avotraMihary.eligibilityCriteria.minBusinessDuration}
                      onChange={(e) => handleEligibilityChange("avotraMihary", "minBusinessDuration", e.target.value)}
                    />
                    <span className="suffix">mois</span>
                  </div>
                </FormField>

                <FormField suffix="%">
                  <label>Ratio dette/revenu maximum (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      value={creditParams.avotraMihary.eligibilityCriteria.maxDebtToIncomeRatio}
                      onChange={(e) => handleEligibilityChange("avotraMihary", "maxDebtToIncomeRatio", e.target.value)}
                    />
                    <span className="suffix">%</span>
                  </div>
                </FormField>
              </FormGrid>
            </CreditCardBody>
          )}
        </CreditCard>

        {/* AVOTRA ROSO */}
        <CreditCard>
          <CreditCardHeader onClick={() => toggleSection("avotraRoso")}>
            <div className="left">
              <div className="icon">
                <FiSettings size={20} />
              </div>
              <div className="info">
                <div className="title">Crédit AVOTRA ROSO</div>
                <div className="subtitle">Crédit investissement</div>
              </div>
            </div>
            <div>
              {expandedSection === "avotraRoso" ? (
                <FiChevronUp size={20} className="text-gray-500" />
              ) : (
                <FiChevronDown size={20} className="text-gray-500" />
              )}
            </div>
          </CreditCardHeader>

          {expandedSection === "avotraRoso" && (
            <CreditCardBody>
              <FormGrid>
                <FormField suffix="%">
                  <label>Taux d'intérêt (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={creditParams.avotraRoso.interestRate}
                      onChange={(e) => handleInputChange("avotraRoso", "interestRate", e.target.value)}
                    />
                    <span className="suffix">%</span>
                  </div>
                </FormField>

                <FormField suffix="Ar">
                  <label>Montant minimum</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="100000"
                      min="0"
                      value={creditParams.avotraRoso.minAmount}
                      onChange={(e) => handleInputChange("avotraRoso", "minAmount", e.target.value)}
                    />
                    <span className="suffix">Ar</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Actuellement: {formatCurrency(creditParams.avotraRoso.minAmount)}
                  </p>
                </FormField>

                <FormField suffix="Ar">
                  <label>Montant maximum</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1000000"
                      min="0"
                      value={creditParams.avotraRoso.maxAmount}
                      onChange={(e) => handleInputChange("avotraRoso", "maxAmount", e.target.value)}
                    />
                    <span className="suffix">Ar</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Actuellement: {formatCurrency(creditParams.avotraRoso.maxAmount)}
                  </p>
                </FormField>

                <FormField suffix="mois">
                  <label>Durée minimum (mois)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value={creditParams.avotraRoso.minDuration}
                      onChange={(e) => handleInputChange("avotraRoso", "minDuration", e.target.value)}
                    />
                    <span className="suffix">mois</span>
                  </div>
                </FormField>

                <FormField suffix="mois">
                  <label>Durée maximum (mois)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value={creditParams.avotraRoso.maxDuration}
                      onChange={(e) => handleInputChange("avotraRoso", "maxDuration", e.target.value)}
                    />
                    <span className="suffix">mois</span>
                  </div>
                </FormField>

                <FormField suffix="%">
                  <label>Frais de dossier (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={creditParams.avotraRoso.processingFee}
                      onChange={(e) => handleInputChange("avotraRoso", "processingFee", e.target.value)}
                    />
                    <span className="suffix">%</span>
                  </div>
                </FormField>
              </FormGrid>

              <SectionTitle>Critères d'éligibilité</SectionTitle>
              <FormGrid>
                <FormField suffix="Ar">
                  <label>Revenu minimum</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="10000"
                      min="0"
                      value={creditParams.avotraRoso.eligibilityCriteria.minIncome}
                      onChange={(e) => handleEligibilityChange("avotraRoso", "minIncome", e.target.value)}
                    />
                    <span className="suffix">Ar</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Actuellement: {formatCurrency(creditParams.avotraRoso.eligibilityCriteria.minIncome)}
                  </p>
                </FormField>

                <FormField suffix="mois">
                  <label>Durée d'activité minimum (mois)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      value={creditParams.avotraRoso.eligibilityCriteria.minBusinessDuration}
                      onChange={(e) => handleEligibilityChange("avotraRoso", "minBusinessDuration", e.target.value)}
                    />
                    <span className="suffix">mois</span>
                  </div>
                </FormField>

                <FormField suffix="%">
                  <label>Ratio dette/revenu maximum (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      value={creditParams.avotraRoso.eligibilityCriteria.maxDebtToIncomeRatio}
                      onChange={(e) => handleEligibilityChange("avotraRoso", "maxDebtToIncomeRatio", e.target.value)}
                    />
                    <span className="suffix">%</span>
                  </div>
                </FormField>
              </FormGrid>
            </CreditCardBody>
          )}
        </CreditCard>
        {/* AVOTRA AMBOARA */}
        <CreditCard>
          <CreditCardHeader onClick={() => toggleSection("avotraAmboara")}>
            <div className="left">
              <div className="icon">
                <FiSettings size={20} />
              </div>
              <div className="info">
                <div className="title">Crédit AVOTRA AMBOARA</div>
                <div className="subtitle">Crédit solidaire</div>
              </div>
            </div>
            <div>
              {expandedSection === "avotraAmboara" ? (
                <FiChevronUp size={20} className="text-gray-500" />
              ) : (
                <FiChevronDown size={20} className="text-gray-500" />
              )}
            </div>
          </CreditCardHeader>

          {expandedSection === "avotraAmboara" && (
            <CreditCardBody>
              <FormGrid>
                <FormField suffix="%">
                  <label>Taux d'intérêt (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={creditParams.avotraAmboara.interestRate}
                      onChange={(e) => handleInputChange("avotraAmboara", "interestRate", e.target.value)}
                    />
                    <span className="suffix">%</span>
                  </div>
                </FormField>

                <FormField suffix="Ar">
                  <label>Montant minimum</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="100000"
                      min="0"
                      value={creditParams.avotraAmboara.minAmount}
                      onChange={(e) => handleInputChange("avotraAmboara", "minAmount", e.target.value)}
                    />
                    <span className="suffix">Ar</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Actuellement: {formatCurrency(creditParams.avotraAmboara.minAmount)}
                  </p>
                </FormField>

                <FormField suffix="Ar">
                  <label>Montant maximum</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1000000"
                      min="0"
                      value={creditParams.avotraAmboara.maxAmount}
                      onChange={(e) => handleInputChange("avotraAmboara", "maxAmount", e.target.value)}
                    />
                    <span className="suffix">Ar</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Actuellement: {formatCurrency(creditParams.avotraAmboara.maxAmount)}
                  </p>
                </FormField>

                <FormField suffix="mois">
                  <label>Durée minimum (mois)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value={creditParams.avotraAmboara.minDuration}
                      onChange={(e) => handleInputChange("avotraAmboara", "minDuration", e.target.value)}
                    />
                    <span className="suffix">mois</span>
                  </div>
                </FormField>

                <FormField suffix="mois">
                  <label>Durée maximum (mois)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value={creditParams.avotraAmboara.maxDuration}
                      onChange={(e) => handleInputChange("avotraAmboara", "maxDuration", e.target.value)}
                    />
                    <span className="suffix">mois</span>
                  </div>
                </FormField>

                <FormField suffix="%">
                  <label>Frais de dossier (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={creditParams.avotraAmboara.processingFee}
                      onChange={(e) => handleInputChange("avotraAmboara", "processingFee", e.target.value)}
                    />
                    <span className="suffix">%</span>
                  </div>
                </FormField>
              </FormGrid>

              <SectionTitle>Critères d'éligibilité</SectionTitle>
              <FormGrid>
                <FormField suffix="Ar">
                  <label>Revenu minimum</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="10000"
                      min="0"
                      value={creditParams.avotraAmboara.eligibilityCriteria.minIncome}
                      onChange={(e) => handleEligibilityChange("avotraAmboara", "minIncome", e.target.value)}
                    />
                    <span className="suffix">Ar</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Actuellement: {formatCurrency(creditParams.avotraAmboara.eligibilityCriteria.minIncome)}
                  </p>
                </FormField>

                <FormField suffix="mois">
                  <label>Durée d'activité minimum (mois)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      value={creditParams.avotraAmboara.eligibilityCriteria.minBusinessDuration}
                      onChange={(e) => handleEligibilityChange("avotraAmboara", "minBusinessDuration", e.target.value)}
                    />
                    <span className="suffix">mois</span>
                  </div>
                </FormField>

                <FormField suffix="%">
                  <label>Ratio dette/revenu maximum (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      value={creditParams.avotraAmboara.eligibilityCriteria.maxDebtToIncomeRatio}
                      onChange={(e) => handleEligibilityChange("avotraAmboara", "maxDebtToIncomeRatio", e.target.value)}
                    />
                    <span className="suffix">%</span>
                  </div>
                </FormField>
              </FormGrid>
            </CreditCardBody>
          )}
        </CreditCard>
      </div>

      {/* Info Section */}
      <AlertBox type="info">
        <FiInfo size={20} />
        <div className="content">
          <div className="title">Information</div>
          <div className="message">
            Les modifications des paramètres de crédit sont enregistrées dans l'historique et peuvent être consultées
            dans les journaux d'audit.
          </div>
        </div>
      </AlertBox>
    </div>
  )
}

export default CreditSettings

