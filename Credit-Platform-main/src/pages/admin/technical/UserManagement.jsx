"use client"

import { useState, useEffect } from "react"
import {
  FiUserPlus,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiChevronDown,
  FiEye,
  FiLock,
  FiLogOut,
} from "react-icons/fi"

// Ajouter ces imports au début du fichier
import styled from "styled-components"

// Ajouter ces composants stylisés
const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
`

const PageDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s;
  
  &.primary {
    background-color: #dc2626;
    color: white;
    border: none;
    
    &:hover {
      background-color: #b91c1c;
    }
  }
  
  &.secondary {
    background-color: white;
    color: #4b5563;
    border: 1px solid #e5e7eb;
    
    &:hover {
      background-color: #f9fafb;
    }
  }
  
  svg {
    margin-right: 0.5rem;
  }
`

const FiltersCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1.5rem;
`

const FiltersRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const FiltersGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
`

const SearchInput = styled.div`
  position: relative;
  
  input {
    padding: 0.5rem 0.75rem 0.5rem 2.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    width: 100%;
    
    &:focus {
      outline: none;
      border-color: #dc2626;
      box-shadow: 0 0 0 1px #dc2626;
    }
    
    @media (min-width: 640px) {
      width: 16rem;
    }
  }
  
  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
  }
`

// Remplacer la définition du FilterDropdown pour ajouter un z-index et corriger l'affichage
const FilterDropdown = styled.div`
  position: relative;
  
  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    background-color: white;
    font-size: 0.875rem;
    color: #4b5563;
    
    svg {
      margin-left: 0.5rem;
    }
  }
  
  .dropdown-menu {
    position: absolute;
    right: 0;
    margin-top: 0.5rem;
    width: 14rem;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: white;
    border: 1px solid #e5e7eb;
    z-index: 50;
    display: none;
    
    &.show {
      display: block;
    }
    
    .dropdown-item {
      display: block;
      width: 100%;
      text-align: left;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      color: #4b5563;
      
      &:hover {
        background-color: #f3f4f6;
        color: #111827;
      }
    }
  }
`

const TableCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const UserAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background-color: #fee2e2;
  color: #dc2626;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
`

const UserInfo = styled.div`
  margin-left: 1rem;
  
  .name {
    font-weight: 500;
    color: #111827;
  }
  
  .email {
    font-size: 0.875rem;
    color: #6b7280;
  }
`

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  
  &.role-client {
    background-color: #dbeafe;
    color: #1e40af;
  }
  
  &.role-advisor {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  &.role-technical {
    background-color: #ede9fe;
    color: #5b21b6;
  }
  
  &.status-active {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  &.status-inactive {
    background-color: #f3f4f6;
    color: #4b5563;
  }
  
  &.status-pending {
    background-color: #fef3c7;
    color: #92400e;
  }
  
  &.status-blocked {
    background-color: #fee2e2;
    color: #b91c1c;
  }
`

const ActionIcon = styled.button`
  padding: 0.25rem;
  border-radius: 9999px;
  border: none;
  background-color: transparent;
  color: #6b7280;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f3f4f6;
    color: ${(props) => {
      switch (props.type) {
        case "view":
          return "#2563eb"
        case "edit":
          return "#059669"
        case "reset":
          return "#d97706"
        case "delete":
          return "#dc2626"
        default:
          return "#111827"
      }
    }};
  }
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`

const ModalContent = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 32rem;
  overflow: hidden;
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  
  .icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    
    &.add {
      background-color: #fee2e2;
      color: #dc2626;
    }
    
    &.edit {
      background-color: #d1fae5;
      color: #059669;
    }
    
    &.delete {
      background-color: #fee2e2;
      color: #dc2626;
    }
  }
  
  .title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
  }
`

const ModalBody = styled.div`
  padding: 1.5rem;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const FormField = styled.div`
  &.full-width {
    grid-column: 1 / -1;
  }
  
  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.25rem;
  }
  
  input, select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    
    &:focus {
      outline: none;
      border-color: #dc2626;
      box-shadow: 0 0 0 1px #dc2626;
    }
  }
  
  .hint {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }
`

// Améliorer le style des boutons Filtrer et Actualiser
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

// Améliorer le bouton de déconnexion
const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #dc2626;
  border: none;
  background: none;
  
  &:hover {
    background-color: #fee2e2;
  }
  
  svg {
    margin-right: 0.5rem;
  }
