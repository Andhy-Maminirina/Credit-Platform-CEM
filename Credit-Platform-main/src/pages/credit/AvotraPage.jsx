"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"
import { FiArrowLeft, FiInfo, FiArrowRight, FiBriefcase, FiLayers, FiTrendingUp, FiCheck } from "react-icons/fi"
import Header from "../../components/public/Header"
import Footer from "../../components/public/Footer"
import CreditSimulator from "../../components/credit/CreditSimulator"
import { Divider } from "antd"

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  text-decoration: none;
  margin-bottom: 1.5rem;
  
  &:hover {
    color: #333;
  }
`

const PageHeader = styled.div`
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  color: #666;
  font-size: 1.125rem;
`

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 2rem;
`

const Tab = styled.button`
  padding: 1rem 2rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${(props) => (props.active ? "#FF4136" : "transparent")};
  color: ${(props) => (props.active ? "#FF4136" : "#666")};
  font-weight: ${(props) => (props.active ? "600" : "normal")};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: ${(props) => (props.active ? "#FF4136" : "#333")};
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

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 1.5rem;
`

const CardBody = styled.div`
  padding: 1.5rem;
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const SectionSubtitle = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
`

const CreditCardContainer = styled.div`
  margin-bottom: 1rem;
`

const CreditCard = styled.div`
  border: 1px solid ${(props) => (props.selected ? "#FF4136" : "#e5e7eb")};
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`

const CreditCardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: ${(props) => (props.selected ? "#FF4136" : "#f9fafb")};
  color: ${(props) => (props.selected ? "white" : "#111")};
`

const IconCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => (props.selected ? "rgba(255, 255, 255, 0.2)" : "#e5e7eb")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`

const CreditCardTitle = styled.div`
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.75rem;
    opacity: 0.9;
  }
`

const CreditCardBody = styled.div`
  padding: 1rem 1.5rem;
`

const CreditCardDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`

const DetailItem = styled.div`
  p:first-child {
    font-size: 0.75rem;
    color: #666;
    margin-bottom: 0.25rem;
  }
  
  p:last-child {
    font-weight: 600;
  }
`

const ComparisonTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
`

const TableHeader = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #666;
`

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
`

const TableCell = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
`

const InfoBox = styled.div`
  background-color: #FFF7ED;
  border-left: 4px solid #F59E0B;
  padding: 1rem;
  margin-top: 1.5rem;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  
  p {
    color: #666;
    font-size: 0.875rem;
  }
`

const ActionButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: #111;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #333;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ListTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem;
`

const SimpleList = styled.ul`
  list-style: none;
  margin-bottom: 1rem;
  
  li {
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
  }
`

const RequirementsList = styled.div`
  margin-bottom: 1.5rem;
`

const RequirementItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  
  svg {
    color: ${(props) => (props.warning ? "#F59E0B" : "#10B981")};
    margin-right: 0.75rem;
    margin-top: 0.25rem;
    flex-shrink: 0;
  }
