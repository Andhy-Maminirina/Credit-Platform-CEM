"use client"

import { useState, useEffect, useRef } from "react"
import { FiMessageSquare, FiX, FiSend, FiChevronRight, FiUser, FiCheck, FiBell, FiArrowRight } from "react-icons/fi"
import { useAuth } from "../../contexts/AuthContext"
import styled, { keyframes } from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { chatService } from "../../services/chatService"

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`

// Styled Components
const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 380px;
  height: 550px;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
  border: 1px solid #eaeaea;

  @media (max-width: 640px) {
    width: calc(100% - 2rem);
    height: 500px;
    bottom: 1rem;
    right: 1rem;
  }
`

const ChatHeader = styled.div`
  background: linear-gradient(135deg, 
    ${(props) => props.theme.colors.primary[600]} 0%, 
    ${(props) => props.theme.colors.primary[500]} 100%);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ChatTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
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
  animation: ${fadeIn} 0.3s ease-out;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  ${(props) =>
    props.sender === "bot" &&
    `
    align-self: flex-start;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-bottom-left-radius: 0.25rem;
    color: #333;
  `}

  ${(props) =>
    props.sender === "user" &&
    `
    align-self: flex-end;
    background-color: ${props.theme.colors.primary[600]};
    color: white;
    border-bottom-right-radius: 0.25rem;
  `}

  ${(props) =>
    props.sender === "human" &&
    `
    align-self: flex-start;
    background-color: ${props.theme.colors.secondary[600]};
    color: white;
    border-bottom-left-radius: 0.25rem;
  `}
`

const MessageTime = styled.div`
  font-size: 0.7rem;
  margin-top: 0.25rem;
  text-align: right;
  opacity: 0.7;
`

const MessageStatus = styled.div`
  font-size: 0.7rem;
  margin-top: 0.25rem;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.25rem;

  ${(props) =>
    props.status === "sent" &&
    `
    color: rgba(255, 255, 255, 0.7);
  `}

  ${(props) =>
    props.status === "delivered" &&
    `
    color: rgba(255, 255, 255, 0.7);
  `}

  ${(props) =>
    props.status === "read" &&
    `
    color: #4caf50;
  `}
`

const ChatInputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
  background-color: white;
`

const ChatInputForm = styled.form`
  display: flex;
  gap: 0.5rem;
`

const ChatInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
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

const SuggestionsContainer = styled.div`
  padding: 0.5rem 1rem;
  border-top: 1px solid #e0e0e0;
  background-color: white;
  animation: ${slideUp} 0.3s ease-out;
`

const SuggestionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const SuggestionButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #e0e0e0;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    background-color: #e8e8e8;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
`

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 1rem;
  border-bottom-left-radius: 0.25rem;
  align-self: flex-start;
  max-width: 80%;
  animation: ${fadeIn} 0.3s ease-out;
`

const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #aaa;
  border-radius: 50%;
  animation: typing 1.4s infinite both;
  animation-delay: ${(props) => props.delay || "0s"};

  @keyframes typing {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-4px);
    }
  }
`

const ChatButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    ${(props) => props.theme.colors.primary[600]} 0%, 
    ${(props) => props.theme.colors.primary[500]} 100%);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
`

const ChatPopup = styled(motion.div)`
  position: fixed;
  bottom: 7rem;
  right: 2rem;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 300px;
  z-index: 999;
  border: 1px solid #eaeaea;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white;
  }
`

const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

const PopupTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray[900]};
  margin: 0;
`

const PopupMessage = styled.p`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.gray[700]};
  margin: 0 0 0.75rem 0;
`

const PopupButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary[600]};
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary[700]};
  }
`

const AdminRequestContainer = styled.div`
  padding: 0.75rem;
  background-color: ${(props) => props.theme.colors.warning[50]};
  border: 1px solid ${(props) => props.theme.colors.warning[200]};
  border-radius: 0.5rem;
  margin: 0.5rem 0;
  animation: ${slideUp} 0.3s ease-out;
`

const AdminRequestTitle = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.warning[700]};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const AdminRequestOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

const AdminRequestButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.primary &&
    `
    background-color: ${props.theme.colors.primary[600]};
    color: white;
    border: none;
    
    &:hover {
      background-color: ${props.theme.colors.primary[700]};
    }
  `}

  ${(props) =>
    !props.primary &&
    `
    background-color: white;
    color: ${props.theme.colors.gray[700]};
    border: 1px solid ${props.theme.colors.gray[300]};
    
    &:hover {
      background-color: ${props.theme.colors.gray[100]};
    }
  `}
`

