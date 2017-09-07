module.exports = {
  secret: process.env.SECRET || 's3cr3t',
  db: {
    database: process.env.DB_NAME || 'user_manager_db',
    username: process.env.DB_USER || 'glopezep',
    password: process.env.DB_PASS || 'Guillermo@0525',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    setup: false
  },
  client: {
    endpoints: {
      users: process.env.API_CLIENT_USERS_URL || 'http://localhost:3000',
      groups: process.env.API_CLIENT_GROUPS_URL ||  'http://localhost:3001',
      auth: process.env.API_CLIENT_AUTH_URL ||  'http://localhost:3002'
    }
  }
}
