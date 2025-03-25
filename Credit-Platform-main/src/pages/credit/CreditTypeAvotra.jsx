"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { FiArrowLeft, FiInfo, FiArrowRight, FiBriefcase, FiLayers, FiTrendingUp } from "react-icons/fi"
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

const SectionSubtitle = styled.p`
  color: ${(props) => props.theme.colors.gray[600]};
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`

const CreditCardContainer = styled.div`
  margin-bottom: 1rem;
`

const CreditCard = styled.div`
  border: 1px solid ${(props) => (props.isSelected ? props.theme.colors.primary[600] : props.theme.colors.gray[200])};
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`

const CreditCardHeader = styled.div`
  background-color: ${(props) => props.theme.colors.primary[600]};
  color: white;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
`

const IconCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
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
  margin-bottom: 1rem;
`

const DetailItem = styled.div`
  p:first-child {
    font-size: 0.75rem;
    color: ${(props) => props.theme.colors.gray[500]};
    margin-bottom: 0.25rem;
  }
  
  p:last-child {
    font-weight: 600;
    color: ${(props) => props.theme.colors.gray[900]};
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
  font-size: 0.75rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray[500]};
  text-transform: uppercase;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[200]};
`

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.gray[200]};
  }
`

const TableCell = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.gray[700]};
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

const ListTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem;
  color: ${(props) => props.theme.colors.gray[900]};
`

const SimpleList = styled.ul`
  list-style: none;
  margin-bottom: 1rem;
  
  li {
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors.gray[700]};
  }
`

const CreditTypeAvotra = () => {
  const [activeTab, setActiveTab] = useState("types")
  const [selectedCredit, setSelectedCredit] = useState(null)

  const creditTypes = [
    {
      id: "ainga",
      name: "AVOTRA AINGA",
      subtitle: "Pour les micro-entreprises",
      icon: <FiBriefcase />,
      amount: "300 000 à 5 000 000 Ar",
      duration: "Jusqu'à 12 mois",
      rate: "2,20%",
    },
    {
      id: "mihary",
      name: "AVOTRA MIHARY",
      subtitle: "Pour les très petites entreprises (TPE)",
      icon: <FiLayers />,
      amount: "5 000 001 à 20 000 000 Ar",
      duration: "Jusqu'à 18 mois",
      rate: "2,00%",
    },
    {
      id: "roso",
      name: "AVOTRA ROSO",
      subtitle: "Pour les PME (Catégorie I)",
      icon: <FiTrendingUp />,
      amount: "20 000 001 à 50 000 000 Ar",
      duration: "Jusqu'à 24 mois",
      rate: "1,80%",
    },
    {
      id: "amboara",
      name: "AVOTRA AMBOARA",
      subtitle: "Pour les PME (Catégorie II)",
      icon: <FiTrendingUp />,
      amount: "Plus de 50 000 000 Ar",
      duration: "Jusqu'à 24 mois",
      rate: "1,70%",
    },
  ]

  return (
    <>
      <Container>
        <PageHeader>
          <BackLink to="/">
            <FiArrowLeft />
            Retour à l'accueil
          </BackLink>

          <Title>Crédits AVOTRA</Title>
          <Subtitle>Solutions de financement pour les entrepreneurs et entreprises</Subtitle>
        </PageHeader>

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

        <ContentContainer>
          <MainContent>
            <Card>
              <CardBody>
                <SectionTitle>Choisissez votre type de crédit AVOTRA</SectionTitle>
                <SectionSubtitle>Sélectionnez le crédit adapté à la taille de votre entreprise</SectionSubtitle>

                {creditTypes.map((credit) => (
                  <CreditCardContainer key={credit.id}>
                    <CreditCard isSelected={selectedCredit === credit.id} onClick={() => setSelectedCredit(credit.id)}>
                      <CreditCardHeader>
                        <IconCircle>{credit.icon}</IconCircle>
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
                      </CreditCardBody>
                    </CreditCard>
                  </CreditCardContainer>
                ))}

                <ActionButton
                  to={selectedCredit ? `/credit-simulation?type=${selectedCredit}` : "#"}
                  style={{ opacity: selectedCredit ? 1 : 0.5, pointerEvents: selectedCredit ? "auto" : "none" }}
                >
                  Continuer avec ce type de crédit <FiArrowRight />
                </ActionButton>
              </CardBody>
            </Card>
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
                    </tr>
                  </thead>
                  <tbody>
                    <TableRow>
                      <TableCell>AINGA</TableCell>
                      <TableCell>300K - 5M</TableCell>
                      <TableCell>2,20%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>MIHARY</TableCell>
                      <TableCell>5M - 20M</TableCell>
                      <TableCell>2,00%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ROSO</TableCell>
                      <TableCell>20M - 50M</TableCell>
                      <TableCell>1,80%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>AMBOARA</TableCell>
                      <TableCell>+50M</TableCell>
                      <TableCell>1,70%</TableCell>
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

                <ListTitle>Objets de financement</ListTitle>
                <SimpleList>
                  <li>Besoin en fonds de roulement</li>
                  <li>Investissement pour développement</li>
                  <li>Renforcement de trésorerie</li>
                  <li>Combinaison des objets ci-dessus</li>
                </SimpleList>

                <InfoBox>
                  <FiInfo />
                  <p>
                    Le choix du type de crédit AVOTRA dépend de la taille de votre entreprise et de vos besoins de
                    financement.
                  </p>
                </InfoBox>
              </CardBody>
            </Card>
          </SideContent>
        </ContentContainer>
      </Container>
      
    </>
  )
}

export default CreditTypeAvotra

