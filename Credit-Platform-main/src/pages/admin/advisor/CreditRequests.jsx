"use client"

import { useState } from "react"
import styled from "styled-components"
import {
  FileText,
  Filter,
  RefreshCw,
  Search,
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
  MessageSquare,
} from "lucide-react"

const Container = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  display: flex;
  align-items: center;
`

const TitleIcon = styled.span`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  color: #e53e3e;
`

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`

const SearchBar = styled.div`
  position: relative;
  
  @media (max-width: 768px) {
    width: 100%;
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
  
  @media (max-width: 768px) {
    width: 100%;
  }
`

const SearchIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
`

const ActionButton = styled.button`
  background-color: #edf2f7;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e2e8f0;
  }
`

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const FilterLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  color: #4a5568;
`

const FilterSelect = styled.div`
  position: relative;
`

const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  min-width: 180px;
  font-size: 0.875rem;
  color: #4a5568;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`

const SelectIcon = styled.span`
  display: flex;
  align-items: center;
  color: #a0aec0;
`

const SelectDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.25rem;
  background-color: #fff;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 10;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`

const SelectOption = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #4a5568;
  cursor: pointer;
  
  &:hover {
    background-color: #edf2f7;
  }
  
  ${({ selected }) =>
    selected &&
    `
    background-color: #fff5f5;
    color: #e53e3e;
    font-weight: 500;
  `}
`

const DateInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHead = styled.thead`
  background-color: #f7fafc;
`

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #e2e8f0;
  }
  
  &:hover {
    background-color: #f7fafc;
  }
`

const TableHeader = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  color: #4a5568;
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${({ status }) => {
    switch (status) {
      case "approved":
        return `
          background-color: #c6f6d5;
          color: #22543d;
        `
      case "rejected":
        return `
          background-color: #fed7d7;
          color: #822727;
        `
      case "pending":
        return `
          background-color: #feebc8;
          color: #744210;
        `
      case "processing":
        return `
          background-color: #bee3f8;
          color: #2a4365;
        `
      default:
        return `
          background-color: #e2e8f0;
          color: #4a5568;
        `
    }
  }}
`

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ViewButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: #fff5f5;
  color: #e53e3e;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #fed7d7;
  }
`

const MessageButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: #e6fffa;
  color: #319795;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #b2f5ea;
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const PaginationInfo = styled.div`
  font-size: 0.875rem;
  color: #718096;
`

const PaginationButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const PaginationButton = styled.button`
  padding: 0.5rem 0.75rem;
  background-color: ${({ active }) => (active ? "#e53e3e" : "#edf2f7")};
  color: ${({ active }) => (active ? "#fff" : "#4a5568")};
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ active }) => (active ? "#c53030" : "#e2e8f0")};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

// Données fictives
const creditRequests = [
  {
    id: "CR-2023-001",
    client: "Jean Dupont",
    type: "SAFIDY",
    amount: "5 000 000 Ar",
    date: "21 mars 2023",
    status: "approved",
  },
  {
    id: "CR-2023-002",
    client: "Marie Rakoto",
    type: "AVOTRA AINGA",
    amount: "2 500 000 Ar",
    date: "20 mars 2023",
    status: "pending",
  },
  {
    id: "CR-2023-003",
    client: "Paul Rabe",
    type: "SAFIDY",
    amount: "7 500 000 Ar",
    date: "19 mars 2023",
    status: "processing",
  },
  {
    id: "CR-2023-004",
    client: "Sophie Andria",
    type: "AVOTRA MIHARY",
    amount: "15 000 000 Ar",
    date: "18 mars 2023",
    status: "rejected",
  },
  {
    id: "CR-2023-005",
    client: "Luc Razafy",
    type: "AVOTRA ROSO",
    amount: "35 000 000 Ar",
    date: "17 mars 2023",
    status: "pending",
  },
  {
    id: "CR-2023-006",
    client: "Nadia Rasolofo",
    type: "AVOTRA AMBOARA",
    amount: "12 000 000 Ar",
    date: "16 mars 2023",
    status: "processing",
  },
  {
    id: "CR-2023-007",
    client: "Eric Randria",
    type: "SAFIDY",
    amount: "4 500 000 Ar",
    date: "15 mars 2023",
    status: "approved",
  },
  {
    id: "CR-2023-008",
    client: "Carole Rakotobe",
    type: "AVOTRA MIHARY",
    amount: "18 000 000 Ar",
    date: "14 mars 2023",
    status: "rejected",
  },
]

const CreditRequests = () => {
  const [statusFilterOpen, setStatusFilterOpen] = useState(false)
  const [typeFilterOpen, setTypeFilterOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("Tous")
  const [selectedType, setSelectedType] = useState("Tous")

  const getStatusLabel = (status) => {
    switch (status) {
      case "approved":
        return "Approuvé"
      case "rejected":
        return "Refusé"
      case "pending":
        return "En attente"
      case "processing":
        return "En traitement"
      default:
        return status
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={14} />
      case "rejected":
        return <XCircle size={14} />
      case "pending":
        return <Clock size={14} />
      case "processing":
        return <AlertCircle size={14} />
      default:
        return null
    }
  }

  const toggleStatusFilter = () => {
    setStatusFilterOpen(!statusFilterOpen)
    if (typeFilterOpen) setTypeFilterOpen(false)
  }

  const toggleTypeFilter = () => {
    setTypeFilterOpen(!typeFilterOpen)
    if (statusFilterOpen) setStatusFilterOpen(false)
  }

  const handleStatusSelect = (status) => {
    setSelectedStatus(status)
    setStatusFilterOpen(false)
  }

  const handleTypeSelect = (type) => {
    setSelectedType(type)
    setTypeFilterOpen(false)
  }

  return (
    <Container>
      <Header>
        <Title>
          <TitleIcon>
            <FileText size={20} />
          </TitleIcon>
          Demandes de crédit
        </Title>
        <Actions>
          <SearchBar>
            <SearchIcon>
              <Search size={16} />
            </SearchIcon>
            <SearchInput type="text" placeholder="Rechercher une demande..." />
          </SearchBar>
          <ActionButton>
            <Filter size={16} />
          </ActionButton>
          <ActionButton>
            <RefreshCw size={16} />
          </ActionButton>
        </Actions>
      </Header>

      <FilterContainer>
        <FilterGroup>
          <FilterLabel>Statut</FilterLabel>
          <FilterSelect>
            <SelectButton onClick={toggleStatusFilter}>
              {selectedStatus}
              <SelectIcon>
                <ChevronDown size={16} />
              </SelectIcon>
            </SelectButton>
            <SelectDropdown isOpen={statusFilterOpen}>
              <SelectOption selected={selectedStatus === "Tous"} onClick={() => handleStatusSelect("Tous")}>
                Tous
              </SelectOption>
              <SelectOption selected={selectedStatus === "Approuvé"} onClick={() => handleStatusSelect("Approuvé")}>
                Approuvé
              </SelectOption>
              <SelectOption selected={selectedStatus === "En attente"} onClick={() => handleStatusSelect("En attente")}>
                En attente
              </SelectOption>
              <SelectOption
                selected={selectedStatus === "En traitement"}
                onClick={() => handleStatusSelect("En traitement")}
              >
                En traitement
              </SelectOption>
              <SelectOption selected={selectedStatus === "Refusé"} onClick={() => handleStatusSelect("Refusé")}>
                Refusé
              </SelectOption>
            </SelectDropdown>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Type de crédit</FilterLabel>
          <FilterSelect>
            <SelectButton onClick={toggleTypeFilter}>
              {selectedType}
              <SelectIcon>
                <ChevronDown size={16} />
              </SelectIcon>
            </SelectButton>
            <SelectDropdown isOpen={typeFilterOpen}>
              <SelectOption selected={selectedType === "Tous"} onClick={() => handleTypeSelect("Tous")}>
                Tous
              </SelectOption>
              <SelectOption selected={selectedType === "SAFIDY"} onClick={() => handleTypeSelect("SAFIDY")}>
                SAFIDY
              </SelectOption>
              <SelectOption selected={selectedType === "AVOTRA AINGA"} onClick={() => handleTypeSelect("AVOTRA AINGA")}>
                AVOTRA AINGA
              </SelectOption>
              <SelectOption
                selected={selectedType === "AVOTRA MIHARY"}
                onClick={() => handleTypeSelect("AVOTRA MIHARY")}
              >
                AVOTRA MIHARY
              </SelectOption>
              <SelectOption selected={selectedType === "AVOTRA ROSO"} onClick={() => handleTypeSelect("AVOTRA ROSO")}>
                AVOTRA ROSO
              </SelectOption>
              <SelectOption
                selected={selectedType === "AVOTRA AMBOARA"}
                onClick={() => handleTypeSelect("AVOTRA AMBOARA")}
              >
                AVOTRA AMBOARA
              </SelectOption>
            </SelectDropdown>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Date de début</FilterLabel>
          <DateInput type="date" />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Date de fin</FilterLabel>
          <DateInput type="date" />
        </FilterGroup>
      </FilterContainer>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Client</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Montant</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Statut</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {creditRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.client}</TableCell>
              <TableCell>{request.type}</TableCell>
              <TableCell>{request.amount}</TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell>
                <StatusBadge status={request.status}>
                  {getStatusIcon(request.status)} {getStatusLabel(request.status)}
                </StatusBadge>
              </TableCell>
              <TableCell>
                <ActionButtonsContainer>
                  <ViewButton title="Voir les détails">
                    <Eye size={16} />
                  </ViewButton>
                  <MessageButton title="Envoyer un message">
                    <MessageSquare size={16} />
                  </MessageButton>
                </ActionButtonsContainer>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <PaginationInfo>Affichage de 1 à 8 sur 124 demandes</PaginationInfo>
        <PaginationButtons>
          <PaginationButton disabled>&lt;</PaginationButton>
          <PaginationButton active>1</PaginationButton>
          <PaginationButton>2</PaginationButton>
          <PaginationButton>3</PaginationButton>
          <PaginationButton>...</PaginationButton>
          <PaginationButton>16</PaginationButton>
          <PaginationButton>&gt;</PaginationButton>
        </PaginationButtons>
      </Pagination>
    </Container>
  )
}

export default CreditRequests

