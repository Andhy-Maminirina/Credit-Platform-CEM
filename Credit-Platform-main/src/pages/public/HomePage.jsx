"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"
import {
  FiArrowRight,
  FiCheck,
  FiCreditCard,
  FiBriefcase,
  FiMessageCircle,
  FiExternalLink,
  FiLink,
  FiDatabase,
  FiShield,
  FiSearch,
} from "react-icons/fi"
import Button from "../../components/ui/Button"
import ChatBot from "../../components/chat/ChatBot"

// Ajouter les styles pour les boutons de navigation en haut à droite
const NavButtons = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  gap: 1rem;
  z-index: 10;
`

const LogoContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 10;
`

const Logo = styled.img`
  height: 40px;
  width: auto;
`

const AssistantButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.9);
  color: ${(props) => props.theme.colors.primary[600]};
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

const NavButton = styled(motion.button)`
  background-color: ${(props) => (props.primary ? "white" : "transparent")};
  color: ${(props) => (props.primary ? props.theme.colors.primary[600] : "white")};
  border: ${(props) => (props.primary ? "none" : "1px solid rgba(255, 255, 255, 0.5)")};
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background-color: ${(props) => (props.primary ? "white" : "rgba(255, 255, 255, 0.1)")};
    box-shadow: ${(props) => (props.primary ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none")};
  }
`

const Container = styled.div`
  min-height: 100vh;
`

const HeroSection = styled.section`
  position: relative;
  padding: 8rem 0 6rem;
  overflow: hidden;
  background: linear-gradient(135deg, 
    ${(props) => props.theme.colors.primary[600]} 0%, 
    ${(props) => props.theme.colors.primary[500]} 100%);
  color: white;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.05);
    border-bottom-left-radius: 100px;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 64px;
    height: 64px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    margin-left: -20px;
    margin-bottom: -20px;
    z-index: 0;
  }
`

const SectionContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
`

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    align-items: flex-start;
  }
`

const HeroText = styled(motion.div)`
  flex: 1;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 3rem;
  }
`

const Badge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
`

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }

  span {
    color: rgba(255, 255, 255, 0.8);
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`

const HeroImage = styled(motion.div)`
  flex: 1;
  position: relative;

  img {
    width: 100%;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`

const FeatureCard = styled(motion.div)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const FeatureIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${(props) => props.theme.colors.primary[600]};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
`

const FeatureText = styled.div`
  h4 {
    font-weight: 600;
    color: ${(props) => props.theme.colors.gray[900]};
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.75rem;
    color: ${(props) => props.theme.colors.gray[500]};
  }
`

const ProductsSection = styled.section`
  padding: 6rem 2rem;
  background: white;
`

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.gray[900]};
`

const SectionSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  text-align: center;
  color: ${(props) => props.theme.colors.gray[600]};
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 6rem;
`

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid ${(props) => props.theme.colors.gray[200]};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`

const IconCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.primary[50]};
  color: ${(props) => props.theme.colors.primary[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`

const ProductTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.gray[900]};
`

const ProductSubtitle = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.gray[600]};
  margin-bottom: 1.5rem;
`

const FeatureList = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
`

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  color: ${(props) => props.theme.colors.gray[700]};
  font-size: 0.875rem;

  svg {
    color: ${(props) => props.theme.colors.primary[600]};
    margin-right: 0.75rem;
    margin-top: 0.25rem;
    flex-shrink: 0;
  }
`

const StepsSection = styled.div`
  text-align: center;
`

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`

const Step = styled(motion.div)`
  padding: 2rem;
`

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.primary[50]};
  color: ${(props) => props.theme.colors.primary[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin: 0 auto 1rem;
`

const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.gray[900]};
`

const StepDescription = styled.p`
  color: ${(props) => props.theme.colors.gray[600]};
  font-size: 0.875rem;
`

// Modifier le style du bouton de produit pour ajouter une animation
const ProductButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => props.theme.colors.primary[600]};
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary[700]};
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 65, 54, 0.2);
  }

  &:active {
    transform: translateY(-1px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.3);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }

  &:hover::after {
    animation: ripple 1s ease-out;
  }

  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    100% {
      transform: scale(100, 100);
      opacity: 0;
    }
  }

  svg {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`

// Nouvelle section pour les liens partenaires
const PartnersSection = styled.section`
  padding: 5rem 2rem;
  background-color: ${(props) => props.theme.colors.gray[50]};
  border-top: 1px solid ${(props) => props.theme.colors.gray[200]};
`

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
`

const PartnerCard = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid ${(props) => props.theme.colors.gray[200]};
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: ${(props) => props.theme.colors.primary[300]};
  }
