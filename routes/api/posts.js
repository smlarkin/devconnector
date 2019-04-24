const router = require('express').Router()
const passport = require('passport')
const { Post } = require('../../models')
const { validatePostInput } = require('../../validation')

// PRIVATE
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),

  async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id)

      if (!post) {
        return res.status(404).json({ post: 'post not found' })
      }

      const alreadyLiked = post.likes.filter(like => {
        return like.user.toString() === req.user.id
      })

      if (alreadyLiked.length) {
        return res.status(404).json({ post: 'user already liked this post' })
      }

      post.likes.unshift({ user: req.user.id })

      const savedPost = await post.save()

      return res.json(savedPost)
    } catch (e) {
      next(e)
    }
  }
)

router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),

  async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id)

      if (!post) {
        res.status(404).json({ post: 'post not found' })
      }

      post.likes = post.likes.filter(like => {
        return like.user.toString() !== req.user.id
      })

      const savedPost = await post.save()

      return res.json(savedPost)
    } catch (e) {
      next(e)
    }
  }
)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),

  async (req, res, next) => {
    try {
      const { text, name, avatar } = req.body
      const { errors, isValid } = validatePostInput({ text })

      if (!isValid) {
        return res.status(400).json(errors)
      }

      const newPost = await new Post({
        user: req.user.id,
        text,
        name,
        avatar,
      }).save()

      return res.json(newPost)
    } catch (e) {
      next(e)
    }
  }
)

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),

  async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id)

      if (!post) {
        res.status(404).json({ post: 'post not found' })
      }

      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ user: 'user not authorized' })
      }

      await post.remove()
      return res.json({ post: 'delete success' })
    } catch (e) {
      next(e)
    }
  }
)

router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),

  async (req, res, next) => {
    try {
      const { text, name, avatar } = req.body
      const { errors, isValid } = validatePostInput({ text })

      if (!isValid) {
        return res.status(400).json(errors)
      }

      const post = await Post.findById(req.params.id)

      if (!post) {
        res.status(404).json({ post: 'post not found' })
      }

      const comment = { user: req.user.id, text, name, avatar }

      post.comments.unshift(comment)

      const savedPost = await post.save()

      return res.json(savedPost)
    } catch (e) {
      next(e)
    }
  }
)

router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),

  async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id)

      if (!post) {
        res.status(404).json({ post: 'post not found' })
      }

      post.comments = post.comments.filter(
        comment => comment.id.toString() !== req.params.comment_id
      )

      const savedPost = await post.save()

      return res.json(savedPost)
    } catch (e) {
      next(e)
    }
  }
)

// PUBLIC
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ date: -1 })

    if (!posts) return res.status(404).json({ posts: 'no posts found' })

    return res.json(posts)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) return res.status(404).json({ post: 'no post found' })

    return res.json(post)
  } catch (e) {
    next(e)
  }
})

module.exports = router
