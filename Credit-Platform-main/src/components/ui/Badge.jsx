import styled, { css } from "styled-components"

const BadgeVariants = {
  primary: css`
    background-color: ${(props) => props.theme.colors.primary[100]};
    color: ${(props) => props.theme.colors.primary[800]};
  `,
  success: css`
    background-color: ${(props) => props.theme.colors.success}20;
    color: ${(props) => props.theme.colors.success};
  `,
  warning: css`
    background-color: ${(props) => props.theme.colors.warning}20;
    color: ${(props) => props.theme.colors.warning};
  `,
  error: css`
    background-color: ${(props) => props.theme.colors.error}20;
    color: ${(props) => props.theme.colors.error};
  `,
  info: css`
    background-color: ${(props) => props.theme.colors.info}20;
    color: ${(props) => props.theme.colors.info};
  `,
  gray: css`
    background-color: ${(props) => props.theme.colors.gray[200]};
    color: ${(props) => props.theme.colors.gray[800]};
  `,
}

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: ${(props) => props.theme.fontSizes.xs};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  line-height: 1.5;
  border-radius: ${(props) => props.theme.radii.full};
  
  ${(props) => BadgeVariants[props.variant || "primary"]}
  
  ${(props) =>
    props.dot &&
    css`
    padding-left: 0.5rem;
    
    &::before {
      content: '';
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: currentColor;
      margin-right: 0.5rem;
    }
  `}
`

const Badge = ({ children, variant = "primary", dot = false, ...props }) => {
  return (
    <StyledBadge variant={variant} dot={dot} {...props}>
      {children}
    </StyledBadge>
  )
}

export default Badge

