"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { FiArrowLeft, FiCheck, FiInfo, FiArrowRight } from "react-icons/fi"
/* import Header from "../public/Header"
import Footer from "../public/Footer" */

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`

const PageHeader = styled.div`
  margin-bottom: 2rem;
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

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.gray[900]};
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

const Card = styled.div`
  background: white;
  border-radius: 0.75rem;
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
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.colors.gray[900]};
`

const CharacteristicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  background-color: ${(props) => props.theme.colors.gray[50]};
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
`

const CharacteristicItem = styled.div``

const CharacteristicLabel = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.gray[600]};
  margin-bottom: 0.25rem;
`

const CharacteristicValue = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray[900]};
`

const CharacteristicNote = styled.p`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.gray[500]};
`

const SectionSubtitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  color: ${(props) => props.theme.colors.gray[900]};
`

const RequirementsList = styled.ul`
  list-style: none;
  margin-bottom: 1.5rem;
`

const RequirementItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  
  svg {
    color: ${(props) => props.color || props.theme.colors.primary[600]};
    margin-right: 0.75rem;
    margin-top: 0.25rem;
    flex-shrink: 0;
  }
`

const InfoBox = styled.div`
  background-color: ${(props) => props.theme.colors.warning}10;
  border-left: 4px solid ${(props) => props.theme.colors.warning};
  padding: 1rem;
  border-radius: 0.25rem;
  margin-top: 1.5rem;
  display: flex;
  align-items: flex-start;
  
  svg {
    color: ${(props) => props.theme.colors.warning};
    margin-right: 0.75rem;
    margin-top: 0.25rem;
    flex-shrink: 0;
  }
  
  p {
    color: ${(props) => props.theme.colors.gray[700]};
    font-size: 0.875rem;
  }
`

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => props.theme.colors.primary[600]};
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  margin-top: 1.5rem;
  width: 100%;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.primary[700]};
  }
  
  svg {
    margin-left: 0.5rem;
  }
`

const CreditTypeSafidy = () => {
  const [activeTab, setActiveTab] = useState("eligibility")

  return (
    <>
      {/* <Header /> */}
      <Container>
        <PageHeader>
          <BackLink to="/">
            <FiArrowLeft />
            Retour à l'accueil
          </BackLink>

          <Title>Crédit SAFIDY</Title>
          <Subtitle>Crédit à la consommation pour les salariés et fonctionnaires</Subtitle>
        </PageHeader>

        <TabsContainer>
          <TabList>
            <Tab isActive={activeTab === "eligibility"} onClick={() => setActiveTab("eligibility")}>
              Éligibilité
            </Tab>
            <Tab isActive={activeTab === "simulator"} onClick={() => setActiveTab("simulator")}>
              Simulateur
            </Tab>
            <Tab isActive={activeTab === "documents"} onClick={() => setActiveTab("documents")}>
              Documents
            </Tab>
          </TabList>
        </TabsContainer>

        <ContentContainer>
          <MainContent>
            <Card>
              <CardBody>
                <SectionTitle>Conditions d'éligibilité</SectionTitle>
                <p>Vérifiez si vous êtes éligible au crédit SAFIDY</p>

                <SectionSubtitle>Profil requis</SectionSubtitle>
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

                <SectionSubtitle>Pour les salariés du secteur privé</SectionSubtitle>
                <RequirementsList>
                  <RequirementItem>
                    <FiCheck />
                    <span>6 mois d'ancienneté minimum dans l'entreprise</span>
                  </RequirementItem>
                  <RequirementItem>
                    <FiCheck />
                    <span>Contrat à durée indéterminée</span>
                  </RequirementItem>
                  <RequirementItem>
                    <FiCheck />
                    <span>Ou contrat à durée déterminée avec terme postérieur à la fin du crédit</span>
                  </RequirementItem>
                </RequirementsList>

                <SectionSubtitle>Pour les fonctionnaires</SectionSubtitle>
                <RequirementsList>
                  <RequirementItem>
                    <FiCheck />
                    <span>Certificat administratif requis</span>
                  </RequirementItem>
                  <RequirementItem color="#F59E0B">
                    <FiInfo />
                    <span>ECD/ELD exclus</span>
                  </RequirementItem>
                </RequirementsList>

                <InfoBox>
                  <FiInfo />
                  <p>
                    Le montant du crédit est calculé sur base de la quotité cessible (1/3 du salaire mensuel net) et du
                    revenu disponible après charges.
                  </p>
                </InfoBox>
              </CardBody>
            </Card>

            <ActionButton to="/credit-simulation">
              Simuler mon crédit <FiArrowRight />
            </ActionButton>
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

                <SectionSubtitle>Garantie</SectionSubtitle>
                <p>Caution solidaire (conjoint ou tiers)</p>

                <SectionSubtitle>Remboursement anticipé</SectionSubtitle>
                <p>Avant la moitié de la durée : 2,5% du capital restant dû</p>
                <p>Après la moitié de la durée : 1,5% du capital restant dû</p>

                <SectionSubtitle>Pénalité de retard</SectionSubtitle>
                <p>2,5% par mois de la mensualité en retard</p>

                <InfoBox>
                  <FiInfo />
                  <p>
                    Le montant du crédit est calculé sur base de la quotité cessible (1/3 du salaire mensuel net) et du
                    revenu disponible après charges.
                  </p>
                </InfoBox>
              </CardBody>
            </Card>
          </SideContent>
        </ContentContainer>
      </Container>
     {/*  <Footer /> */}
    </>
  )
}

export default CreditTypeSafidy

