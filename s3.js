import dotenv from 'dotenv'
import aws from 'aws-sdk'


dotenv.config()

const region = "us-east-2"
const bucketName = "cnproject1"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})
let num=0
export async function generateUploadURL() {
  const imageName = "Imagen"+num+".png"
  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}
//////////////////////////////////////////////////////////////////////////
const docClient = new aws.DynamoDB.DocumentClient({
  "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID, 
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY
})

export async function fetchOneByKey () {
  var params = {
      TableName: "projectcn1",
      Key: {
          "email_id": "ejemplo@iteso.mx"
      }
  };
  const data= await docClient.get(params).promise();
  return data
}
