"use client"

import { useState, useEffect } from "react"
import Card from "../ui/Card"
import Input from "../ui/Input"
import styled from "styled-components"
import { calculateDebtRatio } from "../../services/eligibilityService"
import { FiChevronDown, FiChevronUp, FiAlertCircle, FiCheckCircle } from "react-icons/fi"

// Composants stylisés pour le tableau
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
`

const TableHeader = styled.thead`
  background-color: ${(props) => props.theme.colors.gray[100]};
`

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${(props) => props.theme.colors.gray[50]};
  }
  
  &.bg-muted {
    background-color: ${(props) => props.theme.colors.gray[100]};
  }
`

const TableHeaderCell = styled.th`
  padding: 0.75rem 1rem;
  text-align: ${(props) => props.align || "left"};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[200]};
  
  &.text-center {
    text-align: center;
  }
  
  &.font-bold {
    font-weight: ${(props) => props.theme.fontWeights.bold};
  }
`

const TableCell = styled.td`
  padding: 0.75rem 1rem;
  text-align: ${(props) => props.align || "left"};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[200]};
  
  &.text-right {
    text-align: right;
  }
  
  &.font-medium {
    font-weight: ${(props) => props.theme.fontWeights.medium};
  }
`

const TableBody = styled.tbody``

const SummaryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.gray[50]};
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.gray[200]};
`

const SummaryItem = styled.div`
  flex: 1;
  min-width: 200px;
`

const SummaryLabel = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.gray[600]};
  margin-bottom: 0.25rem;
`

const SummaryValue = styled.div`
  font-size: 1.25rem;
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  color: ${(props) => props.theme.colors.gray[900]};
`

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.primary[600]};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  cursor: pointer;
  padding: 0.5rem;
  margin: 0 auto 1rem;
  border-radius: 0.25rem;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.primary[50]};
  }
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: ${(props) => props.theme.colors.gray[100]};
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.gray[200]};
  }
`

const SectionTitle = styled.div`
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  color: ${(props) => props.theme.colors.gray[900]};
`

const EndettementBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: ${(props) => (props.value > 33 ? "#EF444420" : props.value > 25 ? "#F59E0B20" : "#10B98120")};
  color: ${(props) => (props.value > 33 ? "#EF4444" : props.value > 25 ? "#F59E0B" : "#10B981")};

  svg {
    flex-shrink: 0;
  }
`

