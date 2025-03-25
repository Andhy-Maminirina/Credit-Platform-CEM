"use client"

import { createContext, useContext, useState } from "react"

const NotificationContext = createContext()

export const useNotification = () => {
  return useContext(NotificationContext)
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [visible, setVisible] = useState(false)
  const [currentNotification, setCurrentNotification] = useState(null)

  // Ajouter une notification
  const addNotification = (notification) => {
    const id = Date.now()
    const newNotification = {
      id,
      ...notification,
      read: false,
      date: new Date(),
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Afficher la notification
    setCurrentNotification(newNotification)
    setVisible(true)

    // Masquer la notification après 5 secondes
    setTimeout(() => {
      setVisible(false)
    }, 5000)

    return id
  }

  // Marquer une notification comme lue
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  // Supprimer une notification
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Masquer la notification actuelle
  const hideNotification = () => {
    setVisible(false)
  }

  const value = {
    notifications,
    visible,
    currentNotification,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    hideNotification,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

