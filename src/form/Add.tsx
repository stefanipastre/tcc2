import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
import '@aws-amplify/ui-react/styles.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';


var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "", "secretAccessKey": ""
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

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
    const randomNumber = Math.random()
    const data = { name: item };
    try {
      var input = {
        "id": randomNumber, "descricao": item
    };
    var params = {
        TableName: "casos_risco_tcc2",
        Item:  input
    };
    docClient.put(params, function (err, data) {

        if (err) {
            console.log("users::saving::error - " + JSON.stringify(err, null, 2));                      
        } else {
            console.log("users::saving::success" );                      
        }
    });
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
