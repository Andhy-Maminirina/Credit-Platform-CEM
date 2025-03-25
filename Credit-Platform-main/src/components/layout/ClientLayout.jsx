"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import styled from "styled-components"
import { theme } from "../../styles/theme"
import {
  FiHome,
  FiUser,
  FiFileText,
  FiCreditCard,
  FiBell,
  FiLogOut,
  FiMenu,
  FiX,
  FiMessageSquare,
  FiChevronDown,
  FiSettings,
  FiHelpCircle,
  FiSearch,
} from "react-icons/fi"

/**
 * Composants stylisés pour le layout client
 */
const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f9fafb;
`

// Barre latérale
const Sidebar = styled.aside`
  width: 280px;
  background-color: white;
  border-right: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  position: fixed;
  height: 100vh;
  z-index: 40;
  left: ${(props) => (props.isOpen ? "0" : "-280px")};
  
  @media (min-width: 1024px) {
    position: sticky;
    top: 0;
    left: 0;
  }
`

// En-tête de la barre latérale
const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
`

// Logo
const Logo = styled.div`
  display: flex;
  align-items: center;
  
  .logo-icon {
    width: 40px;
    height: 40px;
    background-color: ${theme.colors.primary[600]};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    margin-right: 12px;
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  .logo-text {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
  }
`

// Menu de navigation
const NavMenu = styled.nav`
  padding: 1.5rem 1rem;
  
  .nav-section {
    margin-bottom: 1.5rem;
    
    .section-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0 0.75rem;
      margin-bottom: 0.75rem;
    }
  }
`

// Élément de navigation
const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: #4b5563;
  margin-bottom: 0.25rem;
  transition: all 0.2s ease;
  position: relative;
  text-decoration: none;
  
  &:hover {
    background-color: #f3f4f6;
    color: ${theme.colors.primary[600]};
  }
  
  &.active {
    background-color: ${theme.colors.primary[50]};
    color: ${theme.colors.primary[700]};
    font-weight: 500;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 60%;
      width: 3px;
      background-color: ${theme.colors.primary[600]};
      border-radius: 0 3px 3px 0;
    }
  }
  
  .nav-icon {
    margin-right: 12px;
    font-size: 1.25rem;
  }
  
  .nav-text {
    flex: 1;
  }
  
  .badge {
    background-color: ${theme.colors.primary[100]};
    color: ${theme.colors.primary[700]};
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
  }
`

// Contenu principal
const MainContent = styled.main`
  flex: 1;
  margin-left: 0;
  transition: all 0.3s ease;
  
  @media (min-width: 1024px) {
    margin-left: ${(props) => (props.sidebarOpen ? "280px" : "0")};
  }
`

// En-tête
const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 30;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`

// Bouton de menu mobile
const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 0.375rem;
  color: #4b5563;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f3f4f6;
    color: ${theme.colors.primary[600]};
  }
  
  @media (min-width: 1024px) {
    display: none;
  }
`

// Barre de recherche
const SearchBar = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 1rem;
  
  @media (max-width: 768px) {
    display: none;
  }
  
  input {
    width: 100%;
    padding: 0.625rem 1rem 0.625rem 2.5rem;
    border: 1px solid #e5e7eb;
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
    color: #9ca3af;
  }
`

