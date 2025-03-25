"use client"

import { useState } from "react"
import styled from "styled-components"
import { theme } from "../../styles/theme"
import {
  FiHelpCircle,
  FiCreditCard,
  FiUser,
  FiShield,
  FiFileText,
  FiMessageSquare,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi"

const HelpContainer = styled.div`
  animation: fadeIn 0.5s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const PageHeader = styled.div`
  margin-bottom: 2rem;
  
  .page-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.5rem;
  }
  
  .page-description {
    font-size: 1rem;
    color: #6B7280;
  }
`

const SearchSection = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  text-align: center;
  
  .search-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.5rem;
  }
  
  .search-description {
    font-size: 0.875rem;
    color: #6B7280;
    margin-bottom: 1.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .search-form {
    max-width: 600px;
    margin: 0 auto;
    position: relative;
    
    .search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 3rem;
      border: 1px solid #D1D5DB;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: all 0.2s ease;
      
      &:focus {
        outline: none;
        border-color: ${theme.colors.primary[400]};
        box-shadow: 0 0 0 2px ${theme.colors.primary[100]};
      }
    }
    
    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #9CA3AF;
    }
  }
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 3fr 1fr;
  }
`

const FaqSection = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  
  .section-header {
    padding: 1.5rem;
    border-bottom: 1px solid #E5E7EB;
    
    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
    }
  }
  
  .section-body {
    padding: 1.5rem;
  }
  
  .faq-categories {
    display: flex;
    overflow-x: auto;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    
    &::-webkit-scrollbar {
      height: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: #F3F4F6;
      border-radius: 2px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #D1D5DB;
      border-radius: 2px;
    }
    
    .category-button {
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
      transition: all 0.2s ease;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      
      &.active {
        background-color: ${theme.colors.primary[600]};
        color: white;
      }
      
      &:not(.active) {
        background-color: #F3F4F6;
        color: #4B5563;
        
        &:hover {
          background-color: #E5E7EB;
          color: #111827;
        }
      }
      
      .category-icon {
        margin-right: 0.5rem;
      }
    }
  }
