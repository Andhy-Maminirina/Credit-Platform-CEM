import { FiArrowUp, FiArrowDown } from "react-icons/fi"

const DashboardCard = ({ title, value, percentChange, period, icon, iconBgColor, iconColor }) => {
  const isPositive = percentChange >= 0

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className={`${iconBgColor} p-3 rounded-lg`}>
          <div className={iconColor}>{icon}</div>
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"} flex items-center`}
        >
          {isPositive ? <FiArrowUp className="mr-1" size={12} /> : <FiArrowDown className="mr-1" size={12} />}
          {isPositive ? "+" : ""}
          {percentChange}%
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-gray-500 text-sm mt-1">{title}</p>
      {period && <p className="text-xs text-gray-400 mt-2">{period}</p>}
    </div>
  )
}

export default DashboardCard