// Menu utilisateur
const UserMenu = styled.div`
  display: flex;
  align-items: center;
  
  .notifications {
    position: relative;
    margin-right: 1rem;
    
    .notification-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 0.375rem;
      color: #4b5563;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: #f3f4f6;
        color: ${theme.colors.primary[600]};
      }
    }
    
    .notification-badge {
      position: absolute;
      top: 0;
      right: 0;
      width: 18px;
      height: 18px;
      background-color: ${theme.colors.primary[600]};
      color: white;
      font-size: 0.75rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
    }
    
    .notification-dropdown {
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
      width: 320px;
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      z-index: 50;
      overflow: hidden;
      
      .notification-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        border-bottom: 1px solid #e5e7eb;
        
        h3 {
          font-size: 0.875rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }
        
        button {
          font-size: 0.75rem;
          color: ${theme.colors.primary[600]};
          background: transparent;
          border: none;
          cursor: pointer;
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
      
      .notification-list {
        max-height: 320px;
        overflow-y: auto;
        
        .notification-item {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          transition: all 0.2s ease;
          cursor: pointer;
          
          &:hover {
            background-color: #f9fafb;
          }
          
          &.unread {
            background-color: ${theme.colors.primary[50]};
            
            &:hover {
              background-color: ${theme.colors.primary[100]};
            }
          }
          
          .notification-content {
            display: flex;
            
            .notification-icon {
              width: 36px;
              height: 36px;
              border-radius: 9999px;
              background-color: ${theme.colors.primary[100]};
              color: ${theme.colors.primary[600]};
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 0.75rem;
              flex-shrink: 0;
            }
            
            .notification-text {
              flex: 1;
              
              .notification-title {
                font-size: 0.875rem;
                font-weight: 500;
                color: #111827;
                margin-bottom: 0.25rem;
              }
              
              .notification-desc {
                font-size: 0.75rem;
                color: #6b7280;
              }
              
              .notification-time {
                font-size: 0.75rem;
                color: #9ca3af;
                margin-top: 0.25rem;
              }
            }
          }
        }
      }
      
      .notification-footer {
        padding: 0.75rem;
        text-align: center;
        border-top: 1px solid #e5e7eb;
        
        a {
          font-size: 0.875rem;
          color: ${theme.colors.primary[600]};
          text-decoration: none;
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  
  .user-profile {
    position: relative;
    
    .profile-button {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: #f3f4f6;
      }
      
      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 9999px;
        background-color: ${theme.colors.primary[100]};
        color: ${theme.colors.primary[700]};
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        margin-right: 0.75rem;
      }
      
      .user-info {
        display: none;
        
        @media (min-width: 768px) {
          display: block;
        }
        
        .user-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: #111827;
        }
        
        .user-role {
          font-size: 0.75rem;
          color: #6b7280;
        }
      }
      
      .dropdown-icon {
        margin-left: 0.5rem;
        color: #9ca3af;
        transition: transform 0.2s ease;
        
        &.open {
          transform: rotate(180deg);
        }
      }
    }
    
    .profile-dropdown {
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
      width: 240px;
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      z-index: 50;
      overflow: hidden;
      
      .dropdown-header {
        padding: 1rem;
        border-bottom: 1px solid #e5e7eb;
        
        .user-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #111827;
        }
        
        .user-email {
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }
      }
      
      .dropdown-menu {
        padding: 0.5rem 0;
        
        .menu-item {
          display: flex;
          align-items: center;
          padding: 0.625rem 1rem;
          color: #4b5563;
          transition: all 0.2s ease;
          cursor: pointer;
          text-decoration: none;
          
          &:hover {
            background-color: #f3f4f6;
            color: ${theme.colors.primary[600]};
          }
          
          .item-icon {
            margin-right: 0.75rem;
          }
          
          .item-text {
            font-size: 0.875rem;
          }
        }
      }
      
      .dropdown-footer {
        padding: 0.5rem 0;
        border-top: 1px solid #e5e7eb;
        
        .logout-button {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0.625rem 1rem;
          color: #ef4444;
          background: transparent;
          border: none;
          transition: all 0.2s ease;
          cursor: pointer;
          text-align: left;
          
          &:hover {
            background-color: #fef2f2;
          }
          
          .logout-icon {
            margin-right: 0.75rem;
          }
          
          .logout-text {
            font-size: 0.875rem;
          }
        }
      }
    }
  }
`

// Contenu de la page
const PageContent = styled.div`
  padding: 1.5rem;
  animation: fadeIn 0.3s ease-out;
  
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

// Overlay pour mobile
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`

