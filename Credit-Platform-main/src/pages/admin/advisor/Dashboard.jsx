"use client"

import { useState } from "react"
import styled from "styled-components"
import { Users, FileText, CheckCircle, XCircle, Clock, TrendingUp, TrendingDown, Filter, RefreshCw } from "lucide-react"
import { Link } from "react-router-dom"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

// Enregistrer les composants Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

// Composants stylisés
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
`

const Card = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`

const StatsCard = styled(Card)`
  grid-column: span 3;
  
  @media (max-width: 1200px) {
    grid-column: span 6;
  }
  
  @media (max-width: 768px) {
    grid-column: span 12;
  }
`

const ChartCard = styled(Card)`
  grid-column: span 20;
  
  @media (max-width: 1200px) {
    grid-column: span 12;
  }
`

const TableCard = styled(Card)`
  grid-column: span 20;
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const CardTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  display: flex;
  align-items: center;
`

const CardTitleIcon = styled.span`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  color: #e53e3e;
`

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ActionButton = styled.button`
  background-color: #edf2f7;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e2e8f0;
  }
`

const StatValue = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #718096;
`

const StatChange = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  color: ${({ isPositive }) => (isPositive ? "#48bb78" : "#e53e3e")};
`

const StatChangeIcon = styled.span`
  margin-right: 0.25rem;
  display: flex;
  align-items: center;
`

const ChartContainer = styled.div`
  height: 300px;
  position: relative;
`

const ChartLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #4a5568;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f7fafc;
  }
  
  opacity: ${({ active }) => (active ? 1 : 0.5)};
`

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: ${({ color }) => color};
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHead = styled.thead`
  background-color: #f7fafc;
`

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #e2e8f0;
  }
  
  &:hover {
    background-color: #f7fafc;
  }
`

const TableHeader = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  color: #4a5568;
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${({ status }) => {
    switch (status) {
      case "approved":
        return `
          background-color: #c6f6d5;
          color: #22543d;
        `
      case "rejected":
        return `
          background-color: #fed7d7;
          color: #822727;
        `
      case "pending":
        return `
          background-color: #feebc8;
          color: #744210;
        `
      case "processing":
        return `
          background-color: #bee3f8;
          color: #2a4365;
        `
      default:
        return `
          background-color: #e2e8f0;
          color: #4a5568;
        `
    }
  }}
`

const ViewButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: #fff5f5;
  color: #e53e3e;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #fed7d7;
  }
`

const PeriodSelector = styled.div`
  display: flex;
  gap: 0.5rem;
`

const PeriodButton = styled.button`
  padding: 0.25rem 0.75rem;
  background-color: ${({ active }) => (active ? "#e53e3e" : "#edf2f7")};
  color: ${({ active }) => (active ? "#fff" : "#4a5568")};
  border: none;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ active }) => (active ? "#c53030" : "#e2e8f0")};
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`

const PaginationInfo = styled.div`
  font-size: 0.875rem;
  color: #718096;
`

const PaginationButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const PaginationButton = styled.button`
  padding: 0.5rem 0.75rem;
  background-color: ${({ active }) => (active ? "#e53e3e" : "#edf2f7")};
  color: ${({ active }) => (active ? "#fff" : "#4a5568")};
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ active }) => (active ? "#c53030" : "#e2e8f0")};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

// Données fictives
const recentRequests = [
  {
    id: "CR-2023-001",
    client: "Jean Dupont",
    type: "SAFIDY",
    amount: "5 000 000 Ar",
    date: "21 mars 2023",
    status: "approved",
  },
  {
    id: "CR-2023-002",
    client: "Marie Rakoto",
    type: "AVOTRA AINGA",
    amount: "2 500 000 Ar",
    date: "20 mars 2023",
    status: "pending",
  },
  {
    id: "CR-2023-003",
    client: "Paul Rabe",
    type: "SAFIDY",
    amount: "7 500 000 Ar",
    date: "19 mars 2023",
    status: "processing",
  },
  {
    id: "CR-2023-004",
    client: "Sophie Andria",
    type: "AVOTRA MIHARY",
    amount: "15 000 000 Ar",
    date: "18 mars 2023",
    status: "rejected",
  },
  {
    id: "CR-2023-005",
    client: "Luc Razafy",
    type: "AVOTRA AMBOARA",
    amount: "35 000 000 Ar",
    date: "17 mars 2023",
    status: "pending",
  },
]

// Données pour le graphique par type de crédit
const creditTypeColors = {
  SAFIDY: "#e53e3e",
  "AVOTRA AINGA": "#dd6b20",
  "AVOTRA MIHARY": "#d69e2e",
  "AVOTRA ROSO": "#38a169",
  "AVOTRA AMBOARA": "#805ad5",
}

const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"]

const generateCreditTypeData = () => {
  const datasets = Object.entries(creditTypeColors).map(([type, color]) => {
    // Générer des données aléatoires pour chaque type de crédit
    const data = months.map(() => Math.floor(Math.random() * 20) + 5)

    return {
      label: type,
      data: data,
      borderColor: color,
      backgroundColor: `${color}20`,
      tension: 0.4,
      fill: false,
      borderWidth: 2,
      hidden: false,
    }
  })

  return {
    labels: months,
    datasets,
  }
}

const Dashboard = () => {
  const [activePeriod, setActivePeriod] = useState("7J")
  const [chartData, setChartData] = useState(generateCreditTypeData())
  const [visibleDatasets, setVisibleDatasets] = useState(
    Object.keys(creditTypeColors).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {}),
  )

  const toggleDataset = (label) => {
    const newVisibility = { ...visibleDatasets }
    newVisibility[label] = !newVisibility[label]
    setVisibleDatasets(newVisibility)

    // Mettre à jour les données du graphique
    setChartData((prevData) => {
      const newData = { ...prevData }
      newData.datasets = newData.datasets.map((dataset) => {
        if (dataset.label === label) {
          return { ...dataset, hidden: !newVisibility[label] }
        }
        return dataset
      })
      return newData
    })
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "approved":
        return "Approuvé"
      case "rejected":
        return "Refusé"
      case "pending":
        return "En attente"
      case "processing":
        return "En traitement"
      default:
        return status
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={14} />
      case "rejected":
        return <XCircle size={14} />
      case "pending":
        return <Clock size={14} />
      case "processing":
        return <FileText size={14} />
      default:
        return null
    }
  }

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Cacher la légende par défaut, nous utilisons notre propre légende interactive
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
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
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
        radius: 2,
        hoverRadius: 4,
      },
      line: {
        borderWidth: 2,
      },
    },
  }

  return (
    <Container>
      {/* Cartes de statistiques */}
      <StatsCard>
        <CardHeader>
          <CardTitle>
            <CardTitleIcon>
              <FileText size={18} />
            </CardTitleIcon>
            Demandes totales
          </CardTitle>
        </CardHeader>
        <StatValue>124</StatValue>
        <StatLabel>Demandes de crédit</StatLabel>
        <StatChange isPositive={true}>
          <StatChangeIcon>
            <TrendingUp size={16} />
          </StatChangeIcon>
          +12% depuis le mois dernier
        </StatChange>
      </StatsCard>

      <StatsCard>
        <CardHeader>
          <CardTitle>
            <CardTitleIcon>
              <CheckCircle size={18} />
            </CardTitleIcon>
            Demandes approuvées
          </CardTitle>
        </CardHeader>
        <StatValue>78</StatValue>
        <StatLabel>Crédits accordés</StatLabel>
        <StatChange isPositive={true}>
          <StatChangeIcon>
            <TrendingUp size={16} />
          </StatChangeIcon>
          +8% depuis le mois dernier
        </StatChange>
      </StatsCard>

      <StatsCard>
        <CardHeader>
          <CardTitle>
            <CardTitleIcon>
              <Clock size={18} />
            </CardTitleIcon>
            En attente
          </CardTitle>
        </CardHeader>
        <StatValue>32</StatValue>
        <StatLabel>Demandes à traiter</StatLabel>
        <StatChange isPositive={false}>
          <StatChangeIcon>
            <TrendingDown size={16} />
          </StatChangeIcon>
          -5% depuis le mois dernier
        </StatChange>
      </StatsCard>

      <StatsCard>
        <CardHeader>
          <CardTitle>
            <CardTitleIcon>
              <Users size={18} />
            </CardTitleIcon>
            Nouveaux clients
          </CardTitle>
        </CardHeader>
        <StatValue>18</StatValue>
        <StatLabel>Ce mois-ci</StatLabel>
        <StatChange isPositive={true}>
          <StatChangeIcon>
            <TrendingUp size={16} />
          </StatChangeIcon>
          +15% depuis le mois dernier
        </StatChange>
      </StatsCard>

      {/* Graphique d'évolution par type de crédit */}
      <ChartCard>
        <CardHeader>
          <CardTitle>
            <CardTitleIcon>
              <TrendingUp size={18} />
            </CardTitleIcon>
            Évolution des demandes par type de crédit
          </CardTitle>
          <CardActions>
            <PeriodSelector>
              <PeriodButton active={activePeriod === "7J"} onClick={() => setActivePeriod("7J")}>
                7J
              </PeriodButton>
              <PeriodButton active={activePeriod === "1M"} onClick={() => setActivePeriod("1M")}>
                1M
              </PeriodButton>
              <PeriodButton active={activePeriod === "3M"} onClick={() => setActivePeriod("3M")}>
                3M
              </PeriodButton>
              <PeriodButton active={activePeriod === "1A"} onClick={() => setActivePeriod("1A")}>
                1A
              </PeriodButton>
            </PeriodSelector>
            <ActionButton>
              <Filter size={16} />
            </ActionButton>
            <ActionButton>
              <RefreshCw size={16} />
            </ActionButton>
          </CardActions>
        </CardHeader>
        <ChartContainer>
          <Line data={chartData} options={lineOptions} />
        </ChartContainer>
        <ChartLegend>
          {Object.entries(creditTypeColors).map(([type, color]) => (
            <LegendItem key={type} active={visibleDatasets[type]} onClick={() => toggleDataset(type)}>
              <LegendColor color={color} />
              {type}
            </LegendItem>
          ))}
        </ChartLegend>
      </ChartCard>

      {/* Tableau des demandes récentes */}
      <TableCard>
        <CardHeader>
          <CardTitle>
            <CardTitleIcon>
              <FileText size={18} />
            </CardTitleIcon>
            Demandes récentes
          </CardTitle>
          <CardActions>
            <ActionButton>
              <Filter size={16} />
            </ActionButton>
            <ActionButton>
              <RefreshCw size={16} />
            </ActionButton>
          </CardActions>
        </CardHeader>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>Client</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Montant</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Statut</TableHeader>
              <TableHeader>Action</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {recentRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.client}</TableCell>
                <TableCell>{request.type}</TableCell>
                <TableCell>{request.amount}</TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell>
                  <StatusBadge status={request.status}>
                    {getStatusIcon(request.status)} {getStatusLabel(request.status)}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <ViewButton to={`/admin/advisor/credit-requests/${request.id}`}>Voir détails</ViewButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
        <Pagination>
          <PaginationInfo>Affichage de 1 à 5 sur 124 demandes</PaginationInfo>
          <PaginationButtons>
            <PaginationButton disabled>&lt;</PaginationButton>
            <PaginationButton active>1</PaginationButton>
            <PaginationButton>2</PaginationButton>
            <PaginationButton>3</PaginationButton>
            <PaginationButton>...</PaginationButton>
            <PaginationButton>25</PaginationButton>
            <PaginationButton>&gt;</PaginationButton>
          </PaginationButtons>
        </Pagination>
      </TableCard>
    </Container>
  )
}

export default Dashboard

