"use client"
import styled, { css } from "styled-components"
import { FiInfo, FiCheck, FiAlertTriangle, FiX } from "react-icons/fi"

const AlertVariants = {
  info: css`
    background-color: ${(props) => props.theme.colors.info}10;
    border-left: 4px solid ${(props) => props.theme.colors.info};
    
    .alert-icon {
      color: ${(props) => props.theme.colors.info};
    }
  `,
  success: css`
    background-color: ${(props) => props.theme.colors.success}10;
    border-left: 4px solid ${(props) => props.theme.colors.success};
    
    .alert-icon {
      color: ${(props) => props.theme.colors.success};
    }
  `,
  warning: css`
    background-color: ${(props) => props.theme.colors.warning}10;
    border-left: 4px solid ${(props) => props.theme.colors.warning};
    
    .alert-icon {
      color: ${(props) => props.theme.colors.warning};
    }
  `,
  error: css`
    background-color: ${(props) => props.theme.colors.error}10;
    border-left: 4px solid ${(props) => props.theme.colors.error};
    
    .alert-icon {
      color: ${(props) => props.theme.colors.error};
    }
  `,
}

const StyledAlert = styled.div`
  display: flex;
  padding: 16px;
  border-radius: ${(props) => props.theme.radii.md};
  animation: slideUp 0.3s ease-out forwards;
  
  ${(props) => AlertVariants[props.variant || "info"]}
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  font-size: 20px;
`

const ContentContainer = styled.div`
  flex: 1;
`

const Title = styled.div`
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin-bottom: 4px;
`

const Message = styled.div`
  color: ${(props) => props.theme.colors.gray[700]};
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.gray[500]};
  cursor: pointer;
  padding: 4px;
  margin-left: 8px;
  
  &:hover {
    color: ${(props) => props.theme.colors.gray[700]};
  }
`

const Alert = ({ variant = "info", title, children, onClose, ...props }) => {
  const getIcon = () => {
    switch (variant) {
      case "success":
        return <FiCheck />
      case "warning":
        return <FiAlertTriangle />
      case "error":
        return <FiX />
      case "info":
      default:
        return <FiInfo />
    }
  }

  return (
    <StyledAlert variant={variant} {...props}>
      <IconContainer className="alert-icon">{getIcon()}</IconContainer>

      <ContentContainer>
        {title && <Title>{title}</Title>}
        <Message>{children}</Message>
      </ContentContainer>

      {onClose && (
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>
      )}
    </StyledAlert>
  )
}

export default Alert

