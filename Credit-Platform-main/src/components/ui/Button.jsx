"use client"
import styled, { css, keyframes } from "styled-components"

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const ButtonVariants = {
  primary: css`
    background-color: ${(props) => props.theme.colors.primary[600]};
    color: white;
    &:hover {
      background-color: ${(props) => props.theme.colors.primary[700]};
    }
    &:active {
      background-color: ${(props) => props.theme.colors.primary[800]};
    }
  `,
  secondary: css`
    background-color: white;
    color: ${(props) => props.theme.colors.primary[600]};
    border: 1px solid ${(props) => props.theme.colors.primary[600]};
    &:hover {
      background-color: ${(props) => props.theme.colors.primary[50]};
    }
    &:active {
      background-color: ${(props) => props.theme.colors.primary[100]};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${(props) => props.theme.colors.primary[600]};
    &:hover {
      background-color: ${(props) => props.theme.colors.primary[50]};
    }
    &:active {
      background-color: ${(props) => props.theme.colors.primary[100]};
    }
  `,
  danger: css`
    background-color: ${(props) => props.theme.colors.error};
    color: white;
    &:hover {
      background-color: ${(props) => props.theme.colors.error}dd;
    }
    &:active {
      background-color: ${(props) => props.theme.colors.error}bb;
    }
  `,
}

const ButtonSizes = {
  sm: css`
    height: 32px;
    padding: 0 12px;
    font-size: ${(props) => props.theme.fontSizes.sm};
  `,
  md: css`
    height: 40px;
    padding: 0 16px;
    font-size: ${(props) => props.theme.fontSizes.md};
  `,
  lg: css`
    height: 48px;
    padding: 0 20px;
    font-size: ${(props) => props.theme.fontSizes.lg};
  `,
  xl: css`
    height: 56px;
    padding: 0 24px;
    font-size: ${(props) => props.theme.fontSizes.xl};
  `,
}

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.radii.md};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  transition: all ${(props) => props.theme.transitions.normal};
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  /* Appliquer la variante */
  ${(props) => ButtonVariants[props.variant || "primary"]}
  
  /* Appliquer la taille */
  ${(props) => ButtonSizes[props.size || "md"]}
  
  /* Largeur complète */
  ${(props) =>
    props.fullWidth &&
    css`
    width: 100%;
  `}
  
  /* État désactivé */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* État de chargement */
  ${(props) =>
    props.isLoading &&
    css`
    color: transparent !important;
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      top: 50%;
      left: 50%;
      margin-top: -10px;
      margin-left: -10px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: ${spin} 0.8s linear infinite;
    }
  `}
  
  /* Effet de ripple */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s ease-out, height 0.3s ease-out;
  }
  
  &:active::before {
    width: 300px;
    height: 300px;
  }
  
  /* Espacement des icônes */
  svg {
    margin-right: ${(props) => (props.iconPosition === "right" ? 0 : "8px")};
    margin-left: ${(props) => (props.iconPosition === "right" ? "8px" : 0)};
  }
`

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  icon = null,
  iconPosition = "left",
  onClick,
  type = "button",
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      isLoading={isLoading}
      disabled={disabled || isLoading}
      fullWidth={fullWidth}
      iconPosition={iconPosition}
      onClick={onClick}
      type={type}
      {...props}
    >
      {iconPosition === "left" && icon}
      {children}
      {iconPosition === "right" && icon}
    </StyledButton>
  )
}

export default Button

