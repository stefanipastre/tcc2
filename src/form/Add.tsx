import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

var AWSx = require("aws-sdk");

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
const BUCKET_NAME = '';
const s3 = new AWSx.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const AddItem = () => {
  const classes = useStyles()
  const [item, setItem] = React.useState<string>();
  const [item2, setItem2] = React.useState<string>();
  
  const save = async () => {
    const randomNumber = Math.random()
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
    
    const params3 = {
      Bucket: BUCKET_NAME,
      Key:  'empresa.csv',
      Body: item2
    };
    s3.upload(params3, function(err, data4) {
      if (err) {
          throw err;
      }
      console.debug(`File uploaded successfully. ${data4.Location}`);
    });
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