require('dotenv').config();
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(require('./routes'))

const http = require('http').Server(app)
const port = process.env.SERVER_PORT

http.listen(port, () => {
    console.log(`Astus Hub server open on port ${port}`)
})
