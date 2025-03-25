"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  FiFileText,
  FiClock,
  FiCheck,
  FiX,
  FiArrowRight,
  FiCalendar,
  FiDollarSign,
  FiInfo,
  FiTrendingUp,
  FiAlertCircle,
  FiCreditCard,
  FiChevronRight,
  FiActivity,
  FiShield,
} from "react-icons/fi"
import { Line, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import styled, { keyframes } from "styled-components"
import { theme } from "../../styles/theme"

// Enregistrer les composants Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler)

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

// Composants stylis��s
const DashboardContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`

const WelcomeCard = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary[600]} 0%, ${theme.colors.primary[700]} 100%);
  border-radius: 1rem;
  padding: 2rem;
  color: white;
  margin-bottom: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(30deg);
  }
  
  .welcome-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .welcome-subtitle {
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 1.5rem;
  }
  
  .welcome-actions {
    display: flex;
    gap: 1rem;
    
    .action-button {
      padding: 0.75rem 1.25rem;
      border-radius: 0.5rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      transition: all 0.2s ease;
      
      &.primary {
        background-color: white;
        color: ${theme.colors.primary[700]};
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
      }
      
      &.secondary {
        background-color: rgba(255, 255, 255, 0.2);
        color: white;
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      }
      
      .button-icon {
        margin-left: 0.5rem;
      }
    }
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const StatCard = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  .stat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    
    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      
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
      
      &.total {
        background-color: ${theme.colors.primary[100]};
        color: ${theme.colors.primary[700]};
      }
    }
    
    .stat-badge {
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
      
      &.total {
        background-color: ${theme.colors.primary[100]};
        color: ${theme.colors.primary[700]};
      }
    }
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.25rem;
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: #6B7280;
  }
  
  .stat-footer {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    font-size: 0.875rem;
    
    &.positive {
      color: #059669;
    }
    
    &.negative {
      color: #DC2626;
    }
    
    .footer-icon {
      margin-right: 0.25rem;
    }
  }
`

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`

const ChartCard = styled.div`
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  
  .chart-header {
    padding: 1.5rem;
    border-bottom: 1px solid #E5E7EB;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .chart-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
    }
    
    .chart-subtitle {
      font-size: 0.875rem;
      color: #6B7280;
      margin-top: 0.25rem;
    }
    
    .chart-actions {
      display: flex;
      gap: 0.5rem;
      
      .time-filter {
        display: flex;
        background-color: #F3F4F6;
        border-radius: 0.5rem;
        padding: 0.25rem;
        
        button {
          padding: 0.375rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: #6B7280;
          transition: all 0.2s ease;
          
          &.active {
            background-color: white;
            color: #111827;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          }
          
          &:hover:not(.active) {
            color: #111827;
          }
        }
      }
    }
  }
  
  .chart-body {
    padding: 1.5rem;
    
    .chart-container {
      height: 300px;
      position: relative;
    }
  }
`

const RequestsCard = styled.div`
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 2rem;
  
  .requests-header {
    padding: 1.5rem;
    border-bottom: 1px solid #E5E7EB;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .requests-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
    }
    
    .requests-subtitle {
      font-size: 0.875rem;
      color: #6B7280;
      margin-top: 0.25rem;
    }
    
    .view-all {
      font-size: 0.875rem;
      font-weight: 500;
      color: ${theme.colors.primary[600]};
      display: flex;
      align-items: center;
      
      &:hover {
        color: ${theme.colors.primary[700]};
        text-decoration: underline;
      }
      
      .view-icon {
        margin-left: 0.25rem;
      }
    }
  }
  
  .requests-tabs {
    display: flex;
    overflow-x: auto;
    border-bottom: 1px solid #E5E7EB;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    .tab {
      padding: 1rem 1.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #6B7280;
      white-space: nowrap;
      border-bottom: 2px solid transparent;
      transition: all 0.2s ease;
      
      &.active {
        color: ${theme.colors.primary[600]};
        border-bottom-color: ${theme.colors.primary[600]};
      }
      
      &:hover:not(.active) {
        color: #111827;
      }
    }
  }
  
  .requests-table {
    width: 100%;
    
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
      text-align: right;
      
      .action-link {
        font-weight: 500;
        color: ${theme.colors.primary[600]};
        
        &:hover {
          color: ${theme.colors.primary[700]};
          text-decoration: underline;
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

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const InfoCard = styled.div`
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
  
  .info-content {
    display: flex;
    
    .info-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background-color: ${theme.colors.primary[100]};
      color: ${theme.colors.primary[600]};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      flex-shrink: 0;
    }
    
    .info-text {
      flex: 1;
      
      .info-title {
        font-size: 1rem;
        font-weight: 500;
        color: #111827;
        margin-bottom: 0.5rem;
      }
      
      .info-description {
        font-size: 0.875rem;
        color: #6B7280;
        margin-bottom: 1rem;
      }
      
      .info-link {
        font-size: 0.875rem;
        font-weight: 500;
        color: ${theme.colors.primary[600]};
        display: inline-flex;
        align-items: center;
        
        &:hover {
          color: ${theme.colors.primary[700]};
          text-decoration: underline;
        }
        
        .link-icon {
          margin-left: 0.25rem;
        }
      }
    }
  }
`

const ClientDashboard = () => {
  // États
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("all")
  const [timeFilter, setTimeFilter] = useState("6M")

  // Données fictives pour les demandes de crédit
  const [creditRequests, setCreditRequests] = useState([
    {
      id: "CR-2023-001",
      reference: "CR-2023-001",
      creditType: "SAFIDY",
      amount: 5000000,
      createdAt: "2023-03-15T10:30:00",
      status: "approved",
    },
    {
      id: "CR-2023-002",
      reference: "CR-2023-002",
      creditType: "AVOTRA AINGA",
      amount: 3000000,
      createdAt: "2023-03-10T14:45:00",
      status: "pending",
    },
    {
      id: "CR-2023-003",
      reference: "CR-2023-003",
      creditType: "AVOTRA MIHARY",
      amount: 7500000,
      createdAt: "2023-02-28T09:15:00",
      status: "rejected",
    },
    {
      id: "CR-2023-004",
      reference: "CR-2023-004",
      creditType: "AVOTRA AMBOARA",
      amount: 2000000,
      createdAt: "2023-02-15T16:20:00",
      status: "pending",
    },
  ])

  // Données pour les graphiques
  const [creditHistory, setCreditHistory] = useState({
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [
      {
        label: "Montant des crédits",
        data: [0, 2500000, 0, 5000000, 0, 3500000],
        borderColor: theme.colors.primary[600],
        backgroundColor: `${theme.colors.primary[600]}20`,
        tension: 0.4,
        fill: true,
      },
    ],
  })

  const [creditDistribution, setCreditDistribution] = useState({
    labels: ["SAFIDY", "AVOTRA AINGA", "AVOTRA MIHARY", "AVOTRA AMBOARA"],
    datasets: [
      {
        data: [2, 1, 1, 1],
        backgroundColor: [
          theme.colors.primary[700],
          theme.colors.primary[600],
          theme.colors.primary[500],
          theme.colors.primary[400],
        ],
        borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
        borderWidth: 2,
      },
    ],
  })

  // Effet pour simuler le chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Fonctions utilitaires
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

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "pending"
      case "approved":
        return "approved"
      case "rejected":
        return "rejected"
      default:
        return ""
    }
  }

  // Filtrer les demandes en fonction de l'onglet actif
  const filteredRequests =
    activeTab === "all" ? creditRequests : creditRequests.filter((req) => req.status === activeTab)

  // Options pour les graphiques
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#F3F4F6",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("fr-MG", {
                style: "currency",
                currency: "MGA",
              })
                .format(context.parsed.y)
                .replace("MGA", "Ar")
            }
            return label
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) =>
            new Intl.NumberFormat("fr-MG", {
              style: "currency",
              currency: "MGA",
              notation: "compact",
              compactDisplay: "short",
            })
              .format(value)
              .replace("MGA", "Ar"),
          color: "#9CA3AF",
          font: {
            size: 10,
          },
        },
        grid: {
          color: "#F3F4F6",
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 5,
      },
      line: {
        borderWidth: 2,
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#F3F4F6",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        usePointStyle: true,
        intersect: false,
      },
    },
    cutout: "70%",
  }

  // Gérer le changement de filtre temporel
  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter)
    // Ici, vous pourriez appeler une fonction pour mettre à jour les données en fonction du filtre
  }

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
            <FiAlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  // Rendu principal
  return (
    <DashboardContainer>
      {/* Carte de bienvenue */}
      <WelcomeCard>
        <div className="welcome-title">Bienvenue, Jean Dupont</div>
        <div className="welcome-subtitle">Gérez vos demandes de crédit et suivez leur statut en temps réel</div>
        <div className="welcome-actions">
          <Link to="/client/credit-request" className="action-button primary">
            Nouvelle demande
            <FiArrowRight className="button-icon" size={16} />
          </Link>
          <Link to="/client/credit-status" className="action-button secondary">
            Voir mes demandes
          </Link>
        </div>
      </WelcomeCard>

      {/* Statistiques */}
      <StatsGrid>
        <StatCard>
          <div className="stat-header">
            <div className="stat-icon total">
              <FiCreditCard size={24} />
            </div>
            <div className="stat-badge total">Total</div>
          </div>
          <div className="stat-value">5</div>
          <div className="stat-label">Demandes totales</div>
          <div className="stat-footer positive">
            <FiTrendingUp className="footer-icon" />
            <span>+20% ce mois-ci</span>
          </div>
        </StatCard>

        <StatCard>
          <div className="stat-header">
            <div className="stat-icon pending">
              <FiClock size={24} />
            </div>
            <div className="stat-badge pending">En attente</div>
          </div>
          <div className="stat-value">2</div>
          <div className="stat-label">Demandes en attente</div>
          <div className="stat-footer">
            <span>Dernière mise à jour: aujourd'hui</span>
          </div>
        </StatCard>

        <StatCard>
          <div className="stat-header">
            <div className="stat-icon approved">
              <FiCheck size={24} />
            </div>
            <div className="stat-badge approved">Approuvées</div>
          </div>
          <div className="stat-value">2</div>
          <div className="stat-label">Demandes approuvées</div>
          <div className="stat-footer positive">
            <FiTrendingUp className="footer-icon" />
            <span>+50% ce mois-ci</span>
          </div>
        </StatCard>

        <StatCard>
          <div className="stat-header">
            <div className="stat-icon rejected">
              <FiX size={24} />
            </div>
            <div className="stat-badge rejected">Refusées</div>
          </div>
          <div className="stat-value">1</div>
          <div className="stat-label">Demandes refusées</div>
          <div className="stat-footer negative">
            <FiTrendingUp className="footer-icon" />
            <span>-25% ce mois-ci</span>
          </div>
        </StatCard>
      </StatsGrid>

      {/* Graphiques */}
      <ChartsGrid>
        <ChartCard>
          <div className="chart-header">
            <div>
              <div className="chart-title">Historique de vos crédits</div>
              <div className="chart-subtitle">Montants des crédits approuvés</div>
            </div>
            <div className="chart-actions">
              <div className="time-filter">
                <button className={timeFilter === "3M" ? "active" : ""} onClick={() => handleTimeFilterChange("3M")}>
                  3M
                </button>
                <button className={timeFilter === "6M" ? "active" : ""} onClick={() => handleTimeFilterChange("6M")}>
                  6M
                </button>
                <button className={timeFilter === "1Y" ? "active" : ""} onClick={() => handleTimeFilterChange("1Y")}>
                  1A
                </button>
              </div>
            </div>
          </div>
          <div className="chart-body">
            <div className="flex items-center text-sm text-primary-600 font-medium mb-4">
              <FiTrendingUp className="mr-1" />
              <span>+15% depuis le mois dernier</span>
            </div>
            <div className="chart-container">
              <Line data={creditHistory} options={lineOptions} />
            </div>
          </div>
        </ChartCard>

        <ChartCard>
          <div className="chart-header">
            <div>
              <div className="chart-title">Répartition par type de crédit</div>
              <div className="chart-subtitle">Vos demandes par produit</div>
            </div>
          </div>
          <div className="chart-body">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 h-[200px] relative">
                <Doughnut data={creditDistribution} options={doughnutOptions} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">5</p>
                    <p className="text-sm text-gray-500">Total</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 mt-6 md:mt-0">
                <div className="space-y-4">
                  {creditDistribution.labels.map((label, index) => (
                    <div key={label} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: creditDistribution.datasets[0].backgroundColor[index] }}
                      ></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">{label}</span>
                          <span className="text-sm text-gray-500">
                            {creditDistribution.datasets[0].data[index]} (
                            {Math.round(
                              (creditDistribution.datasets[0].data[index] /
                                creditDistribution.datasets[0].data.reduce((a, b) => a + b, 0)) *
                                100,
                            )}
                            %)
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                          <div
                            className="h-1.5 rounded-full"
                            style={{
                              width: `${(creditDistribution.datasets[0].data[index] / creditDistribution.datasets[0].data.reduce((a, b) => a + b, 0)) * 100}%`,
                              backgroundColor: creditDistribution.datasets[0].backgroundColor[index],
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ChartCard>
      </ChartsGrid>

      {/* Demandes récentes */}
      <RequestsCard>
        <div className="requests-header">
          <div>
            <div className="requests-title">Vos demandes récentes</div>
            <div className="requests-subtitle">Suivez l'état de vos demandes de crédit</div>
          </div>
          <Link to="/client/credit-status" className="view-all">
            Voir tout
            <FiChevronRight className="view-icon" size={16} />
          </Link>
        </div>

        <div className="requests-tabs">
          <button className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
            Toutes
          </button>
          <button className={`tab ${activeTab === "pending" ? "active" : ""}`} onClick={() => setActiveTab("pending")}>
            En attente
          </button>
          <button
            className={`tab ${activeTab === "approved" ? "active" : ""}`}
            onClick={() => setActiveTab("approved")}
          >
            Approuvées
          </button>
          <button
            className={`tab ${activeTab === "rejected" ? "active" : ""}`}
            onClick={() => setActiveTab("rejected")}
          >
            Refusées
          </button>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <FiFileText size={24} />
            </div>
            <h3 className="empty-title">Aucune demande</h3>
            <p className="empty-description">
              {activeTab === "all"
                ? "Vous n'avez pas encore fait de demande de crédit."
                : `Vous n'avez pas de demande ${
                    activeTab === "pending" ? "en attente" : activeTab === "approved" ? "approuvée" : "refusée"
                  }.`}
            </p>
            <Link to="/client/credit-request" className="empty-action">
              Faire une demande
              <FiArrowRight className="action-icon" size={16} />
            </Link>
          </div>
        ) : (
          <>
            <table className="requests-table">
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
                      <span className={`request-status ${getStatusClass(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1">{getStatusText(request.status)}</span>
                      </span>
                    </td>
                    <td className="request-actions">
                      <Link to={`/client/credit-status/${request.id}`} className="action-link">
                        Détails
                      </Link>
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
      </RequestsCard>

      {/* Informations utiles */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations utiles</h2>
        <InfoGrid>
          <InfoCard>
            <div className="info-content">
              <div className="info-icon">
                <FiInfo size={24} />
              </div>
              <div className="info-text">
                <h4 className="info-title">Comment fonctionne le processus de demande ?</h4>
                <p className="info-description">
                  Votre demande passe par plusieurs étapes d'analyse avant d'être approuvée. Vous pouvez suivre son
                  statut en temps réel.
                </p>
                <Link to="#" className="info-link">
                  En savoir plus
                  <FiArrowRight className="link-icon" size={14} />
                </Link>
              </div>
            </div>
          </InfoCard>

          <InfoCard>
            <div className="info-content">
              <div className="info-icon">
                <FiFileText size={24} />
              </div>
              <div className="info-text">
                <h4 className="info-title">Documents nécessaires</h4>
                <p className="info-description">
                  Assurez-vous de fournir tous les documents requis pour accélérer le traitement de votre demande.
                </p>
                <Link to="#" className="info-link">
                  Voir la liste des documents
                  <FiArrowRight className="link-icon" size={14} />
                </Link>
              </div>
            </div>
          </InfoCard>

          <InfoCard>
            <div className="info-content">
              <div className="info-icon">
                <FiShield size={24} />
              </div>
              <div className="info-text">
                <h4 className="info-title">Sécurité de vos données</h4>
                <p className="info-description">
                  Vos informations personnelles et financières sont protégées par des mesures de sécurité avancées.
                </p>
                <Link to="#" className="info-link">
                  Notre politique de confidentialité
                  <FiArrowRight className="link-icon" size={14} />
                </Link>
              </div>
            </div>
          </InfoCard>

          <InfoCard>
            <div className="info-content">
              <div className="info-icon">
                <FiActivity size={24} />
              </div>
              <div className="info-text">
                <h4 className="info-title">Suivi de votre crédit</h4>
                <p className="info-description">
                  Une fois votre crédit approuvé, vous pouvez suivre vos remboursements et gérer votre prêt facilement.
                </p>
                <Link to="#" className="info-link">
                  Guide de gestion de crédit
                  <FiArrowRight className="link-icon" size={14} />
                </Link>
              </div>
            </div>
          </InfoCard>
        </InfoGrid>
      </div>
    </DashboardContainer>
  )
}

export default ClientDashboard

