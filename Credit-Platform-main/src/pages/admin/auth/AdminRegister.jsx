"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FiMail, FiLock, FiUser, FiPhone, FiAlertCircle } from "react-icons/fi"
import { motion } from "framer-motion"
import Button from "../../../components/ui/Button"
import { api } from "../../../services/api"
import LogoCEM from "../../../assets/LOGO-CEM-WEB.png"

// Conteneur principal
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  padding: 1rem;
`

// Carte du formulaire
const RegisterCard = styled(motion.div)`
  width: 100%;
  max-width: 550px;
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
`

// Logo
const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  img {
    height: 60px;
    border-radius: 12px;
    width: 80px;
  height: 80px;
  }
`

// Titre
const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin-bottom: 0.5rem;
`

// Sous-titre
const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  margin-bottom: 2rem;
`

// Formulaire
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

// Groupe de formulaire
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

// Disposition en grille
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

// Étiquette
const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`

// Conteneur d'entrée
const InputWrapper = styled.div`
  position: relative;
`

// Champ de saisie
const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #111827;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`

// Icône
const Icon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
`

// Message d'erreur
const ErrorMessage = styled.div`
  padding: 0.75rem;
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  border-radius: 8px;
  color: #b91c1c;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

// Sélecteur de type d'administrateur
const AdminTypeSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

// Option de type d'administrateur
const AdminTypeOption = styled.div`
  flex: 1;
  padding: 1rem;
  border: 1px solid ${(props) => (props.selected ? "#e53e3e" : "#d1d5db")};
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.selected ? "#fff5f5" : "white")};
  
  &:hover {
    border-color: ${(props) => (props.selected ? "#e53e3e" : "#9ca3af")};
  }
`

// Titre de l'option
const OptionTitle = styled.div`
  font-weight: 600;
  color: #111827;
  margin-top: 0.5rem;
`