`

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "client",
    status: "active",
    phone: "",
  })

  // Données fictives pour les utilisateurs
  const mockUsers = [
    {
      id: 1,
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
      role: "client",
      status: "active",
      phone: "+261 34 12 34 567",
      createdAt: "2024-01-15T10:30:00",
      lastLogin: "2024-03-20T08:45:00",
    },
    {
      id: 2,
      firstName: "Marie",
      lastName: "Rakoto",
      email: "marie.rakoto@example.com",
      role: "client",
      status: "active",
      phone: "+261 33 98 76 543",
      createdAt: "2024-02-05T14:20:00",
      lastLogin: "2024-03-19T16:30:00",
    },
    {
      id: 3,
      firstName: "Paul",
      lastName: "Rabe",
      email: "paul.rabe@example.com",
      role: "advisor",
      status: "active",
      phone: "+261 32 45 67 890",
      createdAt: "2023-11-20T09:15:00",
      lastLogin: "2024-03-20T10:15:00",
    },
    {
      id: 4,
      firstName: "Sophie",
      lastName: "Andria",
      email: "sophie.andria@example.com",
      role: "technical",
      status: "active",
      phone: "+261 34 56 78 901",
      createdAt: "2023-10-10T11:45:00",
      lastLogin: "2024-03-20T09:30:00",
    },
    {
      id: 5,
      firstName: "Luc",
      lastName: "Razafy",
      email: "luc.razafy@example.com",
      role: "client",
      status: "inactive",
      phone: "+261 33 12 34 567",
      createdAt: "2024-01-25T16:10:00",
      lastLogin: "2024-02-15T14:20:00",
    },
    {
      id: 6,
      firstName: "Nadia",
      lastName: "Rasolofo",
      email: "nadia.rasolofo@example.com",
      role: "client",
      status: "pending",
      phone: "+261 32 98 76 543",
      createdAt: "2024-03-18T08:30:00",
      lastLogin: null,
    },
    {
      id: 7,
      firstName: "Eric",
      lastName: "Randria",
      email: "eric.randria@example.com",
      role: "advisor",
      status: "active",
      phone: "+261 34 45 67 890",
      createdAt: "2023-12-05T13:40:00",
      lastLogin: "2024-03-19T11:25:00",
    },
    {
      id: 8,
      firstName: "Carole",
      lastName: "Rakotobe",
      email: "carole.rakotobe@example.com",
      role: "client",
      status: "blocked",
      phone: "+261 33 56 78 901",
      createdAt: "2024-02-10T10:20:00",
      lastLogin: "2024-02-28T09:15:00",
    },
  ]

  useEffect(() => {
    // Simuler un chargement des données
    setTimeout(() => {
      setUsers(mockUsers)
      setLoading(false)
      setTotalPages(Math.ceil(mockUsers.length / 10))
    }, 1000)
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleRoleFilter = (role) => {
    setRoleFilter(role)
    setCurrentPage(1)
  }

  const handleStatusFilter = (status) => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleAddUser = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      role: "client",
      status: "active",
      phone: "",
    })
    setShowAddModal(true)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone,
    })
    setShowEditModal(true)
  }

  const handleDeleteUser = (user) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmitAdd = (e) => {
    e.preventDefault()
    // Ici, vous ajouteriez la logique pour ajouter un utilisateur
    console.log("Ajouter utilisateur:", formData)
    setShowAddModal(false)
    // Simuler l'ajout d'un utilisateur
    const newUser = {
      id: users.length + 1,
      ...formData,
      createdAt: new Date().toISOString(),
      lastLogin: null,
    }
    setUsers([...users, newUser])
  }

  const handleSubmitEdit = (e) => {
    e.preventDefault()
    // Ici, vous ajouteriez la logique pour modifier un utilisateur
    console.log("Modifier utilisateur:", formData)
    setShowEditModal(false)
    // Simuler la modification d'un utilisateur
    const updatedUsers = users.map((user) => (user.id === selectedUser.id ? { ...user, ...formData } : user))
    setUsers(updatedUsers)
  }

  const handleConfirmDelete = () => {
    // Ici, vous ajouteriez la logique pour supprimer un utilisateur
    console.log("Supprimer utilisateur:", selectedUser)
    setShowDeleteModal(false)
    // Simuler la suppression d'un utilisateur
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id)
    setUsers(updatedUsers)
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * 10, currentPage * 10)

  const formatDate = (dateString) => {
    if (!dateString) return "Jamais"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "client":
        return "bg-blue-100 text-blue-800"
      case "advisor":
        return "bg-green-100 text-green-800"
      case "technical":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleLabel = (role) => {
    switch (role) {
      case "client":
        return "Client"
      case "advisor":
        return "Conseiller"
      case "technical":
        return "Admin Technique"
      default:
        return role
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "blocked":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
        return "Actif"
      case "inactive":
        return "Inactif"
      case "pending":
        return "En attente"
      case "blocked":
        return "Bloqué"
      default:
        return status
    }
  }

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Déconnexion")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <PageHeader>
        <div>
          <PageTitle>Gestion des utilisateurs</PageTitle>
          <PageDescription>Gérez les comptes utilisateurs de la plateforme</PageDescription>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <ActionButton onClick={handleAddUser} className="primary">
            <FiUserPlus className="mr-2" size={16} />
            Ajouter un utilisateur
          </ActionButton>
        </div>
      </PageHeader>

      {/* Filters */}
      <FiltersCard>
        <FiltersRow>
          <FiltersGroup>
            <SearchInput>
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </SearchInput>

            <FilterDropdown>
              <button
                type="button"
                onClick={() => {
                  document.getElementById("role-filter-menu").classList.toggle("show")
                  // Fermer l'autre dropdown s'il est ouvert
                  document.getElementById("status-filter-menu").classList.remove("show")
                }}
              >
                Rôle: {roleFilter === "all" ? "Tous" : getRoleLabel(roleFilter)}
                <FiChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
              </button>

              <div className="dropdown-menu" id="role-filter-menu">
                <button
                  onClick={() => {
                    handleRoleFilter("all")
                    document.getElementById("role-filter-menu").classList.remove("show")
                  }}
                  className="dropdown-item"
                >
                  Tous
                </button>
                <button
                  onClick={() => {
                    handleRoleFilter("client")
                    document.getElementById("role-filter-menu").classList.remove("show")
                  }}
                  className="dropdown-item"
                >
                  Client
                </button>
                <button
                  onClick={() => {
                    handleRoleFilter("advisor")
                    document.getElementById("role-filter-menu").classList.remove("show")
                  }}
                  className="dropdown-item"
                >
                  Conseiller
                </button>
                <button
                  onClick={() => {
                    handleRoleFilter("technical")
                    document.getElementById("role-filter-menu").classList.remove("show")
                  }}
                  className="dropdown-item"
                >
                  Admin Technique
                </button>
              </div>
            </FilterDropdown>

            <FilterDropdown>
              <button
                type="button"
                onClick={() => {
                  document.getElementById("status-filter-menu").classList.toggle("show")
                  // Fermer l'autre dropdown s'il est ouvert
                  document.getElementById("role-filter-menu").classList.remove("show")
                }}
              >
                Statut: {statusFilter === "all" ? "Tous" : getStatusLabel(statusFilter)}
                <FiChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
              </button>

              <div className="dropdown-menu" id="status-filter-menu">
                <button
                  onClick={() => {
                    handleStatusFilter("all")
                    document.getElementById("status-filter-menu").classList.remove("show")
                  }}
                  className="dropdown-item"
                >
                  Tous
                </button>
                <button
                  onClick={() => {
                    handleStatusFilter("active")
                    document.getElementById("status-filter-menu").classList.remove("show")
                  }}
                  className="dropdown-item"
                >
                  Actif
                </button>
                <button
                  onClick={() => {
                    handleStatusFilter("inactive")
                    document.getElementById("status-filter-menu").classList.remove("show")
                  }}
                  className="dropdown-item"
                >
                  Inactif
                </button>
                <button
                  onClick={() => {
                    handleStatusFilter("pending")
                    document.getElementById("status-filter-menu").classList.remove("show")
                  }}
                  className="dropdown-item"
                >
                  En attente
                </button>
                <button
                  onClick={() => {
                    handleStatusFilter("blocked")
                    document.getElementById("status-filter-menu").classList.remove("show")
                  }}
                  className="dropdown-item"
                >
                  Bloqué
                </button>
              </div>
            </FilterDropdown>
          </FiltersGroup>

          <div className="flex items-center space-x-2">
            <ActionIconButton>
              <FiFilter size={14} />
              Filtres avancés
            </ActionIconButton>
            <ActionIconButton>
              <FiRefreshCw size={14} />
              Actualiser
            </ActionIconButton>
          </div>
        </FiltersRow>
      </FiltersCard>

      {/* Users Table */}
      <TableCard>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Utilisateur
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rôle
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Statut
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Inscription
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Dernière connexion
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserAvatar>
                        <span>
                          {user.firstName.charAt(0)}
                          {user.lastName.charAt(0)}
                        </span>
                      </UserAvatar>
                      <UserInfo>
                        <div className="name">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="email">{user.email}</div>
                      </UserInfo>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={`role-${user.role}`}>{getRoleLabel(user.role)}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={`status-${user.status}`}>{getStatusLabel(user.status)}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(user.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(user.lastLogin)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <ActionIcon type="view" title="Voir le profil">
                        <FiEye size={16} />
                      </ActionIcon>
                      <ActionIcon onClick={() => handleEditUser(user)} type="edit" title="Modifier">
                        <FiEdit size={16} />
                      </ActionIcon>
                      <ActionIcon type="reset" title="Réinitialiser le mot de passe">
                        <FiLock size={16} />
                      </ActionIcon>
                      <ActionIcon onClick={() => handleDeleteUser(user)} type="delete" title="Supprimer">
                        <FiTrash2 size={16} />
                      </ActionIcon>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Affichage de <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> à{" "}
              <span className="font-medium">{Math.min(currentPage * 10, filteredUsers.length)}</span> sur{" "}
              <span className="font-medium">{filteredUsers.length}</span> utilisateurs
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Précédent
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </TableCard>

      {/* Add User Modal */}
      {showAddModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <div className="icon add">
                <FiUserPlus className="h-6 w-6" />
              </div>
              <div className="title">Ajouter un utilisateur</div>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmitAdd}>
                <FormGrid>
                  <FormField>
                    <label htmlFor="firstName">Prénom</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </FormField>
                  <FormField>
                    <label htmlFor="lastName">Nom</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </FormField>
                  <FormField className="full-width">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </FormField>
                  <FormField>
                    <label htmlFor="phone">Téléphone</label>
                    <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} />
                  </FormField>
                  <FormField>
                    <label htmlFor="role">Rôle</label>
                    <select id="role" name="role" value={formData.role} onChange={handleInputChange}>
                      <option value="client">Client</option>
                      <option value="advisor">Conseiller</option>
                      <option value="technical">Admin Technique</option>
                    </select>
                  </FormField>
                  <FormField>
                    <label htmlFor="status">Statut</label>
                    <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                      <option value="pending">En attente</option>
                      <option value="blocked">Bloqué</option>
                    </select>
                  </FormField>
                </FormGrid>
              </form>
            </ModalBody>
            <ModalFooter>
              <ActionButton className="secondary" onClick={() => setShowAddModal(false)}>
                Annuler
              </ActionButton>
              <ActionButton className="primary" onClick={handleSubmitAdd}>
                Ajouter
              </ActionButton>
            </ModalFooter>
          </ModalContent>
          <LogoutButton onClick={handleLogout}>
            <FiLogOut size={16} />
            Déconnexion
          </LogoutButton>
        </Modal>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <div className="icon edit">
                <FiEdit className="h-6 w-6" />
              </div>
              <div className="title">Modifier l'utilisateur</div>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmitEdit}>
                <FormGrid>
                  <FormField>
                    <label htmlFor="firstName">Prénom</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </FormField>
                  <FormField>
                    <label htmlFor="lastName">Nom</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </FormField>
                  <FormField className="full-width">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </FormField>
                  <FormField>
                    <label htmlFor="phone">Téléphone</label>
                    <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} />
                  </FormField>
                  <FormField>
                    <label htmlFor="role">Rôle</label>
                    <select id="role" name="role" value={formData.role} onChange={handleInputChange}>
                      <option value="client">Client</option>
                      <option value="advisor">Conseiller</option>
                      <option value="technical">Admin Technique</option>
                    </select>
                  </FormField>
                  <FormField>
                    <label htmlFor="status">Statut</label>
                    <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                      <option value="pending">En attente</option>
                      <option value="blocked">Bloqué</option>
                    </select>
                  </FormField>
                </FormGrid>
              </form>
            </ModalBody>
            <ModalFooter>
              <ActionButton className="secondary" onClick={() => setShowEditModal(false)}>
                Annuler
              </ActionButton>
              <ActionButton className="primary" onClick={handleSubmitEdit}>
                Enregistrer
              </ActionButton>
            </ModalFooter>
          </ModalContent>
          <LogoutButton onClick={handleLogout}>
            <FiLogOut size={16} />
            Déconnexion
          </LogoutButton>
        </Modal>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <div className="icon delete">
                <FiTrash2 className="h-6 w-6" />
              </div>
              <div className="title">Supprimer l'utilisateur</div>
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-gray-500">
                Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action ne peut pas être annulée.
              </p>
            </ModalBody>
            <ModalFooter>
              <ActionButton className="secondary" onClick={() => setShowDeleteModal(false)}>
                Annuler
              </ActionButton>
              <ActionButton className="primary" onClick={handleConfirmDelete}>
                Supprimer
              </ActionButton>
            </ModalFooter>
          </ModalContent>
          <LogoutButton onClick={handleLogout}>
            <FiLogOut size={16} />
            Déconnexion
          </LogoutButton>
        </Modal>
      )}
    </div>
  )
}

export default UserManagement

