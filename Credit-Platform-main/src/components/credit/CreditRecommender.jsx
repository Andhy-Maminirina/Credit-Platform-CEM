"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"
import { FiInfo, FiDollarSign, FiUser, FiBriefcase, FiArrowRight } from "react-icons/fi"
// Importer le service d'éligibilité
import { checkEligibility, getExistingLoans } from "../../services/eligibilityService"
import TableauCharges from "./TableauCharges" // Import du composant TableauCharges

const RecommenderContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

const RecommenderHeader = styled.div`
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary[600]} 0%, ${(props) => props.theme.colors.primary[500]} 100%);
  padding: 1.5rem;
  color: white;
`

const RecommenderTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const RecommenderDescription = styled.p`
  font-size: 0.875rem;
  opacity: 0.9;
`

const RecommenderBody = styled.div`
  padding: 1.5rem;
`

const RecommenderForm = styled.form`
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

const InfoBox = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.info + "10"};
  border-left: 4px solid ${(props) => props.theme.colors.info};
  border-radius: 8px;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;

  svg {
    color: ${(props) => props.theme.colors.info};
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  p {
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors.gray[700]};
  }
`

const RecommendationBox = styled(motion.div)`
  margin-top: 2rem;
  padding: 2rem;
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
  font-size: 1.125rem;
  color: #166534;
  margin-bottom: 1.5rem;
`

