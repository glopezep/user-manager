const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const chalk = require('chalk')
const cors = require('cors')
const schema = require("./schema")

const app = express();
const port = process.env.PORT || 3000

app.use(cors())
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

app.listen(port, () => {
  console.log(`${chalk.green('[user-manager-api]')} Server listening on port ${port}`)
})