/**
 * Composant ClientLayout
 *
 * Ce composant définit la mise en page principale pour l'interface client.
 * Il comprend:
 * - Une barre latérale de navigation
 * - Un en-tête avec notifications et profil utilisateur
 * - Une zone de contenu principal pour afficher les différentes pages
 */
const ClientLayout = () => {
  // Hooks et états
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  // Données fictives pour les notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Demande de crédit approuvée",
      description: "Votre demande de crédit SAFIDY a été approuvée.",
      time: "Il y a 30 minutes",
      icon: <FiCreditCard />,
      unread: true,
    },
    {
      id: 2,
      title: "Nouveau message",
      description: "Vous avez reçu un nouveau message de votre conseiller.",
      time: "Il y a 2 heures",
      icon: <FiMessageSquare />,
      unread: true,
    },
    {
      id: 3,
      title: "Document requis",
      description: "Veuillez fournir votre dernier bulletin de salaire.",
      time: "Hier",
      icon: <FiFileText />,
      unread: false,
    },
  ])

  // Données fictives pour l'utilisateur
  const userData = {
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    role: "Client",
  }

  /**
   * Gère la déconnexion de l'utilisateur
   */
  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  /**
   * Bascule l'état de la barre latérale (ouverte/fermée)
   */
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  /**
   * Bascule l'état du menu des notifications
   */
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen)
    if (profileOpen) setProfileOpen(false)
  }

  /**
   * Bascule l'état du menu du profil
   */
  const toggleProfile = () => {
    setProfileOpen(!profileOpen)
    if (notificationsOpen) setNotificationsOpen(false)
  }

  /**
   * Marque toutes les notifications comme lues
   */
  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, unread: false })))
  }

  /**
   * Vérifie si un chemin est actif
   * @param {string} path - Le chemin à vérifier
   * @returns {boolean} - Vrai si le chemin est actif
   */
  const isActive = (path) => {
    return location.pathname === path
  }

  // Fermer les menus déroulants lorsqu'on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsOpen || profileOpen) {
        if (!event.target.closest(".notifications") && !event.target.closest(".user-profile")) {
          setNotificationsOpen(false)
          setProfileOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [notificationsOpen, profileOpen])

  // Fermer la barre latérale sur mobile lors du changement de page
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }, [location.pathname])

  // Nombre de notifications non lues
  const unreadCount = notifications.filter((notif) => notif.unread).length

  return (
    <LayoutContainer>
      {/* Barre latérale */}
      <Sidebar isOpen={sidebarOpen}>
        <SidebarHeader>
          <Logo>
            <div className="logo-icon">CEM</div>
            <div className="logo-text">Caisse d'Épargne</div>
          </Logo>
        </SidebarHeader>

        <NavMenu>
          {/* Section principale */}
          <div className="nav-section">
            <div className="section-title">Menu principal</div>
            <NavItem to="/client/dashboard" className={isActive("/client/dashboard") ? "active" : ""}>
              <FiHome className="nav-icon" />
              <span className="nav-text">Tableau de bord</span>
            </NavItem>
            <NavItem to="/client/credit-request" className={isActive("/client/credit-request") ? "active" : ""}>
              <FiCreditCard className="nav-icon" />
              <span className="nav-text">Demander un crédit</span>
            </NavItem>
            <NavItem to="/client/credit-status" className={isActive("/client/credit-status") ? "active" : ""}>
              <FiFileText className="nav-icon" />
              <span className="nav-text">Mes demandes</span>
              <span className="badge">3</span>
            </NavItem>
            <NavItem to="/client/chat" className={isActive("/client/chat") ? "active" : ""}>
              <FiMessageSquare className="nav-icon" />
              <span className="nav-text">Discussion</span>
              {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </NavItem>
          </div>

          {/* Section compte */}
          <div className="nav-section">
            <div className="section-title">Compte</div>
            <NavItem to="/client/profile" className={isActive("/client/profile") ? "active" : ""}>
              <FiUser className="nav-icon" />
              <span className="nav-text">Mon profil</span>
            </NavItem>
            <NavItem to="/client/chat-history" className={isActive("/client/chat-history") ? "active" : ""}>
              <FiMessageSquare className="nav-icon" />
              <span className="nav-text">Historique des discussions</span>
            </NavItem>
          </div>

          {/* Section support */}
          <div className="nav-section">
            <div className="section-title">Support</div>
            <NavItem to="/client/help" className={isActive("/client/help") ? "active" : ""}>
              <FiHelpCircle className="nav-icon" />
              <span className="nav-text">Aide et support</span>
            </NavItem>
          </div>
        </NavMenu>
      </Sidebar>

      {/* Overlay pour fermer la barre latérale sur mobile */}
      <Overlay isVisible={sidebarOpen && window.innerWidth < 1024} onClick={toggleSidebar} />

      {/* Contenu principal */}
      <MainContent sidebarOpen={window.innerWidth >= 1024 && sidebarOpen}>
        <Header>
          <div className="flex items-center">
            <MobileMenuButton onClick={toggleSidebar}>
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </MobileMenuButton>

            <SearchBar>
              <input type="text" placeholder="Rechercher..." />
              <FiSearch className="search-icon" size={18} />
            </SearchBar>
          </div>

          <UserMenu>
            {/* Menu des notifications */}
            <div className="notifications">
              <button className="notification-button" onClick={toggleNotifications}>
                <FiBell size={20} />
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
              </button>

              {notificationsOpen && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h3>Notifications</h3>
                    <button onClick={markAllAsRead}>Tout marquer comme lu</button>
                  </div>

                  <div className="notification-list">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`notification-item ${notification.unread ? "unread" : ""}`}>
                        <div className="notification-content">
                          <div className="notification-icon">{notification.icon}</div>
                          <div className="notification-text">
                            <div className="notification-title">{notification.title}</div>
                            <div className="notification-desc">{notification.description}</div>
                            <div className="notification-time">{notification.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="notification-footer">
                    <Link to="/client/notifications">Voir toutes les notifications</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Menu du profil */}
            <div className="user-profile">
              <div className="profile-button" onClick={toggleProfile}>
                <div className="avatar">{userData.firstName.charAt(0)}</div>
                <div className="user-info">
                  <div className="user-name">
                    {userData.firstName} {userData.lastName}
                  </div>
                  <div className="user-role">{userData.role}</div>
                </div>
                <FiChevronDown className={`dropdown-icon ${profileOpen ? "open" : ""}`} size={16} />
              </div>

              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <div className="user-name">
                      {userData.firstName} {userData.lastName}
                    </div>
                    <div className="user-email">{userData.email}</div>
                  </div>

                  <div className="dropdown-menu">
                    <Link to="/client/profile" className="menu-item">
                      <FiUser className="item-icon" size={16} />
                      <span className="item-text">Mon profil</span>
                    </Link>
                    <Link to="/client/settings" className="menu-item">
                      <FiSettings className="item-icon" size={16} />
                      <span className="item-text">Paramètres</span>
                    </Link>
                    <Link to="/client/help" className="menu-item">
                      <FiHelpCircle className="item-icon" size={16} />
                      <span className="item-text">Aide et support</span>
                    </Link>
                  </div>

                  <div className="dropdown-footer">
                    <button className="logout-button" onClick={handleLogout}>
                      <FiLogOut className="logout-icon" size={16} />
                      <span className="logout-text">Déconnexion</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </UserMenu>
        </Header>

        {/* Contenu de la page */}
        <PageContent>
          <Outlet />
        </PageContent>
      </MainContent>
    </LayoutContainer>
  )
}

export default ClientLayout

