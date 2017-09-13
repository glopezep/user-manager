const { microGraphiql, microGraphql } = require("graphql-server-micro")
const micro = require("micro")
const { get, post, router } = require("microrouter")
const chalk = require('chalk')
const schema = require("./schema")

const port = process.env.PORT || 3000

const server = micro(
  router(
    get("/graphql", microGraphql({ schema })),
    post("/graphql", microGraphql({ schema })),
    get("/graphiql", microGraphiql({ endpointURL: "/graphql" })),
    (req, res) => micro.send(res, 404, "not found")
  )
)

server.listen(port, () => {
  console.log(`${chalk.green('[user-manager-api]')} Server listening on port ${port}`)
})