`

const AvotraPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState("types")
  const [selectedCredit, setSelectedCredit] = useState(null)

  useEffect(() => {
    // Vérifier d'abord les paramètres d'URL
    const params = new URLSearchParams(window.location.search)
    const tabParam = params.get("tab")
    const typeParam = params.get("type")

    if (tabParam) {
      setActiveTab(tabParam)
      console.log("Onglet activé depuis l'URL:", tabParam)
    } else if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab)
      console.log("Onglet activé depuis location.state:", location.state.activeTab)
    }

    if (typeParam) {
      setSelectedCredit(typeParam)
      console.log("Type de crédit sélectionné depuis l'URL:", typeParam)
    } else if (location.state && location.state.selectedCredit) {
      setSelectedCredit(location.state.selectedCredit)
      console.log("Type de crédit sélectionné depuis location.state:", location.state.selectedCredit)
    }
  }, [location])

  const creditTypes = [
    {
      id: "ainga",
      name: "AVOTRA AINGA",
      subtitle: "Pour les micro-entreprises",
      icon: <FiBriefcase />,
      amount: "300 000 à 5 000 000 Ar",
      duration: "Jusqu'à 12 mois",
      rate: "2,20%",
      fileFeesRate: "2,50% HT",
      solidarityFund: "1% du montant",
      guarantee: "140% du montant",
      penaltyRate: "2,75% mensuel",
      minBusinessAge: "1 an d'ancienneté",
      maxAge: "60 ans au terme du crédit",
    },
    {
      id: "mihary",
      name: "AVOTRA MIHARY",
      subtitle: "Pour les très petites entreprises (TPE)",
      icon: <FiLayers />,
      amount: "5 000 001 à 20 000 000 Ar",
      duration: "Jusqu'à 18 mois",
      rate: "2,00%",
      fileFeesRate: "2,35% HT",
      solidarityFund: "1,5% du montant",
      guarantee: "130% du montant",
      penaltyRate: "2,5% mensuel",
      minBusinessAge: "1 an d'ancienneté",
      maxAge: "60 ans au terme du crédit",
    },
    {
      id: "roso",
      name: "AVOTRA ROSO",
      subtitle: "Pour les PME (Catégorie I)",
      icon: <FiTrendingUp />,
      amount: "20 000 001 à 50 000 000 Ar",
      duration: "Jusqu'à 24 mois",
      rate: "1,80%",
      fileFeesRate: "2,20% HT",
      solidarityFund: "2% du montant",
      guarantee: "120% du montant",
      penaltyRate: "2,25% mensuel",
      minBusinessAge: "1 an d'ancienneté",
      maxAge: "60 ans au terme du crédit",
    },
    {
      id: "amboara",
      name: "AVOTRA AMBOARA",
      subtitle: "Pour les PME (Catégorie II)",
      icon: <FiTrendingUp />,
      amount: "Plus de 50 000 000 Ar",
      duration: "Jusqu'à 24 mois",
      rate: "1,70%",
      fileFeesRate: "2,00% HT",
      solidarityFund: "2% du montant",
      guarantee: "120% du montant",
      penaltyRate: "2,00% mensuel",
      minBusinessAge: "1,5 an d'ancienneté",
      maxAge: "60 ans au terme du crédit",
    },
  ]

  const handleContinue = () => {
    if (selectedCredit) {
      navigate("/client/credit-request", {
        state: {
          creditType: `AVOTRA_${selectedCredit.toUpperCase()}`,
        },
      })
    }
  }

  const handleStartApplication = () => {
    navigate("/client/credit-request", { state: { creditType: "AVOTRA" } })
  }

  return (
    <>
      
      <Container>
        <BackLink to="/">
          <FiArrowLeft /> Retour à l'accueil
        </BackLink>

        <PageHeader>
          <Title>Crédits AVOTRA</Title>
          <Subtitle>Solutions de financement pour les entrepreneurs et entreprises</Subtitle>
        </PageHeader>

        <TabsContainer>
          <Tab active={activeTab === "types"} onClick={() => setActiveTab("types")}>
            Types de crédit
          </Tab>
          <Tab active={activeTab === "eligibility"} onClick={() => setActiveTab("eligibility")}>
            Éligibilité
          </Tab>
          <Tab active={activeTab === "documents"} onClick={() => setActiveTab("documents")}>
            Documents
          </Tab>
          <Tab active={activeTab === "simulator"} onClick={() => setActiveTab("simulator")}>
            Simulateur
          </Tab>
        </TabsContainer>

        <ContentContainer>
          <MainContent>
            {activeTab === "types" && (
              <Card>
                <CardBody>
                  <SectionTitle>Choisissez votre type de crédit AVOTRA</SectionTitle>
                  <SectionSubtitle>Sélectionnez le crédit adapté à la taille de votre entreprise</SectionSubtitle>

                  {creditTypes.map((credit) => (
                    <CreditCardContainer key={credit.id}>
                      <CreditCard selected={selectedCredit === credit.id} onClick={() => setSelectedCredit(credit.id)}>
                        <CreditCardHeader selected={selectedCredit === credit.id}>
                          <IconCircle selected={selectedCredit === credit.id}>{credit.icon}</IconCircle>
                          <CreditCardTitle>
                            <h3>{credit.name}</h3>
                            <p>{credit.subtitle}</p>
                          </CreditCardTitle>
                        </CreditCardHeader>

                        <CreditCardBody>
                          <CreditCardDetails>
                            <DetailItem>
                              <p>Montant</p>
                              <p>{credit.amount}</p>
                            </DetailItem>
                            <DetailItem>
                              <p>Durée</p>
                              <p>{credit.duration}</p>
                            </DetailItem>
                            <DetailItem>
                              <p>Taux</p>
                              <p>{credit.rate}</p>
                            </DetailItem>
                          </CreditCardDetails>
                          <Divider style={{ margin: "0.75rem 0" }} />
                          <CreditCardDetails>
                            <DetailItem>
                              <p>Frais de dossier</p>
                              <p>{credit.fileFeesRate}</p>
                            </DetailItem>
                            <DetailItem>
                              <p>Fonds de solidarité</p>
                              <p>{credit.solidarityFund}</p>
                            </DetailItem>
                            <DetailItem>
                              <p>Garantie requise</p>
                              <p>{credit.guarantee}</p>
                            </DetailItem>
                          </CreditCardDetails>
                        </CreditCardBody>
                      </CreditCard>
                    </CreditCardContainer>
                  ))}

                  <ActionButton onClick={handleContinue} disabled={!selectedCredit}>
                    Continuer avec ce type de crédit <FiArrowRight />
                  </ActionButton>
                </CardBody>
              </Card>
            )}

            {activeTab === "eligibility" && (
              <Card>
                <CardBody>
                  <SectionTitle>Conditions d'éligibilité</SectionTitle>
                  <SectionSubtitle>Vérifiez si vous êtes éligible aux crédits AVOTRA</SectionSubtitle>

                  <RequirementsList>
                    <RequirementItem>
                      <FiCheck />
                      <span>De nationalité malgache</span>
                    </RequirementItem>
                    <RequirementItem>
                      <FiCheck />
                      <span>60 ans maximum au terme du crédit</span>
                    </RequirementItem>
                    <RequirementItem>
                      <FiCheck />
                      <span>
                        Ancienneté dans l'activité :{selectedCredit === "amboara" ? "1,5 an minimum" : "1 an minimum"}
                      </span>
                    </RequirementItem>
                    <RequirementItem>
                      <FiCheck />
                      <span>Pas d'impayé dans le BIC</span>
                    </RequirementItem>
                  </RequirementsList>

                  <ListTitle>Apport personnel requis</ListTitle>
                  <RequirementsList>
                    <RequirementItem>
                      <FiCheck />
                      <span>Besoin en fonds de roulement : Aucun apport requis</span>
                    </RequirementItem>
                    <RequirementItem>
                      <FiCheck />
                      <span>Investissement : 20% de l'objet du crédit</span>
                    </RequirementItem>
                    <RequirementItem>
                      <FiCheck />
                      <span>Investissement + Besoins en fonds de roulement : 20% de l'investissement</span>
                    </RequirementItem>
                  </RequirementsList>

                  <ListTitle>Garanties requises</ListTitle>
                  <RequirementsList>
                    {selectedCredit ? (
                      <RequirementItem>
                        <FiCheck />
                        <span>
                          {creditTypes.find((c) => c.id === selectedCredit)?.guarantee ||
                            "120-140% du montant du crédit selon le type"}
                        </span>
                      </RequirementItem>
                    ) : (
                      <>
                        <RequirementItem>
                          <FiCheck />
                          <span>AINGA : 140% du montant du crédit</span>
                        </RequirementItem>
                        <RequirementItem>
                          <FiCheck />
                          <span>MIHARY : 130% du montant du crédit</span>
                        </RequirementItem>
                        <RequirementItem>
                          <FiCheck />
                          <span>ROSO/AMBOARA : 120% du montant du crédit</span>
                        </RequirementItem>
                      </>
                    )}
                  </RequirementsList>

                  <InfoBox>
                    <FiInfo size={20} />
                    <p>
                      Les conditions d'éligibilité peuvent varier selon le type de crédit AVOTRA. Veuillez consulter
                      notre conseiller pour plus de détails.
                    </p>
                  </InfoBox>
                </CardBody>
              </Card>
            )}

            {activeTab === "documents" && (
              <Card>
                <CardBody>
                  <SectionTitle>Documents requis</SectionTitle>
                  <SectionSubtitle>Préparez ces documents pour votre demande de crédit AVOTRA</SectionSubtitle>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <h3 style={{ fontWeight: 600, marginBottom: "0.75rem" }}>1. IDENTITÉ DU CLIENT</h3>
                    <RequirementsList>
                      <RequirementItem>
                        <FiCheck />
                        <span>Copie certifiée de la CIN : Client (3) et caution (1)</span>
                      </RequirementItem>
                      <RequirementItem>
                        <FiCheck />
                        <span>Certificat de résidence de moins de trois mois : Client (1) et caution (1)</span>
                      </RequirementItem>
                      <RequirementItem>
                        <span>Photos d'identité 4X4 : Client (3) et caution (1)</span>
                      </RequirementItem>
                      <RequirementItem>
                        <span>Copie du livret de famille ou acte de mariage (si cela existe)</span>
                      </RequirementItem>
                    </RequirementsList>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <h3 style={{ fontWeight: 600, marginBottom: "0.75rem" }}>2. DOMICILE</h3>
                    <RequirementsList>
                      <RequirementItem>
                        <FiCheck />
                        <span>
                          Si Propriétaire : Copie Facture JIRAMA ou Copie Kara-pokontany ou autres pièces justificatives
                          de propriétés
                        </span>
                      </RequirementItem>
                      <RequirementItem>
                        <FiCheck />
                        <span>Si Locataire : Copie Facture JIRAMA ou Copie Kara-pokontany</span>
                      </RequirementItem>
                      <RequirementItem>
                        <span>Plan de localisation du domicile du client et du lieu d'exploitation</span>
                      </RequirementItem>
                      <RequirementItem>
                        <span>Plan de localisation du domicile de la caution (si nécessaire)</span>
                      </RequirementItem>
                    </RequirementsList>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <h3 style={{ fontWeight: 600, marginBottom: "0.75rem" }}>3. JUSTIFICATIF DE L'ACTIVITÉ</h3>
                    <RequirementsList>
                      <RequirementItem>
                        <FiCheck />
                        <span>Carte fiscale, Carte statistique</span>
                      </RequirementItem>
                      <RequirementItem>
                        <span>Licence (si cela existe)</span>
                      </RequirementItem>
                      <RequirementItem>
                        <span>Certificat d'existence ou Certificat d'occupation délivré par le Fokontany</span>
                      </RequirementItem>
                    </RequirementsList>
                  </div>
                </CardBody>
              </Card>
            )}

            {activeTab === "simulator" && (
              <Card>
                <CardBody>
                  <SectionTitle>Simulateur de crédit AVOTRA</SectionTitle>
                  <SectionSubtitle>Estimez votre capacité d'emprunt et calculez vos mensualités</SectionSubtitle>

                  {/* Intégration du nouveau simulateur avec toutes les informations nécessaires */}
                  <CreditSimulator
                    type="AVOTRA"
                    businessType={selectedCredit}
                    showBusinessTypeSelector={true}
                    showSalaryField={true} // Ajout du champ de salaire pour AVOTRA
                    showFinancingTypeField={true} // Nouveau champ pour le type de financement
                    creditTypesData={creditTypes} // Passer les données complètes des types de crédit
                  />
                </CardBody>
              </Card>
            )}
          </MainContent>

          <SideContent>
            <Card>
              <CardBody>
                <SectionTitle>Comparaison des crédits AVOTRA</SectionTitle>

                <ComparisonTable>
                  <thead>
                    <tr>
                      <TableHeader>Type</TableHeader>
                      <TableHeader>Montant (Ar)</TableHeader>
                      <TableHeader>Taux</TableHeader>
                      <TableHeader>Frais</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    <TableRow>
                      <TableCell>AINGA</TableCell>
                      <TableCell>300K - 5M</TableCell>
                      <TableCell>2,20%</TableCell>
                      <TableCell>2,50% HT</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>MIHARY</TableCell>
                      <TableCell>5M - 20M</TableCell>
                      <TableCell>2,00%</TableCell>
                      <TableCell>2,35% HT</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ROSO</TableCell>
                      <TableCell>20M - 50M</TableCell>
                      <TableCell>1,80%</TableCell>
                      <TableCell>2,20% HT</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>AMBOARA</TableCell>
                      <TableCell>+50M</TableCell>
                      <TableCell>1,70%</TableCell>
                      <TableCell>2,00% HT</TableCell>
                    </TableRow>
                  </tbody>
                </ComparisonTable>

                <ListTitle>Durée maximale</ListTitle>
                <SimpleList>
                  <li>AINGA : 12 mois</li>
                  <li>MIHARY : 18 mois</li>
                  <li>ROSO : 24 mois</li>
                  <li>AMBOARA : 24 mois</li>
                </SimpleList>

                <ListTitle>Fonds de solidarité</ListTitle>
                <SimpleList>
                  <li>AINGA : 1% du montant du crédit</li>
                  <li>MIHARY : 1,5% du montant du crédit</li>
                  <li>ROSO : 2% du montant du crédit</li>
                  <li>AMBOARA : 2% du montant du crédit</li>
                </SimpleList>

                <ListTitle>Objets de financement</ListTitle>
                <SimpleList>
                  <li>Besoin en fonds de roulement</li>
                  <li>Investissement pour développement</li>
                  <li>Renforcement de trésorerie</li>
                  <li>Combinaison des objets ci-dessus</li>
                </SimpleList>

                <InfoBox>
                  <FiInfo size={20} />
                  <p>
                    Le choix du type de crédit AVOTRA dépend de la taille de votre entreprise et de vos besoins de
                    financement.
                  </p>
                </InfoBox>
              </CardBody>
            </Card>

            <ActionButton onClick={handleStartApplication}>Démarrer ma demande</ActionButton>
          </SideContent>
        </ContentContainer>
      </Container>
      <Footer />
    </>
  )
}

export default AvotraPage

