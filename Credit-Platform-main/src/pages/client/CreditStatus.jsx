"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { theme } from "../../styles/theme"
import {
  FiCreditCard,
  FiClock,
  FiCheck,
  FiX,
  FiCalendar,
  FiDollarSign,
  FiSearch,
  FiFilter,
  FiFileText,
  FiChevronRight,
  FiEye,
  FiDownload,
  FiMessageSquare,
} from "react-icons/fi"

/**
 * Composants stylisés pour la page de statut des demandes
 */
const StatusContainer = styled.div`
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

// En-tête de la page
const PageHeader = styled.div`
  margin-bottom: 2rem;
  
  .page-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.5rem;
  }
  
  .page-description {
    font-size: 1rem;
    color: #6B7280;
  }
`

// Barre d'outils
const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  .search-bar {
    flex: 1;
    min-width: 250px;
    position: relative;
    
    .search-input {
      width: 100%;
      padding: 0.625rem 1rem 0.625rem 2.5rem;
      border: 1px solid #D1D5DB;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      
      &:focus {
        outline: none;
        border-color: ${theme.colors.primary[400]};
        box-shadow: 0 0 0 2px ${theme.colors.primary[100]};
      }
    }
    
    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #9CA3AF;
    }
  }
  
  .filter-dropdown {
    position: relative;
    
    .filter-button {
      display: flex;
      align-items: center;
      padding: 0.625rem 1rem;
      background-color: white;
      border: 1px solid #D1D5DB;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #4B5563;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: #F9FAFB;
        color: #111827;
      }
      
      .button-icon {
        margin-right: 0.5rem;
      }
    }
    
    .filter-menu {
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
      width: 240px;
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      z-index: 20;
      overflow: hidden;
      
      .filter-header {
        padding: 1rem;
        border-bottom: 1px solid #E5E7EB;
        
        .filter-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #111827;
        }
      }
      
      .filter-options {
        padding: 0.5rem 0;
        
        .filter-option {
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          color: #4B5563;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          
          &:hover {
            background-color: #F3F4F6;
            color: #111827;
          }
          
          &.active {
            color: ${theme.colors.primary[600]};
            background-color: ${theme.colors.primary[50]};
          }
          
          .option-icon {
            margin-right: 0.75rem;
          }
        }
      }
      
      .filter-footer {
        padding: 0.75rem 1rem;
        border-top: 1px solid #E5E7EB;
        display: flex;
        justify-content: flex-end;
        
        .filter-button {
          padding: 0.375rem 0.75rem;
          font-size: 0.75rem;
          border-radius: 0.25rem;
          
          &.reset {
            background-color: transparent;
            color: #4B5563;
            border: none;
            margin-right: 0.5rem;
            
            &:hover {
              color: #111827;
            }
          }
          
          &.apply {
            background-color: ${theme.colors.primary[600]};
            color: white;
            border: none;
            
            &:hover {
              background-color: ${theme.colors.primary[700]};
            }
          }
        }
      }
    }
  }
`

// Statistiques
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

// Carte de statistique
const StatCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  
  .stat-content {
    display: flex;
    align-items: center;
    
    .stat-icon {
      width: 40px;
      height: 40px;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      
      &.total {
        background-color: ${theme.colors.primary[100]};
        color: ${theme.colors.primary[600]};
      }
      
      &.pending {
        background-color: #FEF3C7;
        color: #D97706;
      }
      
      &.approved {
        background-color: #D1FAE5;
        color: #059669;
      }
      
      &.rejected {
        background-color: #FEE2E2;
        color: #DC2626;
      }
    }
    
    .stat-text {
      flex: 1;
      
      .stat-value {
        font-size: 1.5rem;
        font-weight: 600;
        color: #111827;
        line-height: 1.2;
      }
      
      .stat-label {
        font-size: 0.875rem;
        color: #6B7280;
      }
    }
  }
