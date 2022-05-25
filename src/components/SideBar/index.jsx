import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SidebarRoute, SideBtnWrap } from './SidebarElements'
import Profile from '../../pages/profile'

const Sidebar = ({isOpen,toggle}) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to='about' onClick={toggle}>Sobre</SidebarLink>
          <SidebarLink to='discover' onClick={toggle}>Cenários</SidebarLink>
          <SidebarLink to='services' onClick={toggle}>Como Funciona</SidebarLink>
          <SidebarLink to='signup' onClick={toggle}>Relatório</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to='/profile'>Entrar</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar
