const router = require('express').Router()
const axios = require('axios')

router.post('/repos', async (req, res, next) => {
  try {
    const { clientId, clientSecret } = require('../../config/keys')
    const { githubUserName } = req.body
    const sort = 'created: asc'
    const count = 5
    const { data } = await axios.get(
      `https://api.github.com/users/${githubUserName}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
    if (!data) {
      return res.status(404).json({ repos: 'no repo available' })
    }
    return res.send(data)
  } catch (e) {
    next(e)
  }
})

module.exports = router