// Lien de connexion
const LoginLink = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  margin-top: 1.5rem;
  
  a {
    color: #e53e3e;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

// Sélecteur
const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #111827;
  background-color: white;
  transition: all 0.2s;
  appearance: none;

  &:focus {
    outline: none;
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
  }
`

/**
 * Composant de création de compte administrateur
 * Permet de créer un nouveau compte administrateur (technique ou conseiller)
 */
const AdminRegister = () => {
  // État pour le type d'administrateur
  const [adminType, setAdminType] = useState("advisor") // "advisor" ou "technical"

  // États pour les champs du formulaire
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("agent") // Pour les conseillers: "agent", "manager", etc.
  const [department, setDepartment] = useState("") // Pour les conseillers: département
  const [accessLevel, setAccessLevel] = useState("standard") // Pour les admins techniques

  // États pour la gestion du formulaire
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  /**
   * Gère la soumission du formulaire d'inscription
   * @param {Event} e - L'événement de soumission
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation des champs
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs obligatoires")
      return
    }

    // Validation du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse e-mail valide")
      return
    }

    // Validation du mot de passe
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères")
      return
    }

    // Vérification de la correspondance des mots de passe
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    try {
      setLoading(true)
      setError("")

      // Préparation des données selon le type d'administrateur
      const userData = {
        firstName,
        lastName,
        email,
        phone,
        password,
        adminType,
      }

      // Ajout des champs spécifiques selon le type d'administrateur
      if (adminType === "advisor") {
        userData.role = role
        userData.department = department
      } else {
        userData.accessLevel = accessLevel
      }

      // Appel à l'API pour créer le compte
      const response = await api.post("/auth/admin/register", userData)

      if (response.data.success) {
        // Redirection vers la page de vérification OTP
        navigate("/admin/otp-verification", {
          state: {
            email,
            adminType,
            isRegistration: true,
          },
        })
      }
    } catch (err) {
      console.error("Erreur lors de l'inscription:", err)
      setError(err.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour naviguer vers la page de connexion
  const handleGoToLogin = () => {
    navigate("/admin/login")
  }

  return (
    <Container>
      <RegisterCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Logo>
          <img src={LogoCEM} alt="Logo CEM" />
        </Logo>

        <Title>Création de compte administrateur</Title>
        <Subtitle>Créez un nouveau compte administrateur pour la plateforme CEM</Subtitle>

        {/* Sélecteur de type d'administrateur */}
        <AdminTypeSelector>
          <AdminTypeOption selected={adminType === "advisor"} onClick={() => setAdminType("advisor")}>
            <FiUser size={24} color={adminType === "advisor" ? "#e53e3e" : "#6b7280"} />
            <OptionTitle>Conseiller</OptionTitle>
          </AdminTypeOption>

          <AdminTypeOption selected={adminType === "technical"} onClick={() => setAdminType("technical")}>
            <FiUser size={24} color={adminType === "technical" ? "#e53e3e" : "#6b7280"} />
            <OptionTitle>Technique</OptionTitle>
          </AdminTypeOption>
        </AdminTypeSelector>

        {error && (
          <ErrorMessage>
            <FiAlertCircle size={18} />
            {error}
          </ErrorMessage>
        )}

        <Form onSubmit={handleSubmit}>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="firstName">Prénom</Label>
              <InputWrapper>
                <Icon>
                  <FiUser size={20} />
                </Icon>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Prénom"
                  disabled={loading}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">Nom</Label>
              <InputWrapper>
                <Icon>
                  <FiUser size={20} />
                </Icon>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Nom"
                  disabled={loading}
                  required
                />
              </InputWrapper>
            </FormGroup>
          </FormGrid>

          <FormGroup>
            <Label htmlFor="email">Adresse e-mail</Label>
            <InputWrapper>
              <Icon>
                <FiMail size={20} />
              </Icon>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="adresse@exemple.com"
                disabled={loading}
                required
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Numéro de téléphone</Label>
            <InputWrapper>
              <Icon>
                <FiPhone size={20} />
              </Icon>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+261 34 00 000 00"
                disabled={loading}
                required
              />
            </InputWrapper>
          </FormGroup>

          {adminType === "advisor" && (
            <FormGrid>
              <FormGroup>
                <Label htmlFor="role">Rôle</Label>
                <InputWrapper>
                  <Icon>
                    <FiUser size={20} />
                  </Icon>
                  <Select id="role" value={role} onChange={(e) => setRole(e.target.value)} disabled={loading}>
                    <option value="agent">Agent</option>
                    <option value="senior_agent">Agent senior</option>
                    <option value="supervisor">Superviseur</option>
                    <option value="manager">Manager</option>
                  </Select>
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="department">Département</Label>
                <InputWrapper>
                  <Icon>
                    <FiUser size={20} />
                  </Icon>
                  <Select
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    disabled={loading}
                  >
                    <option value="">Sélectionner...</option>
                    <option value="credit">Crédit</option>
                    <option value="customer_service">Service client</option>
                    <option value="sales">Ventes</option>
                    <option value="risk">Risque</option>
                  </Select>
                </InputWrapper>
              </FormGroup>
            </FormGrid>
          )}

          {adminType === "technical" && (
            <FormGroup>
              <Label htmlFor="accessLevel">Niveau d'accès</Label>
              <InputWrapper>
                <Icon>
                  <FiUser size={20} />
                </Icon>
                <Select
                  id="accessLevel"
                  value={accessLevel}
                  onChange={(e) => setAccessLevel(e.target.value)}
                  disabled={loading}
                >
                  <option value="standard">Standard</option>
                  <option value="elevated">Élevé</option>
                  <option value="admin">Administrateur</option>
                  <option value="super_admin">Super administrateur</option>
                </Select>
              </InputWrapper>
            </FormGroup>
          )}

          <FormGrid>
            <FormGroup>
              <Label htmlFor="password">Mot de passe</Label>
              <InputWrapper>
                <Icon>
                  <FiLock size={20} />
                </Icon>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 caractères"
                  disabled={loading}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <InputWrapper>
                <Icon>
                  <FiLock size={20} />
                </Icon>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmer le mot de passe"
                  disabled={loading}
                  required
                />
              </InputWrapper>
            </FormGroup>
          </FormGrid>

          <Button type="submit" disabled={loading} isLoading={loading} variant="primary" fullWidth>
            {loading ? "Création en cours..." : "Créer le compte"}
          </Button>
        </Form>

        <LoginLink>
          Déjà un compte? <a onClick={handleGoToLogin}>Se connecter</a>
        </LoginLink>
      </RegisterCard>
    </Container>
  )
}

export default AdminRegister