const RecommendationButton = styled(Button)`
  max-width: 300px;
  margin: 0 auto;
  background-color: #166534;

  &:hover {
    background-color: #14532d;
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

const CreditRecommender = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    monthlySalary: "",
    hasFixedIncome: "",
    isBusinessOwner: "",
    amount: "",
    businessSize: "",
  })

  const [loading, setLoading] = useState(false)
  const [recommendation, setRecommendation] = useState(null)
  const [tableauData, setTableauData] = useState(null) // State pour stocker les données du TableauCharges

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const formatCurrency = (value) => {
    try {
      const roundedValue = Math.round(value)
      return new Intl.NumberFormat("fr-MG", {
        style: "currency",
        currency: "MGA",
        maximumFractionDigits: 0,
      }).format(roundedValue)
    } catch (error) {
      return value.toLocaleString() + " Ar"
    }
  }

  // Modifier la fonction handleSubmit pour intégrer la vérification d'éligibilité
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Vérifier que les champs obligatoires sont remplis
    if (!formData.amount) {
      alert("Veuillez entrer un montant")
      setLoading(false)
      return
    }

    // Simuler un délai d'analyse
    setTimeout(async () => {
      try {
        const amount = Number.parseFloat(formData.amount) || 0
        const hasFixedIncome = formData.hasFixedIncome === "yes"
        const isBusinessOwner = formData.isBusinessOwner === "yes"
        const businessSize = formData.businessSize
        // Utiliser le salaire mensuel du TableauCharges si disponible, sinon celui du formulaire
        const monthlySalary = tableauData?.revenus?.salaireClient || Number.parseFloat(formData.monthlySalary) || 0

        const recommendedCredit = {
          type: "",
          subType: "",
          path: "",
          reason: "",
          isEligible: true,
          eligibilityReasons: [],
        }

        // Logique de recommandation
        if (isBusinessOwner) {
          // Si c'est un entrepreneur, recommander AVOTRA
          recommendedCredit.type = "AVOTRA"

          // Déterminer le sous-type d'AVOTRA en fonction du montant ou de la taille de l'entreprise
          if (businessSize) {
            // Si la taille de l'entreprise est spécifiée
            switch (businessSize) {
              case "micro":
                recommendedCredit.subType = "AINGA"
                recommendedCredit.reason =
                  "Votre micro-entreprise est éligible au crédit AVOTRA AINGA, spécialement conçu pour les petites structures."
                break
              case "small":
                recommendedCredit.subType = "MIHARY"
                recommendedCredit.reason =
                  "Votre TPE est éligible au crédit AVOTRA MIHARY, adapté aux très petites entreprises."
                break
              case "medium":
                recommendedCredit.subType = "ROSO"
                recommendedCredit.reason =
                  "Votre PME est éligible au crédit AVOTRA ROSO, conçu pour les PME de catégorie I."
                break
              case "large":
                recommendedCredit.subType = "AMBOARA"
                recommendedCredit.reason =
                  "Votre entreprise est éligible au crédit AVOTRA AMBOARA, idéal pour les PME de catégorie II."
                break
              default:
                // Déterminer en fonction du montant si la taille n'est pas spécifiée
                if (amount <= 5000000) {
                  recommendedCredit.subType = "AINGA"
                  recommendedCredit.reason =
                    "Basé sur le montant demandé, le crédit AVOTRA AINGA est le plus adapté à votre situation."
                } else if (amount <= 20000000) {
                  recommendedCredit.subType = "MIHARY"
                  recommendedCredit.reason =
                    "Basé sur le montant demandé, le crédit AVOTRA MIHARY est le plus adapté à votre situation."
                } else if (amount <= 50000000) {
                  recommendedCredit.subType = "ROSO"
                  recommendedCredit.reason =
                    "Basé sur le montant demandé, le crédit AVOTRA ROSO est le plus adapté à votre situation."
                } else {
                  recommendedCredit.subType = "AMBOARA"
                  recommendedCredit.reason =
                    "Basé sur le montant demandé, le crédit AVOTRA AMBOARA est le plus adapté à votre situation."
                }
            }
          } else {
            // Déterminer en fonction du montant si la taille n'est pas spécifiée
            if (amount <= 5000000) {
              recommendedCredit.subType = "AINGA"
              recommendedCredit.reason =
                "Basé sur le montant demandé, le crédit AVOTRA AINGA est le plus adapté à votre situation."
            } else if (amount <= 20000000) {
              recommendedCredit.subType = "MIHARY"
              recommendedCredit.reason =
                "Basé sur le montant demandé, le crédit AVOTRA MIHARY est le plus adapté à votre situation."
            } else if (amount <= 50000000) {
              recommendedCredit.subType = "ROSO"
              recommendedCredit.reason =
                "Basé sur le montant demandé, le crédit AVOTRA ROSO est le plus adapté à votre situation."
            } else {
              recommendedCredit.subType = "AMBOARA"
              recommendedCredit.reason =
                "Basé sur le montant demandé, le crédit AVOTRA AMBOARA est le plus adapté à votre situation."
            }
          }

          recommendedCredit.path = "/credit/avotra"

          if (!recommendedCredit.reason) {
            recommendedCredit.reason =
              "Vous êtes entrepreneur et ce type de crédit est spécialement conçu pour financer les besoins des entreprises."
          }
        } else if (hasFixedIncome) {
          // Si c'est un salarié ou fonctionnaire, recommander SAFIDY
          recommendedCredit.type = "SAFIDY"
          recommendedCredit.path = "/credit/safidy"
          recommendedCredit.reason =
            "Vous avez un revenu fixe et le crédit SAFIDY est spécialement conçu pour les salariés et fonctionnaires."
        } else {
          // Par défaut, recommander SAFIDY si le montant est petit, sinon AVOTRA
          if (amount <= 10000000) {
            recommendedCredit.type = "SAFIDY"
            recommendedCredit.path = "/credit/safidy"
            recommendedCredit.reason =
              "Basé sur le montant demandé, le crédit SAFIDY est le plus adapté à votre situation."
          } else {
            recommendedCredit.type = "AVOTRA"

            // Déterminer le sous-type d'AVOTRA en fonction du montant
            if (amount <= 5000000) {
              recommendedCredit.subType = "AINGA"
            } else if (amount <= 20000000) {
              recommendedCredit.subType = "MIHARY"
            } else if (amount <= 50000000) {
              recommendedCredit.subType = "ROSO"
            } else {
              recommendedCredit.subType = "AMBOARA"
            }

            recommendedCredit.path = "/credit/avotra"
            recommendedCredit.reason =
              "Le montant demandé est élevé et ce type de crédit offre des conditions plus adaptées pour les montants importants."
          }
        }

        // Vérifier l'éligibilité avec le nouveau service
        // Récupérer les prêts existants (simulation)
        const clientId = localStorage.getItem("userId") || "guest-user"
        const existingLoansResponse = await getExistingLoans(clientId)
        const existingLoans = existingLoansResponse.data || []

        // Préparer les données pour la vérification d'éligibilité
        const eligibilityData = {
          monthlySalary,
          amount,
          duration: 12, // Durée par défaut pour la vérification
          creditType: recommendedCredit.subType
            ? `${recommendedCredit.type}_${recommendedCredit.subType}`
            : recommendedCredit.type,
          existingLoans,
          businessAge: formData.businessAge ? Number.parseInt(formData.businessAge) : undefined,
          employmentType: formData.employmentType,
        }

        // Vérifier l'éligibilité
        const eligibilityResponse = await checkEligibility(eligibilityData)
        const eligibilityResult = eligibilityResponse.data

        // Mettre à jour l'éligibilité
        recommendedCredit.isEligible = eligibilityResult.isEligible
        recommendedCredit.eligibilityReasons = eligibilityResult.reasons || []
        recommendedCredit.eligibilityWarnings = eligibilityResult.warnings || []

        setRecommendation(recommendedCredit)
      } catch (error) {
        console.error("Erreur lors de l'analyse:", error)
        alert("Une erreur s'est produite lors de l'analyse. Veuillez réessayer.")
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  const handleContinue = () => {
    if (recommendation) {
      // Rediriger vers la page appropriée avec l'onglet simulateur activé
      if (recommendation.type === "SAFIDY") {
        navigate("/credit/safidy", { state: { activeTab: "simulator" } })
      } else if (recommendation.type === "AVOTRA") {
        navigate("/credit/avotra", {
          state: {
            activeTab: "simulator",
            businessType: recommendation.subType ? recommendation.subType.toLowerCase() : null,
          },
        })
      }
    }
  }

  // Fonction pour récupérer les données du TableauCharges
  const handleTableauDataChange = (data) => {
    setTableauData(data)
  }

  return (
    <RecommenderContainer>
      <RecommenderHeader>
        <RecommenderTitle>Simulateur de crédit intelligent</RecommenderTitle>
        <RecommenderDescription>
          Nous analyserons votre profil pour vous recommander le crédit le plus adapté à votre situation
        </RecommenderDescription>
      </RecommenderHeader>

      <RecommenderBody>
        {!recommendation ? (
          <RecommenderForm onSubmit={handleSubmit}>
            {/* Intégration du TableauCharges */}
            <TableauCharges onDataChange={handleTableauDataChange} />

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

            {formData.isBusinessOwner === "yes" && (
              <FormGroup>
                <Label>
                  <FiBriefcase size={16} />
                  Quelle est la taille de votre entreprise ?
                </Label>
                <Select name="businessSize" value={formData.businessSize} onChange={handleChange}>
                  <option value="">Sélectionnez la taille de votre entreprise</option>
                  <option value="micro">Micro-entreprise</option>
                  <option value="small">Très petite entreprise (TPE)</option>
                  <option value="medium">PME (Catégorie I)</option>
                  <option value="large">PME (Catégorie II)</option>
                </Select>
              </FormGroup>
            )}

            {formData.hasFixedIncome === "yes" && (
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
                  />
                </InputWithIcon>
              </FormGroup>
            )}

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
                  placeholder="Ex: 5 000 000"
                  required
                />
              </InputWithIcon>
            </FormGroup>

            <InfoBox>
              <FiInfo size={20} />
              <p>
                Nous analyserons vos informations pour vous recommander le type de crédit le plus adapté à votre
                situation. Cette recommandation est basée sur votre profil et le montant demandé.
              </p>
            </InfoBox>

            <Button type="submit" disabled={loading}>
              {loading ? <LoadingSpinner /> : "Analyser mon profil"}
            </Button>
          </RecommenderForm>
        ) : (
          <RecommendationBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RecommendationTitle>Recommandation de crédit</RecommendationTitle>
            <RecommendationText>
              Après analyse de notre algorithme, le crédit le plus adapté pour vous est:{" "}
              <strong>
                {recommendation.type} {recommendation.subType && recommendation.subType}
              </strong>
            </RecommendationText>

            {recommendation.isEligible ? (
              <>
                <RecommendationText>{recommendation.reason}</RecommendationText>

                {recommendation.eligibilityWarnings && recommendation.eligibilityWarnings.length > 0 && (
                  <div
                    style={{
                      margin: "1rem 0",
                      padding: "1rem",
                      backgroundColor: "#FFF7ED",
                      borderRadius: "0.5rem",
                      textAlign: "left",
                    }}
                  >
                    <p style={{ fontWeight: "600", marginBottom: "0.5rem", color: "#9A3412" }}>Points d'attention :</p>
                    <ul style={{ paddingLeft: "1.5rem", color: "#9A3412" }}>
                      {recommendation.eligibilityWarnings.map((warning, index) => (
                        <li key={index}>{warning.message}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <RecommendationButton onClick={handleContinue}>
                  Continuer avec {recommendation.type} {recommendation.subType && recommendation.subType}{" "}
                  <FiArrowRight />
                </RecommendationButton>
              </>
            ) : (
              <div
                style={{
                  margin: "1rem 0",
                  padding: "1rem",
                  backgroundColor: "#FEF2F2",
                  borderRadius: "0.5rem",
                  textAlign: "left",
                }}
              >
                <p style={{ fontWeight: "600", marginBottom: "0.5rem", color: "#B91C1C" }}>
                  Vous n'êtes pas éligible pour les raisons suivantes :
                </p>
                <ul style={{ paddingLeft: "1.5rem", color: "#B91C1C" }}>
                  {recommendation.eligibilityReasons.map((reason, index) => (
                    <li key={index}>{reason.message}</li>
                  ))}
                </ul>
                <p style={{ marginTop: "1rem", color: "#B91C1C" }}>
                  Nous vous invitons à contacter un conseiller pour plus d'informations.
                </p>
              </div>
            )}
          </RecommendationBox>
        )}
      </RecommenderBody>
    </RecommenderContainer>
  )
}

export default CreditRecommender
