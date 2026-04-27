module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'labdados',
  port: 3306,
  define: {
    timestamps: false,
    underscored: false,
  },
}
