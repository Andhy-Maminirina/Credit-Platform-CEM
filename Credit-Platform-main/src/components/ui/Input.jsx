"use client"

import { forwardRef } from "react"
import styled, { css } from "styled-components"

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  font-size: ${(props) => props.theme.fontSizes.md};
  border: 1px solid ${(props) => (props.hasError ? props.theme.colors.error : props.theme.colors.gray[300])};
  border-radius: ${(props) => props.theme.radii.md};
  background-color: white;
  transition: all ${(props) => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? props.theme.colors.error : props.theme.colors.primary[600])};
    box-shadow: 0 0 0 3px ${(props) =>
      props.hasError ? `${props.theme.colors.error}30` : `${props.theme.colors.primary[600]}30`};
  }
  
  &::placeholder {
    color: ${(props) => props.theme.colors.gray[400]};
  }
  
  &:disabled {
    background-color: ${(props) => props.theme.colors.gray[100]};
    cursor: not-allowed;
  }
  
  ${(props) =>
    props.hasIcon &&
    css`
    padding-left: 48px;
  `}
`

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.gray[400]};
  pointer-events: none;
`

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.gray[700]};
`

const ErrorMessage = styled.div`
  margin-top: 4px;
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.error};
`

const Input = forwardRef(
  (
    {
      id,
      name,
      type = "text",
      placeholder,
      value,
      onChange,
      onBlur,
      disabled = false,
      required = false,
      label,
      error,
      icon,
      ...props
    },
    ref,
  ) => {
    return (
      <InputWrapper>
        {label && <Label htmlFor={id}>{label}</Label>}

        {icon && <IconWrapper>{icon}</IconWrapper>}

        <StyledInput
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          hasError={!!error}
          hasIcon={!!icon}
          ref={ref}
          {...props}
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputWrapper>
    )
  },
)

export default Input