`

const PartnerIconCircle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.primary[50]};
  color: ${(props) => props.theme.colors.primary[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  ${PartnerCard}:hover & {
    background: ${(props) => props.theme.colors.primary[100]};
    transform: scale(1.1);
  }
`

const PartnerTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.gray[900]};
  text-align: center;
`

const PartnerDescription = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.gray[600]};
  text-align: center;
  margin-bottom: 1rem;
`

const ExternalLinkText = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.primary[600]};
  font-weight: 500;
  margin-top: auto;
  
  svg {
    margin-left: 0.25rem;
    transition: transform 0.3s ease;
  }
  
  ${PartnerCard}:hover & svg {
    transform: translateX(4px);
  }
`

// Modifier le rendu du composant pour supprimer le Header et ajouter les boutons de navigation
const HomePage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <Container>
      <LogoContainer>
        <AssistantButton onClick={toggleChat} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <FiMessageCircle size={18} />
          Assistant Virtuel
        </AssistantButton>
      </LogoContainer>

      {isChatOpen && <ChatBot onClose={() => setIsChatOpen(false)} />}
      <NavButtons>
        <NavButton as={Link} to="/login" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Connexion
        </NavButton>
        <NavButton as={Link} to="/register" primary whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Inscription
        </NavButton>
      </NavButtons>

      <HeroSection>
        <SectionContainer>
          <HeroContent>
            <HeroText initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge>Financement simplifié</Badge>
              <HeroTitle>
                Votre crédit <span>en quelques clics</span>
              </HeroTitle>
              <HeroSubtitle>
                Découvrez nos solutions de financement personnalisées avec des taux avantageux et une approbation
                rapide.
              </HeroSubtitle>
              <ButtonGroup>
                <Button
                  as={Link}
                  to="/credit-simulation"
                  size="lg"
                  icon={<FiArrowRight />}
                  iconPosition="right"
                  className="animate-pulse"
                >
                  Simuler un crédit
                </Button>
                <Button as={Link} to="/login" variant="secondary" size="lg">
                  Espace client
                </Button>
              </ButtonGroup>
            </HeroText>

            <HeroImage
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt="Crédit en ligne"
              />
              <FeatureCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <FeatureIcon>
                  <FiCheck />
                </FeatureIcon>
                <FeatureText>
                  <h4>Approuvé en 24h</h4>
                  <p>Pour les dossiers complets</p>
                </FeatureText>
              </FeatureCard>
            </HeroImage>
          </HeroContent>
        </SectionContainer>
      </HeroSection>

      <ProductsSection>
        <SectionContent>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Plateforme de Crédit en Ligne
          </SectionTitle>

          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Découvrez nos solutions de financement adaptées à vos besoins personnels et professionnels
          </SectionSubtitle>

          <ProductsGrid>
            <ProductCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <IconCircle>
                <FiCreditCard size={24} />
              </IconCircle>
              <ProductTitle>Crédit SAFIDY</ProductTitle>
              <ProductSubtitle>Pour les salariés et fonctionnaires</ProductSubtitle>
              <FeatureList>
                <FeatureItem>
                  <FiCheck /> Crédit à la consommation jusqu'à 24 mois
                </FeatureItem>
                <FeatureItem>
                  <FiCheck /> Taux d'intérêt avantageux de 1,85%
                </FeatureItem>
                <FeatureItem>
                  <FiCheck /> Montant adapté à votre capacité de remboursement
                </FeatureItem>
              </FeatureList>
              <ProductButton to="/credit-type/safidy">
                SAFIDY <FiArrowRight />
              </ProductButton>
            </ProductCard>

            <ProductCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <IconCircle>
                <FiBriefcase size={24} />
              </IconCircle>
              <ProductTitle>Crédits AVOTRA</ProductTitle>
              <ProductSubtitle>Pour les entrepreneurs et entreprises</ProductSubtitle>
              <FeatureList>
                <FeatureItem>
                  <FiCheck /> Solutions adaptées à la taille de votre entreprise
                </FeatureItem>
                <FeatureItem>
                  <FiCheck /> Financement de fonds de roulement ou d'investissement
                </FeatureItem>
                <FeatureItem>
                  <FiCheck /> Montants de 300 000 Ar à plus de 50 000 000 Ar
                </FeatureItem>
              </FeatureList>
              <ProductButton to="/credit-type/avotra">
                AVOTRA <FiArrowRight />
              </ProductButton>
            </ProductCard>
          </ProductsGrid>

          <StepsSection>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Comment ça marche ?
            </SectionTitle>

            <StepsGrid>
              <Step
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <StepNumber>1</StepNumber>
                <StepTitle>Choisissez votre crédit</StepTitle>
                <StepDescription>Sélectionnez le type de crédit qui correspond à vos besoins</StepDescription>
              </Step>

              <Step
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <StepNumber>2</StepNumber>
                <StepTitle>Complétez votre dossier</StepTitle>
                <StepDescription>Remplissez le formulaire et téléchargez les documents nécessaires</StepDescription>
              </Step>

              <Step
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <StepNumber>3</StepNumber>
                <StepTitle>Obtenez une réponse rapide</StepTitle>
                <StepDescription>Suivez l'avancement de votre demande en temps réel</StepDescription>
              </Step>
            </StepsGrid>
          </StepsSection>
        </SectionContent>
      </ProductsSection>

      {/* Nouvelle section pour les liens partenaires */}
      <PartnersSection>
        <SectionContent>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Nos Partenaires
          </SectionTitle>

          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Accédez aux services de nos partenaires pour faciliter vos démarches
          </SectionSubtitle>

          <PartnersGrid>
            <PartnerCard
              href="http://192.168.1.15:8080/ords/r/wsptatitra/suivi-de-cr%C3%A9dit/login?session=12555045402700"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <PartnerIconCircle>
                <FiDatabase size={24} />
              </PartnerIconCircle>
              <PartnerTitle>BI</PartnerTitle>
              <PartnerDescription>
                Accédez au système de suivi de crédit pour consulter vos informations
              </PartnerDescription>
              <ExternalLinkText>
                Accéder au service <FiExternalLink size={16} />
              </ExternalLinkText>
            </PartnerCard>

            <PartnerCard
              href="https://nyvolako.mg/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <PartnerIconCircle>
                <FiLink size={24} />
              </PartnerIconCircle>
              <PartnerTitle>NY VOLAKO</PartnerTitle>
              <PartnerDescription>Plateforme de services financiers et d'information</PartnerDescription>
              <ExternalLinkText>
                Visiter le site <FiExternalLink size={16} />
              </ExternalLinkText>
            </PartnerCard>

            <PartnerCard
              href="https://web.bicmadagascar.crif.com/Account/Login?ReturnUrl=%2f"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <PartnerIconCircle>
                <FiSearch size={24} />
              </PartnerIconCircle>
              <PartnerTitle>BIC Madagascar</PartnerTitle>
              <PartnerDescription>Bureau d'Information sur le Crédit pour vérifier votre historique</PartnerDescription>
              <ExternalLinkText>
                Consulter <FiExternalLink size={16} />
              </ExternalLinkText>
            </PartnerCard>

            <PartnerCard
              href="https://cdr.bfm.mg/CRMWeb/page/authentification.html"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <PartnerIconCircle>
                <FiDatabase size={24} />
              </PartnerIconCircle>
              <PartnerTitle>CDR</PartnerTitle>
              <PartnerDescription>Central Des Risques - Base de données nationale sur les crédits</PartnerDescription>
              <ExternalLinkText>
                Accéder au service <FiExternalLink size={16} />
              </ExternalLinkText>
            </PartnerCard>

            <PartnerCard
              href="#"
              onClick={(e) => {
                e.preventDefault()
                alert("Application KYC CGB en cours de développement")
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <PartnerIconCircle>
                <FiShield size={24} />
              </PartnerIconCircle>
              <PartnerTitle>KYC CGB</PartnerTitle>
              <PartnerDescription>
                Application de vérification d'identité (en cours de développement)
              </PartnerDescription>
              <ExternalLinkText>
                Bientôt disponible <FiExternalLink size={16} />
              </ExternalLinkText>
            </PartnerCard>
          </PartnersGrid>
        </SectionContent>
      </PartnersSection>
    </Container>
  )
}

export default HomePage
