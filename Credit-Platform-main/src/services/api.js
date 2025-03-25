import axios from "axios"

// Créer une instance axios avec l'URL de base de l'API
export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Gérer les erreurs 401 (non autorisé)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Service pour les demandes de crédit
export const creditService = {
  // Simuler un crédit
  simulateCredit: (data) => api.post("/credits/simulate", data),

  // Soumettre une demande de crédit
  submitCreditRequest: (data) => api.post("/credits/request", data),

  // Obtenir les détails d'une demande de crédit
  getCreditRequest: (id) => api.get(`/credits/request/${id}`),

  // Obtenir toutes les demandes de crédit d'un utilisateur
  getUserCreditRequests: () => api.get("/credits/user-requests"),

  // Obtenir toutes les demandes de crédit (admin)
  getAllCreditRequests: (filters) => api.get("/credits/all-requests", { params: filters }),

  // Mettre à jour le statut d'une demande de crédit (admin)
  updateCreditRequestStatus: (id, status, comment) => api.put(`/credits/request/${id}/status`, { status, comment }),
}

// Service pour les utilisateurs
export const userService = {
  // Obtenir le profil de l'utilisateur
  getProfile: () => api.get("/users/profile"),

  // Mettre à jour le profil de l'utilisateur
  updateProfile: (data) => api.put("/users/profile", data),

  // Obtenir tous les utilisateurs (admin)
  getAllUsers: (filters) => api.get("/users", { params: filters }),

  // Activer/désactiver un utilisateur (admin)
  toggleUserStatus: (id, active) => api.put(`/users/${id}/status`, { active }),

  // Obtenir les détails d'un utilisateur (admin)
  getUserDetails: (id) => api.get(`/users/${id}`),

  // Ajout de la fonction deleteUser
  deleteUser: (id) => api.delete(`/users/${id}`),
}

// Service pour les produits de crédit
export const productService = {
  // Obtenir tous les produits de crédit
  getAllProducts: () => api.get("/products"),

  // Obtenir un produit de crédit par son ID
  getProduct: (id) => api.get(`/products/${id}`),

  // Mettre à jour un produit de crédit (admin)
  updateProduct: (id, data) => api.put(`/products/${id}`, data),

  // Obtenir les taux d'intérêt
  getInterestRates: () => api.get("/products/interest-rates"),

  // Mettre à jour les taux d'intérêt (admin)
  updateInterestRates: (data) => api.put("/products/interest-rates", data),
}

// Service pour les statistiques
export const statsService = {
  // Obtenir les statistiques du tableau de bord (admin)
  getDashboardStats: () => api.get("/stats/dashboard"),

  // Obtenir les statistiques des demandes de crédit par type (admin)
  getCreditTypeStats: (period) => api.get("/stats/credit-types", { params: { period } }),

  // Obtenir l'évolution des demandes de crédit (admin)
  getCreditEvolutionStats: (period) => api.get("/stats/credit-evolution", { params: { period } }),
}

// Service pour les notifications
export const notificationService = {
  // Obtenir toutes les notifications de l'utilisateur
  getUserNotifications: () => api.get("/notifications"),

  // Marquer une notification comme lue
  markAsRead: (id) => api.put(`/notifications/${id}/read`),

  // Marquer toutes les notifications comme lues
  markAllAsRead: () => api.put("/notifications/read-all"),

  // Envoyer une notification à un utilisateur (admin)
  sendNotification: (userId, data) => api.post(`/notifications/send/${userId}`, data),
}

