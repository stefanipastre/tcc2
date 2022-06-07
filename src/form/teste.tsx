import { ListItemSecondaryAction } from "@material-ui/core";

var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "", "secretAccessKey": ""
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "casos_risco_tcc2"

};

docClient.scan(params, onScan);
var count = 0;

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        data.Items.forEach(function(itemdata) {
           console.log("Caso de Risco",++count,":",JSON.stringify(itemdata.descricao));
        });

        // continue scanning if we have more items
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }

    }
    data.Items.forEach(function(itemdata) {
        console.log(itemdata.descricao);
});