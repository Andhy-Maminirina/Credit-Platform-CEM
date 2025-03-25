"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import styled from "styled-components"
import { theme } from "../../styles/theme"
import {
  FiArrowLeft,
  FiCreditCard,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiCheck,
  FiX,
  FiFileText,
  FiDownload,
  FiMessageSquare,
} from "react-icons/fi"

const DetailsContainer = styled.div`
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

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${theme.colors.primary[600]};
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
  
  .back-icon {
    margin-right: 0.5rem;
  }
`

const DetailsCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 2rem;
`

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .header-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
  }
  
  .header-status {
    display: inline-flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    
    &.pending {
      background-color: #FEF3C7;
      color: #D97706;
    }
    
    &.approved {
      background-color: #D1FAE5;
      color: #059669;
    }
    
    &.rejected {
      background-color: #FEE2E2;
      color: #DC2626;
    }
    
    .status-icon {
      margin-right: 0.5rem;
    }
  }
`

const CardBody = styled.div`
  padding: 1.5rem;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const InfoItem = styled.div`
  .info-label {
    font-size: 0.875rem;
    color: #6B7280;
    margin-bottom: 0.5rem;
  }
  
  .info-value {
    font-size: 1rem;
    font-weight: 500;
    color: #111827;
    display: flex;
    align-items: center;
    
    .info-icon {
      color: #9CA3AF;
      margin-right: 0.5rem;
    }
  }
`

const TimelineSection = styled.div`
  margin-bottom: 2rem;
  
  .section-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 1rem;
  }
`

const Timeline = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 16px;
    width: 2px;
    background-color: #E5E7EB;
  }
`

const TimelineItem = styled.div`
  position: relative;
  padding-left: 2.5rem;
  padding-bottom: 1.5rem;
  
  &:last-child {
    padding-bottom: 0;
  }
  
  .timeline-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: white;
    border: 2px solid #E5E7EB;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    
    &.completed {
      background-color: ${theme.colors.primary[600]};
      border-color: ${theme.colors.primary[600]};
      color: white;
    }
    
    &.current {
      background-color: #FEF3C7;
      border-color: #D97706;
      color: #D97706;
    }
    
    &.rejected {
      background-color: #FEE2E2;
      border-color: #DC2626;
      color: #DC2626;
    }
  }
  
  .timeline-content {
    .timeline-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: #111827;
      margin-bottom: 0.25rem;
    }
    
    .timeline-date {
      font-size: 0.75rem;
      color: #6B7280;
      margin-bottom: 0.5rem;
    }
    
    .timeline-description {
      font-size: 0.875rem;
      color: #4B5563;
    }
  }
`

const DocumentsSection = styled.div`
  margin-bottom: 2rem;
  
  .section-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 1rem;
  }
`

const DocumentsList = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const DocumentItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${theme.colors.primary[300]};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .document-icon {
    width: 40px;
    height: 40px;
    border-radius: 0.5rem;
    background-color: ${theme.colors.primary[50]};
    color: ${theme.colors.primary[600]};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
  }
  
  .document-info {
    flex: 1;
    
    .document-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: #111827;
      margin-bottom: 0.25rem;
    }
    
    .document-size {
      font-size: 0.75rem;
      color: #6B7280;
    }
  }
  
  .document-download {
    color: ${theme.colors.primary[600]};
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      color: ${theme.colors.primary[700]};
    }
  }
`

const ActionsSection = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  .action-button {
    display: inline-flex;
    align-items: center;
    padding: 0.625rem 1.25rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;
    cursor: pointer;
    text-decoration: none;
    
    &.primary {
      background-color: ${theme.colors.primary[600]};
      color: white;
      
      &:hover {
        background-color: ${theme.colors.primary[700]};
      }
    }
    
    &.secondary {
      background-color: white;
      color: ${theme.colors.primary[600]};
      border: 1px solid ${theme.colors.primary[300]};
      
      &:hover {
        background-color: ${theme.colors.primary[50]};
      }
    }
    
    .button-icon {
      margin-right: 0.5rem;
    }
  }
`

const CreditDetails = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [creditRequest, setCreditRequest] = useState(null)

  // Données fictives pour la demande de crédit
  useEffect(() => {
    // Simuler un appel API
    setTimeout(() => {
      setCreditRequest({
        id: id,
        reference: `CR-2023-${id.split("-").pop()}`,
        creditType: "SAFIDY",
        amount: 5000000,
        duration: 36,
        interestRate: 12.5,
        monthlyPayment: 166667,
        createdAt: "2023-03-15T10:30:00",
        status: "pending",
        timeline: [
          {
            id: 1,
            title: "Demande soumise",
            date: "2023-03-15T10:30:00",
            description: "Votre demande a été soumise avec succès.",
            status: "completed",
          },
          {
            id: 2,
            title: "Vérification des documents",
            date: "2023-03-16T14:45:00",
            description: "Vos documents sont en cours de vérification par notre équipe.",
            status: "current",
          },
          {
            id: 3,
            title: "Analyse de crédit",
            date: null,
            description: "Votre demande sera analysée par notre comité de crédit.",
            status: "pending",
          },
          {
            id: 4,
            title: "Décision finale",
            date: null,
            description: "Une décision finale sera prise concernant votre demande.",
            status: "pending",
          },
          {
            id: 5,
            title: "Déblocage des fonds",
            date: null,
            description: "Si approuvée, les fonds seront débloqués sur votre compte.",
            status: "pending",
          },
        ],
        documents: [
          {
            id: 1,
            name: "Pièce d'identité",
            size: "1.2 MB",
            type: "pdf",
          },
          {
            id: 2,
            name: "Justificatif de domicile",
            size: "0.8 MB",
            type: "pdf",
          },
          {
            id: 3,
            name: "Bulletin de salaire",
            size: "1.5 MB",
            type: "pdf",
          },
          {
            id: 4,
            name: "Relevé bancaire",
            size: "2.3 MB",
            type: "pdf",
          },
        ],
      })
      setLoading(false)
    }, 1500)
  }, [id])

  // Récupère l'icône correspondant au statut
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiClock size={16} />
      case "approved":
        return <FiCheck size={16} />
      case "rejected":
        return <FiX size={16} />
      default:
        return <FiClock size={16} />
    }
  }

  // Récupère le texte correspondant au statut
  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "En attente"
      case "approved":
        return "Approuvée"
      case "rejected":
        return "Refusée"
      default:
        return "Inconnue"
    }
  }

  // Récupère la classe CSS correspondant au statut
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "pending"
      case "approved":
        return "approved"
      case "rejected":
        return "rejected"
      default:
        return ""
    }
  }

  // Récupère l'icône correspondant au statut de l'étape
  const getTimelineIcon = (status) => {
    switch (status) {
      case "completed":
        return <FiCheck size={16} />
      case "current":
        return <FiClock size={16} />
      case "rejected":
        return <FiX size={16} />
      default:
        return <FiClock size={16} />
    }
  }

  // Afficher un indicateur de chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <DetailsContainer>
      <BackLink to="/client/credit-status">
        <FiArrowLeft className="back-icon" size={16} />
        Retour aux demandes
      </BackLink>

      <DetailsCard>
        <CardHeader>
          <div className="header-title">Demande #{creditRequest.reference}</div>
          <div className={`header-status ${getStatusClass(creditRequest.status)}`}>
            {getStatusIcon(creditRequest.status)}
            <span className="ml-1">{getStatusText(creditRequest.status)}</span>
          </div>
        </CardHeader>

        <CardBody>
          <InfoGrid>
            <InfoItem>
              <div className="info-label">Type de crédit</div>
              <div className="info-value">
                <FiCreditCard className="info-icon" size={16} />
                {creditRequest.creditType}
              </div>
            </InfoItem>

            <InfoItem>
              <div className="info-label">Montant</div>
              <div className="info-value">
                <FiDollarSign className="info-icon" size={16} />
                {new Intl.NumberFormat("fr-MG", { style: "currency", currency: "MGA" })
                  .format(creditRequest.amount)
                  .replace("MGA", "Ar")}
              </div>
            </InfoItem>

            <InfoItem>
              <div className="info-label">Date de demande</div>
              <div className="info-value">
                <FiCalendar className="info-icon" size={16} />
                {new Date(creditRequest.createdAt).toLocaleDateString("fr-FR")}
              </div>
            </InfoItem>

            <InfoItem>
              <div className="info-label">Durée</div>
              <div className="info-value">
                <FiClock className="info-icon" size={16} />
                {creditRequest.duration} mois
              </div>
            </InfoItem>

            <InfoItem>
              <div className="info-label">Taux d'intérêt</div>
              <div className="info-value">
                <FiDollarSign className="info-icon" size={16} />
                {creditRequest.interestRate}% par an
              </div>
            </InfoItem>

            <InfoItem>
              <div className="info-label">Mensualité estimée</div>
              <div className="info-value">
                <FiDollarSign className="info-icon" size={16} />
                {new Intl.NumberFormat("fr-MG", { style: "currency", currency: "MGA" })
                  .format(creditRequest.monthlyPayment)
                  .replace("MGA", "Ar")}
              </div>
            </InfoItem>
          </InfoGrid>

          <p>Nous proposons plusieurs types de crédits adaptés à différents besoins :</p>
          <ul>
            <li>
              <strong>SAFIDY</strong> : Crédit à la consommation pour financer vos projets personnels
            </li>
            <li>
              <strong>AVOTRA AINGA</strong> : Crédit immobilier pour l'achat ou la construction de votre logement
            </li>
            <li>
              <strong>AVOTRA ROSO</strong> : Crédit d'investissement pour développer votre patrimoine
            </li>
            <li>
              <strong>AVOTRA MIHARY</strong> : Crédit professionnel pour développer votre activité
            </li>
            <li>
              <strong>AVOTRA AMBOARA</strong> : Crédit agricole pour soutenir les activités agricoles
            </li>
          </ul>

          <TimelineSection>
            <div className="section-title">Suivi de votre demande</div>
            <Timeline>
              {creditRequest.timeline.map((step) => (
                <TimelineItem key={step.id}>
                  <div className={`timeline-icon ${step.status}`}>{getTimelineIcon(step.status)}</div>
                  <div className="timeline-content">
                    <div className="timeline-title">{step.title}</div>
                    {step.date && (
                      <div className="timeline-date">
                        {new Date(step.date).toLocaleDateString("fr-FR")} à{" "}
                        {new Date(step.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    )}
                    <div className="timeline-description">{step.description}</div>
                  </div>
                </TimelineItem>
              ))}
            </Timeline>
          </TimelineSection>

          <DocumentsSection>
            <div className="section-title">Documents fournis</div>
            <DocumentsList>
              {creditRequest.documents.map((document) => (
                <DocumentItem key={document.id}>
                  <div className="document-icon">
                    <FiFileText size={20} />
                  </div>
                  <div className="document-info">
                    <div className="document-name">{document.name}</div>
                    <div className="document-size">{document.size}</div>
                  </div>
                  <div className="document-download">
                    <FiDownload size={20} />
                  </div>
                </DocumentItem>
              ))}
            </DocumentsList>
          </DocumentsSection>

          <ActionsSection>
            <Link to={`/client/chat?request=${creditRequest.id}`} className="action-button primary">
              <FiMessageSquare className="button-icon" size={16} />
              Discuter avec un conseiller
            </Link>
            <button className="action-button secondary">
              <FiDownload className="button-icon" size={16} />
              Télécharger le récapitulatif
            </button>
          </ActionsSection>
        </CardBody>
      </DetailsCard>
    </DetailsContainer>
  )
}

export default CreditDetails

