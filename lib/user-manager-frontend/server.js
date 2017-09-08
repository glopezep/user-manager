const http = require('http')
const express = require('express')
const path = require('path')
const api = require('./api')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 8000

app.use(express.static(path.join(__dirname, 'public')))
app.use('/api' api)

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
