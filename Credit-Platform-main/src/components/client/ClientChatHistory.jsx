"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import {
  FiMessageCircle,
  FiClock,
  FiCheckCircle,
  FiSearch,
  FiPlus,
  FiChevronRight,
  FiRefreshCw,
  FiAlertCircle,
} from "react-icons/fi"
import { chatService } from "../../services/chatService"
import { useAuth } from "../../contexts/AuthContext"

const Container = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #eaeaea;
`

const Header = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray[900]};
  margin: 0;
`

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.625rem 0.75rem 0.625rem 2.5rem;
  border: 1px solid #eaeaea;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary[400]};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary[100]};
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.gray[400]};
`

const NewChatButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary[600]};
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.primary[700]};
    transform: translateY(-1px);
  }
`

const ConversationList = styled.div`
  max-height: 500px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`

const ConversationItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.gray[50]};
    transform: translateX(2px);
  }
`

const ConversationIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  ${(props) =>
    props.status === "pending" &&
    `
    background-color: ${props.theme.colors.warning[100]};
    color: ${props.theme.colors.warning[600]};
  `}
  
  ${(props) =>
    props.status === "active" &&
    `
    background-color: ${props.theme.colors.primary[100]};
    color: ${props.theme.colors.primary[600]};
  `}
  
  ${(props) =>
    props.status === "resolved" &&
    `
    background-color: ${props.theme.colors.success[100]};
    color: ${props.theme.colors.success[600]};
  `}
`

const ConversationInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const ConversationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`

const ConversationTitle = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray[900]};
`

const ConversationDate = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.gray[500]};
  white-space: nowrap;
`

const LastMessage = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.gray[600]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StatusBadge = styled.div`
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
  margin-top: 0.5rem;
  width: fit-content;
  
  ${(props) =>
    props.status === "pending" &&
    `
    background-color: ${props.theme.colors.warning[100]};
    color: ${props.theme.colors.warning[700]};
  `}
  
  ${(props) =>
    props.status === "active" &&
    `
    background-color: ${props.theme.colors.primary[100]};
    color: ${props.theme.colors.primary[700]};
  `}
  
  ${(props) =>
    props.status === "resolved" &&
    `
    background-color: ${props.theme.colors.success[100]};
    color: ${props.theme.colors.success[700]};
  `}
`

const ChevronIcon = styled.div`
  color: ${(props) => props.theme.colors.gray[400]};
  display: flex;
  align-items: center;
`

const EmptyState = styled.div`
  padding: 3rem 1rem;
  text-align: center;
  color: ${(props) => props.theme.colors.gray[500]};
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: ${(props) => props.theme.colors.gray[500]};
`

const ClientChatHistory = ({ onNewChat }) => {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { user } = useAuth()

  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = async () => {
    try {
      setLoading(true)
      const result = await chatService.getClientConversations(user?.id || "anonymous")
      setConversations(result)
      setLoading(false)
    } catch (error) {
      console.error("Erreur lors du chargement des conversations:", error)
      setLoading(false)
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat()
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiClock size={20} />
      case "active":
        return <FiMessageCircle size={20} />
      case "resolved":
        return <FiCheckCircle size={20} />
      default:
        return null
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "En attente"
      case "active":
        return "En cours"
      case "resolved":
        return "Résolu"
      default:
        return status
    }
  }

  const filteredConversations = conversations.filter((conv) => {
    if (!searchTerm) return true
    return conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <Container>
      <Header>
        <Title>Historique des conversations</Title>

        <SearchContainer>
          <SearchIcon>
            <FiSearch size={16} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Rechercher dans vos conversations..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchContainer>

        <NewChatButton onClick={handleNewChat}>
          <FiPlus size={16} />
          Nouvelle conversation
        </NewChatButton>
      </Header>

      {loading ? (
        <LoadingContainer>
          <FiRefreshCw size={24} style={{ animation: "spin 1s linear infinite" }} />
          <span style={{ marginLeft: "0.5rem" }}>Chargement de vos conversations...</span>
        </LoadingContainer>
      ) : filteredConversations.length === 0 ? (
        <EmptyState>
          <FiAlertCircle size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <p>Vous n'avez pas encore de conversations</p>
          <NewChatButton onClick={handleNewChat} style={{ margin: "1rem auto 0" }}>
            <FiPlus size={16} />
            Démarrer une conversation
          </NewChatButton>
        </EmptyState>
      ) : (
        <ConversationList>
          {filteredConversations.map((conv) => (
            <ConversationItem key={conv.id}>
              <ConversationIcon status={conv.status}>{getStatusIcon(conv.status)}</ConversationIcon>

              <ConversationInfo>
                <ConversationHeader>
                  <ConversationTitle>
                    {conv.assignedTo ? `Conversation avec ${conv.assignedTo}` : "Conversation"}
                  </ConversationTitle>
                  <ConversationDate>{formatDate(conv.createdAt)}</ConversationDate>
                </ConversationHeader>

                <LastMessage>{conv.lastMessage}</LastMessage>

                <StatusBadge status={conv.status}>
                  {getStatusIcon(conv.status)}
                  {getStatusText(conv.status)}
                </StatusBadge>
              </ConversationInfo>

              <ChevronIcon>
                <FiChevronRight size={20} />
              </ChevronIcon>
            </ConversationItem>
          ))}
        </ConversationList>
      )}
    </Container>
  )
}

export default ClientChatHistory

