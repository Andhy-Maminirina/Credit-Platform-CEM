"use client"
import styled, { css } from "styled-components"

const CardContainer = styled.div`
  background-color: white;
  border-radius: ${(props) => props.theme.radii.lg};
  box-shadow: ${(props) =>
    props.elevation === "high"
      ? props.theme.shadows.lg
      : props.elevation === "medium"
        ? props.theme.shadows.md
        : props.theme.shadows.sm};
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  ${(props) =>
    props.interactive &&
    css`
    cursor: pointer;
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${props.theme.shadows.xl};
    }
  `}
  
  ${(props) =>
    props.selected &&
    css`
    border: 2px solid ${props.theme.colors.primary[600]};
  `}
`

const CardHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[200]};
  
  ${(props) =>
    props.gradient &&
    css`
    background: linear-gradient(135deg, 
      ${props.theme.colors.primary[600]} 0%, 
      ${props.theme.colors.primary[500]} 100%);
    color: white;
  `}
`

const CardBody = styled.div`
  padding: 16px;
`

const CardFooter = styled.div`
  padding: 16px;
  border-top: 1px solid ${(props) => props.theme.colors.gray[200]};
  background-color: ${(props) => props.theme.colors.gray[50]};
`

const Card = ({
  children,
  elevation = "medium",
  interactive = false,
  selected = false,
  onClick,
  className,
  ...props
}) => {
  return (
    <CardContainer
      elevation={elevation}
      interactive={interactive}
      selected={selected}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </CardContainer>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card

