const { promisify } = require('util')
const router = require('express').Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { secretOrKey } = require('../../config/keys')
const { User } = require('../../models')
const { validateUserInput } = require('../../validation')
const hash = promisify(bcrypt.hash)
const compare = promisify(bcrypt.compare)
const sign = promisify(jwt.sign)

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body
    const { errors, isValid } = validateUserInput({
      name,
      email,
      password,
      password2,
    })

    if (!isValid) return res.status(400).json(errors)

    const user = await User.findOne({
      email,
    })

    if (user) {
      errors.email = 'email already exists'
      return res.status(400).json(errors)
    }

    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })
    const hashedPassword = await hash(password, 10)
    const newUser = await new User({
      name,
      email,
      avatar,
      password: hashedPassword,
    }).save()

    return res.json(newUser)
  } catch (e) {
    next(e)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { errors, isValid } = validateUserInput({
      email,
      password,
    })

    if (!isValid) return res.status(400).json(errors)

    const user = await User.findOne({ email })

    if (!user) {
      errors.email = 'user not found'
      return res.status(404).json(errors)
    }

    const passwordMatches = await compare(password, user.password)

    if (!passwordMatches) {
      errors.password = 'password incorrect'
      return res.status(401).json(errors)
    }

    const { id, name, avatar } = user
    const generatedToken = await sign({ id, name, avatar }, secretOrKey, {
      expiresIn: 7200,
    })

    return res.json({
      success: true,
      token: `Bearer ${generatedToken}`,
    })
  } catch (e) {
    next(e)
  }
})

// CURRENT
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    try {
      const { id, name, email } = req.user
      res.json({ id, name, email })
    } catch (e) {
      next(e)
    }
  }
)

module.exports = router
