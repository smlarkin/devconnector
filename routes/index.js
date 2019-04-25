const router = require('express').Router()

router.use('/posts', require('./api/posts'))
router.use('/profiles', require('./api/profiles'))
router.use('/users', require('./api/users'))
router.use('/keys', require('./api/keys'))

module.exports = router
