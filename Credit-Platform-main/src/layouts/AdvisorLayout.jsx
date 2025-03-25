"use client"

import { useState } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import styled, { css } from "styled-components"
import { useAuth } from "../contexts/AuthContext"
import { Home, FileText, MessageSquare, Settings, Bell, Search, LogOut, Menu, X, ChevronDown, User } from "lucide-react"

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
`

const Sidebar = styled.aside`
  width: 260px;
  background-color: #fff;
  border-right: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: fixed;
  height: 100vh;
  z-index: 50;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(-100%)")};
    box-shadow: ${({ isOpen }) => (isOpen ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" : "none")};
  }
`

const SidebarHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e2e8f0;
`

const Logo = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #c53030;
`

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #4a5568;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`

const Navigation = styled.nav`
  padding: 1rem 0;
`

const NavSection = styled.div`
  margin-bottom: 1rem;
`

const NavSectionTitle = styled.h3`
  padding: 0.5rem 1.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #718096;
  font-weight: 600;
  letter-spacing: 0.05em;
`

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: #4a5568;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #edf2f7;
  }
  
  ${({ active }) =>
    active &&
    css`
    background-color: #fff5f5;
    color: #e53e3e;
    border-left: 3px solid #e53e3e;
  `}
`

const NavIcon = styled.span`
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
`

const NavText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`

const Content = styled.main`
  flex: 1;
  margin-left: 260px;
  padding: 1rem;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 1.5rem;
`

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
`

const SearchBar = styled.div`
  position: relative;
  margin-right: 1rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  width: 250px;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.3);
  }
`

const SearchIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
`

const NotificationButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: #4a5568;
  margin-right: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #e53e3e;
  }
`

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e53e3e;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
  
  &:hover {
    background-color: #edf2f7;
  }
`

const UserAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #e53e3e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 0.5rem;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #2d3748;
`

const UserRole = styled.span`
  font-size: 0.75rem;
  color: #718096;
`

const UserMenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: #fff;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 200px;
  z-index: 10;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`

const UserMenuList = styled.ul`
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
`

const UserMenuItem = styled.li`
  padding: 0;
`

const UserMenuLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #4a5568;
  text-decoration: none;
  
  &:hover {
    background-color: #edf2f7;
  }
`

const UserMenuIcon = styled.span`
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  color: #718096;
`

const UserMenuText = styled.span`
  font-size: 0.875rem;
`

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
  
  &:hover {
    background-color: #fff5f5;
  }
`

const LogoutIcon = styled.span`
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
`

const LogoutText = styled.span`
  font-size: 0.875rem;
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #4a5568;
  cursor: pointer;
  margin-right: 0.75rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  
  @media (min-width: 769px) {
    display: none;
  }
`

const AdvisorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  const getPageTitle = () => {
    switch (true) {
      case pathname.includes("/admin/advisor/dashboard"):
        return "Tableau de bord"
      case pathname.includes("/admin/advisor/credit-requests"):
        return "Demandes de crédit"
      case pathname.includes("/admin/advisor/messages"):
        return "Messagerie client"
      case pathname.includes("/admin/advisor/profile"):
        return "Mon profil"
      default:
        return "Tableau de bord"
    }
  }

  return (
    <Layout>
      <Overlay isOpen={sidebarOpen} onClick={closeSidebar} />

      <Sidebar isOpen={sidebarOpen}>
        <SidebarHeader>
          <Logo>CEM Conseiller</Logo>
          <CloseButton onClick={closeSidebar}>
            <X size={20} />
          </CloseButton>
        </SidebarHeader>

        <Navigation>
          <NavSection>
            <NavSectionTitle>Principal</NavSectionTitle>
            <NavItem
              to="/admin/advisor/dashboard"
              active={pathname === "/admin/advisor/dashboard" ? 1 : 0}
              onClick={closeSidebar}
            >
              <NavIcon>
                <Home size={18} />
              </NavIcon>
              <NavText>Tableau de bord</NavText>
            </NavItem>
            <NavItem
              to="/admin/advisor/credit-requests"
              active={pathname.includes("/admin/advisor/credit-requests") ? 1 : 0}
              onClick={closeSidebar}
            >
              <NavIcon>
                <FileText size={18} />
              </NavIcon>
              <NavText>Demandes de crédit</NavText>
            </NavItem>
            <NavItem
              to="/admin/advisor/messages"
              active={pathname.includes("/admin/advisor/messages") ? 1 : 0}
              onClick={closeSidebar}
            >
              <NavIcon>
                <MessageSquare size={18} />
              </NavIcon>
              <NavText>Messagerie client</NavText>
            </NavItem>
          </NavSection>

          <NavSection>
            <NavSectionTitle>Compte</NavSectionTitle>
            <NavItem
              to="/admin/advisor/profile"
              active={pathname.includes("/admin/advisor/profile") ? 1 : 0}
              onClick={closeSidebar}
            >
              <NavIcon>
                <User size={18} />
              </NavIcon>
              <NavText>Mon profil</NavText>
            </NavItem>
          </NavSection>
        </Navigation>
      </Sidebar>

      <Content>
        <Header>
          <div style={{ display: "flex", alignItems: "center" }}>
            <MobileMenuButton onClick={toggleSidebar}>
              <Menu size={20} />
            </MobileMenuButton>
            <PageTitle>{getPageTitle()}</PageTitle>
          </div>

          <HeaderActions>
            <SearchBar>
              <SearchIcon>
                <Search size={16} />
              </SearchIcon>
              <SearchInput type="text" placeholder="Rechercher..." />
            </SearchBar>

            <NotificationButton>
              <Bell size={20} />
              <NotificationBadge>3</NotificationBadge>
            </NotificationButton>

            <UserMenu>
              <UserMenuButton onClick={toggleUserMenu}>
                <UserAvatar>AC</UserAvatar>
                <UserInfo>
                  <UserName>Alex Conseiller</UserName>
                  <UserRole>Conseiller</UserRole>
                </UserInfo>
                <ChevronDown size={16} />
              </UserMenuButton>

              <UserMenuDropdown isOpen={userMenuOpen}>
                <UserMenuList>
                  <UserMenuItem>
                    <UserMenuLink to="/admin/advisor/profile" onClick={() => setUserMenuOpen(false)}>
                      <UserMenuIcon>
                        <User size={16} />
                      </UserMenuIcon>
                      <UserMenuText>Mon profil</UserMenuText>
                    </UserMenuLink>
                  </UserMenuItem>
                  <UserMenuItem>
                    <UserMenuLink to="/admin/advisor/profile/settings" onClick={() => setUserMenuOpen(false)}>
                      <UserMenuIcon>
                        <Settings size={16} />
                      </UserMenuIcon>
                      <UserMenuText>Paramètres</UserMenuText>
                    </UserMenuLink>
                  </UserMenuItem>
                  <UserMenuItem>
                    <LogoutButton onClick={handleLogout}>
                      <LogoutIcon>
                        <LogOut size={16} />
                      </LogoutIcon>
                      <LogoutText>Déconnexion</LogoutText>
                    </LogoutButton>
                  </UserMenuItem>
                </UserMenuList>
              </UserMenuDropdown>
            </UserMenu>
          </HeaderActions>
        </Header>

        <Outlet />
      </Content>
    </Layout>
  )
}

export default AdvisorLayout

