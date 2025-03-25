"use client"

import React, { useState } from "react"
import styled from "styled-components"

const TabsContainer = styled.div`
  width: 100%;
`

const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[200]};
`

const TabButton = styled.button`
  padding: 12px 16px;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => (props.active ? props.theme.colors.primary[600] : props.theme.colors.gray[600])};
  background: transparent;
  border: none;
  border-bottom: 2px solid ${(props) => (props.active ? props.theme.colors.primary[600] : "transparent")};
  transition: all ${(props) => props.theme.transitions.fast};
  cursor: pointer;
  
  &:hover {
    color: ${(props) => (props.active ? props.theme.colors.primary[700] : props.theme.colors.gray[900])};
  }
  
  &:focus {
    outline: none;
  }
`

const TabPanel = styled.div`
  padding: 16px 0;
  display: ${(props) => (props.active ? "block" : "none")};
`

const Tabs = ({ children, defaultTab = 0, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const handleTabChange = (index) => {
    setActiveTab(index)
    if (onChange) {
      onChange(index)
    }
  }

  // Filtrer les enfants pour obtenir uniquement les Tab.Panel
  const tabs = React.Children.toArray(children).filter((child) => child.type === Tab.Panel)

  return (
    <TabsContainer>
      <TabList>
        {tabs.map((tab, index) => (
          <TabButton key={index} active={activeTab === index} onClick={() => handleTabChange(index)}>
            {tab.props.label}
          </TabButton>
        ))}
      </TabList>

      {tabs.map((tab, index) => (
        <TabPanel key={index} active={activeTab === index}>
          {tab.props.children}
        </TabPanel>
      ))}
    </TabsContainer>
  )
}

const Tab = {}

const Panel = ({ children, label }) => {
  return children
}

Tab.Panel = Panel

export default Tabs

