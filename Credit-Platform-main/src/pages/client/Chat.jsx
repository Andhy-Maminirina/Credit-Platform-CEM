"use client"

import { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { theme } from "../../styles/theme"
import { FiSend, FiPaperclip, FiImage, FiFile, FiX, FiDownload, FiClock } from "react-icons/fi"

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px);
  min-height: 500px;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
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

const ChatHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .header-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
  }
  
  .header-subtitle {
    font-size: 0.875rem;
    color: #6B7280;
    margin-top: 0.25rem;
  }
  
  .header-status {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: #10B981;
    
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #10B981;
      margin-right: 0.5rem;
    }
  }
`

const ChatBody = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background-color: #F9FAFB;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #F3F4F6;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #D1D5DB;
    border-radius: 3px;
  }
`

const MessageGroup = styled.div`
  margin-bottom: 1.5rem;
  
  .message-date {
    text-align: center;
    font-size: 0.75rem;
    color: #6B7280;
    margin-bottom: 1rem;
    position: relative;
    
    &::before, &::after {
      content: '';
      position: absolute;
      top: 50%;
      width: calc(50% - 60px);
      height: 1px;
      background-color: #E5E7EB;
    }
    
    &::before {
      left: 0;
    }
    
    &::after {
      right: 0;
    }
  }
`

const Message = styled.div`
  display: flex;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &.outgoing {
    justify-content: flex-end;
    
    .message-content {
      background-color: ${theme.colors.primary[600]};
      color: white;
      border-radius: 1rem 0 1rem 1rem;
      
      .message-time {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
  
  &.incoming {
    justify-content: flex-start;
    
    .message-avatar {
      margin-right: 0.75rem;
    }
    
    .message-content {
      background-color: white;
      color: #111827;
      border-radius: 0 1rem 1rem 1rem;
      border: 1px solid #E5E7EB;
      
      .message-time {
        color: #9CA3AF;
      }
    }
  }
  
  .message-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #E5E7EB;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: #4B5563;
    flex-shrink: 0;
  }
  
  .message-content {
    max-width: 70%;
    padding: 0.75rem 1rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    
    .message-text {
      margin-bottom: 0.25rem;
      line-height: 1.5;
      word-break: break-word;
    }
    
    .message-time {
      font-size: 0.75rem;
      text-align: right;
    }
  }
`

const MessageAttachment = styled.div`
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  
  .attachment-icon {
    width: 32px;
    height: 32px;
    border-radius: 0.25rem;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.75rem;
    color: ${theme.colors.primary[600]};
  }
  
  .attachment-info {
    flex: 1;
    
    .attachment-name {
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.125rem;
      color: inherit;
    }
    
    .attachment-size {
      font-size: 0.75rem;
      color: inherit;
      opacity: 0.7;
    }
  }
  
  .attachment-action {
    color: inherit;
    opacity: 0.7;
    cursor: pointer;
    
    &:hover {
      opacity: 1;
    }
  }
`

const SystemMessage = styled.div`
  text-align: center;
  margin: 1rem 0;
  
  .system-content {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #F3F4F6;
    border-radius: 9999px;
    font-size: 0.75rem;
    color: #6B7280;
  }
`

const ChatFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #E5E7EB;
  background-color: white;
`

const MessageForm = styled.form`
  display: flex;
  align-items: center;
  
  .message-input-container {
    flex: 1;
    position: relative;
    
    .message-input {
      width: 100%;
      padding: 0.75rem 1rem;
      padding-right: 3rem;
      border: 1px solid #D1D5DB;
      border-radius: 9999px;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      
      &:focus {
        outline: none;
        border-color: ${theme.colors.primary[400]};
        box-shadow: 0 0 0 2px ${theme.colors.primary[100]};
      }
    }
    
    .attachment-button {
      position: absolute;
      right: 3.5rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #9CA3AF;
      cursor: pointer;
      padding: 0.25rem;
      
      &:hover {
        color: #6B7280;
      }
    }
  }
  
  .send-button {
    margin-left: 0.75rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${theme.colors.primary[600]};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: ${theme.colors.primary[700]};
    }
    
    &:disabled {
      background-color: #D1D5DB;
      cursor: not-allowed;
    }
  }
`

const AttachmentPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`

const AttachmentItem = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid #E5E7EB;
  
  .attachment-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .attachment-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F3F4F6;
    color: #6B7280;
    font-size: 1.5rem;
  }
  
  .attachment-remove {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.75rem;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  padding-left: 3rem;
  
  .typing-text {
    font-size: 0.75rem;
    color: #6B7280;
    margin-right: 0.5rem;
  }
  
  .typing-dots {
    display: flex;
    
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #9CA3AF;
      margin-right: 3px;
      animation: typingAnimation 1.4s infinite ease-in-out;
      
      &:nth-child(1) {
        animation-delay: 0s;
      }
      
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      &:nth-child(3) {
        animation-delay: 0.4s;
        margin-right: 0;
      }
    }
  }
  
  @keyframes typingAnimation {
    0%, 60%, 100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-4px);
    }
  }
