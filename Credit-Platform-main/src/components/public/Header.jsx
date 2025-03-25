"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { FiMenu, FiX, FiChevronDown, FiMessageCircle } from "react-icons/fi"
import { useAuth } from "../../contexts/AuthContext"

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleLogout = () => {
    logout()
    navigate("/")
    setDropdownOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-sm" : "bg-transparent py-md"}`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div
                className={`w-10 h-10 ${scrolled ? "bg-primary-600" : "bg-white"} rounded-md flex items-center justify-center transition-colors`}
              >
                <span className={`${scrolled ? "text-white" : "text-primary-600"} font-bold`}>CEM</span>
              </div>
              <span
                className={`ml-sm text-xl font-semibold ${scrolled ? "text-gray-900" : "text-white"} transition-colors`}
              >
                Caisse d'Épargne
              </span>
            </Link>

            {/* Bouton Assistant Virtuel */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-chatbot"))}
              className={`ml-4 flex items-center px-3 py-1 rounded-full ${
                scrolled
                  ? "bg-primary-50 text-primary-600 hover:bg-primary-100"
                  : "bg-white/20 text-white hover:bg-white/30"
              } transition-colors`}
            >
              <FiMessageCircle className="mr-2" />
              <span className="text-sm font-medium">Assistant Virtuel</span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-xl">
            <Link
              to="/"
              className={`${scrolled ? "text-gray-700 hover:text-primary-600" : "text-white hover:text-accent-300"} transition-colors ${isActive("/") ? "font-semibold" : ""}`}
            >
              Accueil
            </Link>
            <Link
              to="/credit-simulation"
              className={`${scrolled ? "text-gray-700 hover:text-primary-600" : "text-white hover:text-accent-300"} transition-colors ${isActive("/credit-simulation") ? "font-semibold" : ""}`}
            >
              Simuler un crédit
            </Link>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className={`flex items-center ${scrolled ? "text-gray-700 hover:text-primary-600" : "text-white hover:text-accent-300"} transition-colors`}
              >
                Nos crédits
                <FiChevronDown className="ml-xs" />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-sm bg-white rounded-md shadow-lg overflow-hidden w-48 animate-scale-up">
                  <Link
                    to="/credit-type/safidy"
                    className="block px-md py-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Crédit SAFIDY
                  </Link>
                  <Link
                    to="/credit-type/avotra"
                    className="block px-md py-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Crédits AVOTRA
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <button onClick={toggleDropdown} className="flex items-center gap-sm">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold">
                      {user.firstName?.charAt(0) || "U"}
                    </div>
                    <span className={`${scrolled ? "text-gray-900" : "text-white"} transition-colors`}>
                      {user.firstName}
                    </span>
                    <FiChevronDown className={`${scrolled ? "text-gray-600" : "text-white"} transition-colors`} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full right-0 mt-sm bg-white rounded-md shadow-lg overflow-hidden w-48 animate-scale-up">
                      <Link
                        to={user.isAdmin ? "/admin/dashboard" : "/client/dashboard"}
                        className="block px-md py-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Mon espace
                      </Link>
                      <Link
                        to="/client/profile"
                        className="block px-md py-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Mon profil
                      </Link>
                      <Link
                        to={user.isAdmin ? "/admin/messages" : "/client/messages"}
                        className="block px-md py-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Mes messages
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-md py-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      >
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-md">
                <Link
                  to="/login"
                  className={`${scrolled ? "text-gray-700 hover:text-primary-600" : "text-white hover:text-accent-300"} transition-colors`}
                >
                  Connexion
                </Link>
                <Link to="/register" className="btn btn-sm btn-accent">
                  S'inscrire
                </Link>
              </div>
            )}

            <button
              onClick={toggleMobileMenu}
              className={`ml-md p-sm rounded-md ${scrolled ? "hover:bg-gray-100 text-gray-700" : "hover:bg-white/10 text-white"} md:hidden transition-colors`}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-down">
          <div className="container py-md">
            <nav className="flex flex-col space-y-sm">
              <Link
                to="/"
                className="py-sm px-md hover:bg-primary-50 rounded-md text-gray-800 hover:text-primary-600"
                onClick={toggleMobileMenu}
              >
                Accueil
              </Link>
              <Link
                to="/credit-simulation"
                className="py-sm px-md hover:bg-primary-50 rounded-md text-gray-800 hover:text-primary-600"
                onClick={toggleMobileMenu}
              >
                Simuler un crédit
              </Link>
              <Link
                to="/credit-type/safidy"
                className="py-sm px-md hover:bg-primary-50 rounded-md text-gray-800 hover:text-primary-600"
                onClick={toggleMobileMenu}
              >
                Crédit SAFIDY
              </Link>
              <Link
                to="/credit-type/avotra"
                className="py-sm px-md hover:bg-primary-50 rounded-md text-gray-800 hover:text-primary-600"
                onClick={toggleMobileMenu}
              >
                Crédits AVOTRA
              </Link>

              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("toggle-chatbot"))
                  toggleMobileMenu()
                }}
                className="py-sm px-md text-left hover:bg-primary-50 rounded-md text-gray-800 hover:text-primary-600 flex items-center"
              >
                <FiMessageCircle className="mr-2" />
                Assistant Virtuel
              </button>

              {user ? (
                <>
                  <div className="border-t border-gray-200 my-sm pt-sm"></div>
                  <Link
                    to={user.isAdmin ? "/admin/dashboard" : "/client/dashboard"}
                    className="py-sm px-md hover:bg-primary-50 rounded-md text-gray-800 hover:text-primary-600"
                    onClick={toggleMobileMenu}
                  >
                    Mon espace
                  </Link>
                  <Link
                    to="/client/profile"
                    className="py-sm px-md hover:bg-primary-50 rounded-md text-gray-800 hover:text-primary-600"
                    onClick={toggleMobileMenu}
                  >
                    Mon profil
                  </Link>
                  <Link
                    to={user.isAdmin ? "/admin/messages" : "/client/messages"}
                    className="py-sm px-md hover:bg-primary-50 rounded-md text-gray-800 hover:text-primary-600"
                    onClick={toggleMobileMenu}
                  >
                    Mes messages
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      toggleMobileMenu()
                    }}
                    className="py-sm px-md text-left hover:bg-primary-50 rounded-md text-gray-800 hover:text-primary-600"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t border-gray-200 my-sm pt-sm"></div>
                  <Link
                    to="/login"
                    className="py-sm px-md hover:bg-primary-50 rounded-md text-gray-800 hover:text-primary-600"
                    onClick={toggleMobileMenu}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="py-sm px-md bg-primary-600 text-white rounded-md hover:bg-primary-700"
                    onClick={toggleMobileMenu}
                  >
                    S'inscrire
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

