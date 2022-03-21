import React from 'react';
import { useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { v4 as uuidv4 } from 'uuid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))



const SignIn = () => {
  const classes = useStyles()
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), firstName: ''},
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(),  firstName: '' }])
  }

  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }

  return (
      
    <Container>
      <h2>Descreva as situações de Risco e Desvios de Comportamento</h2>
      
      <form className={classes.root} onSubmit={handleSubmit}>
        { inputFields.map(inputField => (
          <div key={inputField.id}>
            <TextField
              name="firstName"
              label="Situação de Risco"
              variant="filled"
              value={inputField.firstName}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={handleAddFields}
            >
              <AddIcon />
            </IconButton>
          </div>
        )) }
        <Button
          className={classes.button}
          variant="contained" 
          color="primary" 
          type="submit" 
          endIcon={<Icon>send</Icon>}
          onClick={handleSubmit}
        >Enviar</Button>
      </form>
      <Authenticator />
    </Container>
  );
}


export default SignIn