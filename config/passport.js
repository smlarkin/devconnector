const { Strategy, ExtractJwt } = require('passport-jwt')
const User = require('mongoose').model('User')
const { secretOrKey } = require('./keys')
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey,
}

module.exports = passport => {
  passport.use(
    new Strategy(options, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id)
        if (user) return done(null, user)
        else return done(null, false)
      } catch (e) {
        console.error(e)
      }
    })
  )
}
