"use client"

import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"
import { FiArrowLeft, FiArrowRight, FiCheck, FiInfo } from "react-icons/fi"
import { productService } from "../../services/api"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Alert from "../../components/ui/Alert"

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${(props) => props.theme.colors.gray[600]};
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  
  &:hover {
    color: ${(props) => props.theme.colors.primary[600]};
  }
  
  svg {
    margin-right: 0.5rem;
  }
`

const Header = styled.div`
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.gray[600]};
  font-size: 1.125rem;
`

const TabsContainer = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[200]};
`

const TabList = styled.div`
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

const Tab = styled.button`
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => (props.isActive ? props.theme.colors.primary[600] : props.theme.colors.gray[600])};
  background: transparent;
  border: none;
  border-bottom: 2px solid ${(props) => (props.isActive ? props.theme.colors.primary[600] : "transparent")};
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    color: ${(props) => (props.isActive ? props.theme.colors.primary[600] : props.theme.colors.gray[900])};
  }
`

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const MainContent = styled.div``

const SideContent = styled.div``

const CreditCardContainer = styled(motion.div)`
  margin-bottom: 1.5rem;
`

const CreditCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${(props) => (props.isSelected ? props.theme.colors.primary[600] : "transparent")};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`

const CreditCardHeader = styled.div`
  padding: 1.5rem;
  background: ${(props) => props.theme.colors.primary[600]};
  color: white;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`

const CreditCardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const CreditCardSubtitle = styled.p`
  font-size: 0.875rem;
  opacity: 0.9;
`

const CreditCardBody = styled.div`
  padding: 1.5rem;
`

const CreditCardDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const DetailItem = styled.div``

const DetailLabel = styled.p`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.gray[500]};
  margin-bottom: 0.25rem;
`

const DetailValue = styled.p`
  font-size: 1rem;
  font-weight: 600;
`

const FeatureList = styled.ul`
  margin-bottom: 1.5rem;
`

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  
  svg {
    color: ${(props) => props.theme.colors.primary[600]};
    margin-right: 0.5rem;
    margin-top: 0.25rem;
    flex-shrink: 0;
  }
`

const InfoBox = styled(Alert)`
  margin-top: 1.5rem;
`

const ComparisonCard = styled(Card)`
  margin-bottom: 1.5rem;
`

const ComparisonTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding: 1.5rem 1.5rem 0;
`

const ComparisonTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const ComparisonRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.gray[200]};
  }
`

const ComparisonHeader = styled.th`
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
`

const ComparisonCell = styled.td`
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
`

const ActionButton = styled(Button)`
  margin-top: 1.5rem;
