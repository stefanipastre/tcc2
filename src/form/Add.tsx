import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
import '@aws-amplify/ui-react/styles.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';


var AWS = require("aws-sdk");
var AWSx = require("aws-sdk");


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
const ID = '';
const SECRET = '';
const BUCKET_NAME = 'new-files-tcc-2-new';
const s3 = new AWSx.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});
const randomNumber = Math.random()

const AddItem = () => {
  const classes = useStyles()
  const [item, setItem] = React.useState<string>();
  const [item2, setItem2] = React.useState<string>();
  
  const save = async () => {
    const params2 = {
      Bucket: BUCKET_NAME,
      Key: item2 + '/' + randomNumber + '.csv',
      Body: item
    };
    s3.upload(params2, function(err, data3) {
      if (err) {
          throw err;
      }
      console.debug(`File uploaded successfully. ${data3.Location}`);
    });
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
              type="text"
              name="firstName"
              label="Situação de Risco"
              value={item}
              input onChange={e => setItem(e.target.value)}
            />
            <TextField
              type="text"
              name="firstName"
              label="Empresa"
              value={item2}
              input onChange={j => setItem2(j.target.value)}
            />
      
      <Button
      className={classes.button}
          variant="contained" 
          color="primary" 
          type="submit" 
          endIcon={<Icon>send</Icon>}
          onClick={() => {
            save()
            setItem("")
            setItem2("")
          }}
          
        >Adicionar</Button>
    </div>
  )
};

export default AddItem;
