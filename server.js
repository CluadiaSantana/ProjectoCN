import express from 'express'
import { generateUploadURL } from './s3.js'
import { fetchOneByKey } from './s3.js'

const app = express()
const port=3000

app.use(express.static('../front'))

app.get('/s3Url', async (req, res) => {
  const url = await generateUploadURL()
  res.send({url})
})

app.get('/Dyna', async (req, res) => {
  const data= await fetchOneByKey();
  res.send(data)
})

app.listen(port, () => console.log("listening on port "+ port))