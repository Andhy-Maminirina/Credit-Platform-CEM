"use client"

import { useState } from "react"
import styled from "styled-components"
import { useParams, Link } from "react-router-dom"
import {
  FileText,
  ArrowLeft,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  Download,
  Send,
  Paperclip,
} from "lucide-react"

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
`

const BackLink = styled(Link)`
  grid-column: span 12;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: #e53e3e;
  }
`

const BackIcon = styled.span`
  display: flex;
  align-items: center;
`

const MainCard = styled.div`
  grid-column: span 8;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-column: span 12;
  }
`

const SideCard = styled.div`
  grid-column: span 4;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-column: span 12;
  }
`

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
`

const TitleIcon = styled.span`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  color: #e53e3e;
`

const RequestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

const RequestTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
`

const RequestId = styled.div`
  font-size: 0.875rem;
  color: #718096;
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${({ status }) => {
    switch (status) {
      case "approved":
        return `
          background-color: #c6f6d5;
          color: #22543d;
        `
      case "rejected":
        return `
          background-color: #fed7d7;
          color: #822727;
        `
      case "pending":
        return `
          background-color: #feebc8;
          color: #744210;
        `
      case "processing":
        return `
          background-color: #bee3f8;
          color: #2a4365;
        `
      default:
        return `
          background-color: #e2e8f0;
          color: #4a5568;
        `
    }
  }}
`

const InfoSection = styled.div`
  margin-bottom: 1.5rem;
`

const InfoTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const InfoLabel = styled.div`
  font-size: 0.75rem;
  color: #718096;
`

const InfoValue = styled.div`
  font-size: 0.875rem;
  color: #2d3748;
  font-weight: 500;
`

const DocumentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const DocumentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #f7fafc;
  border-radius: 0.375rem;
`

const DocumentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const DocumentIcon = styled.span`
  display: flex;
  align-items: center;
  color: #e53e3e;
`

const DocumentName = styled.div`
  font-size: 0.875rem;
  color: #2d3748;
`

const DocumentAction = styled.button`
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #c53030;
  }
`

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const TimelineItem = styled.div`
  display: flex;
  gap: 1rem;
`

const TimelineIcon = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  ${({ type }) => {
    switch (type) {
      case "created":
        return `
          background-color: #fff5f5;
          color: #e53e3e;
        `
      case "updated":
        return `
          background-color: #e6fffa;
          color: #319795;
        `
      case "approved":
        return `
          background-color: #f0fff4;
          color: #38a169;
        `
      case "rejected":
        return `
          background-color: #fff5f5;
          color: #e53e3e;
        `
      default:
        return `
          background-color: #f7fafc;
          color: #4a5568;
        `
    }
  }}
`

const TimelineContent = styled.div`
  flex: 1;
`

const TimelineTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 0.25rem;
`

const TimelineDescription = styled.div`
  font-size: 0.75rem;
  color: #718096;
`

const TimelineDate = styled.div`
  font-size: 0.75rem;
  color: #a0aec0;
  margin-top: 0.25rem;
`

const ActionSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
`

const ActionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ variant }) => {
    switch (variant) {
      case "approve":
        return `
          background-color: #38a169;
          color: white;
          border: none;
          
          &:hover {
            background-color: #2f855a;
          }
        `
      case "reject":
        return `
          background-color: #e53e3e;
          color: white;
          border: none;
          
          &:hover {
            background-color: #c53030;
          }
        `
      case "message":
        return `
          background-color: #e53e3e;
          color: white;
          border: none;
          
          &:hover {
            background-color: #c53030;
          }
        `
      default:
        return `
          background-color: #edf2f7;
          color: #4a5568;
          border: 1px solid #e2e8f0;
          
          &:hover {
            background-color: #e2e8f0;
          }
        `
    }
  }}
`

const CommentSection = styled.div`
  margin-top: 1.5rem;
`

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const CommentInput = styled.textarea`
  padding: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  font-size: 0.875rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.3);
  }
`

const CommentActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AttachButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #4a5568;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    color: #e53e3e;
  }
`

const SendButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #c53030;
  }
`

