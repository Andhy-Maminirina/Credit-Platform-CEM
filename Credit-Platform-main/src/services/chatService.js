// Service pour gérer les conversations de chat
const chatService = {
  // Récupérer les conversations pour l'administrateur
  getAdminConversations: async (page = 1, limit = 10, filters = {}) => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Générer des données de test
    const totalConversations = 24
    const totalPages = Math.ceil(totalConversations / limit)
    const startIndex = (page - 1) * limit
    const endIndex = Math.min(startIndex + limit, totalConversations)

    // Générer des conversations simulées
    const conversations = []
    for (let i = startIndex; i < endIndex; i++) {
      const status = ["pending", "active", "resolved"][Math.floor(Math.random() * 3)]
      const date = new Date()
      date.setDate(date.getDate() - Math.floor(Math.random() * 30))

      // Appliquer les filtres si nécessaire
      if (filters.status && filters.status !== status) {
        continue
      }

      conversations.push({
        id: `conv_${i + 1}`,
        userId: `user_${Math.floor(Math.random() * 100) + 1}`,
        userName: ["Jean Dupont", "Marie Martin", "Pierre Durand", "Sophie Lefebvre"][Math.floor(Math.random() * 4)],
        userEmail: ["jean@example.com", "marie@example.com", "pierre@example.com", "sophie@example.com"][
          Math.floor(Math.random() * 4)
        ],
        lastMessage: [
          "Bonjour, j'ai une question concernant mon crédit.",
          "Pouvez-vous me donner plus d'informations sur le taux d'intérêt ?",
          "Je n'arrive pas à soumettre ma demande de crédit.",
          "Merci pour votre aide !",
        ][Math.floor(Math.random() * 4)],
        status,
        unread: Math.random() > 0.7,
        createdAt: date,
        updatedAt: new Date(),
        assignedTo: status === "active" ? ["Marie", "Thomas", "Sophie", "Jean"][Math.floor(Math.random() * 4)] : null,
      })
    }

    return {
      conversations,
      pagination: {
        page,
        limit,
        totalPages,
        totalItems: totalConversations,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    }
  },

  // Récupérer une conversation spécifique
  getConversation: async (conversationId) => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Générer des données de test pour une conversation
    const userNames = ["Jean Dupont", "Marie Martin", "Pierre Durand", "Sophie Lefebvre"]
    const userName = userNames[Math.floor(Math.random() * userNames.length)]
    const userEmail = userName.toLowerCase().split(" ")[0] + "@example.com"
    const adminNames = ["Marie", "Thomas", "Sophie", "Jean"]
    const adminName = adminNames[Math.floor(Math.random() * adminNames.length)]

    // Générer des messages pour la conversation
    const messages = []
    const messageCount = Math.floor(Math.random() * 10) + 3
    const startDate = new Date()
    startDate.setHours(startDate.getHours() - messageCount)

    for (let i = 0; i < messageCount; i++) {
      const isUser = i % 2 === 0
      const messageDate = new Date(startDate)
      messageDate.setMinutes(messageDate.getMinutes() + i * 30)

      const userMessages = [
        "Bonjour, j'ai une question concernant mon crédit.",
        "Je souhaite savoir si je suis éligible pour un crédit SAFIDY.",
        "Quel est le taux d'intérêt pour un crédit de 5 millions Ar sur 24 mois ?",
        "Quels documents dois-je fournir pour ma demande ?",
        "Merci pour votre aide !",
      ]

      const adminMessages = [
        `Bonjour ${userName.split(" ")[0]}, comment puis-je vous aider aujourd'hui ?`,
        "Pour un crédit SAFIDY, vous devez être salarié ou fonctionnaire avec au moins 6 mois d'ancienneté.",
        "Le taux d'intérêt pour un crédit de 5 millions Ar sur 24 mois est de 1,85% par mois.",
        "Vous aurez besoin de votre pièce d'identité, vos 3 derniers bulletins de salaire, un justificatif de domicile et un RIB.",
        "Je vous en prie, n'hésitez pas si vous avez d'autres questions.",
      ]

      messages.push({
        id: `msg_${i + 1}`,
        text: isUser ? userMessages[i % userMessages.length] : adminMessages[i % adminMessages.length],
        sender: isUser ? "user" : i > 2 ? "human" : "bot",
        timestamp: messageDate,
        status: "read",
      })
    }

    return {
      id: conversationId,
      userId: `user_${Math.floor(Math.random() * 100) + 1}`,
      userName,
      userEmail,
      status: ["pending", "active", "resolved"][Math.floor(Math.random() * 3)],
      createdAt: startDate,
      updatedAt: new Date(),
      assignedTo: adminName,
      messages,
    }
  },

  // Récupérer les conversations d'un client
  getClientConversations: async (userId) => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Générer des données de test
    const conversationCount = Math.floor(Math.random() * 5) + 1
    const conversations = []

    for (let i = 0; i < conversationCount; i++) {
      const status = ["pending", "active", "resolved"][Math.floor(Math.random() * 3)]
      const date = new Date()
      date.setDate(date.getDate() - Math.floor(Math.random() * 30))

      conversations.push({
        id: `conv_${i + 1}`,
        lastMessage: [
          "Bonjour, j'ai une question concernant mon crédit.",
          "Pouvez-vous me donner plus d'informations sur le taux d'intérêt ?",
          "Je n'arrive pas à soumettre ma demande de crédit.",
          "Merci pour votre aide !",
        ][Math.floor(Math.random() * 4)],
        status,
        unread: Math.random() > 0.7,
        createdAt: date,
        updatedAt: new Date(),
        assignedTo: status === "active" ? ["Marie", "Thomas", "Sophie", "Jean"][Math.floor(Math.random() * 4)] : null,
      })
    }

    return conversations
  },

  // Envoyer un message
  sendMessage: async (conversationId, message) => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      id: `msg_${Date.now()}`,
      text: message.text,
      sender: message.sender,
      timestamp: new Date(),
      status: "sent",
    }
  },

  // Mettre à jour le statut d'une conversation
  updateConversationStatus: async (conversationId, status) => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      id: conversationId,
      status,
      updatedAt: new Date(),
    }
  },

  // Assigner une conversation à un conseiller
  assignConversation: async (conversationId, adminName) => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      id: conversationId,
      assignedTo: adminName,
      updatedAt: new Date(),
    }
  },

  // Demander de l'aide humaine
  requestHumanHelp: async (userId, conversationData) => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
      conversationId: conversationData.conversationId,
      status: "pending",
      message: "Votre demande a été transmise à nos conseillers.",
    }
  },

  // Annuler une demande d'aide humaine
  cancelHumanHelpRequest: async (conversationId) => {
    try {
      // Dans une implémentation réelle, ceci serait un appel API pour annuler
      // la demande d'aide dans la base de données

      console.log("Annulation de la demande d'aide pour la conversation:", conversationId)

      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Simuler une réponse réussie
      return {
        success: true,
        conversationId,
        message: "Demande d'aide annulée avec succès",
      }
    } catch (error) {
      console.error("Erreur lors de l'annulation de la demande d'aide:", error)
      throw error
    }
  },

  // Obtenir une réponse du bot
  getBotResponse: async (message, needsHumanHelp, adminName) => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 800))

    const lowerMessage = message.toLowerCase()

    // Si l'utilisateur a demandé de l'aide humaine et qu'un conseiller est assigné
    if (needsHumanHelp && adminName) {
      // Réponses personnalisées du conseiller
      if (lowerMessage.includes("merci")) {
        return {
          text: `Je vous en prie ! N'hésitez pas si vous avez d'autres questions. Je reste à votre disposition.`,
          isHuman: true,
          suggestions: ["J'ai une autre question", "Au revoir"],
        }
      } else if (
        lowerMessage.includes("crédit") ||
        lowerMessage.includes("demande") ||
        lowerMessage.includes("dossier")
      ) {
        return {
          text: `Pour votre demande de crédit, je vais avoir besoin de quelques informations supplémentaires. Pouvez-vous me préciser quel type de crédit vous intéresse (SAFIDY ou AVOTRA) et le montant approximatif que vous souhaitez emprunter ?`,
          isHuman: true,
          suggestions: ["SAFIDY - 5 millions Ar", "AVOTRA - 10 millions Ar", "Je ne sais pas encore"],
        }
      } else if (lowerMessage.includes("taux") || lowerMessage.includes("intérêt")) {
        return {
          text: `Les taux d'intérêt actuels sont de 1,85% pour SAFIDY et entre 1,5% et 2,2% pour AVOTRA selon le montant et la durée. Je peux vous faire une simulation personnalisée si vous me donnez plus de détails sur votre projet.`,
          isHuman: true,
          suggestions: [
            "Faire une simulation",
            "Quels sont les frais de dossier ?",
            "Durée maximale de remboursement ?",
          ],
        }
      } else {
        return {
          text: `Je comprends votre demande. Pour vous aider plus efficacement, pourriez-vous me donner plus de détails sur votre situation ? Par exemple, êtes-vous salarié, fonctionnaire ou entrepreneur ? Quel est l'objet de votre demande de financement ?`,
          isHuman: true,
          suggestions: ["Je suis salarié", "Je suis entrepreneur", "Je veux financer un projet personnel"],
        }
      }
    }

    // Réponses automatiques basées sur des mots-clés
    if (lowerMessage.includes("safidy")) {
      return {
        text: "Le crédit SAFIDY est destiné aux salariés et fonctionnaires. Il offre un taux d'intérêt avantageux de 1,85% et permet de financer vos projets personnels jusqu'à 24 mois.",
        isHuman: false,
        suggestions: [
          "Quels documents pour SAFIDY ?",
          "Comment calculer ma mensualité ?",
          "Puis-je faire une simulation ?",
        ],
      }
    } else if (lowerMessage.includes("avotra")) {
      return {
        text: "Le crédit AVOTRA est conçu pour les entrepreneurs et entreprises. Il permet de financer votre fonds de roulement ou vos investissements avec des montants allant de 300 000 Ar à plus de 50 000 000 Ar.",
        isHuman: false,
        suggestions: ["Critères d'éligibilité AVOTRA", "Durée maximale de remboursement", "Taux d'intérêt AVOTRA"],
      }
    } else if (
      lowerMessage.includes("document") ||
      lowerMessage.includes("pièce") ||
      lowerMessage.includes("dossier")
    ) {
      return {
        text: "Pour une demande de crédit, vous aurez besoin de : une pièce d'identité valide, un justificatif de domicile, vos 3 derniers bulletins de salaire, et un RIB. Pour les entrepreneurs, des documents supplémentaires comme le registre de commerce et les états financiers sont requis.",
        isHuman: false,
        suggestions: ["Comment soumettre mes documents ?", "Délai de traitement du dossier", "Documents pour AVOTRA"],
      }
    } else if (lowerMessage.includes("taux") || lowerMessage.includes("intérêt")) {
      return {
        text: "Le taux d'intérêt pour le crédit SAFIDY est de 1,85% par mois. Pour le crédit AVOTRA, le taux varie entre 1,5% et 2,2% selon le montant et la durée du crédit.",
        isHuman: false,
        suggestions: ["Comment calculer les intérêts ?", "Frais de dossier", "Simulation de crédit"],
      }
    } else if (
      lowerMessage.includes("simuler") ||
      lowerMessage.includes("simulation") ||
      lowerMessage.includes("calculer")
    ) {
      return {
        text: "Vous pouvez simuler votre crédit directement sur notre plateforme en cliquant sur 'Simuler un crédit' sur la page d'accueil. Vous pourrez y définir le montant, la durée et voir les mensualités estimées.",
        isHuman: false,
        suggestions: ["Aller à la simulation", "Montant maximum empruntable", "Durée maximale de remboursement"],
      }
    } else {
      return {
        text: "Je comprends votre question. Pour obtenir des informations plus précises, je vous invite à utiliser notre simulateur de crédit ou à contacter directement un de nos conseillers.",
        isHuman: false,
        suggestions: ["Parler à un conseiller", "Simuler un crédit", "Comment fonctionne le crédit SAFIDY ?"],
      }
    }
  },

  // Obtenir les statistiques des conversations
  getChatStatistics: async () => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      totalConversations: 24,
      activeConversations: 8,
      resolvedConversations: 16,
      pendingConversations: 5,
    }
  },
}

export { chatService }

