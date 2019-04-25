process.env.NODE_ENV === 'production'
  ? (module.exports = {
      mongoURI: process.env.MONGO_URI,
      secretOrKey: process.env.SECRET_OR_KEY,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    })
  : (module.exports = require('./secrets'))