`

// Tableau des demandes
const RequestsTable = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 2rem;
  
  .table-header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #E5E7EB;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .header-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
    }
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    th {
      padding: 0.75rem 1.5rem;
      text-align: left;
      font-size: 0.75rem;
      font-weight: 500;
      color: #6B7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background-color: #F9FAFB;
    }
    
    td {
      padding: 1rem 1.5rem;
      font-size: 0.875rem;
      color: #4B5563;
      border-bottom: 1px solid #E5E7EB;
      vertical-align: middle;
    }
    
    tr:last-child td {
      border-bottom: none;
    }
    
    tr:hover td {
      background-color: #F9FAFB;
    }
    
    .request-id {
      font-weight: 500;
      color: #111827;
    }
    
    .request-type {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      background-color: ${theme.colors.primary[50]};
      color: ${theme.colors.primary[700]};
      
      .type-icon {
        margin-right: 0.25rem;
      }
    }
    
    .request-amount {
      font-weight: 500;
      color: #111827;
      display: flex;
      align-items: center;
      
      .amount-icon {
        color: #9CA3AF;
        margin-right: 0.25rem;
      }
    }
    
    .request-date {
      display: flex;
      align-items: center;
      
      .date-icon {
        color: #9CA3AF;
        margin-right: 0.25rem;
      }
    }
    
    .request-status {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      
      &.pending {
        background-color: #FEF3C7;
        color: #D97706;
      }
      
      &.approved {
        background-color: #D1FAE5;
        color: #059669;
      }
      
      &.rejected {
        background-color: #FEE2E2;
        color: #DC2626;
      }
      
      .status-icon {
        margin-right: 0.25rem;
      }
    }
    
    .request-actions {
      display: flex;
      gap: 0.5rem;
      
      .action-button {
        width: 32px;
        height: 32px;
        border-radius: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6B7280;
        background-color: #F3F4F6;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
          background-color: #E5E7EB;
          color: #111827;
        }
        
        &.view {
          color: ${theme.colors.primary[600]};
          background-color: ${theme.colors.primary[50]};
          
          &:hover {
            background-color: ${theme.colors.primary[100]};
          }
        }
        
        &.chat {
          color: #059669;
          background-color: #D1FAE5;
          
          &:hover {
            background-color: #A7F3D0;
          }
        }
        
        &.download {
          color: #D97706;
          background-color: #FEF3C7;
          
          &:hover {
            background-color: #FDE68A;
          }
        }
      }
    }
  }
  
  .empty-state {
    padding: 3rem 1.5rem;
    text-align: center;
    
    .empty-icon {
      width: 48px;
      height: 48px;
      border-radius: 9999px;
      background-color: #F3F4F6;
      color: #9CA3AF;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }
    
    .empty-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: #111827;
      margin-bottom: 0.5rem;
    }
    
    .empty-description {
      font-size: 0.875rem;
      color: #6B7280;
      margin-bottom: 1.5rem;
    }
    
    .empty-action {
      display: inline-flex;
      align-items: center;
      padding: 0.625rem 1.25rem;
      background-color: ${theme.colors.primary[600]};
      color: white;
      font-size: 0.875rem;
      font-weight: 500;
      border-radius: 0.375rem;
      transition: all 0.2s ease;
      text-decoration: none;
      
      &:hover {
        background-color: ${theme.colors.primary[700]};
      }
      
      .action-icon {
        margin-left: 0.5rem;
      }
    }
  }
  
  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    background-color: #F9FAFB;
    border-top: 1px solid #E5E7EB;
    
    .pagination-info {
      font-size: 0.875rem;
      color: #6B7280;
      
      .info-bold {
        font-weight: 500;
        color: #111827;
      }
    }
    
    .pagination-actions {
      display: flex;
      gap: 0.5rem;
      
      .pagination-button {
        padding: 0.5rem 0.75rem;
        border: 1px solid #D1D5DB;
        border-radius: 0.375rem;
        background-color: white;
        font-size: 0.875rem;
        color: #4B5563;
        transition: all 0.2s ease;
        
        &:hover:not(:disabled) {
          background-color: #F9FAFB;
          color: #111827;
        }
        
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
  }
`

/**
 * Composant CreditStatus
 *
 * Ce composant affiche la liste des demandes de crédit du client
 * et leur statut actuel.
 */
