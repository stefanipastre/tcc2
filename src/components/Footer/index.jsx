import React from 'react'
import { FooterContainer, FooterWrap, FooterLinkWrapper, FooterLinkItems, FooterLinkContainer, FooterLinkTitle, FooterLink, SocialLogo, SocialMedia, SocialMediaWrap, WebsiteRights } from './FooterElements'
import { animateScroll as scroll } from 'react-scroll';

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  }

  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinkContainer>
          <FooterLinkWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>Sobre nós</FooterLinkTitle>
                <FooterLink to='/'>Como funciona?</FooterLink>

            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Entre em contato</FooterLinkTitle>
                <FooterLink to='/'>Contatos</FooterLink>
                <FooterLink to='/'>Suporte</FooterLink>
            </FooterLinkItems>
          </FooterLinkWrapper>
        </FooterLinkContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to='/' onClick={toggleHome}>
              TCC
            </SocialLogo>
            <WebsiteRights>Engenharia de Computação</WebsiteRights>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  )
}
export default Footer
