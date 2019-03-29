const router = require('express').Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const { User } = require('../../models')

router.get('/test', (req, res, next) => res.json({ hello: 'world' }))

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const user = await User.findOne({
      email,
    })
    if (user) {
      res.status(400).json({ email: 'Email already exists.' })
    } else {
      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) reject(err)
          resolve(hash)
        })
      })
      const newUser = new User({
        name,
        email,
        avatar,
        password: hashedPassword,
      })
      const savedNewUser = await newUser.save()
      res.json(savedNewUser)
    }
  } catch (e) {
    next(e)
  }
})

module.exports = router
