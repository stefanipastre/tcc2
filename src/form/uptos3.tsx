const AWS = require('aws-sdk');
const ID = 'AKIA5T4Y5EXGIOVT37CR';
const SECRET = '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';
const BUCKET_NAME = 'new-files-tcc-2-new';
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const Uploadfile = (item, item2) => {
    const randomNumber = Math.random()
    const params = {
        Bucket: BUCKET_NAME,
        Key: item2 + '/' + randomNumber + '.csv',
        Body: item
    };
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

export default Uploadfile;