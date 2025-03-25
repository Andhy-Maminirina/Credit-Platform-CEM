"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FiHome, FiUsers, FiSettings, FiCreditCard, FiSliders, FiUser, FiLogOut, FiBell } from "react-icons/fi"
import styled from "styled-components"

// Composants stylisés
const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`

const Sidebar = styled.div`
  width: 260px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Logo = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #dc2626;
`

const SidebarMenu = styled.ul`
  padding: 1rem 0;
`

const SidebarMenuItem = styled.li`
  margin-bottom: 0.25rem;
`

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${(props) => (props.active ? "#dc2626" : "#4b5563")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  background-color: ${(props) => (props.active ? "#fee2e2" : "transparent")};
  border-left: ${(props) => (props.active ? "4px solid #dc2626" : "4px solid transparent")};
  transition: all 0.2s;
  text-decoration: none;

  &:hover {
    background-color: #f3f4f6;
    color: #dc2626;
  }

  svg {
    margin-right: 0.75rem;
  }
`

const SidebarSection = styled.div`
  padding: 0.5rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #9ca3af;
  margin-top: 1rem;
`

const MainContent = styled.div`
  flex: 1;
  margin-left: 260px;
  padding: 1.5rem;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 5;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
`

const SearchBar = styled.div`
  position: relative;
  margin-right: 1rem;
`

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  width: 250px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.1);
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`

const UserMenu = styled.div`
  position: relative;
`

const UserMenuButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`

const UserAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: #dc2626;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 0.5rem;
`

const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  margin-right: 0.5rem;
`

const UserMenuDropdown = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.5rem;
  width: 200px;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 20;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`

const UserMenuList = styled.ul`
  padding: 0.5rem 0;
`

const UserMenuItem = styled.li`
  padding: 0.5rem 1rem;
`

const UserMenuLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:hover {
    color: #dc2626;
  }

  svg {
    margin-right: 0.5rem;
  }
`

const NotificationButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  margin-right: 1rem;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background-color: #dc2626;
`

const NotificationDropdown = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.5rem;
  width: 320px;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 20;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`

const NotificationHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NotificationTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
`

const NotificationMarkAllRead = styled.button`
  background: none;
  border: none;
  font-size: 0.75rem;
  color: #dc2626;
  cursor: pointer;
`

const NotificationList = styled.ul`
  max-height: 320px;
  overflow-y: auto;
`

const NotificationItem = styled.li`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: ${(props) => (props.unread ? "#f9fafb" : "white")};
`

const NotificationContent = styled.div`
  font-size: 0.875rem;
  color: #4b5563;
`

const NotificationTime = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.25rem;
`

const NotificationFooter = styled.div`
  padding: 0.75rem;
  text-align: center;
  border-top: 1px solid #e5e7eb;
`

const NotificationViewAll = styled(Link)`
  font-size: 0.875rem;
  color: #dc2626;
  text-decoration: none;
`

// Ajouter ce style pour le bouton de déconnexion
const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  color: #dc2626;
  font-weight: 500;
  border: none;
  background: none;
  border-radius: 0.375rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: #fee2e2;
  }
  
  svg {
    margin-right: 0.75rem;
  }
`

const TechnicalAdminLayout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const handleLogout = () => {
    // Logique de déconnexion
    navigate("/admin/login")
  }

  const notifications = [
    {
      id: 1,
      content: "Nouvel utilisateur inscrit",
      time: "Il y a 5 minutes",
      unread: true,
    },
    {
      id: 2,
      content: "Mise à jour des paramètres système",
      time: "Il y a 1 heure",
      unread: true,
    },
    {
      id: 3,
      content: "Taux d'intérêt SAFIDY mis à jour",
      time: "Il y a 3 heures",
      unread: false,
    },
  ]

  return (
    <LayoutContainer>
      <Sidebar>
        <SidebarHeader>
          <Logo>CEM Admin</Logo>
        </SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarLink
              to="/admin/technical/dashboard"
              active={location.pathname === "/admin/technical/dashboard" ? 1 : 0}
            >
              <FiHome size={18} />
              Tableau de bord
            </SidebarLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarLink to="/admin/technical/users" active={location.pathname === "/admin/technical/users" ? 1 : 0}>
              <FiUsers size={18} />
              Gestion des utilisateurs
            </SidebarLink>
          </SidebarMenuItem>

          <SidebarSection>Paramètres</SidebarSection>

          <SidebarMenuItem>
            <SidebarLink
              to="/admin/technical/credit-settings"
              active={location.pathname === "/admin/technical/credit-settings" ? 1 : 0}
            >
              <FiCreditCard size={18} />
              Paramètres des crédits
            </SidebarLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarLink
              to="/admin/technical/system-settings"
              active={location.pathname === "/admin/technical/system-settings" ? 1 : 0}
            >
              <FiSliders size={18} />
              Paramètres système
            </SidebarLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarLink
              to="/admin/technical/profile"
              active={location.pathname === "/admin/technical/profile" ? 1 : 0}
            >
              <FiUser size={18} />
              Profil administrateur
            </SidebarLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>

      <MainContent>
        <Header>
          <HeaderTitle>Tableau de bord technique</HeaderTitle>
          <HeaderActions>
            <SearchBar>
              <SearchInput type="text" placeholder="Rechercher..." />
              <SearchIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </SearchIcon>
            </SearchBar>

            <NotificationButton onClick={() => setNotificationsOpen(!notificationsOpen)}>
              <FiBell size={20} />
              <NotificationBadge />
            </NotificationButton>

            <UserMenu>
              <UserMenuButton onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <UserAvatar>AT</UserAvatar>
                <UserName>Admin Technique</UserName>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </UserMenuButton>

              <UserMenuDropdown isOpen={userMenuOpen}>
                <UserMenuList>
                  <UserMenuItem>
                    <UserMenuLink to="/admin/technical/profile">
                      <FiUser size={16} />
                      Profil
                    </UserMenuLink>
                  </UserMenuItem>
                  <UserMenuItem>
                    <UserMenuLink to="/admin/technical/system-settings">
                      <FiSettings size={16} />
                      Paramètres
                    </UserMenuLink>
                  </UserMenuItem>
                  <UserMenuItem>
                    <LogoutButton onClick={handleLogout}>
                      <FiLogOut size={16} />
                      Déconnexion
                    </LogoutButton>
                  </UserMenuItem>
                </UserMenuList>
              </UserMenuDropdown>
            </UserMenu>
          </HeaderActions>
        </Header>

        <NotificationDropdown isOpen={notificationsOpen}>
          <NotificationHeader>
            <NotificationTitle>Notifications</NotificationTitle>
            <NotificationMarkAllRead>Tout marquer comme lu</NotificationMarkAllRead>
          </NotificationHeader>
          <NotificationList>
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} unread={notification.unread}>
                <NotificationContent>{notification.content}</NotificationContent>
                <NotificationTime>{notification.time}</NotificationTime>
              </NotificationItem>
            ))}
          </NotificationList>
          <NotificationFooter>
            <NotificationViewAll to="/admin/technical/notifications">Voir toutes les notifications</NotificationViewAll>
          </NotificationFooter>
        </NotificationDropdown>

        <div>{children}</div>
      </MainContent>
    </LayoutContainer>
  )
}

export default TechnicalAdminLayout