export default function TableauCharges({ onDataChange }) {
  // État pour les revenus
  const [revenus, setRevenus] = useState({
    salaireClient: 1439840, // Valeur initiale du salaire client
    salaireEpoux: 0, // Valeur initiale du salaire époux
    autresRevenus: 0, // Valeur initiale des autres revenus
  })

  // État pour les charges
  const [charges, setCharges] = useState({
    nourriture: 0,
    eauElectricite: 0,
    combustibles: 0,
    loyer: 0,
    entretien: 0,
    assurances: 0,
    communication: 0,
    transport: 0,
    scolarite: 0,
    personnel: 0,
    pension: 0,
    autresDepenses: 0,
    remboursementClient: 300000, // Valeur initiale du remboursement client
    remboursementCaution: 0,
  })

  // État pour les valeurs calculées
  const [calcule, setCalcule] = useState({
    totalRevenus: 0,
    totalCharges: 0,
    netCash: 0,
    remboursementCEM: 519769.73, // Valeur fixe du remboursement CEM
    soldeDuMois: 0,
    tauxEndettement: 0, // Nouveau: taux d'endettement
  })

  // États pour contrôler l'affichage
  const [showDetails, setShowDetails] = useState(false)
  const [showRevenus, setShowRevenus] = useState(true)
  const [showCharges, setShowCharges] = useState(true)

  // Calcul des totaux et des ratios chaque fois que les revenus ou charges changent
  useEffect(() => {
    // Calcul du total des revenus
    const totalRevenus = revenus.salaireClient + revenus.salaireEpoux + revenus.autresRevenus

    // Calcul du total des charges
    const totalCharges = Object.values(charges).reduce((sum, value) => sum + value, 0)

    // Calcul du net cash (revenus - charges)
    const netCash = totalRevenus - totalCharges

    // Calcul du solde du mois (net cash - remboursement CEM)
    const soldeDuMois = netCash - calcule.remboursementCEM

    // Calcul du taux d'endettement (total des remboursements / revenus totaux)
    const totalRemboursements = charges.remboursementClient + charges.remboursementCaution + calcule.remboursementCEM
    const tauxEndettement = calculateDebtRatio(totalRevenus, totalRemboursements)

    // Mise à jour des valeurs calculées
    setCalcule({
      totalRevenus,
      totalCharges,
      netCash,
      remboursementCEM: 519769.73, // Valeur fixe du PDF
      soldeDuMois,
      tauxEndettement,
    })

    // Notifier le composant parent des nouvelles données
    if (onDataChange) {
      onDataChange({
        revenus,
        charges,
        calcule: {
          totalRevenus,
          totalCharges,
          netCash,
          remboursementCEM: 519769.73,
          soldeDuMois,
          tauxEndettement,
        },
      })
    }
  }, [revenus, charges, onDataChange])

  // Gestion des changements dans les champs de revenus
  const handleRevenuChange = (field, value) => {
    setRevenus({
      ...revenus,
      [field]: Number.parseFloat(value) || 0,
    })
  }

  // Gestion des changements dans les champs de charges
  const handleChargeChange = (field, value) => {
    setCharges({
      ...charges,
      [field]: Number.parseFloat(value) || 0,
    })
  }

  // Calcul du ratio en pourcentage du revenu total
  const calculerRatio = (valeur) => {
    if (calcule.totalRevenus === 0) return "0.00"
    return ((valeur / calcule.totalRevenus) * 100).toFixed(2)
  }

  // Formatage des nombres avec séparateurs de milliers
  const formaterNombre = (num) => {
    return num.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <Card>
      <Card.Header>
        <h3 className="text-center font-bold">TABLEAU DES REVENUS ET CHARGES</h3>
      </Card.Header>
      <Card.Body>
        {/* Résumé des informations clés */}
        <SummaryBox>
          <SummaryItem>
            <SummaryLabel>Revenus mensuels</SummaryLabel>
            <SummaryValue>{formaterNombre(calcule.totalRevenus)} Ar</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Charges mensuelles</SummaryLabel>
            <SummaryValue>{formaterNombre(calcule.totalCharges)} Ar</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Solde disponible</SummaryLabel>
            <SummaryValue>{formaterNombre(calcule.soldeDuMois)} Ar</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Taux d'endettement</SummaryLabel>
            <EndettementBadge value={calcule.tauxEndettement}>
              {calcule.tauxEndettement > 33 ? <FiAlertCircle /> : <FiCheckCircle />}
              {calcule.tauxEndettement.toFixed(2)}%
            </EndettementBadge>
          </SummaryItem>
        </SummaryBox>

        <ToggleButton onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? (
            <>
              <FiChevronUp /> Masquer les détails
            </>
          ) : (
            <>
              <FiChevronDown /> Afficher les détails
            </>
          )}
        </ToggleButton>

        {showDetails && (
          <div className="space-y-4">
            {/* Section des revenus */}
            <div>
              <SectionHeader onClick={() => setShowRevenus(!showRevenus)}>
                <SectionTitle>REVENUS DU MÉNAGE</SectionTitle>
                {showRevenus ? <FiChevronUp /> : <FiChevronDown />}
              </SectionHeader>

              {showRevenus && (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>1) Salaire net mensuel du client</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={revenus.salaireClient}
                          onChange={(e) => handleRevenuChange("salaireClient", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(revenus.salaireClient)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2) Salaire époux (se)</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={revenus.salaireEpoux}
                          onChange={(e) => handleRevenuChange("salaireEpoux", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(revenus.salaireEpoux)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3) Autres revenus</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={revenus.autresRevenus}
                          onChange={(e) => handleRevenuChange("autresRevenus", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(revenus.autresRevenus)}%</TableCell>
                    </TableRow>
                    <TableRow className="bg-muted font-medium">
                      <TableCell>TOTAL DES REVENUS (A)</TableCell>
                      <TableCell className="text-right">{formaterNombre(calcule.totalRevenus)}</TableCell>
                      <TableCell className="text-right">100.00%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </div>

            {/* Section des charges */}
            <div>
              <SectionHeader onClick={() => setShowCharges(!showCharges)}>
                <SectionTitle>CHARGES DU MÉNAGE</SectionTitle>
                {showCharges ? <FiChevronUp /> : <FiChevronDown />}
              </SectionHeader>

              {showCharges && (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>1) Nourritures</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={charges.nourriture}
                          onChange={(e) => handleChargeChange("nourriture", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(charges.nourriture)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2) Eau et électricité</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={charges.eauElectricite}
                          onChange={(e) => handleChargeChange("eauElectricite", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(charges.eauElectricite)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3) Combustibles (gaz, charbon, ...)</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={charges.combustibles}
                          onChange={(e) => handleChargeChange("combustibles", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(charges.combustibles)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>4) Loyer (domicile et/ou lieu d'activité)</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={charges.loyer}
                          onChange={(e) => handleChargeChange("loyer", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(charges.loyer)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>5) Entretien, réparation et maintenance</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={charges.entretien}
                          onChange={(e) => handleChargeChange("entretien", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(charges.entretien)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>6) Assurances</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={charges.assurances}
                          onChange={(e) => handleChargeChange("assurances", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(charges.assurances)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>7) Frais de communication</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={charges.communication}
                          onChange={(e) => handleChargeChange("communication", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(charges.communication)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>8) Frais de déplacement, transport</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={charges.transport}
                          onChange={(e) => handleChargeChange("transport", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(charges.transport)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>9) Frais de scolarité des enfants</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={charges.scolarite}
                          onChange={(e) => handleChargeChange("scolarite", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(charges.scolarite)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>10) Charges de personnel</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={charges.personnel}
                          onChange={(e) => handleChargeChange("personnel", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(charges.personnel)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>11) Pension alimentaire ou bourse d'études</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={charges.pension}
                          onChange={(e) => handleChargeChange("pension", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(charges.pension)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>12) Autres dépenses</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={charges.autresDepenses}
                          onChange={(e) => handleChargeChange("autresDepenses", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(charges.autresDepenses)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>13) Autres Remboursement IMF-Banques (Client)</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={charges.remboursementClient}
                          onChange={(e) => handleChargeChange("remboursementClient", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(charges.remboursementClient)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>14) Autres Remboursement IMF-Banques (Caution)</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={charges.remboursementCaution}
                          onChange={(e) => handleChargeChange("remboursementCaution", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-right">{calculerRatio(charges.remboursementCaution)}%</TableCell>
                    </TableRow>
                    <TableRow className="bg-muted font-medium">
                      <TableCell>TOTAL DES CHARGES (B)</TableCell>
                      <TableCell className="text-right">{formaterNombre(calcule.totalCharges)}</TableCell>
                      <TableCell className="text-right">{calculerRatio(calcule.totalCharges)}%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </div>

            {/* Tableau des résultats */}
            <Table>
              <TableBody>
                <TableRow className="bg-muted font-medium">
                  <TableCell>NET CASH (C) = (A)-(B)</TableCell>
                  <TableCell className="text-right">{formaterNombre(calcule.netCash)}</TableCell>
                  <TableCell className="text-right">
                    {calcule.totalRevenus ? ((calcule.netCash / calcule.totalRevenus) * 100).toFixed(2) : "0.00"}%
                  </TableCell>
                </TableRow>
                <TableRow className="bg-muted font-medium">
                  <TableCell>REMBOURSEMENT CEM (D)</TableCell>
                  <TableCell className="text-right">{formaterNombre(calcule.remboursementCEM)}</TableCell>
                  <TableCell className="text-right">
                    {calcule.netCash ? ((calcule.remboursementCEM / calcule.netCash) * 100).toFixed(2) : "0.00"}%
                  </TableCell>
                </TableRow>
                <TableRow className="bg-muted font-medium">
                  <TableCell>SOLDE DU MOIS (E)=(C)-(D)</TableCell>
                  <TableCell className="text-right">{formaterNombre(calcule.soldeDuMois)}</TableCell>
                  <TableCell className="text-right">
                    {calcule.netCash ? ((calcule.soldeDuMois / calcule.netCash) * 100).toFixed(2) : "0.00"}%
                  </TableCell>
                </TableRow>
                <TableRow className="bg-muted font-medium">
                  <TableCell>TAUX D'ENDETTEMENT</TableCell>
                  <TableCell className="text-right" colSpan={2}>
                    <EndettementBadge value={calcule.tauxEndettement}>
                      {calcule.tauxEndettement > 33 ? <FiAlertCircle /> : <FiCheckCircle />}
                      {calcule.tauxEndettement.toFixed(2)}% -{calcule.tauxEndettement <= 33 ? " Acceptable" : " Élevé"}
                    </EndettementBadge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
