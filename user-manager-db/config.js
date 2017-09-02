module.exports = {
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
  setup: false,
  query: {
    raw: true
  }
}
