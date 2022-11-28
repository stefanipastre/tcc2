import React from 'react';
import Container from '@material-ui/core/Container';
import AddItem from "./Add.tsx";
import ShowItems from "./List.tsx";
import background from "./fii.jpg";

const Form = () => {
  return (
    <div style={{ backgroundImage: `url(${background})`,
    height: '100vh',
    width: '200vh'}}>
      
    <Container maxWidth="md"> 
      <h2>Descreva as situações de Risco e Desvios de Comportamento</h2>
      <AddItem />
      <ShowItems />
    </Container>
    </div>
  );
}


export default Form;