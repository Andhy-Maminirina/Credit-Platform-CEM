"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"
import { FiArrowLeft, FiCheck, FiInfo } from "react-icons/fi"
import Header from "../../components/public/Header"
import Footer from "../../components/public/Footer"
import CreditSimulator from "../../components/credit/CreditSimulator"

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

const RequirementGroup = styled.div`
  margin-bottom: 1.5rem;
`

const RequirementGroupTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
`

const CharacteristicsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

const CharacteristicItem = styled.div``

const CharacteristicLabel = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`

const CharacteristicValue = styled.p`
  font-weight: 600;
  font-size: 1.125rem;
`

const CharacteristicNote = styled.p`
  color: #666;
  font-size: 0.75rem;
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
  
  &:hover {
    background-color: #333;
  }
`

const SafidyPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("eligibility")
  const location = useLocation()

  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab)
    }
  }, [location])

  const handleStartApplication = () => {
    navigate("/client/credit-request", { state: { creditType: "SAFIDY" } })
  }

  return (
    <>
    
      <Container>
        <BackLink to="/">
          <FiArrowLeft /> Retour à l'accueil
        </BackLink>

        <PageHeader>
          <Title>Crédit SAFIDY</Title>
          <Subtitle>Crédit à la consommation pour les salariés et fonctionnaires</Subtitle>
        </PageHeader>

        <TabsContainer>
          <Tab active={activeTab === "eligibility"} onClick={() => setActiveTab("eligibility")}>
            Éligibilité
          </Tab>
          <Tab active={activeTab === "simulator"} onClick={() => setActiveTab("simulator")}>
            Simulateur
          </Tab>
          <Tab active={activeTab === "documents"} onClick={() => setActiveTab("documents")}>
            Documents
          </Tab>
        </TabsContainer>

        <ContentContainer>
          <MainContent>
            {activeTab === "eligibility" && (
              <Card>
                <CardBody>
                  <SectionTitle>Conditions d'éligibilité</SectionTitle>
                  <SectionSubtitle>Vérifiez si vous êtes éligible au crédit SAFIDY</SectionSubtitle>

                  <RequirementGroup>
                    <RequirementGroupTitle>Profil requis</RequirementGroupTitle>
                    <RequirementsList>
                      <RequirementItem>
                        <FiCheck />
                        <span>Nationalité malgache</span>
                      </RequirementItem>
                      <RequirementItem>
                        <FiCheck />
                        <span>Âge : 21 ans minimum - 60 ans maximum au terme du crédit</span>
                      </RequirementItem>
                      <RequirementItem>
                        <FiCheck />
                        <span>Pas d'impayé dans le BIC</span>
                      </RequirementItem>
                    </RequirementsList>
                  </RequirementGroup>

                  <RequirementGroup>
                    <RequirementGroupTitle>Pour les salariés du secteur privé</RequirementGroupTitle>
                    <RequirementsList>
                      <RequirementItem>
                        <FiCheck />
                        <span>6 mois d'ancienneté minimum dans l'entreprise</span>
                      </RequirementItem>
                      <RequirementItem>
                        <span>Contrat à durée indéterminée</span>
                      </RequirementItem>
                      <RequirementItem>
                        <span>Ou contrat à durée déterminée avec terme postérieur à la fin du crédit</span>
                      </RequirementItem>
                    </RequirementsList>
                  </RequirementGroup>

                  <RequirementGroup>
                    <RequirementGroupTitle>Pour les fonctionnaires</RequirementGroupTitle>
                    <RequirementsList>
                      <RequirementItem>
                        <FiCheck />
                        <span>Certificat administratif requis</span>
                      </RequirementItem>
                      <RequirementItem warning>
                        <FiInfo />
                        <span>ECD/ELD exclus</span>
                      </RequirementItem>
                    </RequirementsList>
                  </RequirementGroup>

                  <InfoBox>
                    <FiInfo size={20} />
                    <p>
                      Le montant du crédit est calculé sur base de la quotité cessible (1/3 du salaire mensuel net) et
                      du revenu disponible après charges.
                    </p>
                  </InfoBox>
                </CardBody>
              </Card>
            )}

            {activeTab === "simulator" && (
              <Card>
                <CardBody>
                  <SectionTitle>Simulateur de crédit SAFIDY</SectionTitle>
                  <SectionSubtitle>Estimez votre capacité d'emprunt et calculez vos mensualités</SectionSubtitle>

                  {/* Intégration du nouveau simulateur */}
                  <CreditSimulator type="SAFIDY" />
                </CardBody>
              </Card>
            )}

            {activeTab === "documents" && (
              <Card>
                <CardBody>
                  <SectionTitle>Documents requis</SectionTitle>
                  <SectionSubtitle>Préparez ces documents pour votre demande de crédit SAFIDY</SectionSubtitle>

                  <RequirementsList>
                    <RequirementItem>
                      <FiCheck />
                      <span>
                        Copie de la carte d'identité nationale du client en 2 exemplaires, et un exemplaire pour son
                        conjoint
                      </span>
                    </RequirementItem>
                    <RequirementItem>
                      <FiCheck />
                      <span>
                        Copie de la carte nationale d'identité de la caution autre que le conjoint, en 2 exemplaires
                      </span>
                    </RequirementItem>
                    <RequirementItem>
                      <span>3 photos d'identité 4X4 du client</span>
                    </RequirementItem>
                    <RequirementItem>
                      <span>1 photo d'identité 4x4 de la caution</span>
                    </RequirementItem>
                    <RequirementItem>
                      <FiCheck />
                      <span>
                        Certificats de résidence de moins de trois mois du client et de la caution avec présentation du
                        kara-pokontany
                      </span>
                    </RequirementItem>
                    <RequirementItem>
                      <FiCheck />
                      <span>Copie du livret de famille</span>
                    </RequirementItem>
                    <RequirementItem>
                      <FiCheck />
                      <span>
                        Fiches de paie des trois derniers mois (original à présenter, copie à conserver dans le dossier)
                      </span>
                    </RequirementItem>
                    <RequirementItem>
                      <FiCheck />
                      <span>Relevé de compte bancaire des trois derniers mois (si le client est bancarisé)</span>
                    </RequirementItem>
                    <RequirementItem>
                      <FiCheck />
                      <span>Certificat administratif pour les employés fonctionnaires et assimilés</span>
                    </RequirementItem>
                    <RequirementItem>
                      <FiCheck />
                      <span>Attestation d'emploi avec indication de l'ancienneté si salariés du secteur privé</span>
                    </RequirementItem>
                  </RequirementsList>
                </CardBody>
              </Card>
            )}
          </MainContent>

          <SideContent>
            <Card>
              <CardBody>
                <SectionTitle>Caractéristiques du crédit</SectionTitle>

                <CharacteristicsGrid>
                  <CharacteristicItem>
                    <CharacteristicLabel>Durée maximale</CharacteristicLabel>
                    <CharacteristicValue>24 mois</CharacteristicValue>
                  </CharacteristicItem>

                  <CharacteristicItem>
                    <CharacteristicLabel>Taux d'intérêt</CharacteristicLabel>
                    <CharacteristicValue>1,85%</CharacteristicValue>
                  </CharacteristicItem>

                  <CharacteristicItem>
                    <CharacteristicLabel>Frais de dossier</CharacteristicLabel>
                    <CharacteristicValue>2,00% HT</CharacteristicValue>
                    <CharacteristicNote>Minimum 20.000 Ar</CharacteristicNote>
                  </CharacteristicItem>

                  <CharacteristicItem>
                    <CharacteristicLabel>Fonds de solidarité</CharacteristicLabel>
                    <CharacteristicValue>1% par an</CharacteristicValue>
                  </CharacteristicItem>
                </CharacteristicsGrid>

                <div>
                  <h3 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Garantie</h3>
                  <p style={{ marginBottom: "1rem" }}>Caution solidaire (conjoint ou tiers)</p>
                </div>

                <div>
                  <h3 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Remboursement anticipé</h3>
                  <p>Avant la moitié de la durée : 2,5% du capital restant dû</p>
                  <p style={{ marginBottom: "1rem" }}>Après la moitié de la durée : 1,5% du capital restant dû</p>
                </div>

                <div>
                  <h3 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Pénalité de retard</h3>
                  <p>2,5% par mois de la mensualité en retard</p>
                </div>

                <InfoBox>
                  <FiInfo size={20} />
                  <p>
                    Le montant du crédit est calculé sur base de la quotité cessible (1/3 du salaire mensuel net) et du
                    revenu disponible après charges.
                  </p>
                </InfoBox>
              </CardBody>
            </Card>

            <ActionButton onClick={handleStartApplication}>Démarrer ma demande</ActionButton>
          </SideContent>
        </ContentContainer>
      </Container>
     
    </>
  )
}

export default SafidyPage

