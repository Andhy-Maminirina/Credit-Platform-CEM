"import { api } from \"./api"

// Service pour les opérations spécifiques à l'administrateur technique
export const adminService = {
  // Obtenir les statistiques du tableau de bord technique
  getTechnicalDashboardStats: (period) => api.get("/admin/technical/dashboard-stats", { params: { period } }),

  // Mettre à jour les paramètres de crédit
  updateCreditSettings: (data) => api.put("/admin/technical/credit-settings", data),

  // Obtenir les paramètres de crédit
  getCreditSettings: () => api.get("/admin/technical/credit-settings"),

  // Obtenir tous les comptes admin
  getAllAdminAccounts: (filters) => api.get("/admin/technical/admin-accounts", { params: filters }),

  // Créer un compte admin
  createAdminAccount: (data) => api.post("/auth/admin/register", data),

  // Supprimer un compte admin
  deleteAdminAccount: (id) => api.delete(`/admin/technical/admin-accounts/${id}`),
}

+