const CreditRequestDetail = () => {
  const { id } = useParams()
  const [status, setStatus] = useState("pending")
  const [comment, setComment] = useState("")

  const getStatusLabel = (status) => {
    switch (status) {
      case "approved":
        return "Approuvé"
      case "rejected":
        return "Refusé"
      case "pending":
        return "En attente"
      case "processing":
        return "En traitement"
      default:
        return status
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={14} />
      case "rejected":
        return <XCircle size={14} />
      case "pending":
        return <Clock size={14} />
      case "processing":
        return <AlertCircle size={14} />
      default:
        return null
    }
  }

  const handleApprove = () => {
    setStatus("approved")
  }

  const handleReject = () => {
    setStatus("rejected")
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    console.log("Comment submitted:", comment)
    setComment("")
  }

  return (
    <Container>
      <BackLink to="/admin/advisor/credit-requests">
        <BackIcon>
          <ArrowLeft size={16} />
        </BackIcon>
        Retour aux demandes
      </BackLink>

      <MainCard>
        <RequestHeader>
          <div>
            <RequestTitle>Demande de crédit SAFIDY</RequestTitle>
            <RequestId>ID: {id || "CR-2023-001"}</RequestId>
          </div>
          <StatusBadge status={status}>
            {getStatusIcon(status)} {getStatusLabel(status)}
          </StatusBadge>
        </RequestHeader>

        <InfoSection>
          <InfoTitle>Informations du client</InfoTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Nom complet</InfoLabel>
              <InfoValue>Jean Dupont</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>jean.dupont@example.com</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Téléphone</InfoLabel>
              <InfoValue>+261 34 12 34 567</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Adresse</InfoLabel>
              <InfoValue>123 Rue Principale, Antananarivo</InfoValue>
            </InfoItem>
          </InfoGrid>
        </InfoSection>

        <InfoSection>
          <InfoTitle>Détails de la demande</InfoTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Type de crédit</InfoLabel>
              <InfoValue>SAFIDY</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Montant demandé</InfoLabel>
              <InfoValue>5 000 000 Ar</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Durée</InfoLabel>
              <InfoValue>24 mois</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Taux d'intérêt</InfoLabel>
              <InfoValue>1,85% par mois</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Mensualité estimée</InfoLabel>
              <InfoValue>242 500 Ar</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Date de demande</InfoLabel>
              <InfoValue>21 mars 2023</InfoValue>
            </InfoItem>
          </InfoGrid>
        </InfoSection>

        <InfoSection>
          <InfoTitle>Documents fournis</InfoTitle>
          <DocumentList>
            <DocumentItem>
              <DocumentInfo>
                <DocumentIcon>
                  <FileText size={16} />
                </DocumentIcon>
                <DocumentName>Carte d'identité nationale.pdf</DocumentName>
              </DocumentInfo>
              <DocumentAction title="Télécharger">
                <Download size={16} />
              </DocumentAction>
            </DocumentItem>
            <DocumentItem>
              <DocumentInfo>
                <DocumentIcon>
                  <FileText size={16} />
                </DocumentIcon>
                <DocumentName>Bulletin de salaire - Février 2023.pdf</DocumentName>
              </DocumentInfo>
              <DocumentAction title="Télécharger">
                <Download size={16} />
              </DocumentAction>
            </DocumentItem>
            <DocumentItem>
              <DocumentInfo>
                <DocumentIcon>
                  <FileText size={16} />
                </DocumentIcon>
                <DocumentName>Bulletin de salaire - Janvier 2023.pdf</DocumentName>
              </DocumentInfo>
              <DocumentAction title="Télécharger">
                <Download size={16} />
              </DocumentAction>
            </DocumentItem>
            <DocumentItem>
              <DocumentInfo>
                <DocumentIcon>
                  <FileText size={16} />
                </DocumentIcon>
                <DocumentName>Attestation de travail.pdf</DocumentName>
              </DocumentInfo>
              <DocumentAction title="Télécharger">
                <Download size={16} />
              </DocumentAction>
            </DocumentItem>
          </DocumentList>
        </InfoSection>

        <ActionSection>
          <ActionTitle>Actions</ActionTitle>
          <ActionButtons>
            <ActionButton variant="approve" onClick={handleApprove}>
              <CheckCircle size={16} />
              Approuver la demande
            </ActionButton>
            <ActionButton variant="reject" onClick={handleReject}>
              <XCircle size={16} />
              Refuser la demande
            </ActionButton>
            <ActionButton variant="message">
              <MessageSquare size={16} />
              Contacter le client
            </ActionButton>
          </ActionButtons>
        </ActionSection>

        <CommentSection>
          <ActionTitle>Ajouter un commentaire</ActionTitle>
          <CommentForm onSubmit={handleCommentSubmit}>
            <CommentInput
              placeholder="Saisissez votre commentaire ici..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <CommentActions>
              <AttachButton type="button">
                <Paperclip size={16} />
                Joindre un fichier
              </AttachButton>
              <SendButton type="submit">
                <Send size={16} />
                Envoyer
              </SendButton>
            </CommentActions>
          </CommentForm>
        </CommentSection>
      </MainCard>

      <SideCard>
        <CardTitle>
          <TitleIcon>
            <Calendar size={18} />
          </TitleIcon>
          Historique
        </CardTitle>
        <Timeline>
          <TimelineItem>
            <TimelineIcon type="created">
              <FileText size={16} />
            </TimelineIcon>
            <TimelineContent>
              <TimelineTitle>Demande créée</TimelineTitle>
              <TimelineDescription>Le client a soumis une demande de crédit SAFIDY.</TimelineDescription>
              <TimelineDate>21 mars 2023, 09:45</TimelineDate>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineIcon type="updated">
              <FileText size={16} />
            </TimelineIcon>
            <TimelineContent>
              <TimelineTitle>Documents ajoutés</TimelineTitle>
              <TimelineDescription>Le client a téléchargé les documents requis.</TimelineDescription>
              <TimelineDate>21 mars 2023, 10:15</TimelineDate>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineIcon type="updated">
              <User size={16} />
            </TimelineIcon>
            <TimelineContent>
              <TimelineTitle>Assigné à Alex Conseiller</TimelineTitle>
              <TimelineDescription>La demande a été assignée pour traitement.</TimelineDescription>
              <TimelineDate>21 mars 2023, 11:30</TimelineDate>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineIcon type="updated">
              <MessageSquare size={16} />
            </TimelineIcon>
            <TimelineContent>
              <TimelineTitle>Message envoyé au client</TimelineTitle>
              <TimelineDescription>Demande d'informations complémentaires.</TimelineDescription>
              <TimelineDate>21 mars 2023, 14:20</TimelineDate>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineIcon type="updated">
              <MessageSquare size={16} />
            </TimelineIcon>
            <TimelineContent>
              <TimelineTitle>Réponse du client</TimelineTitle>
              <TimelineDescription>Le client a fourni les informations demandées.</TimelineDescription>
              <TimelineDate>21 mars 2023, 15:45</TimelineDate>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </SideCard>
    </Container>
  )
}

export default CreditRequestDetail

