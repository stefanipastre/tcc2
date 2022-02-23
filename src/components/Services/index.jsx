import React from 'react'
import Icon1 from '../../images/svg-1.svg'
import Icon2 from '../../images/svg-2.svg'
import Icon3 from '../../images/svg-3.svg'
import {ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP} from './ServiceElements'

const Services = () => {
  return (
    <ServicesContainer id='services'>
      <ServicesH1>Como funciona?</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1}/>
          <ServicesH2>Formulário</ServicesH2>
          <ServicesP>Os funcionários preenchem um formulário listando as situações de risco e desvios de comportamento encontrados</ServicesP>
        </ServicesCard>
        <ServicesCard>
        <ServicesIcon src={Icon2}/>
          <ServicesH2>Processamento</ServicesH2>
          <ServicesP>Nosso programa recebe os dados, analisa e classifica conforme uma lista de riscos e desvios de comportamentos</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3}/>
          <ServicesH2>Relatório</ServicesH2>
          <ServicesP>Você recebe um relatório personalizado e a partir dele verifica pontos fortes e pontos a serem trabalhados em treinamentos futuros</ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  )
}

export default Services