`

const CreditTypePage = () => {
  const { type } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("types")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [creditInfo, setCreditInfo] = useState(null)
  const [selectedCredit, setSelectedCredit] = useState(null)

  useEffect(() => {
    const fetchCreditInfo = async () => {
      try {
        setLoading(true)
        setError("")

        // Fetch credit type information
        const response = await productService.getAllProducts()

        // Filter products by type (SAFIDY or AVOTRA)
        const filteredProducts = response.data.filter((product) => product.type.toLowerCase() === type.toLowerCase())

        if (filteredProducts.length === 0) {
          setError("Type de crédit non trouvé")
        } else {
          setCreditInfo({
            type: type.toUpperCase(),
            description:
              type.toLowerCase() === "safidy"
                ? "Crédit à la consommation pour les salariés et fonctionnaires"
                : "Solutions de financement pour les entrepreneurs et entreprises",
            products: filteredProducts,
          })
        }
      } catch (err) {
        console.error("Erreur lors du chargement des informations sur le crédit:", err)
        setError("Impossible de charger les informations sur le crédit")
      } finally {
        setLoading(false)
      }
    }

    fetchCreditInfo()
  }, [type])

  const handleCreditSelection = (credit) => {
    setSelectedCredit(credit)
  }

  const handleContinue = () => {
    if (selectedCredit) {
      navigate("/credit-simulation", { state: { selectedCredit } })
    }
  }

  if (loading) {
    return (
      <Container>
        <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <BackLink to="/">
          <FiArrowLeft />
          Retour à l'accueil
        </BackLink>

        <Alert variant="error">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container>
      <BackLink to="/">
        <FiArrowLeft />
        Retour à l'accueil
      </BackLink>

      <Header>
        <Title>Crédit {creditInfo.type}</Title>
        <Subtitle>{creditInfo.description}</Subtitle>
      </Header>

      {type.toLowerCase() === "avotra" && (
        <TabsContainer>
          <TabList>
            <Tab isActive={activeTab === "types"} onClick={() => setActiveTab("types")}>
              Types de crédit
            </Tab>
            <Tab isActive={activeTab === "eligibility"} onClick={() => setActiveTab("eligibility")}>
              Éligibilité
            </Tab>
            <Tab isActive={activeTab === "documents"} onClick={() => setActiveTab("documents")}>
              Documents
            </Tab>
          </TabList>
        </TabsContainer>
      )}

      <ContentContainer>
        <MainContent>
          {type.toLowerCase() === "safidy" ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <Card.Body>
                  <h2 className="text-xl font-semibold mb-6">Caractéristiques du crédit</h2>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-gray-600 mb-1">Durée maximale</p>
                        <p className="text-xl font-semibold">24 mois</p>
                      </div>

                      <div>
                        <p className="text-gray-600 mb-1">Taux d'intérêt</p>
                        <p className="text-xl font-semibold">1,85%</p>
                      </div>

                      <div>
                        <p className="text-gray-600 mb-1">Frais de dossier</p>
                        <p className="text-xl font-semibold">2,00% HT</p>
                        <p className="text-sm text-gray-500">Minimum 20.000 Ar</p>
                      </div>

                      <div>
                        <p className="text-gray-600 mb-1">Fonds de solidarité</p>
                        <p className="text-xl font-semibold">1% par an</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mt-8 mb-4">Conditions d'éligibilité</h3>

                  <div className="space-y-4">
                    <h4 className="font-medium">Profil requis</h4>
                    <FeatureList>
                      <FeatureItem>
                        <FiCheck />
                        <span>Nationalité malgache</span>
                      </FeatureItem>
                      <FeatureItem>
                        <FiCheck />
                        <span>Âge : 21 ans minimum - 60 ans maximum au terme du crédit</span>
                      </FeatureItem>
                      <FeatureItem>
                        <FiCheck />
                        <span>Pas d'impayé dans le BIC</span>
                      </FeatureItem>
                    </FeatureList>

                    <h4 className="font-medium">Pour les salariés du secteur privé</h4>
                    <FeatureList>
                      <FeatureItem>
                        <FiCheck />
                        <span>6 mois d'ancienneté minimum dans l'entreprise</span>
                      </FeatureItem>
                      <FeatureItem>
                        <FiCheck />
                        <span>Contrat à durée indéterminée</span>
                      </FeatureItem>
                      <FeatureItem>
                        <FiCheck />
                        <span>Ou contrat à durée déterminée avec terme postérieur à la fin du crédit</span>
                      </FeatureItem>
                    </FeatureList>

                    <h4 className="font-medium">Pour les fonctionnaires</h4>
                    <FeatureList>
                      <FeatureItem>
                        <FiCheck />
                        <span>Certificat administratif requis</span>
                      </FeatureItem>
                      <FeatureItem>
                        <FiInfo style={{ color: "#F59E0B" }} />
                        <span>ECD/ELD exclus</span>
                      </FeatureItem>
                    </FeatureList>
                  </div>

                  <InfoBox variant="warning">
                    Le montant du crédit est calculé sur base de la quotité cessible (1/3 du salaire mensuel net) et du
                    revenu disponible après charges.
                  </InfoBox>
                </Card.Body>
              </Card>

              <ActionButton
                fullWidth
                size="lg"
                onClick={() => navigate("/credit-simulation")}
                icon={<FiArrowRight />}
                iconPosition="right"
              >
                Simuler mon crédit
              </ActionButton>
            </motion.div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-6">Choisissez votre type de crédit AVOTRA</h2>
              <p className="text-gray-600 mb-6">Sélectionnez le crédit adapté à la taille de votre entreprise</p>

              {creditInfo.products.map((product, index) => (
                <CreditCardContainer
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CreditCard
                    isSelected={selectedCredit && selectedCredit.id === product.id}
                    onClick={() => handleCreditSelection(product)}
                  >
                    <CreditCardHeader>
                      <CreditCardTitle>{product.name}</CreditCardTitle>
                      <CreditCardSubtitle>{product.subtitle}</CreditCardSubtitle>
                    </CreditCardHeader>
                    <CreditCardBody>
                      <CreditCardDetails>
                        <DetailItem>
                          <DetailLabel>Montant</DetailLabel>
                          <DetailValue>{product.amountRange}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                          <DetailLabel>Durée</DetailLabel>
                          <DetailValue>{product.durationRange}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                          <DetailLabel>Taux</DetailLabel>
                          <DetailValue>{product.interestRate}%</DetailValue>
                        </DetailItem>
                      </CreditCardDetails>

                      <FeatureList>
                        {product.features &&
                          product.features.map((feature, i) => (
                            <FeatureItem key={i}>
                              <FiCheck />
                              <span>{feature}</span>
                            </FeatureItem>
                          ))}
                      </FeatureList>
                    </CreditCardBody>
                  </CreditCard>
                </CreditCardContainer>
              ))}

              <ActionButton
                fullWidth
                size="lg"
                onClick={handleContinue}
                disabled={!selectedCredit}
                icon={<FiArrowRight />}
                iconPosition="right"
              >
                Continuer avec ce type de crédit
              </ActionButton>
            </div>
          )}
        </MainContent>

        <SideContent>
          {type.toLowerCase() === "safidy" ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <Card.Body>
                  <h3 className="text-lg font-semibold mb-4">Caractéristiques du crédit</h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-600 mb-1">Durée maximale</p>
                      <p className="font-semibold">24 mois</p>
                    </div>

                    <div>
                      <p className="text-gray-600 mb-1">Taux d'intérêt</p>
                      <p className="font-semibold">1,85%</p>
                    </div>

                    <div>
                      <p className="text-gray-600 mb-1">Frais de dossier</p>
                      <p className="font-semibold">2,00% HT</p>
                      <p className="text-xs text-gray-500">Minimum 20.000 Ar</p>
                    </div>

                    <div>
                      <p className="text-gray-600 mb-1">Fonds de solidarité</p>
                      <p className="font-semibold">1% par an</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 my-4 pt-4">
                    <h4 className="font-medium mb-2">Garantie</h4>
                    <p className="text-sm">Caution solidaire (conjoint ou tiers)</p>
                  </div>

                  <div className="border-t border-gray-200 my-4 pt-4">
                    <h4 className="font-medium mb-2">Remboursement anticipé</h4>
                    <p className="text-sm">Avant la moitié de la durée : 2,5% du capital restant dû</p>
                    <p className="text-sm">Après la moitié de la durée : 1,5% du capital restant dû</p>
                  </div>

                  <div className="border-t border-gray-200 my-4 pt-4">
                    <h4 className="font-medium mb-2">Pénalité de retard</h4>
                    <p className="text-sm">2,5% par mois de la mensualité en retard</p>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ComparisonCard>
                <ComparisonTitle>Comparaison des crédits AVOTRA</ComparisonTitle>
                <ComparisonTable>
                  <thead>
                    <ComparisonRow>
                      <ComparisonHeader>Type</ComparisonHeader>
                      <ComparisonHeader>Montant (Ar)</ComparisonHeader>
                      <ComparisonHeader>Taux</ComparisonHeader>
                    </ComparisonRow>
                  </thead>
                  <tbody>
                    <ComparisonRow>
                      <ComparisonCell>AINGA</ComparisonCell>
                      <ComparisonCell>300K - 5M</ComparisonCell>
                      <ComparisonCell>2,20%</ComparisonCell>
                    </ComparisonRow>
                    <ComparisonRow>
                      <ComparisonCell>MIHARY</ComparisonCell>
                      <ComparisonCell>5M - 20M</ComparisonCell>
                      <ComparisonCell>2,00%</ComparisonCell>
                    </ComparisonRow>
                    <ComparisonRow>
                      <ComparisonCell>ROSO</ComparisonCell>
                      <ComparisonCell>20M - 50M</ComparisonCell>
                      <ComparisonCell>1,80%</ComparisonCell>
                    </ComparisonRow>
                    <ComparisonRow>
                      <ComparisonCell>AMBOARA</ComparisonCell>
                      <ComparisonCell>+50M</ComparisonCell>
                      <ComparisonCell>1,70%</ComparisonCell>
                    </ComparisonRow>
                  </tbody>
                </ComparisonTable>
              </ComparisonCard>

              <Card>
                <Card.Body>
                  <h3 className="text-lg font-semibold mb-4">Durée maximale</h3>
                  <ul className="space-y-2">
                    <li>AINGA : 12 mois</li>
                    <li>MIHARY : 18 mois</li>
                    <li>ROSO : 24 mois</li>
                    <li>AMBOARA : 24 mois</li>
                  </ul>

                  <h3 className="text-lg font-semibold mt-6 mb-4">Objets de financement</h3>
                  <ul className="space-y-2">
                    <li>Besoin en fonds de roulement</li>
                    <li>Investissement pour développement</li>
                    <li>Renforcement de trésorerie</li>
                    <li>Combinaison des objets ci-dessus</li>
                  </ul>

                  <InfoBox variant="warning" style={{ marginTop: "1.5rem" }}>
                    Le choix du type de crédit AVOTRA dépend de la taille de votre entreprise et de vos besoins de
                    financement.
                  </InfoBox>
                </Card.Body>
              </Card>
            </motion.div>
          )}
        </SideContent>
      </ContentContainer>
    </Container>
  )
}

export default CreditTypePage

