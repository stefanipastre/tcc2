import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
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

const AddItem = () => {
  const classes = useStyles()
  const [item, setItem] = React.useState<string>();

  const save = async () => {
    const data = { name: item };
    try {
      await API.graphql(graphqlOperation(createTodo, { input: data }));
      console.log("Success!");
    } catch (e) {
      console.log("Error!");
    }
  };

  return (
    <div>
     
          <TextField
              name="firstName"
              label="Situação de Risco"
              input onChange={e => setItem(e.target.value)}
            />
      
      <Button
      className={classes.button}
          variant="contained" 
          color="primary" 
          type="submit" 
          endIcon={<Icon>send</Icon>}
          onClick={() => save()}
        >Adicionar</Button>
    </div>
  );
};

export default AddItem;
