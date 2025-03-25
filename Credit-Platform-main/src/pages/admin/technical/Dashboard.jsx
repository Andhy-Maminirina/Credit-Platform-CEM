"use client"

import { useState } from "react"
import styled from "styled-components"
import { FiUsers, FiUserPlus, FiDollarSign, FiSettings, FiCalendar, FiFilter, FiRefreshCw } from "react-icons/fi"
import { Pie, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

// Ajouter ces imports au début du fichier
import "chart.js/auto"
// import styled from "styled-components" // Removed duplicate import

// Enregistrer les composants Chart.js
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

// Ajouter ces composants stylisés
const StatsCard = styled.div`
background-color: white;
border-radius: 0.5rem;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
padding: 1.5rem;
`

const StatsIcon = styled.div`
width: 3rem;
height: 3rem;
border-radius: 9999px;
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 1rem;
`

const StatsValue = styled.h2`
font-size: 2rem;
font-weight: 700;
color: #111827;
margin-bottom: 0.25rem;
`

const StatsLabel = styled.p`
font-size: 0.875rem;
color: #6b7280;
`

const ChartCard = styled.div`
background-color: white;
border-radius: 0.5rem;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
overflow: hidden;
`

const ChartHeader = styled.div`
padding: 1rem 1.5rem;
border-bottom: 1px solid #e5e7eb;
display: flex;
justify-content: space-between;
align-items: center;
`

const ChartTitle = styled.h3`
font-size: 1rem;
font-weight: 600;
color: #111827;
`

const ChartSubtitle = styled.p`
font-size: 0.875rem;
color: #6b7280;
`

const ChartBody = styled.div`
padding: 1.5rem;
height: 300px;
`

const ChartFilters = styled.div`
display: flex;
gap: 0.25rem;
background-color: #f3f4f6;
padding: 0.25rem;
border-radius: 0.375rem;
`

const ChartFilterButton = styled.button`
padding: 0.25rem 0.75rem;
font-size: 0.75rem;
border-radius: 0.25rem;
border: none;
background-color: ${(props) => (props.active ? "white" : "transparent")};
color: ${(props) => (props.active ? "#111827" : "#6b7280")};
font-weight: ${(props) => (props.active ? "500" : "400")};
box-shadow: ${(props) => (props.active ? "0 1px 2px rgba(0, 0, 0, 0.05)" : "none")};
`

const TableCard = styled.div`
background-color: white;
border-radius: 0.5rem;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
overflow: hidden;
`

const TableHeader = styled.div`
padding: 1rem 1.5rem;
border-bottom: 1px solid #e5e7eb;
display: flex;
justify-content: space-between;
align-items: center;
`

const TableTitle = styled.h3`
font-size: 1rem;
font-weight: 600;
color: #111827;
`

const TableSubtitle = styled.p`
font-size: 0.875rem;
color: #6b7280;
`

const TableViewAll = styled.button`
font-size: 0.875rem;
color: #dc2626;
background: none;
border: none;
font-weight: 500;
`

const TableFooter = styled.div`
padding: 0.75rem 1.5rem;
background-color: #f9fafb;
border-top: 1px solid #e5e7eb;
display: flex;
justify-content: space-between;
align-items: center;
`

const TablePagination = styled.div`
display: flex;
gap: 0.5rem;
`

const TablePaginationButton = styled.button`
padding: 0.25rem 0.75rem;
font-size: 0.875rem;
border-radius: 0.375rem;
border: 1px solid #e5e7eb;
background-color: white;
color: ${(props) => (props.disabled ? "#d1d5db" : "#4b5563")};
cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

&:hover:not(:disabled) {
  background-color: #f9fafb;
}
`

// Ajouter ce style
const ActionIconButton = styled.button`
display: flex;
align-items: center;
padding: 0.5rem 0.75rem;
background-color: white;
border: 1px solid #e5e7eb;
border-radius: 0.375rem;
font-size: 0.875rem;
font-weight: 500;
color: #4b5563;
transition: all 0.2s;

&:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
  color: #111827;
}

svg {
  margin-right: 0.5rem;
  color: #6b7280;
}
`

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState("1M")

  // Données pour les statistiques
  const stats = [
    {
      title: "Utilisateurs totaux",
      value: 1245,
      change: "+12%",
      isPositive: true,
      icon: <FiUsers size={20} />,
      color: "bg-blue-500",
    },
    {
      title: "Nouveaux utilisateurs",
      value: 42,
      change: "+8%",
      isPositive: true,
      icon: <FiUserPlus size={20} />,
      color: "bg-green-500",
    },
    {
      title: "Taux moyen",
      value: "5.2%",
      change: "-0.3%",
      isPositive: false,
      icon: <FiDollarSign size={20} />,
      color: "bg-amber-500",
    },
    {
      title: "Paramètres modifiés",
      value: 8,
      change: "+2",
      isPositive: true,
      icon: <FiSettings size={20} />,
      color: "bg-purple-500",
    },
  ]

  // Données pour le graphique en camembert - Ajout de AVOTRA AMBOARA
  const creditTypeData = {
    labels: ["SAFIDY", "AVOTRA AINGA", "AVOTRA MIHARY", "AVOTRA ROSO", "AVOTRA AMBOARA"],
    datasets: [
      {
        data: [30, 20, 18, 17, 15],
        backgroundColor: ["#DC2626", "#EF4444", "#F87171", "#FCA5A5", "#FECACA"],
        borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
        borderWidth: 2,
      },
    ],
  }

  // Données pour le graphique en ligne
  const userActivityData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    datasets: [
      {
        label: "Nouveaux utilisateurs",
        data: [12, 19, 15, 17, 22, 24, 20, 25, 30, 28, 32, 35],
        borderColor: "#2563EB",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Demandes de crédit",
        data: [8, 12, 10, 14, 16, 19, 15, 18, 22, 20, 24, 28],
        borderColor: "#DC2626",
        backgroundColor: "rgba(220, 38, 38, 0.05)",
        tension: 0.4,
        fill: false,
      },
    ],
  }

  // Données pour les modifications récentes
  const recentChanges = [
    {
      id: 1,
      type: "Taux d'intérêt",
      product: "SAFIDY",
      oldValue: "5.5%",
      newValue: "5.2%",
      changedBy: "Admin Technique",
      date: "2024-03-20T10:30:00",
    },
    {
      id: 2,
      type: "Durée maximale",
      product: "AVOTRA AINGA",
      oldValue: "36 mois",
      newValue: "48 mois",
      changedBy: "Admin Technique",
      date: "2024-03-19T14:15:00",
    },
    {
      id: 3,
      type: "Montant minimal",
      product: "AVOTRA MIHARY",
      oldValue: "1 000 000 Ar",
      newValue: "1 500 000 Ar",
      changedBy: "Admin Technique",
      date: "2024-03-18T09:45:00",
    },
    {
      id: 4,
      type: "Taux d'intérêt",
      product: "AVOTRA ROSO",
      oldValue: "6.0%",
      newValue: "5.8%",
      changedBy: "Admin Technique",
      date: "2024-03-17T16:20:00",
    },
  ]

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 11,
          },
        },
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
    cutout: "65%",
  }

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 11,
          },
          color: "#6B7280",
        },
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

  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter)
    // Ici, vous pourriez appeler une fonction pour mettre à jour les données en fonction du filtre
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord technique</h1>
          <p className="text-gray-500">Gérez les paramètres techniques et suivez les statistiques</p>
        </div>
        {/* Remplacer les boutons existants par ceux-ci */}
        <div className="flex space-x-2">
          <ActionIconButton>
            <FiFilter size={14} />
            Filtrer
          </ActionIconButton>
          <ActionIconButton>
            <FiRefreshCw size={14} />
            Actualiser
          </ActionIconButton>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatsCard key={index}>
            <div className="flex items-center justify-between mb-4">
              <StatsIcon className={`${stat.color} bg-opacity-10`}>
                <div className={`text-${stat.color.split("-")[1]}-500`}>{stat.icon}</div>
              </StatsIcon>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <StatsValue>{stat.value}</StatsValue>
            <StatsLabel>{stat.title}</StatsLabel>
          </StatsCard>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard>
          <ChartHeader>
            <div>
              <ChartTitle>Répartition des crédits</ChartTitle>
              <ChartSubtitle>Par type de produit</ChartSubtitle>
            </div>
            <ChartFilters>
              <ChartFilterButton active={timeFilter === "7D"} onClick={() => handleTimeFilterChange("7D")}>
                7J
              </ChartFilterButton>
              <ChartFilterButton active={timeFilter === "1M"} onClick={() => handleTimeFilterChange("1M")}>
                1M
              </ChartFilterButton>
              <ChartFilterButton active={timeFilter === "3M"} onClick={() => handleTimeFilterChange("3M")}>
                3M
              </ChartFilterButton>
              <ChartFilterButton active={timeFilter === "1Y"} onClick={() => handleTimeFilterChange("1Y")}>
                1A
              </ChartFilterButton>
            </ChartFilters>
          </ChartHeader>
          <ChartBody>
            <Pie data={creditTypeData} options={pieOptions} />
          </ChartBody>
        </ChartCard>

        <ChartCard>
          <ChartHeader>
            <div>
              <ChartTitle>Activité utilisateurs</ChartTitle>
              <ChartSubtitle>Inscriptions et demandes</ChartSubtitle>
            </div>
            <ChartFilters>
              <ChartFilterButton active={timeFilter === "7D"} onClick={() => handleTimeFilterChange("7D")}>
                7J
              </ChartFilterButton>
              <ChartFilterButton active={timeFilter === "1M"} onClick={() => handleTimeFilterChange("1M")}>
                1M
              </ChartFilterButton>
              <ChartFilterButton active={timeFilter === "3M"} onClick={() => handleTimeFilterChange("3M")}>
                3M
              </ChartFilterButton>
              <ChartFilterButton active={timeFilter === "1Y"} onClick={() => handleTimeFilterChange("1Y")}>
                1A
              </ChartFilterButton>
            </ChartFilters>
          </ChartHeader>
          <ChartBody>
            <Line data={userActivityData} options={lineOptions} />
          </ChartBody>
        </ChartCard>
      </div>

      {/* Recent Changes */}
      <TableCard>
        <TableHeader>
          <div>
            <TableTitle>Modifications récentes</TableTitle>
            <TableSubtitle>Derniers changements de paramètres</TableSubtitle>
          </div>
          <TableViewAll>Voir tout</TableViewAll>
        </TableHeader>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Produit
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ancienne valeur
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nouvelle valeur
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Modifié par
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentChanges.map((change) => (
                <tr key={change.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{change.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                      {change.product}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{change.oldValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{change.newValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{change.changedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-gray-400" size={14} />
                      {formatDate(change.date)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TableFooter>
          <div className="text-sm text-gray-500">
            Affichage de <span className="font-medium">1</span> à <span className="font-medium">4</span> sur{" "}
            <span className="font-medium">8</span> modifications
          </div>
          <TablePagination>
            <TablePaginationButton disabled>Précédent</TablePaginationButton>
            <TablePaginationButton>Suivant</TablePaginationButton>
          </TablePagination>
        </TableFooter>
      </TableCard>
    </div>
  )
}

export default Dashboard

