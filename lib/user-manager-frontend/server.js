const http = require('http')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const api = require('./api')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 8000

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api', api)

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
