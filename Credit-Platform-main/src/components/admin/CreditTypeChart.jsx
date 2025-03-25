"use client"

import { useState } from "react"
import { Pie } from "react-chartjs-2"
import { theme } from "../../styles/theme"

const CreditTypeChart = ({ data }) => {
  const [timeFilter, setTimeFilter] = useState("1M")

  const chartData = {
    labels: data.labels || ["SAFIDY", "AVOTRA AINGA", "AVOTRA MIHARY", "AVOTRA ROSO"],
    datasets: [
      {
        data: data.values || [35, 25, 20, 20],
        backgroundColor: [
          theme.colors.primary[600],
          theme.colors.primary[500],
          theme.colors.primary[400],
          theme.colors.primary[300],
        ],
        borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
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
    cutout: "65%",
  }

  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter)
    // Ici, vous pourriez appeler une fonction pour mettre à jour les données en fonction du filtre
  }

  const totalValue = chartData.datasets[0].data.reduce((acc, curr) => acc + curr, 0)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Demandes par type de crédit</h3>
            <p className="text-sm text-gray-500">Répartition des demandes</p>
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
        <div className="h-[300px] relative">
          <Pie data={chartData} options={options} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{totalValue}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreditTypeChart

