"\"use client"

// Service pour gérer les communications du chat
const chatService = {
  // Obtenir une réponse automatique du bot
  getBotResponse: async (message, needsHumanHelp = false, adminName = "") => {
    try {
      // Dans une implémentation réelle, ceci serait un appel API à un service de chatbot
      // comme Dialogflow, Azure Bot Service, etc.
      
      // Pour l'instant, nous simulons une réponse
      const lowerMessage = message.toLowerCase();
      
      // Si l'utilisateur a demandé de l'aide humaine et qu'un conseiller est assigné
      if (needsHumanHelp && adminName) {
        // Réponses personnalisées du conseiller
        if (lowerMessage.includes("merci")) {
          return {
            text: `Je vous en prie ! N'hésitez pas si vous avez d'autres questions. Je reste à votre disposition.`,
            isHuman: true,
            suggestions: ["J'ai une autre question", "Au revoir"]
          };
        } else if (lowerMessage.includes("crédit") || lowerMessage.includes("demande") || lowerMessage.includes("dossier")) {
          return {
            text: `Pour votre demande de crédit, je vais avoir besoin de quelques informations supplémentaires. Pouvez-vous me préciser quel type de crédit vous intéresse (SAFIDY ou AVOTRA) et le montant approximatif que vous souhaitez emprunter ?`,
            isHuman: true,
            suggestions: ["SAFIDY - 5 millions Ar", "AVOTRA - 10 millions Ar", "Je ne sais pas encore"]
          };
        } else if (lowerMessage.includes("taux") || lowerMessage.includes("intérêt")) {
          return {
            text: `Les taux d'intérêt actuels sont de 1,85% pour SAFIDY et entre 1,5% et 2,2% pour AVOTRA selon le montant et la durée. Je peux vous faire une simulation personnalisée si vous me donnez plus de détails sur votre projet.`,
            isHuman: true,
            suggestions: ["Faire une simulation", "Quels sont les frais de dossier ?", "Durée maximale de remboursement ?"]
          };
        } else {
          return {
            text: `Je comprends votre demande. Pour vous aider plus efficacement, pourriez-vous me donner plus de détails sur votre situation ? Par exemple, êtes-vous salarié, fonctionnaire ou entrepreneur ? Quel est l'objet de votre demande de financement ?`,
            isHuman: true,
            suggestions: ["Je suis salarié", "Je suis entrepreneur", "Je veux financer un projet personnel"]
          };
        }
      }
      
      // Réponses automatiques basées sur des mots-clés
      if (lowerMessage.includes("safidy")) {
        return {
          text: "Le crédit SAFIDY est destiné aux salariés et fonctionnaires. Il offre un taux d'intérêt avantageux de 1,85% et permet de financer vos projets personnels jusqu'à 24 mois.",
          isHuman: false,
          suggestions: ["Quels documents pour SAFIDY ?", "Comment calculer ma mensualité ?", "Puis-je faire une simulation ?"]
        };
      } else if (lowerMessage.includes("avotra")) {
        return {
          text: "Le crédit AVOTRA est conçu pour les entrepreneurs et entreprises. Il permet de financer votre fonds de roulement ou vos investissements avec des montants allant de 300 000 Ar à plus de 50 000 000 Ar.",
          isHuman: false,
          suggestions: ["Critères d'éligibilité AVOTRA", "Durée maximale de remboursement", "Taux d'intérêt AVOTRA"]
        };
      } else if (lowerMessage.includes("document") || lowerMessage.includes("pièce") || lowerMessage.includes("dossier")) {
        return {
          text: "Pour une demande de crédit, vous aurez besoin de : une pièce d'identité valide, un justificatif de domicile, vos 3 derniers bulletins de salaire, et un RIB. Pour les entrepreneurs, des documents supplémentaires comme le registre de commerce et les états financiers sont requis.",
          isHuman: false,
          suggestions: ["Comment soumettre mes documents ?", "Délai de traitement du dossier", "Documents pour AVOTRA"]
        };
      } else if (lowerMessage.includes("taux") || lowerMessage.includes("intérêt")) {
        return {
          text: "Le taux d'intérêt pour le crédit SAFIDY est de 1,85% par mois. Pour le crédit AVOTRA, le taux varie entre 1,5% et 2,2% selon le montant et la durée du crédit.",
          isHuman: false,
          suggestions: ["Comment calculer les intérêts ?", "Frais de dossier", "Simulation de crédit"]
        };
      } else if (lowerMessage.includes("simuler") || lowerMessage.includes("simulation") || lowerMessage.includes("calculer")) {
        return {
          text: "Vous pouvez simuler votre crédit directement sur notre plateforme en cliquant sur 'Simuler un crédit' sur la page d'accueil. Vous pourrez y définir le montant, la durée et voir les mensualités estimées.",
          isHuman: false,
          suggestions: ["Aller à la simulation", "Montant maximum empruntable", "Durée maximale de remboursement"]
        };
      } else {
        return {
          text: "Je comprends votre question. Pour obtenir des informations plus précises, je vous invite à utiliser notre simulateur de crédit ou à contacter directement un de nos conseillers.",
          isHuman: false,
          suggestions: ["Parler à un conseiller", "Simuler un crédit", "Comment fonctionne le crédit SAFIDY ?"]
        };
      }
    } catch (error) {
      console.error("Erreur lors de l'obtention de la réponse du bot:", error);
      throw error;
    }
  },

  // Demander de l'aide humaine
  requestHumanHelp: async (userId, conversation) => {
    try {
      // Dans une implémentation réelle, ceci serait un appel API pour enregistrer
      // la demande d'aide et la conversation dans la base de données
      
      console.log("Demande d'aide humaine pour l'utilisateur:", userId);
      console.log("Conversation:", conversation);
      
      // Simuler une réponse réussie
      return {
        success: true,
        requestId: "req_" + Date.now(),
        message: "Demande d'aide enregistrée avec succès",
        estimatedResponseTime: "5 minutes"
      };
    } catch (error) {
      console.error("Erreur lors de la demande d'aide humaine:", error);
      throw error;
    }
  },

  // Obtenir les conversations pour un administrateur
  getAdminConversations: async (status = "all") => {
    try {
      // Dans une implémentation réelle, ceci serait un appel API pour récupérer
      // les conversations des utilisateurs selon leur statut
      
      // Simuler des données de conversation
      const conversations = [
        {
          id: "conv_1",
          userId: "user_1",
          userName: "Jean Dupont",
          userEmail: "jean.dupont@example.com",
          userPhone: "+261 34 12 34 567",
          lastMessage: "J'ai besoin d'aide pour ma demande de crédit SAFIDY",
          timestamp: new Date(Date.now() - 3600000), // 1 heure avant
          status: "pending",
          unread: true,
          priority: "medium"
        },
        {
          id: "conv_2",
          userId: "user_2",
          userName: "Marie Martin",
          userEmail: "marie.martin@example.com",
          userPhone: "+261 33 98 76 543",
          lastMessage: "Merci pour votre aide !",
          timestamp: new Date(Date.now() - 86400000), // 1 jour avant
          status: "resolved",
          unread: false,
          priority: "low"
        },
        {
          id: "conv_3",
          userId: "user_3",
          userName: "Pierre Durand",
          userEmail: "pierre.durand@example.com",
          userPhone: "+261 32 45 67 890",
          lastMessage: "Quels sont les documents nécessaires pour AVOTRA ?",
          timestamp: new Date(Date.now() - 1800000), // 30 minutes avant
          status: "active",
          unread: true,
          priority: "high"
        },
        {
          id: "conv_4",
          userId: "user_4",
          userName: "Sophie Legrand",
          userEmail: "sophie.legrand@example.com",
          userPhone: "+261 33 11 22 333",
          lastMessage: "Je souhaite augmenter le montant de mon crédit",
          timestamp: new Date(Date.now() - 7200000), // 2 heures avant
          status: "pending",
          unread: true,
          priority: "high"
        },
        {
          id: "conv_5",
          userId: "user_5",
          userName: "Lucas Petit",
          userEmail: "lucas.petit@example.com",
          userPhone: "+261 34 55 66 777",
          lastMessage: "Comment puis-je modifier ma demande de crédit ?",
          timestamp: new Date(Date.now() - 10800000), // 3 heures avant
          status: "active",
          unread: false,
          priority: "medium"
        }
      ];
      
      // Filtrer selon le statut si nécessaire
      if (status !== "all") {
        return conversations.filter(conv => conv.status === status);
      }
      
      return conversations;
    } catch (error) {
      console.error("Erreur lors de la récupération des conversations:", error);
      throw error;
    }
  },

  // Obtenir une conversation spécifique
  getConversation: async (conversationId) => {
    try {
      // Dans une implémentation réelle, ceci serait un appel API pour récupérer
      // les messages d'une conversation spécifique
      
      // Simuler des messages de conversation
      const conversations = {
        "conv_1": {
          id: "conv_1",
          userId: "user_1",
          userName: "Jean Dupont",
          userEmail: "jean.dupont@example.com",
          userPhone: "+261 34 12 34 567",
          status: "pending",
          priority: "medium",
          createdAt: new Date(Date.now() - 86400000), // 1 jour avant
          messages: [
            {
              id: "msg_1",
              text: "Bonjour, j'ai besoin d'aide pour ma demande de crédit SAFIDY",
              sender: "user",
              timestamp: new Date(Date.now() - 3600000) // 1 heure avant
            },
            {
              id: "msg_2",
              text: "Bonjour ! Je suis l'assistant virtuel de la CEM. Comment puis-je vous aider avec votre demande de crédit SAFIDY ?",
              sender: "bot",
              timestamp: new Date(Date.now() - 3590000) // 59 minutes et 50 secondes avant
            },
            {
              id: "msg_3",
              text: "Je ne comprends pas comment calculer ma capacité d'emprunt",
              sender: "user",
              timestamp: new Date(Date.now() - 3580000) // 59 minutes et 40 secondes avant
            },
            {
              id: "msg_4",
              text: "Pour calculer votre capacité d'emprunt, nous prenons en compte votre revenu mensuel et vos charges existantes. La mensualité ne doit généralement pas dépasser 33% de vos revenus nets. Souhaitez-vous que je vous aide à faire ce calcul ?",
              sender: "bot",
              timestamp: new Date(Date.now() - 3570000) // 59 minutes et 30 secondes avant
            },
            {
              id: "msg_5",
              text: "Oui, s'il vous plaît. Mon salaire est de 1 500 000 Ar et j'ai déjà un crédit avec une mensualité de 200 000 Ar",
              sender: "user",
              timestamp: new Date(Date.now() - 3560000) // 59 minutes et 20 secondes avant
            }
          ]
        },
        "conv_2": {
          id: "conv_2",
          userId: "user_2",
          userName: "Marie Martin",
          userEmail: "marie.martin@example.com",
          userPhone: "+261 33 98 76 543",
          status: "resolved",
          priority: "low",
          createdAt: new Date(Date.now() - 172800000), // 2 jours avant
          messages: [
            {
              id: "msg_1",
              text: "Bonjour, j'ai une question sur les frais de dossier pour un crédit AVOTRA",
              sender: "user",
              timestamp: new Date(Date.now() - 172800000) // 2 jours avant
            },
            {
              id: "msg_2",
              text: "Bonjour ! Je suis l'assistant virtuel de la CEM. Les frais de dossier pour un crédit AVOTRA sont de 2% du montant emprunté. Puis-je vous aider avec autre chose ?",
              sender: "bot",
              timestamp: new Date(Date.now() - 172790000)
            },
            {
              id: "msg_3",
              text: "Je voudrais parler à un conseiller pour plus de détails",
              sender: "user",
              timestamp: new Date(Date.now() - 172780000)
            },
            {
              id: "msg_4",
              text: "Je vais transférer votre demande à l'un de nos conseillers. Un conseiller vous répondra dès que possible.",
              sender: "bot",
              timestamp: new Date(Date.now() - 172770000)
            },
            {
              id: "msg_5",
              text: "Bonjour Mme Martin, je suis Thomas, conseiller à la CEM. Comment puis-je vous aider concernant les frais de dossier pour un crédit AVOTRA ?",
              sender: "admin",
              timestamp: new Date(Date.now() - 172700000)
            },
            {
              id: "msg_6",
              text: "Bonjour Thomas, je voudrais savoir si les frais de dossier sont négociables pour les montants importants ?",
              sender: "user",
              timestamp: new Date(Date.now() - 172600000)
            },
            {
              id: "msg_7",
              text: "Pour les montants supérieurs à 20 millions Ar, nous pouvons effectivement proposer une réduction des frais de dossier à 1,5%. Souhaitez-vous que je vous fasse une simulation ?",
              sender: "admin",
              timestamp: new Date(Date.now() - 172500000)
            },
            {
              id: "msg_8",
              text: "Oui, s'il vous plaît. Pour un montant de 25 millions Ar sur 36 mois.",
              sender: "user",
              timestamp: new Date(Date.now() - 172400000)
            },
            {
              id: "msg_9",
              text: "Voici votre simulation : Pour un crédit de 25 millions Ar sur 36 mois, avec un taux de 1,8%, votre mensualité serait d'environ 892 000 Ar. Les frais de dossier seraient de 375 000 Ar (1,5%). Est-ce que cela vous convient ?",
              sender: "admin",
              timestamp: new Date(Date.now() - 172300000)
            },
            {
              id: "msg_10",
              text: "C'est parfait, merci beaucoup pour votre aide !",
              sender: "user",
              timestamp: new Date(Date.now() - 172200000)
            },
            {
              id: "msg_11",
              text: "Je vous en prie. N'hésitez pas à me contacter si vous avez d'autres questions. Bonne journée !",
              sender: "admin",
              timestamp: new Date(Date.now() - 172100000)
            }
          ]
        },
        "conv_3": {
          id: "conv_3",
          userId: "user_3",
          userName: "Pierre Durand",
          userEmail: "pierre.durand@example.com",
          userPhone: "+261 32 45 67 890",
          status: "active",
          priority: "high",
          createdAt: new Date(Date.now() - 7200000), // 2 heures avant
          messages: [
            {
              id: "msg_1",
              text: "Bonjour, quels sont les documents nécessaires pour AVOTRA ?",
              sender: "user",
              timestamp: new Date(Date.now() - 7200000) // 2 heures avant
            },
            {
              id: "msg_2",
              text: "Bonjour ! Je suis l'assistant virtuel de la CEM. Pour une demande de crédit AVOTRA, vous aurez besoin des documents suivants : registre de commerce, états financiers des 2 dernières années, plan d'affaires, garanties proposées, pièce d'identité du gérant, et justificatif de domicile de l'entreprise.",
              sender: "bot",
              timestamp: new Date(Date.now() - 7190000)
            },
            {
              id: "msg_3",
              text: "Est-ce que je dois fournir des garanties spécifiques ?",
              sender: "user",
              timestamp: new Date(Date.now() - 7180000)
            },
            {
              id: "msg_4",
              text: "Les garanties dépendent du montant emprunté et de la situation de votre entreprise. Pour des montants importants, une garantie immobilière peut être demandée. Pour des montants plus faibles, un nantissement de matériel ou une caution personnelle peut suffire. Souhaitez-vous parler à un conseiller pour plus de détails ?",
              sender: "bot",
              timestamp: new Date(Date.now() - 7170000)
            },
            {
              id: "msg_5",
              text: "Oui, j'aimerais parler à un conseiller",
              sender: "user",
              timestamp: new Date(Date.now() - 7160000)
            },
            {
              id: "msg_6",
              text: "Je vais transférer votre demande à l'un de nos conseillers. Un conseiller vous répondra dès que possible.",
              sender: "bot",
              timestamp: new Date(Date.now() - 7150000)
            },
            {
              id: "msg_7",
              text: "Bonjour M. Durand, je suis Sophie, conseillère spécialisée en crédit AVOTRA. Concernant les garanties, pourriez-vous me préciser le montant que vous souhaitez emprunter et l'activité de votre entreprise ?",
              sender: "admin",
              timestamp: new Date(Date.now() - 1800000) // 30 minutes avant
            }
          ]
        },
        "conv_4": {
          id: "conv_4",
          userId: "user_4",
          userName: "Sophie Legrand",
          userEmail: "sophie.legrand@example.com",
          userPhone: "+261 33 11 22 333",
          status: "pending",
          priority: "high",
          createdAt: new Date(Date.now() - 14400000), // 4 heures avant
          messages: [
            {
              id: "msg_1",
              text: "Bonjour, je souhaite augmenter le montant de mon crédit SAFIDY actuel",
              sender: "user",
              timestamp: new Date(Date.now() - 14400000) // 4 heures avant
            },
            {
              id: "msg_2",
              text: "Bonjour ! Je suis l'assistant virtuel de la CEM. Pour augmenter le montant de votre crédit SAFIDY, vous devez contacter un conseiller qui étudiera votre dossier. Souhaitez-vous que je vous mette en relation avec un conseiller ?",
              sender: "bot",
              timestamp: new Date(Date.now() - 14390000)
            },
            {
              id: "msg_3",
              text: "Oui, s'il vous plaît",
              sender: "user",
              timestamp: new Date(Date.now() - 14380000)
            },
            {
              id: "msg_4",
              text: "Je vais transférer votre demande à l'un de nos conseillers. Un conseiller vous répondra dès que possible.",
              sender: "bot",
              timestamp: new Date(Date.now() - 14370000)
            }
          ]
        },
        "conv_5": {
          id: "conv_5",
          userId: "user_5",
          userName: "Lucas Petit",
          userEmail: "lucas.petit@example.com",
          userPhone: "+261 34 55 66 777",
          status: "active",
          priority: "medium",
          createdAt: new Date(Date.now() - 21600000), // 6 heures avant
          messages: [
            {
              id: "msg_1",
              text: "Bonjour, comment puis-je modifier ma demande de crédit ?",
              sender: "user",
              timestamp: new Date(Date.now() - 21600000) // 6 heures avant
            },
            {
              id: "msg_2",
              text: "Bonjour ! Je suis l'assistant virtuel de la CEM. Pour modifier votre demande de crédit, vous pouvez vous connecter à votre espace client et accéder à la section 'Mes demandes de crédit'. Vous pourrez y modifier les détails de votre demande si elle n'a pas encore été traitée. Sinon, vous devrez contacter un conseiller.",
              sender: "bot",
              timestamp: new Date(Date.now() - 21590000)
            },
            {
              id: "msg_3",
              text: "Ma demande est déjà en cours de traitement, je voudrais parler à un conseiller",
              sender: "user",
              timestamp: new Date(Date.now() - 21580000)
            },
            {
              id: "msg_4",
              text: "Je vais transférer votre demande à l'un de nos conseillers. Un conseiller vous répondra dès que possible.",
              sender: "bot",
              timestamp: new Date(Date.now() - 21570000)
            },
            {
              id: "msg_5",
              text: "Bonjour M. Petit, je suis Jean, conseiller à la CEM. Comment puis-je vous aider à modifier votre demande de crédit ?",
              sender: "admin",
              timestamp: new Date(Date.now() - 18000000) // 5 heures avant
            },
            {
              id: "msg_6",
              text: "Bonjour Jean, je voudrais augmenter la durée de remboursement de 12 à 18 mois",
              sender: "user",
              timestamp: new Date(Date.now() - 17900000)
            },
            {
              id: "msg_7",
              text: "Je vais vérifier si c'est possible. Pouvez-vous me confirmer le montant de votre demande de crédit ?",
              sender: "admin",
              timestamp: new Date(Date.now() - 17800000)
            }
          ]
        }
      };
      
      return conversations[conversationId] || null;
    } catch (error) {
      console.error("Erreur lors du chargement des détails de la conversation:", error);
      throw error;
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>Historique des conversations</h2>

      {loading ? (\
        <div>Chargement...</div>
      ) : (
        <div style=display: "flex", gap: "20px" >
          <div style=width: "300px" >conversations.length > 0 ? (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #eee",
                    cursor: "pointer",
                    backgroundColor: selectedConversation === conversation.id ? "#f0f0f0" : "transparent",
                  }}
                  onClick={() => handleConversationSelect(conversation.id)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: "bold" }}>{conversation.title}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {new Date(conversation.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ fontSize: "14px", color: "#666" }}>{conversation.lastMessage}</div>
                </div>
              ))
            ) : (
              <div>Aucune conversation trouvée.</div>
            )
          </div>

          <div style=flex: 1 >activeConversation ? (
              <div>
                <h3>{activeConversation.title}</h3>
                <div style={{ marginTop: "16px" }}>
                  {activeConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      style={{
                        padding: "12px",
                        borderRadius: "8px",
                        marginBottom: "8px",
                        backgroundColor: message.sender === "user" ? "#e0f7fa" : "#f0f0f0",
                      }}
                    >
                      <div style={{ fontWeight: "bold" }}>{message.sender}</div>
                      <div>{message.text}</div>
                      <div style={{ fontSize: "12px", color: "#666", textAlign: "right" }}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>Sélectionnez une conversation pour voir les détails.</div>
            )
          </div>
        </div>
      )}
    </div>
)
}



