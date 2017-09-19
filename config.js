module.exports = {
  secret: process.env.SECRET || 's3cr3t',
  db: {
    database: process.env.DB_NAME || 'user_manager_db',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'postgres',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    setup: false
  },
  client: {
    endpoints: {
      users: process.env.API_CLIENT_USERS_URL || 'http://localhost:5000',
      groups: process.env.API_CLIENT_GROUPS_URL ||  'http://localhost:5001',
      auth: process.env.API_CLIENT_AUTH_URL ||  'http://localhost:5002'
    }
  }
}
