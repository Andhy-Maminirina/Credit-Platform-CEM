"use client"

import { useRef } from "react"

import { useState, useEffect } from "react"
import styled from "styled-components"
import {
  FiSearch,
  FiFilter,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiMessageCircle,
  FiSend,
  FiInfo,
} from "react-icons/fi"
import { chatService } from "../../services/chatService"

// Styled Components
const Container = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #eaeaea;
  height: calc(100vh - 300px);
  min-height: 600px;
  display: flex;
  flex-direction: column;
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

const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`

const FilterButton = styled.button`
  background-color: ${(props) => (props.active ? props.theme.colors.primary[50] : "white")};
  color: ${(props) => (props.active ? props.theme.colors.primary[600] : props.theme.colors.gray[700])};
  border: 1px solid ${(props) => (props.active ? props.theme.colors.primary[300] : "#eaeaea")};
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${(props) => (props.active ? props.theme.colors.primary[100] : props.theme.colors.gray[50])};
  }
`

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`

const ConversationList = styled.div`
  width: 350px;
  border-right: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const ConversationListContent = styled.div`
  flex: 1;
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
  transition: background-color 0.2s;
  
  ${(props) =>
    props.selected &&
    `
    background-color: ${props.theme.colors.primary[50]};
  `}
  
  &:hover {
    background-color: ${(props) => (props.selected ? props.theme.colors.primary[50] : props.theme.colors.gray[50])};
  }
  
  ${(props) =>
    props.unread &&
    `
    border-left: 3px solid ${props.theme.colors.primary[500]};
  `}
`

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray[700]};
  flex-shrink: 0;
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

const UserName = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray[900]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const EmptyState = styled.div`
  padding: 3rem 1rem;
  text-align: center;
  color: ${(props) => props.theme.colors.gray[500]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #eaeaea;
`

const PaginationInfo = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.gray[600]};
`

const PaginationControls = styled.div`
  display: flex;
  gap: 0.5rem;
`

const PaginationButton = styled.button`
  background-color: ${(props) => (props.disabled ? props.theme.colors.gray[100] : "white")};
  color: ${(props) => (props.disabled ? props.theme.colors.gray[400] : props.theme.colors.gray[700])};
  border: 1px solid ${(props) => (props.disabled ? props.theme.colors.gray[200] : "#eaeaea")};
  border-radius: 0.375rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.gray[50]};
  }
`

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`

const ChatHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`

const ChatHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const ChatHeaderActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ActionButton = styled.button`
  background-color: white;
  color: ${(props) => props.theme.colors.gray[700]};
  border: 1px solid #eaeaea;
  border-radius: 0.375rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.gray[50]};
  }
  
  ${(props) =>
    props.variant === "success" &&
    `
    background-color: ${props.theme.colors.success[100]};
    color: ${props.theme.colors.success[600]};
    border-color: ${props.theme.colors.success[200]};
    
    &:hover {
      background-color: ${props.theme.colors.success[200]};
    }
  `}
`

const ChatContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f9f9f9;
  
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

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  position: relative;
  font-size: 0.9rem;
  line-height: 1.4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  
  ${(props) =>
    props.sender === "admin" &&
    `
    align-self: flex-end;
    background-color: ${props.theme.colors.primary[600]};
    color: white;
    border-bottom-right-radius: 0.25rem;
  `}

  ${(props) =>
    props.sender === "user" &&
    `
    align-self: flex-start;
    background-color: white;
    color: ${props.theme.colors.gray[900]};
    border-bottom-left-radius: 0.25rem;
    border: 1px solid #e0e0e0;
  `}
  
  ${(props) =>
    props.sender === "bot" &&
    `
    align-self: flex-start;
    background-color: ${props.theme.colors.gray[100]};
    color: ${props.theme.colors.gray[900]};
    border-bottom-left-radius: 0.25rem;
    border-left: 3px solid ${props.theme.colors.secondary[500]};
  `}
  
  ${(props) =>
    props.sender === "human" &&
    `
    align-self: flex-start;
    background-color: ${props.theme.colors.secondary[100]};
    color: ${props.theme.colors.secondary[900]};
    border-bottom-left-radius: 0.25rem;
  `}
  
  ${(props) =>
    props.sender === "system" &&
    `
    align-self: center;
    background-color: ${props.theme.colors.warning[50]};
    color: ${props.theme.colors.warning[700]};
    border: 1px solid ${props.theme.colors.warning[200]};
    max-width: 90%;
    text-align: center;
    font-size: 0.8rem;
  `}
`

const MessageTime = styled.div`
  font-size: 0.7rem;
  margin-top: 0.25rem;
  text-align: right;
  opacity: 0.7;
`

const ChatInputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid #eaeaea;
  background-color: white;
`

const ChatInputForm = styled.form`
  display: flex;
  gap: 0.5rem;
`

const ChatInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #eaeaea;
  border-radius: 2rem;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary[400]};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary[100]};
  }