const CreditStatus = () => {
  // États
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [creditRequests, setCreditRequests] = useState([])

  // Données fictives pour les demandes de crédit
  const mockCreditRequests = [
    {
      id: "CR-2023-001",
      reference: "CR-2023-001",
      creditType: "SAFIDY",
      amount: 5000000,
      createdAt: "2023-03-15T10:30:00",
      status: "approved",
      documents: true,
    },
    {
      id: "CR-2023-002",
      reference: "CR-2023-002",
      creditType: "AVOTRA AINGA",
      amount: 3000000,
      createdAt: "2023-03-10T14:45:00",
      status: "pending",
      documents: true,
    },
    {
      id: "CR-2023-003",
      reference: "CR-2023-003",
      creditType: "AVOTRA MIHARY",
      amount: 7500000,
      createdAt: "2023-02-28T09:15:00",
      status: "rejected",
      documents: true,
    },
    {
      id: "CR-2023-004",
      reference: "CR-2023-004",
      creditType: "AVOTRA AMBOARA",
      amount: 2000000,
      createdAt: "2023-02-15T16:20:00",
      status: "pending",
      documents: false,
    },
  ]

  // Statistiques des demandes
  const stats = {
    total: mockCreditRequests.length,
    pending: mockCreditRequests.filter((req) => req.status === "pending").length,
    approved: mockCreditRequests.filter((req) => req.status === "approved").length,
    rejected: mockCreditRequests.filter((req) => req.status === "rejected").length,
  }

  // Effet pour simuler le chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setCreditRequests(mockCreditRequests)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  /**
   * Bascule l'état du menu de filtrage
   */
  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  /**
   * Applique le filtre de statut
   */
  const applyFilter = () => {
    setFilterOpen(false)
  }

  /**
   * Réinitialise le filtre de statut
   */
  const resetFilter = () => {
    setStatusFilter("all")
    setFilterOpen(false)
  }

  /**
   * Récupère l'icône correspondant au statut
   * @param {string} status - Le statut de la demande
   * @returns {JSX.Element} - L'icône correspondante
   */
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiClock size={16} />
      case "approved":
        return <FiCheck size={16} />
      case "rejected":
        return <FiX size={16} />
      default:
        return <FiClock size={16} />
    }
  }

  /**
   * Récupère le texte correspondant au statut
   * @param {string} status - Le statut de la demande
   * @returns {string} - Le texte correspondant
   */
  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "En attente"
      case "approved":
        return "Approuvée"
      case "rejected":
        return "Refusée"
      default:
        return "Inconnue"
    }
  }

  // Filtrer les demandes en fonction du terme de recherche et du filtre de statut
  const filteredRequests = creditRequests.filter((request) => {
    const matchesSearch =
      searchTerm === "" ||
      request.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.creditType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Afficher un indicateur de chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  // Afficher un message d'erreur si nécessaire
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiX className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <StatusContainer>
      <PageHeader>
        <h1 className="page-title">Mes demandes de crédit</h1>
        <p className="page-description">Suivez l'état de vos demandes de crédit en temps réel</p>
      </PageHeader>

      <Toolbar>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher par référence ou type de crédit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="search-icon" size={18} />
        </div>

        <div className="filter-dropdown">
          <button className="filter-button" onClick={toggleFilter}>
            <FiFilter className="button-icon" size={16} />
            Filtrer
          </button>

          {filterOpen && (
            <div className="filter-menu">
              <div className="filter-header">
                <div className="filter-title">Filtrer par statut</div>
              </div>

              <div className="filter-options">
                <div
                  className={`filter-option ${statusFilter === "all" ? "active" : ""}`}
                  onClick={() => setStatusFilter("all")}
                >
                  <FiFileText className="option-icon" size={16} />
                  Toutes les demandes
                </div>
                <div
                  className={`filter-option ${statusFilter === "pending" ? "active" : ""}`}
                  onClick={() => setStatusFilter("pending")}
                >
                  <FiClock className="option-icon" size={16} />
                  En attente
                </div>
                <div
                  className={`filter-option ${statusFilter === "approved" ? "active" : ""}`}
                  onClick={() => setStatusFilter("approved")}
                >
                  <FiCheck className="option-icon" size={16} />
                  Approuvées
                </div>
                <div
                  className={`filter-option ${statusFilter === "rejected" ? "active" : ""}`}
                  onClick={() => setStatusFilter("rejected")}
                >
                  <FiX className="option-icon" size={16} />
                  Refusées
                </div>
              </div>

              <div className="filter-footer">
                <button className="filter-button reset" onClick={resetFilter}>
                  Réinitialiser
                </button>
                <button className="filter-button apply" onClick={applyFilter}>
                  Appliquer
                </button>
              </div>
            </div>
          )}
        </div>
      </Toolbar>

      <StatsGrid>
        <StatCard>
          <div className="stat-content">
            <div className="stat-icon total">
              <FiFileText size={20} />
            </div>
            <div className="stat-text">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Demandes totales</div>
            </div>
          </div>
        </StatCard>

        <StatCard>
          <div className="stat-content">
            <div className="stat-icon pending">
              <FiClock size={20} />
            </div>
            <div className="stat-text">
              <div className="stat-value">{stats.pending}</div>
              <div className="stat-label">En attente</div>
            </div>
          </div>
        </StatCard>

        <StatCard>
          <div className="stat-content">
            <div className="stat-icon approved">
              <FiCheck size={20} />
            </div>
            <div className="stat-text">
              <div className="stat-value">{stats.approved}</div>
              <div className="stat-label">Approuvées</div>
            </div>
          </div>
        </StatCard>

        <StatCard>
          <div className="stat-content">
            <div className="stat-icon rejected">
              <FiX size={20} />
            </div>
            <div className="stat-text">
              <div className="stat-value">{stats.rejected}</div>
              <div className="stat-label">Refusées</div>
            </div>
          </div>
        </StatCard>
      </StatsGrid>

      <RequestsTable>
        <div className="table-header">
          <div className="header-title">Liste des demandes</div>
          <Link
            to="/client/credit-request"
            className="text-primary-600 text-sm font-medium hover:underline flex items-center"
          >
            Nouvelle demande
            <FiChevronRight className="ml-1" size={16} />
          </Link>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <FiFileText size={24} />
            </div>
            <h3 className="empty-title">Aucune demande trouvée</h3>
            <p className="empty-description">
              {searchTerm || statusFilter !== "all"
                ? "Aucune demande ne correspond à vos critères de recherche."
                : "Vous n'avez pas encore fait de demande de crédit."}
            </p>
            <Link to="/client/credit-request" className="empty-action">
              Faire une demande
              <FiChevronRight className="action-icon" size={16} />
            </Link>
          </div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Référence</th>
                  <th>Type de crédit</th>
                  <th>Montant</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="request-id">#{request.reference}</td>
                    <td>
                      <span className="request-type">
                        <FiCreditCard className="type-icon" size={12} />
                        {request.creditType}
                      </span>
                    </td>
                    <td className="request-amount">
                      <FiDollarSign className="amount-icon" size={14} />
                      {new Intl.NumberFormat("fr-MG", { style: "currency", currency: "MGA" })
                        .format(request.amount)
                        .replace("MGA", "Ar")}
                    </td>
                    <td className="request-date">
                      <FiCalendar className="date-icon" size={14} />
                      {new Date(request.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td>
                      <span className={`request-status ${request.status}`}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1">{getStatusText(request.status)}</span>
                      </span>
                    </td>
                    <td className="request-actions">
                      <Link to={`/client/credit-status/${request.id}`}>
                        <button className="action-button view" title="Voir les détails">
                          <FiEye size={16} />
                        </button>
                      </Link>
                      <Link to={`/client/chat?request=${request.id}`}>
                        <button className="action-button chat" title="Discuter avec un conseiller">
                          <FiMessageSquare size={16} />
                        </button>
                      </Link>
                      {request.documents && (
                        <button className="action-button download" title="Télécharger les documents">
                          <FiDownload size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <div className="pagination-info">
                Affichage de <span className="info-bold">1</span> à{" "}
                <span className="info-bold">{filteredRequests.length}</span> sur{" "}
                <span className="info-bold">{filteredRequests.length}</span> demandes
              </div>
              <div className="pagination-actions">
                <button className="pagination-button" disabled>
                  Précédent
                </button>
                <button className="pagination-button">Suivant</button>
              </div>
            </div>
          </>
        )}
      </RequestsTable>
    </StatusContainer>
  )
}

export default CreditStatus