`

const AttachmentMenu = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 0.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  z-index: 10;
  
  .attachment-option {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #F3F4F6;
    }
    
    .option-icon {
      margin-right: 0.75rem;
      color: ${theme.colors.primary[600]};
    }
    
    .option-text {
      font-size: 0.875rem;
      color: #111827;
    }
  }
`

const Chat = () => {
  const [message, setMessage] = useState("")
  const [attachments, setAttachments] = useState([])
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([])
  const chatBodyRef = useRef(null)
  const fileInputRef = useRef(null)

  // Données fictives pour les messages
  useEffect(() => {
    // Simuler le chargement des messages
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          text: "Bonjour, comment puis-je vous aider concernant votre demande de crédit ?",
          time: "10:30",
          date: "2023-03-20",
          sender: "advisor",
          senderName: "Marie",
          isIncoming: true,
        },
        {
          id: 2,
          text: "Bonjour, j'aimerais savoir où en est ma demande de crédit SAFIDY que j'ai soumise la semaine dernière.",
          time: "10:32",
          date: "2023-03-20",
          sender: "client",
          isIncoming: false,
        },
        {
          id: 3,
          text: "Bien sûr, je vérifie cela immédiatement. Pouvez-vous me confirmer la référence de votre demande ?",
          time: "10:33",
          date: "2023-03-20",
          sender: "advisor",
          senderName: "Marie",
          isIncoming: true,
        },
        {
          id: 4,
          text: "La référence est CR-2023-001.",
          time: "10:35",
          date: "2023-03-20",
          sender: "client",
          isIncoming: false,
        },
        {
          id: 5,
          text: "Merci. Je vois que votre demande a été approuvée ! Félicitations. Vous devriez recevoir une notification à ce sujet.",
          time: "10:38",
          date: "2023-03-20",
          sender: "advisor",
          senderName: "Marie",
          isIncoming: true,
        },
        {
          id: 6,
          text: "Voici le récapitulatif de votre crédit approuvé :",
          time: "10:39",
          date: "2023-03-20",
          sender: "advisor",
          senderName: "Marie",
          isIncoming: true,
          attachment: {
            name: "Récapitulatif_Crédit_SAFIDY.pdf",
            size: "1.2 MB",
            type: "pdf",
          },
        },
        {
          id: 7,
          text: "Super ! Merci beaucoup pour votre aide.",
          time: "10:42",
          date: "2023-03-20",
          sender: "client",
          isIncoming: false,
        },
        {
          id: 8,
          text: "Quand est-ce que les fonds seront disponibles sur mon compte ?",
          time: "14:15",
          date: "2023-03-22",
          sender: "client",
          isIncoming: false,
        },
        {
          id: 9,
          text: "Les fonds seront disponibles dans un délai de 48 à 72 heures ouvrables. Vous recevrez une notification dès que le virement sera effectué.",
          time: "14:20",
          date: "2023-03-22",
          sender: "advisor",
          senderName: "Marie",
          isIncoming: true,
        },
        {
          id: 10,
          type: "system",
          text: "Marie est en train de vous envoyer les documents de crédit",
          time: "14:22",
          date: "2023-03-22",
        },
        {
          id: 11,
          text: "Voici les documents officiels de votre crédit. Merci de les signer électroniquement via notre plateforme sécurisée.",
          time: "14:25",
          date: "2023-03-22",
          sender: "advisor",
          senderName: "Marie",
          isIncoming: true,
          attachment: {
            name: "Contrat_Crédit_SAFIDY.pdf",
            size: "2.4 MB",
            type: "pdf",
          },
        },
      ])
    }, 1000)
  }, [])

  // Effet pour faire défiler vers le bas lorsque de nouveaux messages sont ajoutés
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [messages])

  // Simuler l'indicateur de frappe
  useEffect(() => {
    const randomTimeout = Math.floor(Math.random() * 3000) + 2000
    const typingTimeout = setTimeout(() => {
      setIsTyping(true)

      setTimeout(() => {
        setIsTyping(false)
      }, 3000)
    }, randomTimeout)

    return () => clearTimeout(typingTimeout)
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (message.trim() === "" && attachments.length === 0) return

    const newMessage = {
      id: messages.length + 1,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toISOString().split("T")[0],
      sender: "client",
      isIncoming: false,
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    }

    setMessages([...messages, newMessage])
    setMessage("")
    setAttachments([])

    // Simuler une réponse du conseiller
    setTimeout(() => {
      setIsTyping(true)

      setTimeout(() => {
        setIsTyping(false)

        const response = {
          id: messages.length + 2,
          text: "Merci pour votre message. Je vais traiter votre demande dans les plus brefs délais.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          date: new Date().toISOString().split("T")[0],
          sender: "advisor",
          senderName: "Marie",
          isIncoming: true,
        }

        setMessages((prev) => [...prev, response])
      }, 3000)
    }, 1000)
  }

  const handleAttachmentClick = () => {
    setShowAttachmentMenu(!showAttachmentMenu)
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)

    const newAttachments = files.map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      type: file.type.split("/")[0],
      file,
    }))

    setAttachments([...attachments, ...newAttachments])
    setShowAttachmentMenu(false)
  }

  const removeAttachment = (index) => {
    const newAttachments = [...attachments]
    newAttachments.splice(index, 1)
    setAttachments(newAttachments)
  }

  // Grouper les messages par date
  const groupMessagesByDate = () => {
    const groups = {}

    messages.forEach((message) => {
      if (!groups[message.date]) {
        groups[message.date] = []
      }

      groups[message.date].push(message)
    })

    return groups
  }

  const messageGroups = groupMessagesByDate()

  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Hier"
    } else {
      return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    }
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <div>
          <div className="header-title">Discussion avec un conseiller</div>
          <div className="header-subtitle">Concernant votre demande de crédit</div>
        </div>
        <div className="header-status">
          <div className="status-dot"></div>
          En ligne
        </div>
      </ChatHeader>

      <ChatBody ref={chatBodyRef}>
        {Object.entries(messageGroups).map(([date, msgs]) => (
          <MessageGroup key={date}>
            <div className="message-date">{formatDate(date)}</div>

            {msgs.map((msg) => {
              if (msg.type === "system") {
                return (
                  <SystemMessage key={msg.id}>
                    <div className="system-content">
                      <FiClock size={12} style={{ marginRight: "4px", verticalAlign: "middle" }} />
                      {msg.text}
                    </div>
                  </SystemMessage>
                )
              }

              return (
                <Message key={msg.id} className={msg.isIncoming ? "incoming" : "outgoing"}>
                  {msg.isIncoming && <div className="message-avatar">{msg.senderName.charAt(0)}</div>}
                  <div className="message-content">
                    <div className="message-text">{msg.text}</div>

                    {msg.attachment && (
                      <MessageAttachment>
                        <div className="attachment-icon">
                          <FiFile size={16} />
                        </div>
                        <div className="attachment-info">
                          <div className="attachment-name">{msg.attachment.name}</div>
                          <div className="attachment-size">{msg.attachment.size}</div>
                        </div>
                        <div className="attachment-action">
                          <FiDownload size={16} />
                        </div>
                      </MessageAttachment>
                    )}

                    <div className="message-time">{msg.time}</div>
                  </div>
                </Message>
              )
            })}
          </MessageGroup>
        ))}

        {isTyping && (
          <TypingIndicator>
            <div className="typing-text">Marie est en train d'écrire</div>
            <div className="typing-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </TypingIndicator>
        )}
      </ChatBody>

      <ChatFooter>
        {attachments.length > 0 && (
          <AttachmentPreview>
            {attachments.map((attachment, index) => (
              <AttachmentItem key={index}>
                {attachment.type === "image" ? (
                  <img
                    src={URL.createObjectURL(attachment.file) || "/placeholder.svg"}
                    alt={attachment.name}
                    className="attachment-thumbnail"
                  />
                ) : (
                  <div className="attachment-icon">
                    <FiFile />
                  </div>
                )}
                <div className="attachment-remove" onClick={() => removeAttachment(index)}>
                  <FiX size={12} />
                </div>
              </AttachmentItem>
            ))}
          </AttachmentPreview>
        )}

        <MessageForm onSubmit={handleSubmit}>
          <div className="message-input-container">
            <input
              type="text"
              className="message-input"
              placeholder="Écrivez votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="button" className="attachment-button" onClick={handleAttachmentClick}>
              <FiPaperclip size={20} />
            </button>

            {showAttachmentMenu && (
              <AttachmentMenu>
                <div
                  className="attachment-option"
                  onClick={() => {
                    fileInputRef.current.click()
                  }}
                >
                  <FiFile className="option-icon" />
                  <span className="option-text">Document</span>
                </div>
                <div
                  className="attachment-option"
                  onClick={() => {
                    fileInputRef.current.accept = "image/*"
                    fileInputRef.current.click()
                  }}
                >
                  <FiImage className="option-icon" />
                  <span className="option-text">Image</span>
                </div>
              </AttachmentMenu>
            )}

            <input type="file" ref={fileInputRef} style={{ display: "none" }} multiple onChange={handleFileUpload} />
          </div>

          <button type="submit" className="send-button" disabled={message.trim() === "" && attachments.length === 0}>
            <FiSend size={18} />
          </button>
        </MessageForm>
      </ChatFooter>
    </ChatContainer>
  )
}

export default Chat

