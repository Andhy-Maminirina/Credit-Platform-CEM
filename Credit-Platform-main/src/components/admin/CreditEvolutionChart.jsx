"use client"

import { useState } from "react"
import { Line } from "react-chartjs-2"
import { theme } from "../../styles/theme"

const CreditEvolutionChart = ({ data }) => {
  const [timeFilter, setTimeFilter] = useState("1M")

  const chartData = {
    labels: data?.labels || ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    datasets: [
      {
        label: "SAFIDY",
        data: data?.safidy || [12, 15, 18, 14, 16, 19, 22, 25, 23, 26, 28, 30],
        borderColor: theme.colors.primary[600],
        backgroundColor: `${theme.colors.primary[600]}20`,
        tension: 0.4,
        fill: true,
      },
      {
        label: "AVOTRA AINGA",
        data: data?.avotraAinga || [8, 10, 12, 9, 11, 13, 15, 17, 16, 18, 20, 22],
        borderColor: theme.colors.primary[500],
        backgroundColor: `${theme.colors.primary[500]}10`,
        tension: 0.4,
        fill: false,
      },
      {
        label: "AVOTRA MIHARY",
        data: data?.avotraMihary || [5, 7, 9, 6, 8, 10, 12, 14, 13, 15, 17, 19],
        borderColor: theme.colors.primary[400],
        backgroundColor: `${theme.colors.primary[400]}10`,
        tension: 0.4,
        fill: false,
      },
      {
        label: "AVOTRA ROSO",
        data: data?.avotraRoso || [3, 5, 7, 4, 6, 8, 10, 12, 11, 13, 15, 17],
        borderColor: theme.colors.primary[300],
        backgroundColor: `${theme.colors.primary[300]}10`,
        tension: 0.4,
        fill: false,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12,
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
        },
        grid: {
          color: "#E5E7EB",
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: "#9CA3AF",
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

  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter)
    // Ici, vous pourriez appeler une fonction pour mettre à jour les données en fonction du filtre
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Évolution des demandes</h3>
            <p className="text-sm text-gray-500">Nombre de demandes par période</p>
          </div>
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              className={`px-3 py-1 text-xs rounded-md ${timeFilter === "7D" ? "bg-white shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}
              onClick={() => handleTimeFilterChange("7D")}
            >
              7J
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-md ${timeFilter === "1M" ? "bg-white shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}
              onClick={() => handleTimeFilterChange("1M")}
            >
              1M
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-md ${timeFilter === "3M" ? "bg-white shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}
              onClick={() => handleTimeFilterChange("3M")}
            >
              3M
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-md ${timeFilter === "1Y" ? "bg-white shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}
              onClick={() => handleTimeFilterChange("1Y")}
            >
              1A
            </button>
          </div>
        </div>
        <div className="h-[300px]">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  )
}

export default CreditEvolutionChart

