"use client"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { FiArrowLeft } from "react-icons/fi"
import Header from "../../components/public/Header"
import Footer from "../../components/public/Footer"
import CreditRecommender from "../../components/credit/CreditRecommender"

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

const InfoList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const InfoItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
`

const InfoContent = styled.div`
  h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  p {
    color: #666;
    font-size: 0.875rem;
  }
`

const GeneralSimulator = () => {
  return (
    <>
      
      <Container>
        <BackLink to="/">
          <FiArrowLeft /> Retour à l'accueil
        </BackLink>

        <PageHeader>
          <Title>Simulateur de crédit intelligent</Title>
          <Subtitle>Découvrez le crédit le plus adapté à votre situation</Subtitle>
        </PageHeader>

        <ContentContainer>
          <MainContent>
            <Card>
              <CardBody>
                <SectionTitle>Trouvez le crédit idéal pour vous</SectionTitle>
                <CreditRecommender />
              </CardBody>
            </Card>
          </MainContent>

          <SideContent>
            <Card>
              <CardBody>
                <SectionTitle>Nos types de crédit</SectionTitle>
                <InfoList>
                  <InfoItem>
                    <InfoIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </InfoIcon>
                    <InfoContent>
                      <h3>SAFIDY</h3>
                      <p>Crédit à la consommation pour les salariés et fonctionnaires</p>
                    </InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      </svg>
                    </InfoIcon>
                    <InfoContent>
                      <h3>AVOTRA AINGA</h3>
                      <p>Pour les micro-entreprises (300 000 à 5 000 000 Ar)</p>
                    </InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                    </InfoIcon>
                    <InfoContent>
                      <h3>AVOTRA MIHARY</h3>
                      <p>Pour les très petites entreprises (5 000 001 à 20 000 000 Ar)</p>
                    </InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg>
                    </InfoIcon>
                    <InfoContent>
                      <h3>AVOTRA ROSO</h3>
                      <p>Pour les PME Catégorie I (20 000 001 à 50 000 000 Ar)</p>
                    </InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                      </svg>
                    </InfoIcon>
                    <InfoContent>
                      <h3>AVOTRA AMBOARA</h3>
                      <p>Pour les PME Catégorie II (Plus de 50 000 000 Ar)</p>
                    </InfoContent>
                  </InfoItem>
                </InfoList>
              </CardBody>
            </Card>
          </SideContent>
        </ContentContainer>
      </Container>
    
    </>
  )
}

export default GeneralSimulator

