"use client"
import { Link } from "react-router-dom"
import { FiUser, FiFileText, FiCheck, FiX, FiClock, FiBell } from "react-icons/fi"

const NotificationDropdown = () => {
  // Données de notification fictives
  const notifications = [
    {
      id: 1,
      type: "credit_request",
      message: "Nouvelle demande de crédit de Jean Dupont",
      time: "5 minutes",
      read: false,
    },
    {
      id: 2,
      type: "user_registration",
      message: "Marie Rakoto vient de créer un compte",
      time: "1 heure",
      read: false,
    },
    {
      id: 3,
      type: "credit_approved",
      message: "Demande de crédit #12345 approuvée",
      time: "3 heures",
      read: true,
    },
  ]

  const getIcon = (type) => {
    switch (type) {
      case "credit_request":
        return <FiFileText className="text-primary-700" />
      case "user_registration":
        return <FiUser className="text-blue-500" />
      case "credit_approved":
        return <FiCheck className="text-green-500" />
      case "credit_rejected":
        return <FiX className="text-red-500" />
      case "credit_pending":
        return <FiClock className="text-yellow-500" />
      default:
        return <FiBell className="text-gray-500" />
    }
  }

  const markAllAsRead = () => {
    // Implémenter la logique pour marquer toutes les notifications comme lues
    console.log("Marquer toutes les notifications comme lues")
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
      <div className="py-2">
        <div className="px-4 py-2 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
            <button onClick={markAllAsRead} className="text-xs text-primary-700 hover:text-primary-800">
              Tout marquer comme lu
            </button>
          </div>
        </div>

        <div className="max-h-60 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-4 py-6 text-center text-gray-500">
              <FiBell className="mx-auto h-6 w-6 text-gray-400" />
              <p className="mt-1 text-sm">Aucune notification</p>
            </div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-gray-50 ${notification.read ? "" : "bg-blue-50"}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>
                    <div className="ml-3 w-0 flex-1">
                      <p className={`text-sm ${notification.read ? "text-gray-600" : "text-gray-900 font-medium"}`}>
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">Il y a {notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-gray-200">
          <Link to="/admin/notifications" className="block text-center text-sm text-primary-700 hover:text-primary-800">
            Voir toutes les notifications
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotificationDropdown

