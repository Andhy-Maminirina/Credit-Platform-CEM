"use client"

import { useState } from "react"
import styled from "styled-components"
import { User, Mail, Phone, Lock, Eye, EyeOff, Save, AlertCircle, CheckCircle } from "lucide-react"

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
`

const ProfileCard = styled.div`
  grid-column: span 4;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 1024px) {
    grid-column: span 12;
  }
`

const SettingsCard = styled.div`
  grid-column: span 8;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-column: span 12;
  }
`

const Avatar = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-color: #e53e3e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`

const ProfileName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
`

const ProfileRole = styled.div`
  font-size: 1rem;
  color: #718096;
  margin-bottom: 1.5rem;
`

const ProfileInfo = styled.div`
  width: 100%;
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`

const InfoIcon = styled.span`
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  color: #e53e3e;
`

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: #718096;
  width: 100px;
`

const InfoValue = styled.span`
  font-size: 0.875rem;
  color: #2d3748;
  font-weight: 500;
`

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`

const Input = styled.input`
  padding: 0.625rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  font-size: 0.875rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.3);
  }
  
  &:disabled {
    background-color: #f7fafc;
    cursor: not-allowed;
  }
`

const PasswordInput = styled.div`
  position: relative;
`

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #4a5568;
  }
`

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
  
  &:hover {
    background-color: #c53030;
  }
  
  &:disabled {
    background-color: #cbd5e0;
    cursor: not-allowed;
  }
`

const Alert = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  
  ${({ type }) => {
    switch (type) {
      case "success":
        return `
          background-color: #c6f6d5;
          color: #22543d;
        `
      case "error":
        return `
          background-color: #fed7d7;
          color: #822727;
        `
      default:
        return `
          background-color: #e2e8f0;
          color: #4a5568;
        `
    }
  }}
`

const AlertIcon = styled.span`
  display: flex;
  align-items: center;
`

const AlertText = styled.div`
  font-size: 0.875rem;
`

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
`

const Tab = styled.button`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ active }) => (active ? "#e53e3e" : "#4a5568")};
  background: none;
  border: none;
  border-bottom: 2px solid ${({ active }) => (active ? "#e53e3e" : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: #e53e3e;
  }
`

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [alert, setAlert] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simuler une mise à jour réussie
    setAlert({
      type: "success",
      message: "Vos informations ont été mises à jour avec succès.",
    })

    // Effacer l'alerte après 3 secondes
    setTimeout(() => {
      setAlert(null)
    }, 3000)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()

    // Simuler une mise à jour réussie
    setAlert({
      type: "success",
      message: "Votre mot de passe a été modifié avec succès.",
    })

    // Effacer l'alerte après 3 secondes
    setTimeout(() => {
      setAlert(null)
    }, 3000)
  }

  return (
    <Container>
      <ProfileCard>
        <Avatar>AC</Avatar>
        <ProfileName>Alex Conseiller</ProfileName>
        <ProfileRole>Conseiller Crédit</ProfileRole>
        <ProfileInfo>
          <InfoItem>
            <InfoIcon>
              <Mail size={16} />
            </InfoIcon>
            <InfoLabel>Email:</InfoLabel>
            <InfoValue>alex.conseiller@cem.mg</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <Phone size={16} />
            </InfoIcon>
            <InfoLabel>Téléphone:</InfoLabel>
            <InfoValue>+261 34 56 78 90</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <User size={16} />
            </InfoIcon>
            <InfoLabel>Rôle:</InfoLabel>
            <InfoValue>Conseiller</InfoValue>
          </InfoItem>
        </ProfileInfo>
      </ProfileCard>

      <SettingsCard>
        <Tabs>
          <Tab active={activeTab === "profile"} onClick={() => setActiveTab("profile")}>
            Informations personnelles
          </Tab>
          <Tab active={activeTab === "password"} onClick={() => setActiveTab("password")}>
            Changer le mot de passe
          </Tab>
        </Tabs>

        {alert && (
          <Alert type={alert.type}>
            <AlertIcon>{alert.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}</AlertIcon>
            <AlertText>{alert.message}</AlertText>
          </Alert>
        )}

        {activeTab === "profile" && (
          <>
            <CardTitle>Modifier vos informations</CardTitle>
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input type="text" id="firstName" defaultValue="Alex" />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="lastName">Nom</Label>
                  <Input type="text" id="lastName" defaultValue="Conseiller" />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" defaultValue="alex.conseiller@cem.mg" disabled />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input type="tel" id="phone" defaultValue="+261 34 56 78 90" />
                </FormGroup>
              </FormRow>

              <SubmitButton type="submit">
                <Save size={16} />
                Enregistrer les modifications
              </SubmitButton>
            </Form>
          </>
        )}

        {activeTab === "password" && (
          <>
            <CardTitle>Changer votre mot de passe</CardTitle>
            <Form onSubmit={handlePasswordSubmit}>
              <FormGroup>
                <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                <PasswordInput>
                  <Input type={showPassword ? "text" : "password"} id="currentPassword" />
                  <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </PasswordToggle>
                </PasswordInput>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <PasswordInput>
                  <Input type={showNewPassword ? "text" : "password"} id="newPassword" />
                  <PasswordToggle type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </PasswordToggle>
                </PasswordInput>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                <PasswordInput>
                  <Input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" />
                  <PasswordToggle type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </PasswordToggle>
                </PasswordInput>
              </FormGroup>

              <SubmitButton type="submit">
                <Lock size={16} />
                Changer le mot de passe
              </SubmitButton>
            </Form>
          </>
        )}
      </SettingsCard>
    </Container>
  )
}

export default Profile

