const whitelist = [
  'http://labsystem-nuvem.com.br',
  'https://labsystem-nuvem.com.br',
  'http://localhost:5173',
  'http://localhost:5174',
]
const config = {
  cors: function (req, callback) {
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      callback(null, true) // reflect (enable) the requested origin in the CORS response
    } else {
      // callback(null, true) // Retirar esta linha quando for fazer o deploy
      callback(new Error('Not allowed by CORS')) // disable CORS for this request
    }
  },
}
module.exports = config
