"use client"

import { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import {
  MessageSquare,
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  ChevronDown,
  Paperclip,
  Image,
  File,
  Smile,
} from "lucide-react"

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 1rem;
  height: calc(100vh - 180px);
  min-height: 600px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Sidebar = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    display: ${({ isMobileVisible }) => (isMobileVisible ? "flex" : "none")};
  }
`

const SidebarHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
`

const SidebarTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const TitleIcon = styled.span`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  color: #e53e3e;
`

const SearchBar = styled.div`
  position: relative;
`

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  width: 100%;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.3);
  }
`

const SearchIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
`

const ConversationList = styled.div`
  flex: 1;
  overflow-y: auto;
`

const ConversationItem = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${({ active }) => (active ? "#fff5f5" : "transparent")};
  
  &:hover {
    background-color: ${({ active }) => (active ? "#fff5f5" : "#f7fafc")};
  }
`

const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #e53e3e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 0.75rem;
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

const ConversationName = styled.div`
  font-weight: 600;
  color: #2d3748;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ConversationTime = styled.div`
  font-size: 0.75rem;
  color: #718096;
  white-space: nowrap;
`

const ConversationPreview = styled.div`
  font-size: 0.75rem;
  color: #718096;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const UnreadBadge = styled.div`
  background-color: #e53e3e;
  color: white;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  margin-left: 0.5rem;
`

const ChatContainer = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    display: ${({ isMobileVisible }) => (isMobileVisible ? "none" : "flex")};
  }
`

const ChatHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ChatHeaderInfo = styled.div`
  display: flex;
  align-items: center;
`

const ChatHeaderName = styled.div`
  font-weight: 600;
  color: #2d3748;
  font-size: 1rem;
  margin-left: 0.75rem;
`

const ChatHeaderStatus = styled.div`
  font-size: 0.75rem;
  color: #718096;
  margin-left: 0.75rem;
`

const ChatHeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`

const HeaderActionButton = styled.button`
  background: none;
  border: none;
  color: #4a5568;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #e53e3e;
  }
`

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const MessageDate = styled.div`
  text-align: center;
  font-size: 0.75rem;
  color: #718096;
  margin: 1rem 0;
`

const Message = styled.div`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  position: relative;
  
  ${({ isOutgoing }) =>
    isOutgoing
      ? `
    align-self: flex-end;
    background-color: #e53e3e;
    color: white;
    border-bottom-right-radius: 0;
  `
      : `
    align-self: flex-start;
    background-color: #edf2f7;
    color: #2d3748;
    border-bottom-left-radius: 0;
  `}
`

const MessageTime = styled.div`
  font-size: 0.625rem;
  color: ${({ isOutgoing }) => (isOutgoing ? "rgba(255, 255, 255, 0.7)" : "#718096")};
  position: absolute;
  bottom: 0.25rem;
  right: 0.5rem;
`

const ChatInputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
`

const ChatInputForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const AttachmentButton = styled.button`
  background: none;
  border: none;
  color: #4a5568;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &:hover {
    color: #e53e3e;
  }
`

const AttachmentMenu = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 0.5rem;
  background-color: #fff;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 200px;
  z-index: 10;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`

const AttachmentMenuItem = styled.div`
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #4a5568;
  cursor: pointer;
  
  &:hover {
    background-color: #f7fafc;
  }
`

const ChatInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.3);
  }
`

const SendButton = styled.button`
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 9999px;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #c53030;
  }
  
  &:disabled {
    background-color: #cbd5e0;
    cursor: not-allowed;
  }
`

const BackToListButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #4a5568;
  cursor: pointer;
  margin-right: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`

// Données fictives
const conversations = [
  {
    id: 1,
    name: "Jean Dupont",
    lastMessage: "Bonjour, j'ai une question concernant ma demande de crédit SAFIDY.",
    time: "10:30",
    unread: 2,
    avatar: "JD",
  },
  {
    id: 2,
    name: "Marie Rakoto",
    lastMessage: "Merci pour votre aide avec ma demande.",
    time: "Hier",
    unread: 0,
    avatar: "MR",
  },
  {
    id: 3,
    name: "Paul Rabe",
    lastMessage: "Quand puis-je espérer une réponse pour ma demande ?",
    time: "Hier",
    unread: 1,
    avatar: "PR",
  },
  {
    id: 4,
    name: "Sophie Andria",
    lastMessage: "J'ai envoyé les documents demandés.",
    time: "Lun",
    unread: 0,
    avatar: "SA",
  },
  {
    id: 5,
    name: "Luc Razafy",
    lastMessage: "Pourriez-vous m'expliquer pourquoi ma demande a été refusée ?",
    time: "Dim",
    unread: 0,
    avatar: "LR",
  },
]

const messageHistory = [
  {
    id: 1,
    text: "Bonjour, j'ai une question concernant ma demande de crédit SAFIDY.",
    time: "10:30",
    isOutgoing: false,
    date: "Aujourd'hui",
  },
  {
    id: 2,
    text: "Bonjour Monsieur Dupont, comment puis-je vous aider ?",
    time: "10:32",
    isOutgoing: true,
    date: "Aujourd'hui",
  },
  {
    id: 3,
    text: "Je voudrais savoir si ma demande a bien été reçue et quand je pourrais avoir une réponse.",
    time: "10:33",
    isOutgoing: false,
    date: "Aujourd'hui",
  },
  {
    id: 4,
    text: "Votre demande a bien été reçue et est actuellement en cours d'étude. Le délai habituel de traitement est de 48 à 72 heures ouvrées.",
    time: "10:35",
    isOutgoing: true,
    date: "Aujourd'hui",
  },
  {
    id: 5,
    text: "Merci pour cette information. Y a-t-il des documents supplémentaires que je devrais fournir ?",
    time: "10:36",
    isOutgoing: false,
    date: "Aujourd'hui",
  },
]

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [message, setMessage] = useState("")
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false)
  const [isMobileSidebarVisible, setIsMobileSidebarVisible] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
  }, [selectedConversation])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() === "") return

    // Ici, vous ajouteriez la logique pour envoyer le message
    console.log("Message envoyé:", message)

    setMessage("")
    setTimeout(scrollToBottom, 100)
  }

  const toggleAttachmentMenu = () => {
    setAttachmentMenuOpen(!attachmentMenuOpen)
  }

  const handleConversationSelect = (id) => {
    setSelectedConversation(id)
    setIsMobileSidebarVisible(false)
  }

  const handleBackToList = () => {
    setIsMobileSidebarVisible(true)
  }

  const selectedConversationData = conversations.find((conv) => conv.id === selectedConversation)

  return (
    <Container>
      <Sidebar isMobileVisible={isMobileSidebarVisible}>
        <SidebarHeader>
          <SidebarTitle>
            <TitleIcon>
              <MessageSquare size={18} />
            </TitleIcon>
            Conversations
          </SidebarTitle>
          <SearchBar>
            <SearchIcon>
              <Search size={16} />
            </SearchIcon>
            <SearchInput type="text" placeholder="Rechercher un client..." />
          </SearchBar>
        </SidebarHeader>
        <ConversationList>
          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              active={selectedConversation === conversation.id}
              onClick={() => handleConversationSelect(conversation.id)}
            >
              <Avatar>{conversation.avatar}</Avatar>
              <ConversationInfo>
                <ConversationHeader>
                  <ConversationName>{conversation.name}</ConversationName>
                  <ConversationTime>{conversation.time}</ConversationTime>
                </ConversationHeader>
                <ConversationPreview>{conversation.lastMessage}</ConversationPreview>
              </ConversationInfo>
              {conversation.unread > 0 && <UnreadBadge>{conversation.unread}</UnreadBadge>}
            </ConversationItem>
          ))}
        </ConversationList>
      </Sidebar>

      <ChatContainer isMobileVisible={isMobileSidebarVisible}>
        <ChatHeader>
          <ChatHeaderInfo>
            <BackToListButton onClick={handleBackToList}>
              <ChevronDown size={20} />
            </BackToListButton>
            <Avatar>{selectedConversationData?.avatar}</Avatar>
            <ChatHeaderName>{selectedConversationData?.name}</ChatHeaderName>
            <ChatHeaderStatus>En ligne</ChatHeaderStatus>
          </ChatHeaderInfo>
          <ChatHeaderActions>
            <HeaderActionButton title="Appel téléphonique">
              <Phone size={18} />
            </HeaderActionButton>
            <HeaderActionButton title="Appel vidéo">
              <Video size={18} />
            </HeaderActionButton>
            <HeaderActionButton title="Plus d'options">
              <MoreVertical size={18} />
            </HeaderActionButton>
          </ChatHeaderActions>
        </ChatHeader>

        <ChatMessages>
          <MessageDate>Aujourd'hui</MessageDate>

          {messageHistory.map((msg) => (
            <Message key={msg.id} isOutgoing={msg.isOutgoing}>
              {msg.text}
              <MessageTime isOutgoing={msg.isOutgoing}>{msg.time}</MessageTime>
            </Message>
          ))}

          <div ref={messagesEndRef} />
        </ChatMessages>

        <ChatInputContainer>
          <ChatInputForm onSubmit={handleSendMessage}>
            <AttachmentButton type="button" onClick={toggleAttachmentMenu}>
              <Paperclip size={20} />
              <AttachmentMenu isOpen={attachmentMenuOpen}>
                <AttachmentMenuItem>
                  <Image size={16} />
                  Image
                </AttachmentMenuItem>
                <AttachmentMenuItem>
                  <File size={16} />
                  Document
                </AttachmentMenuItem>
              </AttachmentMenu>
            </AttachmentButton>
            <ChatInput
              type="text"
              placeholder="Tapez votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <AttachmentButton type="button">
              <Smile size={20} />
            </AttachmentButton>
            <SendButton type="submit" disabled={message.trim() === ""}>
              <Send size={16} />
            </SendButton>
          </ChatInputForm>
        </ChatInputContainer>
      </ChatContainer>
    </Container>
  )
}

export default Messages