const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${(props) => props.theme.colors.danger[500]};
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  border: 2px solid white;
  animation: ${pulse} 2s infinite;
`

const WelcomeScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  height: 100%;
  background-color: #f9f9f9;
`

const WelcomeLogo = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, 
    ${(props) => props.theme.colors.primary[600]} 0%, 
    ${(props) => props.theme.colors.primary[500]} 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 25px rgba(255, 65, 54, 0.2);
`

const WelcomeTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.gray[900]};
`

const WelcomeText = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.gray[600]};
  margin-bottom: 1.5rem;
  max-width: 280px;
`

const StartChatButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary[600]};
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary[700]};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 65, 54, 0.2);
  }
`

const ChatBot = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [needsHumanHelp, setNeedsHumanHelp] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [hasNewMessages, setHasNewMessages] = useState(false)
  const [adminResponding, setAdminResponding] = useState(false)
  const [adminName, setAdminName] = useState("")
  const [unreadCount, setUnreadCount] = useState(0)
  const [showWelcome, setShowWelcome] = useState(true)
  const [conversationId, setConversationId] = useState(null)
  const messagesEndRef = useRef(null)
  const { user } = useAuth()

  // Suggestions de questions initiales
  const initialSuggestions = [
    "Comment fonctionne le crédit SAFIDY ?",
    "Quels sont les documents nécessaires ?",
    "Quel est le taux d'intérêt pour AVOTRA ?",
    "Comment simuler un crédit ?",
    "Parler à un conseiller",
  ]

  useEffect(() => {
    // Si le composant est monté directement ouvert (depuis un bouton externe)
    if (onClose) {
      setIsOpen(true)
    }
  }, [onClose])

  useEffect(() => {
    // Si le chat est fermé et qu'il y a des messages non lus, afficher le popup après un délai
    if (!isOpen && unreadCount > 0 && !showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, unreadCount, showPopup])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Créer une nouvelle conversation ou charger une existante
  useEffect(() => {
    if (isOpen && !conversationId && showWelcome === false) {
      // Créer une nouvelle conversation
      const newConversationId = `conv_${Date.now()}`
      setConversationId(newConversationId)

      // Message de bienvenue
      setTimeout(() => {
        const welcomeMessage = {
          id: Date.now(),
          text: `Bonjour${user ? ` ${user.firstName}` : ""} ! Je suis l'assistant virtuel de la Caisse d'Épargne. Comment puis-je vous aider aujourd'hui ?`,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages([welcomeMessage])
        setSuggestions(initialSuggestions)
      }, 500)
    }
  }, [isOpen, conversationId, showWelcome, user])

  // Simuler la réception de nouveaux messages
  useEffect(() => {
    let interval

    if (needsHumanHelp && !adminResponding) {
      // Simuler une réponse d'un conseiller après un délai
      const timer = setTimeout(() => {
        const adminNames = ["Marie", "Thomas", "Sophie", "Jean"]
        const randomName = adminNames[Math.floor(Math.random() * adminNames.length)]
        setAdminName(randomName)

        const adminResponse = {
          id: Date.now(),
          text: `Bonjour, je suis ${randomName}, conseiller à la CEM. Comment puis-je vous aider aujourd'hui ?`,
          sender: "human",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, adminResponse])
        setAdminResponding(false)

        // Mettre à jour les suggestions
        setSuggestions([
          "J'ai besoin d'aide pour ma demande de crédit",
          "Je souhaite connaître l'état de mon dossier",
          "J'ai une question sur les taux d'intérêt",
          "Merci pour votre aide",
        ])
        setShowSuggestions(true)
      }, 5000)

      return () => clearTimeout(timer)
    }

    // Simuler la réception de nouveaux messages toutes les 30 secondes
    if (!isOpen && needsHumanHelp) {
      interval = setInterval(() => {
        if (Math.random() > 0.7) {
          setUnreadCount((prev) => prev + 1)
          setHasNewMessages(true)

          // Simuler un message d'un conseiller
          if (adminName) {
            const newMessage = {
              id: Date.now(),
              text: `Avez-vous besoin d'autres informations concernant votre demande ?`,
              sender: "human",
              timestamp: new Date(),
              status: "delivered",
            }

            setMessages((prev) => [...prev, newMessage])
          }
        }
      }, 30000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isOpen, needsHumanHelp, adminResponding, adminName])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleToggleChat = () => {
    setIsOpen((prev) => !prev)
    if (!isOpen) {
      setShowPopup(false)
      setUnreadCount(0)
      setHasNewMessages(false)
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSuggestionClick = (suggestion) => {
    if (suggestion === "Parler à un conseiller") {
      handleRequestHumanHelp()
    } else {
      handleSendMessage(suggestion)
    }
    setShowSuggestions(false)
  }

  const handleStartChat = () => {
    setShowWelcome(false)
  }

  const handleRequestHumanHelp = () => {
    const userMessage = {
      id: Date.now(),
      text: "J'aimerais parler à un conseiller.",
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      // Mettre à jour le statut du message précédent
      setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "delivered" } : msg)))

      const botResponse = {
        id: Date.now() + 1,
        text: "Je vais transférer votre demande à l'un de nos conseillers. Un conseiller vous répondra dès que possible. Vous pouvez continuer à poser vos questions en attendant.",
        sender: "bot",
        timestamp: new Date(),
      }

      // Ajouter un message explicatif supplémentaire
      const infoMessage = {
        id: Date.now() + 2,
        text: "Tous les messages que vous enverrez maintenant seront visibles par nos conseillers. Un conseiller prendra en charge votre conversation dans les plus brefs délais.",
        sender: "bot",
        timestamp: new Date(Date.now() + 100),
      }

      setMessages((prev) => [...prev, botResponse, infoMessage])
      setIsTyping(false)
      setNeedsHumanHelp(true)
      setAdminResponding(true)

      // Enregistrer la demande d'aide humaine avec toutes les informations nécessaires
      if (conversationId) {
        const conversationData = {
          conversationId,
          messages: [...messages, userMessage, botResponse, infoMessage],
          userId: user?.id || "anonymous",
          userName: user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "Utilisateur anonyme",
          userEmail: user?.email || "",
          userPhone: user?.phone || "",
          status: "pending",
          priority: "medium",
          createdAt: new Date(),
        }

        chatService
          .requestHumanHelp(user?.id || "anonymous", conversationData)
          .then((response) => {
            console.log("Demande d'aide enregistrée:", response)
          })
          .catch((error) => {
            console.error("Erreur lors de l'enregistrement de la demande d'aide:", error)
          })
      }
    }, 1000)
  }

  const handleSendMessage = async (text = inputValue) => {
    if (!text.trim()) return

    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: Date.now(),
      text: text,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      // Mettre à jour le statut du message précédent après un court délai
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "delivered" } : msg)))
      }, 500)

      // Obtenir une réponse du bot ou du conseiller
      const response = await chatService.getBotResponse(text, needsHumanHelp, adminName)

      setTimeout(() => {
        // Mettre à jour le statut du message précédent
        setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "read" } : msg)))

        const botResponse = {
          id: Date.now() + 1,
          text: response.text,
          sender: response.isHuman ? "human" : "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)

        // Mettre à jour les suggestions en fonction de la réponse
        if (response.suggestions && response.suggestions.length > 0) {
          setSuggestions(response.suggestions)
          setShowSuggestions(true)
        }
      }, 1500) // Simuler un délai de réponse
    } catch (error) {
      console.error("Erreur lors de l'obtention de la réponse:", error)
      setIsTyping(false)

      // Message d'erreur
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Désolé, je rencontre des difficultés à traiter votre demande. Veuillez réessayer plus tard.",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      handleSendMessage()
    }
  }

  const handleCloseChat = () => {
    if (onClose) {
      onClose()
    } else {
      setIsOpen(false)
      // Réinitialiser l'état si nécessaire
      if (showWelcome === false) {
        setShowWelcome(true)
        setMessages([])
        setNeedsHumanHelp(false)
        setAdminResponding(false)
        setAdminName("")
      }
    }
  }

  const handleOpenChatFromPopup = () => {
    setShowPopup(false)
    setIsOpen(true)
    setUnreadCount(0)
    setHasNewMessages(false)
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Modifier la fonction handleContinueWithBot pour éviter la fermeture de la page
  const handleContinueWithBot = () => {
    setAdminResponding(false)

    // Ajouter un message du système
    const systemMessage = {
      id: Date.now(),
      text: "Vous avez choisi de continuer avec l'assistant virtuel. Votre demande d'aide humaine reste enregistrée et un conseiller vous répondra dès que possible.",
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, systemMessage])
  }

  // Modifier la fonction handleCancelHumanRequest pour éviter la fermeture de la page
  const handleCancelHumanRequest = () => {
    setAdminResponding(false)
    setNeedsHumanHelp(false)

    // Ajouter un message du système
    const systemMessage = {
      id: Date.now(),
      text: "Vous avez annulé votre demande d'aide humaine. Je reste à votre disposition pour répondre à vos questions.",
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, systemMessage])

    // Informer le service que la demande a été annulée
    if (conversationId) {
      chatService.cancelHumanHelpRequest(conversationId).catch((error) => {
        console.error("Erreur lors de l'annulation de la demande d'aide:", error)
      })
    }
  }

  // Rendu du bouton de chat flottant
  if (!onClose) {
    return (
      <>
        {/* Bouton du chatbot */}
        <ChatButton onClick={handleToggleChat} hasNotification={hasNewMessages}>
          {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
          {unreadCount > 0 && !isOpen && <NotificationBadge>{unreadCount}</NotificationBadge>}
        </ChatButton>

        {/* Popup de notification */}
        <AnimatePresence>
          {showPopup && !isOpen && (
            <ChatPopup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <PopupHeader>
                <FiBell size={16} color="#ff6b6b" />
                <PopupTitle>Nouveau message</PopupTitle>
              </PopupHeader>
              <PopupMessage>
                {needsHumanHelp && adminName
                  ? `${adminName}, votre conseiller, vous a répondu.`
                  : "Vous avez un nouveau message de l'assistant CEM."}
              </PopupMessage>
              <PopupButton onClick={handleOpenChatFromPopup}>
                Voir le message
                <FiArrowRight size={14} />
              </PopupButton>
            </ChatPopup>
          )}
        </AnimatePresence>

        {/* Fenêtre du chatbot */}
        <AnimatePresence>
          {isOpen && (
            <ChatContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {showWelcome ? (
                <WelcomeScreen>
                  <WelcomeLogo>CEM</WelcomeLogo>
                  <WelcomeTitle>Bienvenue sur l'assistant CEM</WelcomeTitle>
                  <WelcomeText>
                    Notre assistant virtuel est là pour répondre à vos questions et vous aider dans vos démarches.
                  </WelcomeText>
                  <StartChatButton onClick={handleStartChat}>
                    Démarrer une conversation
                    <FiMessageSquare size={16} />
                  </StartChatButton>
                </WelcomeScreen>
              ) : (
                <>
                  <ChatHeader>
                    <ChatTitle>
                      <FiMessageSquare size={18} />
                      {needsHumanHelp && adminName ? `Chat avec ${adminName}` : "Assistant CEM"}
                    </ChatTitle>
                    <CloseButton onClick={handleCloseChat}>
                      <FiX size={20} />
                    </CloseButton>
                  </ChatHeader>

                  <ChatMessages>
                    {messages.map((message) => (
                      <MessageBubble key={message.id} sender={message.sender}>
                        {message.text}
                        <MessageTime>{formatTime(message.timestamp)}</MessageTime>
                        {message.sender === "user" && message.status && (
                          <MessageStatus status={message.status}>
                            {message.status === "sent" && "Envoyé"}
                            {message.status === "delivered" && "Délivré"}
                            {message.status === "read" && (
                              <>
                                <FiCheck size={12} />
                                <FiCheck size={12} style={{ marginLeft: "-4px" }} />
                              </>
                            )}
                          </MessageStatus>
                        )}
                      </MessageBubble>
                    ))}

                    {isTyping && (
                      <TypingIndicator>
                        <TypingDot delay="0s" />
                        <TypingDot delay="0.2s" />
                        <TypingDot delay="0.4s" />
                      </TypingIndicator>
                    )}

                    {adminResponding && (
                      <AdminRequestContainer>
                        <AdminRequestTitle>
                          <FiUser size={14} />
                          Un conseiller est en train de vous répondre
                        </AdminRequestTitle>
                        <p style={{ fontSize: "0.8rem", margin: "0 0 0.5rem 0" }}>
                          Votre demande a été transmise à nos conseillers. Un conseiller vous répondra dans les plus
                          brefs délais.
                        </p>
                        <AdminRequestOptions>
                          <AdminRequestButton primary onClick={handleContinueWithBot}>
                            Continuer avec le bot
                          </AdminRequestButton>
                          <AdminRequestButton onClick={handleCancelHumanRequest}>Annuler</AdminRequestButton>
                        </AdminRequestOptions>
                      </AdminRequestContainer>
                    )}

                    <div ref={messagesEndRef} />
                  </ChatMessages>

                  {showSuggestions && suggestions.length > 0 && (
                    <SuggestionsContainer>
                      <SuggestionsList>
                        {suggestions.map((suggestion, index) => (
                          <SuggestionButton key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                            <FiChevronRight size={12} />
                          </SuggestionButton>
                        ))}
                      </SuggestionsList>
                    </SuggestionsContainer>
                  )}

                  <ChatInputContainer>
                    <ChatInputForm onSubmit={handleSubmit}>
                      <ChatInput
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Tapez votre message..."
                      />
                      <SendButton type="submit" disabled={!inputValue.trim()}>
                        <FiSend size={16} />
                      </SendButton>
                    </ChatInputForm>
                  </ChatInputContainer>
                </>
              )}
            </ChatContainer>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Rendu du chat intégré (sans bouton flottant)
  return (
    <ChatContainer>
      {showWelcome ? (
        <WelcomeScreen>
          <WelcomeLogo>CEM</WelcomeLogo>
          <WelcomeTitle>Bienvenue sur l'assistant CEM</WelcomeTitle>
          <WelcomeText>
            Notre assistant virtuel est là pour répondre à vos questions et vous aider dans vos démarches.
          </WelcomeText>
          <StartChatButton onClick={handleStartChat}>
            Démarrer une conversation
            <FiMessageSquare size={16} />
          </StartChatButton>
        </WelcomeScreen>
      ) : (
        <>
          <ChatHeader>
            <ChatTitle>
              <FiMessageSquare size={18} />
              {needsHumanHelp && adminName ? `Chat avec ${adminName}` : "Assistant CEM"}
            </ChatTitle>
            <CloseButton onClick={handleCloseChat}>
              <FiX size={20} />
            </CloseButton>
          </ChatHeader>

          <ChatMessages>
            {messages.map((message) => (
              <MessageBubble key={message.id} sender={message.sender}>
                {message.text}
                <MessageTime>{formatTime(message.timestamp)}</MessageTime>
                {message.sender === "user" && message.status && (
                  <MessageStatus status={message.status}>
                    {message.status === "sent" && "Envoyé"}
                    {message.status === "delivered" && "Délivré"}
                    {message.status === "read" && (
                      <>
                        <FiCheck size={12} />
                        <FiCheck size={12} style={{ marginLeft: "-4px" }} />
                      </>
                    )}
                  </MessageStatus>
                )}
              </MessageBubble>
            ))}

            {isTyping && (
              <TypingIndicator>
                <TypingDot delay="0s" />
                <TypingDot delay="0.2s" />
                <TypingDot delay="0.4s" />
              </TypingIndicator>
            )}

            {adminResponding && (
              <AdminRequestContainer>
                <AdminRequestTitle>
                  <FiUser size={14} />
                  Un conseiller est en train de vous répondre
                </AdminRequestTitle>
                <p style={{ fontSize: "0.8rem", margin: "0 0 0.5rem 0" }}>
                  Votre demande a été transmise à nos conseillers. Un conseiller vous répondra dans les plus brefs
                  délais.
                </p>
                <AdminRequestOptions>
                  <AdminRequestButton primary onClick={handleContinueWithBot}>
                    Continuer avec le bot
                  </AdminRequestButton>
                  <AdminRequestButton onClick={handleCancelHumanRequest}>Annuler</AdminRequestButton>
                </AdminRequestOptions>
              </AdminRequestContainer>
            )}

            <div ref={messagesEndRef} />
          </ChatMessages>

          {showSuggestions && suggestions.length > 0 && (
            <SuggestionsContainer>
              <SuggestionsList>
                {suggestions.map((suggestion, index) => (
                  <SuggestionButton key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                    <FiChevronRight size={12} />
                  </SuggestionButton>
                ))}
              </SuggestionsList>
            </SuggestionsContainer>
          )}

          <ChatInputContainer>
            <ChatInputForm onSubmit={handleSubmit}>
              <ChatInput
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Tapez votre message..."
              />
              <SendButton type="submit" disabled={!inputValue.trim()}>
                <FiSend size={17} />
              </SendButton>
            </ChatInputForm>
          </ChatInputContainer>
        </>
      )}
    </ChatContainer>
  )
}

export default ChatBot