`

const AccordionItem = styled.div`
  border-bottom: 1px solid #E5E7EB;
  
  &:last-child {
    border-bottom: none;
  }
  
  .accordion-header {
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    
    .accordion-title {
      font-size: 1rem;
      font-weight: 500;
      color: #111827;
    }
    
    .accordion-icon {
      color: #6B7280;
      transition: transform 0.2s ease;
      
      &.open {
        transform: rotate(180deg);
        color: ${theme.colors.primary[600]};
      }
    }
  }
  
  .accordion-content {
    padding-bottom: 1rem;
    font-size: 0.875rem;
    color: #4B5563;
    line-height: 1.5;
    
    p {
      margin-bottom: 0.75rem;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    ul {
      list-style-type: disc;
      padding-left: 1.5rem;
      margin-bottom: 0.75rem;
      
      li {
        margin-bottom: 0.25rem;
      }
    }
  }
`

const ContactSection = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  
  .section-header {
    padding: 1.5rem;
    border-bottom: 1px solid #E5E7EB;
    
    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
    }
  }
  
  .section-body {
    padding: 1.5rem;
  }
  
  .contact-methods {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .contact-method {
    display: flex;
    align-items: flex-start;
    
    .method-icon {
      width: 40px;
      height: 40px;
      border-radius: 0.5rem;
      background-color: ${theme.colors.primary[50]};
      color: ${theme.colors.primary[600]};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      flex-shrink: 0;
    }
    
    .method-content {
      .method-title {
        font-size: 0.875rem;
        font-weight: 500;
        color: #111827;
        margin-bottom: 0.25rem;
      }
      
      .method-value {
        font-size: 0.875rem;
        color: #4B5563;
      }
    }
  }
  
  .contact-hours {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #E5E7EB;
    
    .hours-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: #111827;
      margin-bottom: 0.5rem;
    }
    
    .hours-list {
      font-size: 0.875rem;
      color: #4B5563;
      
      .hours-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.25rem;
      }
    }
  }
`

const PopularTopics = styled.div`
  margin-top: 1.5rem;
  
  .topics-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: #111827;
    margin-bottom: 0.75rem;
  }
  
  .topics-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    .topic-link {
      font-size: 0.875rem;
      color: ${theme.colors.primary[600]};
      text-decoration: none;
      display: flex;
      align-items: center;
      
      &:hover {
        text-decoration: underline;
      }
      
      .topic-icon {
        margin-right: 0.5rem;
      }
    }
  }
`

const Help = () => {
  const [activeCategory, setActiveCategory] = useState("general")
  const [openAccordion, setOpenAccordion] = useState(null)

  // Catégories de FAQ
  const categories = [
    { id: "general", name: "Général", icon: <FiHelpCircle size={16} /> },
    { id: "credit", name: "Crédits", icon: <FiCreditCard size={16} /> },
    { id: "account", name: "Compte", icon: <FiUser size={16} /> },
    { id: "security", name: "Sécurité", icon: <FiShield size={16} /> },
    { id: "documents", name: "Documents", icon: <FiFileText size={16} /> },
  ]

  // Questions fréquentes par catégorie
  const faqItems = {
    general: [
      {
        id: "general-1",
        question: "Qu'est-ce que la Caisse d'Épargne de Madagascar ?",
        answer: (
          <>
            <p>
              La Caisse d'Épargne de Madagascar (CEM) est une institution financière spécialisée dans l'offre de
              services bancaires et de crédits adaptés aux besoins des particuliers et des professionnels à Madagascar.
            </p>
            <p>
              Fondée avec pour mission de favoriser l'inclusion financière, la CEM propose des solutions d'épargne
              sécurisées et des offres de crédit accessibles pour soutenir les projets personnels et professionnels.
            </p>
          </>
        ),
      },
      {
        id: "general-2",
        question: "Comment puis-je contacter le service client ?",
        answer: (
          <>
            <p>Vous pouvez contacter notre service client de plusieurs façons :</p>
            <ul>
              <li>Par téléphone au +261 20 22 XXX XX du lundi au vendredi de 8h à 16h</li>
              <li>Par email à contact@cem.mg</li>
              <li>Via le formulaire de contact sur notre site web</li>
              <li>En vous rendant dans l'une de nos agences</li>
            </ul>
          </>
        ),
      },
      {
        id: "general-3",
        question: "Quels sont les horaires d'ouverture des agences ?",
        answer: (
          <p>
            Nos agences sont ouvertes du lundi au vendredi de 8h à 16h et le samedi de 9h à 12h. Veuillez noter que
            certaines agences peuvent avoir des horaires spécifiques, nous vous invitons à consulter la page de l'agence
            concernée pour plus de détails.
          </p>
        ),
      },
    ],
    credit: [
      {
        id: "credit-1",
        question: "Quels types de crédits proposez-vous ?",
        answer: (
          <>
            <p>Nous proposons plusieurs types de crédits adaptés à différents besoins :</p>
            <ul>
              <li>
                <strong>SAFIDY</strong> : Crédit à la consommation pour financer vos projets personnels
              </li>
              <li>
                <strong>AVOTRA AINGA</strong> : Crédit immobilier pour l'achat ou la construction de votre logement
              </li>
              <li>
                <strong>AVOTRA MIHARY</strong> : Crédit professionnel pour développer votre activité
              </li>
              <li>
                <strong>AVOTRA AMBOARA</strong> : Crédit agricole pour soutenir les activités agricoles
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "credit-2",
        question: "Comment faire une demande de crédit ?",
        answer: (
          <>
            <p>Pour faire une demande de crédit, vous pouvez :</p>
            <ul>
              <li>Utiliser notre plateforme en ligne en vous connectant à votre espace client</li>
              <li>Vous rendre dans l'une de nos agences avec les documents nécessaires</li>
              <li>Contacter un conseiller par téléphone qui vous guidera dans vos démarches</li>
            </ul>
            <p>Assurez-vous d'avoir tous les documents requis pour accélérer le traitement de votre demande.</p>
          </>
        ),
      },
      {
        id: "credit-3",
        question: "Quels sont les documents nécessaires pour une demande de crédit ?",
        answer: (
          <>
            <p>Les documents généralement requis pour une demande de crédit sont :</p>
            <ul>
              <li>Pièce d'identité en cours de validité</li>
              <li>Justificatif de domicile de moins de 3 mois</li>
              <li>Les 3 derniers bulletins de salaire ou justificatifs de revenus</li>
              <li>Relevés bancaires des 3 derniers mois</li>
              <li>Selon le type de crédit, des documents spécifiques peuvent être demandés</li>
            </ul>
          </>
        ),
      },
    ],
    account: [
      {
        id: "account-1",
        question: "Comment créer un compte sur la plateforme ?",
        answer: (
          <p>
            Pour créer un compte sur notre plateforme, cliquez sur "S'inscrire" en haut à droite de la page d'accueil.
            Remplissez le formulaire avec vos informations personnelles, créez un mot de passe sécurisé, puis validez
            votre inscription en cliquant sur le lien envoyé à votre adresse email.
          </p>
        ),
      },
      {
        id: "account-2",
        question: "J'ai oublié mon mot de passe, que faire ?",
        answer: (
          <p>
            Si vous avez oublié votre mot de passe, cliquez sur "Mot de passe oublié" sur la page de connexion.
            Saisissez votre adresse email, puis suivez les instructions envoyées pour réinitialiser votre mot de passe.
            Assurez-vous de créer un nouveau mot de passe sécurisé.
          </p>
        ),
      },
    ],
    security: [
      {
        id: "security-1",
        question: "Comment sécuriser mon compte ?",
        answer: (
          <>
            <p>Pour sécuriser votre compte, nous vous recommandons de :</p>
            <ul>
              <li>Utiliser un mot de passe fort et unique</li>
              <li>Activer l'authentification à deux facteurs</li>
              <li>Ne jamais partager vos identifiants</li>
              <li>Vérifier régulièrement vos transactions</li>
              <li>Vous déconnecter après chaque session</li>
            </ul>
          </>
        ),
      },
      {
        id: "security-2",
        question: "Que faire en cas de suspicion de fraude ?",
        answer: (
          <p>
            Si vous suspectez une activité frauduleuse sur votre compte, contactez immédiatement notre service client au
            +261 20 22 XXX XX. Nous vous conseillons également de changer votre mot de passe et de vérifier vos
            dernières transactions.
          </p>
        ),
      },
    ],
    documents: [
      {
        id: "documents-1",
        question: "Comment télécharger mes relevés de compte ?",
        answer: (
          <p>
            Pour télécharger vos relevés de compte, connectez-vous à votre espace client, accédez à la section
            "Documents", puis sélectionnez "Relevés de compte". Vous pourrez alors choisir la période souhaitée et
            télécharger vos relevés au format PDF.
          </p>
        ),
      },
      {
        id: "documents-2",
        question: "Où trouver mes contrats de crédit ?",
        answer: (
          <p>
            Vos contrats de crédit sont disponibles dans votre espace client, dans la section "Documents"  "Contrats".
            Vous pouvez les consulter en ligne ou les télécharger au format PDF pour les conserver.
          </p>
        ),
      },
    ],
  }

  // Gère l'ouverture/fermeture des accordéons
  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  return (
    <HelpContainer>
      <PageHeader>
        <h1 className="page-title">Centre d'aide</h1>
        <p className="page-description">Trouvez des réponses à vos questions et obtenez de l'aide</p>
      </PageHeader>

      <SearchSection>
        <div className="search-title">Comment pouvons-nous vous aider ?</div>
        <div className="search-description">
          Recherchez des informations dans notre base de connaissances ou parcourez les catégories ci-dessous pour
          trouver des réponses à vos questions.
        </div>
        <div className="search-form">
          <input type="text" className="search-input" placeholder="Rechercher une question ou un sujet..." />
          <FiSearch className="search-icon" size={20} />
        </div>
      </SearchSection>

      <ContentGrid>
        <FaqSection>
          <div className="section-header">
            <div className="section-title">Questions fréquemment posées</div>
          </div>
          <div className="section-body">
            <div className="faq-categories">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-button ${activeCategory === category.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            <div className="faq-items">
              {faqItems[activeCategory].map((item) => (
                <AccordionItem key={item.id}>
                  <div className="accordion-header" onClick={() => toggleAccordion(item.id)}>
                    <div className="accordion-title">{item.question}</div>
                    <div className={`accordion-icon ${openAccordion === item.id ? "open" : ""}`}>
                      {openAccordion === item.id ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                    </div>
                  </div>
                  {openAccordion === item.id && <div className="accordion-content">{item.answer}</div>}
                </AccordionItem>
              ))}
            </div>
          </div>
        </FaqSection>

        <div>
          <ContactSection>
            <div className="section-header">
              <div className="section-title">Nous contacter</div>
            </div>
            <div className="section-body">
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <FiPhone size={20} />
                  </div>
                  <div className="method-content">
                    <div className="method-title">Téléphone</div>
                    <div className="method-value">+261 20 22 XXX XX</div>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <FiMail size={20} />
                  </div>
                  <div className="method-content">
                    <div className="method-title">Email</div>
                    <div className="method-value">contact@cem.mg</div>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <FiMapPin size={20} />
                  </div>
                  <div className="method-content">
                    <div className="method-title">Siège social</div>
                    <div className="method-value">
                      123 Avenue de l'Indépendance
                      <br />
                      Antananarivo 101, Madagascar
                    </div>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <FiMessageSquare size={20} />
                  </div>
                  <div className="method-content">
                    <div className="method-title">Chat en ligne</div>
                    <div className="method-value">Discutez avec un conseiller en temps réel</div>
                  </div>
                </div>
              </div>

              <div className="contact-hours">
                <div className="hours-title">Heures d'ouverture</div>
                <div className="hours-list">
                  <div className="hours-item">
                    <span>Lundi - Vendredi</span>
                    <span>8h00 - 16h00</span>
                  </div>
                  <div className="hours-item">
                    <span>Samedi</span>
                    <span>9h00 - 12h00</span>
                  </div>
                  <div className="hours-item">
                    <span>Dimanche</span>
                    <span>Fermé</span>
                  </div>
                </div>
              </div>
            </div>
          </ContactSection>

          <PopularTopics>
            <div className="topics-title">Sujets populaires</div>
            <div className="topics-list">
              <a href="#" className="topic-link">
                <FiCreditCard className="topic-icon" size={14} />
                Comment calculer mes mensualités de crédit
              </a>
              <a href="#" className="topic-link">
                <FiFileText className="topic-icon" size={14} />
                Documents nécessaires pour un crédit immobilier
              </a>
              <a href="#" className="topic-link">
                <FiShield className="topic-icon" size={14} />
                Protéger son compte contre les fraudes
              </a>
              <a href="#" className="topic-link">
                <FiUser className="topic-icon" size={14} />
                Mettre à jour mes informations personnelles
              </a>
            </div>
          </PopularTopics>
        </div>
      </ContentGrid>
    </HelpContainer>
  )
}

export default Help