`

const SendButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary[600]};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.primary[700]};
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`

const UserInfoContainer = styled.div`
  width: 300px;
  border-left: 1px solid #eaeaea;
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
`

const UserInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const UserInfoTitle = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray[900]};
  font-size: 0.875rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eaeaea;
`

const UserInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const UserInfoLabel = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.gray[500]};
`

const UserInfoValue = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.gray[900]};
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: ${(props) => props.theme.colors.gray[500]};
  height: 100%;
`

const LoadingSpinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid ${(props) => props.theme.colors.primary[600]};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const SystemMessage = styled.div`
  background-color: ${(props) => props.theme.colors.warning[50]};
  border: 1px solid ${(props) => props.theme.colors.warning[200]};
  color: ${(props) => props.theme.colors.warning[700]};
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const ChatManagement = () => {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [conversation, setConversation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingConversation, setLoadingConversation] = useState(false)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})
  const [replyText, setReplyText] = useState("")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    loadConversations()
  }, [page, filter])

  useEffect(() => {
    if (selectedConversation) {
      loadConversation(selectedConversation)
    }
  }, [selectedConversation])

  useEffect(() => {
    scrollToBottom()
  }, [conversation?.messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const loadConversations = async () => {
    try {
      setLoading(true)
      const filters = filter !== "all" ? { status: filter } : {}
      const result = await chatService.getAdminConversations(page, 10, filters)
      setConversations(result.conversations)
      setPagination(result.pagination)
      setLoading(false)
    } catch (error) {
      console.error("Erreur lors du chargement des conversations:", error)
      setLoading(false)
    }
  }

  const loadConversation = async (id) => {
    try {
      setLoadingConversation(true)
      const result = await chatService.getConversation(id)
      setConversation(result)
      setLoadingConversation(false)
    } catch (error) {
      console.error("Erreur lors du chargement de la conversation:", error)
      setLoadingConversation(false)
    }
  }

  const handleSelectConversation = (id) => {
    setSelectedConversation(id)
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    setPage(1)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      setPage(page + 1)
    }
  }

  const handleReplyChange = (e) => {
    setReplyText(e.target.value)
  }

  const handleSendReply = async (e) => {
    e.preventDefault()

    if (!replyText.trim() || !selectedConversation) return

    try {
      const message = {
        text: replyText,
        sender: "admin",
      }

      const sentMessage = await chatService.sendMessage(selectedConversation, message)

      // Mettre à jour la conversation localement
      setConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, sentMessage],
        status: prev.status === "pending" ? "active" : prev.status,
        updatedAt: new Date(),
      }))

      // Mettre à jour le statut de la conversation si nécessaire
      if (conversation.status === "pending") {
        await chatService.updateConversationStatus(selectedConversation, "active")
      }

      setReplyText("")
    } catch (error) {
      console.error("Erreur lors de l'envoi de la réponse:", error)
    }
  }

  const handleUpdateStatus = async (status) => {
    try {
      await chatService.updateConversationStatus(selectedConversation, status)

      // Mettre à jour la conversation localement
      setConversation((prev) => ({
        ...prev,
        status,
        updatedAt: new Date(),
      }))

      // Ajouter un message système
      const systemMessage = {
        id: `system_${Date.now()}`,
        text:
          status === "resolved"
            ? "Cette conversation a été marquée comme résolue par un conseiller."
            : "Cette conversation a été rouverte par un conseiller.",
        sender: "system",
        timestamp: new Date(),
      }

      setConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, systemMessage],
      }))

      // Mettre à jour la liste des conversations
      loadConversations()
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiClock size={14} />
      case "active":
        return <FiMessageCircle size={14} />
      case "resolved":
        return <FiCheckCircle size={14} />
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

  // Filtrer les conversations en fonction de la recherche
  const filteredConversations = conversations.filter((conv) => {
    if (!searchTerm) return true

    return (
      conv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.userEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <Container>
      <Header>
        <Title>Conversations</Title>

        <SearchContainer>
          <SearchIcon>
            <FiSearch size={16} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Rechercher une conversation..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchContainer>

        <FilterContainer>
          <FilterButton active={filter === "all"} onClick={() => handleFilterChange("all")}>
            <FiFilter size={16} />
            Toutes
          </FilterButton>

          <FilterButton active={filter === "pending"} onClick={() => handleFilterChange("pending")}>
            <FiClock size={16} />
            En attente
          </FilterButton>

          <FilterButton active={filter === "active"} onClick={() => handleFilterChange("active")}>
            <FiMessageCircle size={16} />
            En cours
          </FilterButton>

          <FilterButton active={filter === "resolved"} onClick={() => handleFilterChange("resolved")}>
            <FiCheckCircle size={16} />
            Résolues
          </FilterButton>
        </FilterContainer>
      </Header>

      <MainContent>
        {loading ? (
          <LoadingContainer style={{ width: "100%" }}>
            <LoadingSpinner />
            <span>Chargement des conversations...</span>
          </LoadingContainer>
        ) : (
          <>
            <ConversationList>
              <ConversationListContent>
                {filteredConversations.length === 0 ? (
                  <EmptyState>
                    <FiAlertCircle size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
                    <p>Aucune conversation trouvée</p>
                  </EmptyState>
                ) : (
                  filteredConversations.map((conv) => (
                    <ConversationItem
                      key={conv.id}
                      selected={selectedConversation === conv.id}
                      unread={conv.unread}
                      onClick={() => handleSelectConversation(conv.id)}
                    >
                      <Avatar>{conv.userName.charAt(0)}</Avatar>

                      <ConversationInfo>
                        <ConversationHeader>
                          <UserName>{conv.userName}</UserName>
                          <ConversationDate>{formatDate(conv.createdAt)}</ConversationDate>
                        </ConversationHeader>

                        <LastMessage>{conv.lastMessage}</LastMessage>

                        <div style={{ display: "flex", alignItems: "center", marginTop: "0.5rem" }}>
                          <StatusBadge status={conv.status}>
                            {getStatusIcon(conv.status)}
                            {getStatusText(conv.status)}
                          </StatusBadge>
                        </div>
                      </ConversationInfo>
                    </ConversationItem>
                  ))
                )}
              </ConversationListContent>

              <PaginationContainer>
                <PaginationInfo>
                  Page {pagination.page || 1} sur {pagination.totalPages || 1}
                </PaginationInfo>

                <PaginationControls>
                  <PaginationButton onClick={handlePreviousPage} disabled={page <= 1}>
                    <FiChevronLeft size={16} />
                  </PaginationButton>

                  <PaginationButton onClick={handleNextPage} disabled={!pagination.hasNextPage}>
                    <FiChevronRight size={16} />
                  </PaginationButton>
                </PaginationControls>
              </PaginationContainer>
            </ConversationList>

            {selectedConversation ? (
              loadingConversation ? (
                <LoadingContainer style={{ flex: 1 }}>
                  <LoadingSpinner />
                  <span>Chargement de la conversation...</span>
                </LoadingContainer>
              ) : (
                <>
                  <ChatContainer>
                    <ChatHeader>
                      <ChatHeaderInfo>
                        <Avatar>{conversation?.userName.charAt(0)}</Avatar>
                        <div>
                          <UserName>{conversation?.userName}</UserName>
                          <div style={{ fontSize: "0.75rem", color: "#666" }}>{conversation?.userEmail}</div>
                        </div>
                      </ChatHeaderInfo>

                      <ChatHeaderActions>
                        <StatusBadge status={conversation?.status}>
                          {getStatusIcon(conversation?.status)}
                          {getStatusText(conversation?.status)}
                        </StatusBadge>

                        {conversation?.status !== "resolved" ? (
                          <ActionButton
                            variant="success"
                            onClick={() => handleUpdateStatus("resolved")}
                            title="Marquer comme résolu"
                          >
                            <FiCheckCircle size={16} />
                          </ActionButton>
                        ) : (
                          <ActionButton onClick={() => handleUpdateStatus("active")} title="Rouvrir la conversation">
                            <FiMessageCircle size={16} />
                          </ActionButton>
                        )}
                      </ChatHeaderActions>
                    </ChatHeader>

                    <ChatContent>
                      {conversation?.status === "pending" && (
                        <SystemMessage>
                          <FiInfo size={16} />
                          <span>
                            Cette conversation est en attente de réponse. Votre réponse la marquera comme active.
                          </span>
                        </SystemMessage>
                      )}

                      {conversation?.messages.map((message) => (
                        <MessageBubble key={message.id} sender={message.sender}>
                          {message.text}
                          <MessageTime>{formatTime(message.timestamp)}</MessageTime>
                        </MessageBubble>
                      ))}

                      <div ref={messagesEndRef} />
                    </ChatContent>

                    <ChatInputContainer>
                      <ChatInputForm onSubmit={handleSendReply}>
                        <ChatInput
                          type="text"
                          value={replyText}
                          onChange={handleReplyChange}
                          placeholder="Tapez votre réponse..."
                          disabled={conversation?.status === "resolved"}
                        />
                        <SendButton type="submit" disabled={!replyText.trim() || conversation?.status === "resolved"}>
                          <FiSend size={16} />
                        </SendButton>
                      </ChatInputForm>
                    </ChatInputContainer>
                  </ChatContainer>

                  <UserInfoContainer>
                    <UserInfoSection>
                      <UserInfoTitle>Informations client</UserInfoTitle>

                      <UserInfoItem>
                        <UserInfoLabel>Nom</UserInfoLabel>
                        <UserInfoValue>{conversation?.userName}</UserInfoValue>
                      </UserInfoItem>

                      <UserInfoItem>
                        <UserInfoLabel>Email</UserInfoLabel>
                        <UserInfoValue>{conversation?.userEmail}</UserInfoValue>
                      </UserInfoItem>

                      {conversation?.userPhone && (
                        <UserInfoItem>
                          <UserInfoLabel>Téléphone</UserInfoLabel>
                          <UserInfoValue>{conversation?.userPhone}</UserInfoValue>
                        </UserInfoItem>
                      )}
                    </UserInfoSection>

                    <UserInfoSection>
                      <UserInfoTitle>Détails de la conversation</UserInfoTitle>

                      <UserInfoItem>
                        <UserInfoLabel>Créée le</UserInfoLabel>
                        <UserInfoValue>{formatDate(conversation?.createdAt)}</UserInfoValue>
                      </UserInfoItem>

                      <UserInfoItem>
                        <UserInfoLabel>Dernière activité</UserInfoLabel>
                        <UserInfoValue>{formatDate(conversation?.updatedAt)}</UserInfoValue>
                      </UserInfoItem>

                      <UserInfoItem>
                        <UserInfoLabel>Statut</UserInfoLabel>
                        <UserInfoValue>
                          <StatusBadge status={conversation?.status}>
                            {getStatusIcon(conversation?.status)}
                            {getStatusText(conversation?.status)}
                          </StatusBadge>
                        </UserInfoValue>
                      </UserInfoItem>

                      {conversation?.assignedTo && (
                        <UserInfoItem>
                          <UserInfoLabel>Assigné à</UserInfoLabel>
                          <UserInfoValue>{conversation.assignedTo}</UserInfoValue>
                        </UserInfoItem>
                      )}
                    </UserInfoSection>

                    <UserInfoSection style={{ marginTop: "auto" }}>
                      <UserInfoTitle>Actions</UserInfoTitle>

                      {conversation?.status !== "resolved" ? (
                        <ActionButton
                          variant="success"
                          onClick={() => handleUpdateStatus("resolved")}
                          style={{ width: "100%" }}
                        >
                          <FiCheckCircle size={16} style={{ marginRight: "0.5rem" }} />
                          Marquer comme résolu
                        </ActionButton>
                      ) : (
                        <ActionButton onClick={() => handleUpdateStatus("active")} style={{ width: "100%" }}>
                          <FiMessageCircle size={16} style={{ marginRight: "0.5rem" }} />
                          Rouvrir la conversation
                        </ActionButton>
                      )}
                    </UserInfoSection>
                  </UserInfoContainer>
                </>
              )
            ) : (
              <EmptyState style={{ flex: 1 }}>
                <FiMessageCircle size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
                <p>Sélectionnez une conversation pour afficher les messages</p>
              </EmptyState>
            )}
          </>
        )}
      </MainContent>
    </Container>
  )
}

export default ChatManagement

