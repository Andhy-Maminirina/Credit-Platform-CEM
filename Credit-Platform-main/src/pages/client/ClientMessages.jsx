"use client"

import { useState } from "react"
import ClientLayout from "../../components/layout/ClientLayout"
import ClientChatHistory from "../../components/client/ClientChatHistory"
import ChatBot from "../../components/chat/ChatBot"
import styled from "styled-components"
import { FiMessageSquare, FiClock, FiCheck, FiAlertCircle } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"

const PageHeader = styled.div`
  margin-bottom: 1.5rem;
`

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray[900]};
  margin-bottom: 0.5rem;
`

const PageDescription = styled.p`
  color: ${(props) => props.theme.colors.gray[600]};
  font-size: 0.875rem;
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const StatCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #eaeaea;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const StatIconContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.variant === "primary" &&
    `
    background-color: ${props.theme.colors.primary[100]};
    color: ${props.theme.colors.primary[600]};
  `}

  ${(props) =>
    props.variant === "success" &&
    `
    background-color: ${props.theme.colors.success[100]};
    color: ${props.theme.colors.success[600]};
  `}
  
  ${(props) =>
    props.variant === "warning" &&
    `
    background-color: ${props.theme.colors.warning[100]};
    color: ${props.theme.colors.warning[600]};
  `}
`

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray[900]};
`

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.gray[600]};
`

const ContentContainer = styled.div`
  position: relative;
  min-height: 500px;
`

const ChatOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  border-radius: 0.75rem;
`

const CloseOverlayButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: ${(props) => props.theme.colors.gray[200]};
  color: ${(props) => props.theme.colors.gray[700]};
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.gray[300]};
  }
`

const ClientMessages = () => {
  const [showChat, setShowChat] = useState(false)
  const [stats] = useState({
    totalConversations: 3,
    activeConversations: 1,
    resolvedConversations: 2,
  })

  const handleNewChat = () => {
    setShowChat(true)
  }

  const handleCloseChat = () => {
    setShowChat(false)
  }

  return (
    <ClientLayout>
      <PageHeader>
        <PageTitle>Mes messages</PageTitle>
        <PageDescription>Consultez l'historique de vos conversations avec nos conseillers.</PageDescription>
      </PageHeader>

      <StatsContainer>
        <StatCard>
          <StatIconContainer variant="primary">
            <FiMessageSquare size={24} />
          </StatIconContainer>
          <StatContent>
            <StatValue>{stats.totalConversations}</StatValue>
            <StatLabel>Conversations totales</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIconContainer variant="warning">
            <FiClock size={24} />
          </StatIconContainer>
          <StatContent>
            <StatValue>{stats.activeConversations}</StatValue>
            <StatLabel>Conversations actives</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIconContainer variant="success">
            <FiCheck size={24} />
          </StatIconContainer>
          <StatContent>
            <StatValue>{stats.resolvedConversations}</StatValue>
            <StatLabel>Conversations résolues</StatLabel>
          </StatContent>
        </StatCard>
      </StatsContainer>

      <ContentContainer>
        <ClientChatHistory onNewChat={handleNewChat} />

        <AnimatePresence>
          {showChat && (
            <ChatOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CloseOverlayButton onClick={handleCloseChat}>
                <FiAlertCircle size={16} />
              </CloseOverlayButton>
              <div style={{ width: "90%", maxWidth: "500px", height: "600px" }}>
                <ChatBot onClose={handleCloseChat} />
              </div>
            </ChatOverlay>
          )}
        </AnimatePresence>
      </ContentContainer>
    </ClientLayout>
  )
}

export default ClientMessages

