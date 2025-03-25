"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { theme } from "../../styles/theme"
import { Link } from "react-router-dom"
import {
  FiArrowLeft,
  FiBell,
  FiCreditCard,
  FiMessageSquare,
  FiFileText,
  FiAlertCircle,
  FiCheck,
  FiX,
  FiClock,
  FiCalendar,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi"

const NotificationsContainer = styled.div`
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  
  .header-left {
    display: flex;
    align-items: center;
  }
  
  .back-link {
    display: inline-flex;
    align-items: center;
    color: ${theme.colors.primary[600]};
    font-size: 0.875rem;
    font-weight: 500;
    margin-right: 1.5rem;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
    
    .back-icon {
      margin-right: 0.5rem;
    }
  }
  
  .page-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.25rem;
  }
  
  .page-description {
    font-size: 0.875rem;
    color: #6B7280;
  }
  
  .header-actions {
    display: flex;
    gap: 1rem;
    
    .action-button {
      padding: 0.5rem;
      background-color: white;
      border: 1px solid #E5E7EB;
      border-radius: 0.375rem;
      color: #6B7280;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: #F9FAFB;
        color: #111827;
      }
      
      &.danger:hover {
        color: #DC2626;
        border-color: #FCA5A5;
      }
    }
  }
`

const NotificationsContent = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

const NotificationsHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .header-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
  }
  
  .header-actions {
    display: flex;
    gap: 0.75rem;
    
    .action-link {
      font-size: 0.875rem;
      color: ${theme.colors.primary[600]};
      text-decoration: none;
      cursor: pointer;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`

const NotificationsList = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  
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

const NotificationGroup = styled.div`
  .group-header {
    padding: 0.75rem 1.5rem;
    background-color: #F9FAFB;
    font-size: 0.75rem;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`

const NotificationItem = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: flex-start;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #F9FAFB;
  }
  
  &.unread {
    background-color: rgba(59, 130, 246, 0.05);
    
    &:hover {
      background-color: rgba(59, 130, 246, 0.1);
    }
    
    .notification-content .notification-title {
      font-weight: 600;
    }
  }
  
  .notification-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    flex-shrink: 0;
    
    &.credit {
      background-color: ${theme.colors.primary[50]};
      color: ${theme.colors.primary[600]};
    }
    
    &.message {
      background-color: #EFF6FF;
      color: #2563EB;
    }
    
    &.document {
      background-color: #F0FDF4;
      color: #16A34A;
    }
    
    &.alert {
      background-color: #FEF2F2;
      color: #DC2626;
    }
    
    &.reminder {
      background-color: #FFF7ED;
      color: #EA580C;
    }
  }
  
  .notification-content {
    flex: 1;
    
    .notification-title {
      font-size: 0.875rem;
      color: #111827;
      margin-bottom: 0.25rem;
    }
    
    .notification-description {
      font-size: 0.875rem;
      color: #6B7280;
      margin-bottom: 0.5rem;
    }
    
    .notification-meta {
      display: flex;
      align-items: center;
      font-size: 0.75rem;
      color: #9CA3AF;
      
      .meta-item {
        display: flex;
        align-items: center;
        margin-right: 1rem;
        
        .meta-icon {
          margin-right: 0.25rem;
        }
      }
    }
  }
  
  .notification-actions {
    display: flex;
    gap: 0.5rem;
    margin-left: 1rem;
    
    .action-button {
      padding: 0.25rem;
      background: none;
      border: none;
      color: #9CA3AF;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        color: #111827;
      }
      
      &.mark-read:hover {
        color: #16A34A;
      }
      
      &.delete:hover {
        color: #DC2626;
      }
    }
  }
`

const EmptyState = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  
  .empty-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: #F3F4F6;
    color: #9CA3AF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
  }
  
  .empty-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.5rem;
  }
  
  .empty-description {
    font-size: 0.875rem;
    color: #6B7280;
    max-width: 400px;
    margin: 0 auto;
  }
`

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  background-color: #F9FAFB;
  
  .filter-label {
    font-size: 0.875rem;
    color: #6B7280;
    margin-right: 1rem;
  }
  
  .filter-options {
    display: flex;
    gap: 0.5rem;
    
    .filter-option {
      padding: 0.375rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &.active {
        background-color: ${theme.colors.primary[600]};
        color: white;
      }
      
      &:not(.active) {
        background-color: white;
        color: #6B7280;
        border: 1px solid #E5E7EB;
        
        &:hover {
          background-color: #F3F4F6;
          color: #111827;
        }
      }
    }
  }
`

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-top: 1px solid #E5E7EB;
  
  .pagination-info {
    font-size: 0.875rem;
    color: #6B7280;
  }
  
  .pagination-controls {
    display: flex;
    gap: 0.5rem;
    
    .pagination-button {
      padding: 0.375rem 0.75rem;
      border: 1px solid #E5E7EB;
      border-radius: 0.375rem;
      background-color: white;
      font-size: 0.875rem;
      color: #6B7280;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover:not(:disabled) {
        background-color: #F9FAFB;
        color: #111827;
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      &.active {
        background-color: ${theme.colors.primary[600]};
        color: white;
        border-color: ${theme.colors.primary[600]};
      }
    }
  }
`

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Données fictives pour les notifications
  useEffect(() => {
    // Simuler le chargement des notifications
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          type: "credit",
          title: "Demande de crédit approuvée",
          description: "Votre demande de crédit SAFIDY a été approuvée.",
          date: "2023-03-15T10:30:00",
          read: false,
          reference: "CR-2023-001",
          link: "/client/credit-details/CR-2023-001",
        },
        {
          id: 2,
          type: "message",
          title: "Nouveau message",
          description: "Vous avez reçu un nouveau message de votre conseiller.",
          date: "2023-03-15T09:45:00",
          read: false,
          link: "/client/chat",
        },
        {
          id: 3,
          type: "document",
          title: "Document requis",
          description: "Veuillez fournir votre dernier bulletin de salaire.",
          date: "2023-03-14T14:20:00",
          read: true,
          reference: "CR-2023-001",
          link: "/client/credit-details/CR-2023-001",
        },
        {
          id: 4,
          type: "alert",
          title: "Échéance de paiement",
          description: "Votre prochaine échéance de crédit est dans 5 jours.",
          date: "2023-03-14T11:15:00",
          read: true,
          reference: "CR-2022-045",
          link: "/client/credit-details/CR-2022-045",
        },
        {
          id: 5,
          type: "credit",
          title: "Demande de crédit en cours d'analyse",
          description: "Votre demande de crédit AVOTRA AINGA est en cours d'analyse.",
          date: "2023-03-13T16:30:00",
          read: true,
          reference: "CR-2023-002",
          link: "/client/credit-details/CR-2023-002",
        },
        {
          id: 6,
          type: "reminder",
          title: "Rendez-vous à venir",
          description: "Rappel : Vous avez un rendez-vous avec votre conseiller demain à 14h00.",
          date: "2023-03-12T09:00:00",
          read: true,
          link: "/client/appointments",
        },
        {
          id: 7,
          type: "document",
          title: "Documents disponibles",
          description: "Les documents relatifs à votre crédit sont disponibles.",
          date: "2023-03-10T15:45:00",
          read: true,
          reference: "CR-2022-045",
          link: "/client/documents",
        },
        {
          id: 8,
          type: "credit",
          title: "Demande de crédit soumise",
          description: "Votre demande de crédit SAFIDY a été soumise avec succès.",
          date: "2023-03-08T11:20:00",
          read: true,
          reference: "CR-2023-001",
          link: "/client/credit-details/CR-2023-001",
        },
        {
          id: 9,
          type: "message",
          title: "Nouveau message",
          description: "Vous avez reçu un nouveau message concernant votre demande de crédit.",
          date: "2023-03-07T14:10:00",
          read: true,
          link: "/client/chat",
        },
        {
          id: 10,
          type: "alert",
          title: "Mise à jour des conditions",
          description: "Les conditions générales de nos services ont été mises à jour.",
          date: "2023-03-05T08:30:00",
          read: true,
          link: "/client/terms",
        },
        {
          id: 11,
          type: "credit",
          title: "Demande de crédit refusée",
          description: "Votre demande de crédit AVOTRA MIHARY a été refusée.",
          date: "2023-03-01T16:45:00",
          read: true,
          reference: "CR-2023-003",
          link: "/client/credit-details/CR-2023-003",
        },
        {
          id: 12,
          type: "document",
          title: "Document expiré",
          description: "Votre pièce d'identité a expiré. Veuillez la mettre à jour.",
          date: "2023-02-28T10:15:00",
          read: true,
          link: "/client/profile/documents",
        },
      ])
      setLoading(false)
    }, 1500)
  }, [])

  // Filtrer les notifications
  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "all") return true
    if (activeFilter === "unread") return !notification.read
    return notification.type === activeFilter
  })

  // Paginer les notifications
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  // Grouper les notifications par date
  const groupNotificationsByDate = () => {
    const groups = {
      today: [],
      yesterday: [],
      thisWeek: [],
      thisMonth: [],
      older: [],
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const thisWeekStart = new Date(today)
    thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay())

    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)

    paginatedNotifications.forEach((notification) => {
      const notificationDate = new Date(notification.date)

      if (notificationDate >= today) {
        groups.today.push(notification)
      } else if (notificationDate >= yesterday) {
        groups.yesterday.push(notification)
      } else if (notificationDate >= thisWeekStart) {
        groups.thisWeek.push(notification)
      } else if (notificationDate >= thisMonthStart) {
        groups.thisMonth.push(notification)
      } else {
        groups.older.push(notification)
      }
    })

    return groups
  }

  const notificationGroups = groupNotificationsByDate()

  // Marquer une notification comme lue
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Supprimer une notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  // Marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  // Supprimer toutes les notifications lues
  const deleteAllRead = () => {
    setNotifications(notifications.filter((notification) => !notification.read))
  }

  // Obtenir l'icône correspondant au type de notification
  const getNotificationIcon = (type) => {
    switch (type) {
      case "credit":
        return <FiCreditCard size={20} />
      case "message":
        return <FiMessageSquare size={20} />
      case "document":
        return <FiFileText size={20} />
      case "alert":
        return <FiAlertCircle size={20} />
      case "reminder":
        return <FiClock size={20} />
      default:
        return <FiBell size={20} />
    }
  }

  // Formater la date relative
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) {
      return "À l'instant"
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""}`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? "s" : ""}`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) {
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? "s" : ""}`
    }

    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
  }

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage)

  // Générer les boutons de pagination
  const generatePaginationButtons = () => {
    const buttons = []

    // Bouton précédent
    buttons.push(
      <button
        key="prev"
        className="pagination-button"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Précédent
      </button>,
    )

    // Boutons de page
    const maxButtons = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2))
    const endPage = Math.min(totalPages, startPage + maxButtons - 1)

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>,
      )
    }

    // Bouton suivant
    buttons.push(
      <button
        key="next"
        className="pagination-button"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>,
    )

    return buttons
  }

  // Afficher un indicateur de chargement
  if (loading) {
    return (
      <NotificationsContainer>
        <PageHeader>
          <div className="header-left">
            <Link to="/client/dashboard" className="back-link">
              <FiArrowLeft className="back-icon" size={16} />
              Retour au tableau de bord
            </Link>
            <h1 className="page-title">Notifications</h1>
          </div>
        </PageHeader>

        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </NotificationsContainer>
    )
  }

  return (
    <NotificationsContainer>
      <PageHeader>
        <div className="header-left">
          <Link to="/client/dashboard" className="back-link">
            <FiArrowLeft className="back-icon" size={16} />
            Retour au tableau de bord
          </Link>
          <div>
            <h1 className="page-title">Notifications</h1>
            <p className="page-description">Gérez vos notifications et restez informé</p>
          </div>
        </div>

        <div className="header-actions">
          <button className="action-button" onClick={markAllAsRead} title="Tout marquer comme lu">
            <FiCheckCircle size={18} />
          </button>
          <button className="action-button danger" onClick={deleteAllRead} title="Supprimer les notifications lues">
            <FiTrash2 size={18} />
          </button>
        </div>
      </PageHeader>

      <NotificationsContent>
        <NotificationsHeader>
          <div className="header-title">
            Toutes les notifications
            {filteredNotifications.filter((n) => !n.read).length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                {filteredNotifications.filter((n) => !n.read).length}
              </span>
            )}
          </div>
          <div className="header-actions">
            <span className="action-link" onClick={markAllAsRead}>
              Tout marquer comme lu
            </span>
          </div>
        </NotificationsHeader>

        <FilterBar>
          <div className="filter-label">Filtrer par :</div>
          <div className="filter-options">
            <div
              className={`filter-option ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              Toutes
            </div>
            <div
              className={`filter-option ${activeFilter === "unread" ? "active" : ""}`}
              onClick={() => setActiveFilter("unread")}
            >
              Non lues
            </div>
            <div
              className={`filter-option ${activeFilter === "credit" ? "active" : ""}`}
              onClick={() => setActiveFilter("credit")}
            >
              Crédits
            </div>
            <div
              className={`filter-option ${activeFilter === "message" ? "active" : ""}`}
              onClick={() => setActiveFilter("message")}
            >
              Messages
            </div>
            <div
              className={`filter-option ${activeFilter === "document" ? "active" : ""}`}
              onClick={() => setActiveFilter("document")}
            >
              Documents
            </div>
          </div>
        </FilterBar>

        {filteredNotifications.length === 0 ? (
          <EmptyState>
            <div className="empty-icon">
              <FiBell size={24} />
            </div>
            <h3 className="empty-title">Aucune notification</h3>
            <p className="empty-description">
              Vous n'avez aucune notification pour le moment. Revenez plus tard pour voir les mises à jour.
            </p>
          </EmptyState>
        ) : (
          <>
            <NotificationsList>
              {notificationGroups.today.length > 0 && (
                <NotificationGroup>
                  <div className="group-header">Aujourd'hui</div>
                  {notificationGroups.today.map((notification) => (
                    <NotificationItem key={notification.id} className={notification.read ? "" : "unread"}>
                      <div className={`notification-icon ${notification.type}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="notification-content">
                        <div className="notification-title">{notification.title}</div>
                        <div className="notification-description">{notification.description}</div>
                        <div className="notification-meta">
                          <div className="meta-item">
                            <FiClock className="meta-icon" size={12} />
                            {formatRelativeTime(notification.date)}
                          </div>
                          {notification.reference && (
                            <div className="meta-item">
                              <FiCreditCard className="meta-icon" size={12} />
                              {notification.reference}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="notification-actions">
                        {!notification.read && (
                          <button
                            className="action-button mark-read"
                            onClick={() => markAsRead(notification.id)}
                            title="Marquer comme lu"
                          >
                            <FiCheck size={16} />
                          </button>
                        )}
                        <button
                          className="action-button delete"
                          onClick={() => deleteNotification(notification.id)}
                          title="Supprimer"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    </NotificationItem>
                  ))}
                </NotificationGroup>
              )}

              {notificationGroups.yesterday.length > 0 && (
                <NotificationGroup>
                  <div className="group-header">Hier</div>
                  {notificationGroups.yesterday.map((notification) => (
                    <NotificationItem key={notification.id} className={notification.read ? "" : "unread"}>
                      <div className={`notification-icon ${notification.type}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="notification-content">
                        <div className="notification-title">{notification.title}</div>
                        <div className="notification-description">{notification.description}</div>
                        <div className="notification-meta">
                          <div className="meta-item">
                            <FiClock className="meta-icon" size={12} />
                            {formatRelativeTime(notification.date)}
                          </div>
                          {notification.reference && (
                            <div className="meta-item">
                              <FiCreditCard className="meta-icon" size={12} />
                              {notification.reference}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="notification-actions">
                        {!notification.read && (
                          <button
                            className="action-button mark-read"
                            onClick={() => markAsRead(notification.id)}
                            title="Marquer comme lu"
                          >
                            <FiCheck size={16} />
                          </button>
                        )}
                        <button
                          className="action-button delete"
                          onClick={() => deleteNotification(notification.id)}
                          title="Supprimer"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    </NotificationItem>
                  ))}
                </NotificationGroup>
              )}

              {notificationGroups.thisWeek.length > 0 && (
                <NotificationGroup>
                  <div className="group-header">Cette semaine</div>
                  {notificationGroups.thisWeek.map((notification) => (
                    <NotificationItem key={notification.id} className={notification.read ? "" : "unread"}>
                      <div className={`notification-icon ${notification.type}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="notification-content">
                        <div className="notification-title">{notification.title}</div>
                        <div className="notification-description">{notification.description}</div>
                        <div className="notification-meta">
                          <div className="meta-item">
                            <FiCalendar className="meta-icon" size={12} />
                            {new Date(notification.date).toLocaleDateString("fr-FR", { weekday: "long" })}
                          </div>
                          {notification.reference && (
                            <div className="meta-item">
                              <FiCreditCard className="meta-icon" size={12} />
                              {notification.reference}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="notification-actions">
                        {!notification.read && (
                          <button
                            className="action-button mark-read"
                            onClick={() => markAsRead(notification.id)}
                            title="Marquer comme lu"
                          >
                            <FiCheck size={16} />
                          </button>
                        )}
                        <button
                          className="action-button delete"
                          onClick={() => deleteNotification(notification.id)}
                          title="Supprimer"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    </NotificationItem>
                  ))}
                </NotificationGroup>
              )}

              {notificationGroups.thisMonth.length > 0 && (
                <NotificationGroup>
                  <div className="group-header">Ce mois-ci</div>
                  {notificationGroups.thisMonth.map((notification) => (
                    <NotificationItem key={notification.id} className={notification.read ? "" : "unread"}>
                      <div className={`notification-icon ${notification.type}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="notification-content">
                        <div className="notification-title">{notification.title}</div>
                        <div className="notification-description">{notification.description}</div>
                        <div className="notification-meta">
                          <div className="meta-item">
                            <FiCalendar className="meta-icon" size={12} />
                            {new Date(notification.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                          </div>
                          {notification.reference && (
                            <div className="meta-item">
                              <FiCreditCard className="meta-icon" size={12} />
                              {notification.reference}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="notification-actions">
                        {!notification.read && (
                          <button
                            className="action-button mark-read"
                            onClick={() => markAsRead(notification.id)}
                            title="Marquer comme lu"
                          >
                            <FiCheck size={16} />
                          </button>
                        )}
                        <button
                          className="action-button delete"
                          onClick={() => deleteNotification(notification.id)}
                          title="Supprimer"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    </NotificationItem>
                  ))}
                </NotificationGroup>
              )}

              {notificationGroups.older.length > 0 && (
                <NotificationGroup>
                  <div className="group-header">Plus ancien</div>
                  {notificationGroups.older.map((notification) => (
                    <NotificationItem key={notification.id} className={notification.read ? "" : "unread"}>
                      <div className={`notification-icon ${notification.type}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="notification-content">
                        <div className="notification-title">{notification.title}</div>
                        <div className="notification-description">{notification.description}</div>
                        <div className="notification-meta">
                          <div className="meta-item">
                            <FiCalendar className="meta-icon" size={12} />
                            {new Date(notification.date).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </div>
                          {notification.reference && (
                            <div className="meta-item">
                              <FiCreditCard className="meta-icon" size={12} />
                              {notification.reference}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="notification-actions">
                        {!notification.read && (
                          <button
                            className="action-button mark-read"
                            onClick={() => markAsRead(notification.id)}
                            title="Marquer comme lu"
                          >
                            <FiCheck size={16} />
                          </button>
                        )}
                        <button
                          className="action-button delete"
                          onClick={() => deleteNotification(notification.id)}
                          title="Supprimer"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    </NotificationItem>
                  ))}
                </NotificationGroup>
              )}
            </NotificationsList>

            {totalPages > 1 && (
              <Pagination>
                <div className="pagination-info">
                  Affichage de {(currentPage - 1) * itemsPerPage + 1} à{" "}
                  {Math.min(currentPage * itemsPerPage, filteredNotifications.length)} sur{" "}
                  {filteredNotifications.length} notifications
                </div>
                <div className="pagination-controls">{generatePaginationButtons()}</div>
              </Pagination>
            )}
          </>
        )}
      </NotificationsContent>
    </NotificationsContainer>
  )
}

export default Notifications

