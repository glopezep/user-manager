const http = require('http')
const express = require('express')
const chalk = require('chalk')
const path = require('path')
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./schema');

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/graphql', graphqlExpress({ schema: schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

app.get('/next', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

server.listen(port, () => {
  console.log(`${chalk.green('[API]')} Server listening on port ${port}`)
})
