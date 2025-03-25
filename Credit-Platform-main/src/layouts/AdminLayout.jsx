"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import {
  FiHome,
  FiFileText,
  FiUsers,
  FiPackage,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiBell,
  FiSearch,
  FiMenu,
} from "react-icons/fi"
import NotificationDropdown from "../components/admin/NotificationDropdown"

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Implémenter la recherche
    console.log("Recherche:", searchQuery)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-red-700 text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } fixed h-full z-10`}
      >
        <div className="flex items-center justify-between p-4 border-b border-red-800">
          <div className={`flex items-center ${sidebarOpen ? "justify-start" : "justify-center w-full"}`}>
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
              <span className="text-red-700 font-bold">CEM</span>
            </div>
            {sidebarOpen && <span className="ml-3 font-bold">Admin CEM</span>}
          </div>
          <button
            onClick={toggleSidebar}
            className={`text-white p-1 rounded-full hover:bg-red-800 ${!sidebarOpen && "hidden"}`}
          >
            <FiMenu size={20} />
          </button>
        </div>

        <nav className="mt-6">
          <ul>
            <li>
              <Link
                to="/admin/dashboard"
                className={`flex items-center py-3 px-4 ${
                  isActive("/admin/dashboard") ? "bg-red-800 border-l-4 border-white" : "hover:bg-red-800"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <FiHome size={20} />
                {sidebarOpen && <span className="ml-3">Tableau de bord</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/credit-requests"
                className={`flex items-center py-3 px-4 ${
                  isActive("/admin/credit-requests") ? "bg-red-800 border-l-4 border-white" : "hover:bg-red-800"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <FiFileText size={20} />
                {sidebarOpen && <span className="ml-3">Demandes</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className={`flex items-center py-3 px-4 ${
                  isActive("/admin/users") ? "bg-red-800 border-l-4 border-white" : "hover:bg-red-800"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <FiUsers size={20} />
                {sidebarOpen && <span className="ml-3">Utilisateurs</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className={`flex items-center py-3 px-4 ${
                  isActive("/admin/products") ? "bg-red-800 border-l-4 border-white" : "hover:bg-red-800"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <FiPackage size={20} />
                {sidebarOpen && <span className="ml-3">Produits</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/statistics"
                className={`flex items-center py-3 px-4 ${
                  isActive("/admin/statistics") ? "bg-red-800 border-l-4 border-white" : "hover:bg-red-800"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <FiBarChart2 size={20} />
                {sidebarOpen && <span className="ml-3">Statistiques</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className={`flex items-center py-3 px-4 ${
                  isActive("/admin/settings") ? "bg-red-800 border-l-4 border-white" : "hover:bg-red-800"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <FiSettings size={20} />
                {sidebarOpen && <span className="ml-3">Paramètres</span>}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-red-800">
          <button
            onClick={handleLogout}
            className={`flex items-center py-3 px-4 w-full hover:bg-red-800 ${!sidebarOpen && "justify-center"}`}
          >
            <FiLogOut size={20} />
            {sidebarOpen && <span className="ml-3">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="mr-4 p-2 rounded-full hover:bg-gray-100 lg:hidden">
                <FiMenu size={20} />
              </button>
              <h1 className="text-xl font-semibold">Tableau de bord administrateur</h1>
            </div>

            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </form>

              <div className="relative">
                <button onClick={toggleNotifications} className="p-2 rounded-full hover:bg-gray-100 relative">
                  <FiBell size={20} />
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    3
                  </span>
                </button>

                {notificationsOpen && <NotificationDropdown />}
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center">
                  {user?.firstName?.charAt(0) || "A"}
                </div>
                <div className="ml-2 hidden md:block">
                  <p className="text-sm font-medium">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout

