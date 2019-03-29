const router = require('express').Router()

router.get('/test', (req, res, next) => res.json({ hello: 'world' }))

module.exports = router
