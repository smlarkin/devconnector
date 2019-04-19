/* eslint-disable complexity */
const router = require('express').Router()
const passport = require('passport')
const { ObjectId, Profile, User } = require('../../models')
const {
  formatExperienceInput,
  validateEducationInput,
  validateExperienceInput,
  validateProfileInput,
} = require('../../validation')

// PRIVATE
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        'user',
        ['name', 'avatar']
      )

      if (!profile) {
        return res.status(404).json({ profile: 'no profile found' })
      }

      return res.json(profile)
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
      const user = req.user.id
      const {
        handle,
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubUserName,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram,
      } = req.body

      const { errors, isValid } = validateProfileInput({
        handle,
        website,
        status,
        skills,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram,
      })

      if (!isValid) return res.status(400).json(errors)

      const profileFields = formatExperienceInput({
        user,
        handle,
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubUserName,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram,
      })

      const updateProfile = await Profile.findOneAndUpdate(
        { user },
        { $set: profileFields },
        { new: true }
      )

      if (updateProfile) return res.json(updateProfile)

      const handleExists = await Profile.findOne({
        handle: profileFields.handle,
      })

      if (handleExists) {
        errors.handle = 'handle is already taken'
        return res.status(400).json(errors)
      }

      const newProfile = await new Profile(profileFields).save()

      return res.json(newProfile)
    } catch (e) {
      next(e)
    }
  }
)

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      await Profile.findOneAndRemove({ user: req.user.id })
      await User.findOneAndRemove({ _id: req.user.id })
      return res.status(200).json({ success: true })
    } catch (e) {
      next(e)
    }
  }
)

router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description,
      } = req.body

      const { errors, isValid } = validateEducationInput({
        school,
        degree,
        from,
      })

      if (!isValid) return res.status(400).json(errors)

      const profile = await Profile.findOne({ user: req.user.id })

      if (!profile) {
        errors.profile = 'there is no profile for this user'
        return res.status(404).json(errors)
      }

      const newEducation = {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description,
      }

      profile.education.unshift(newEducation)

      const savedProfile = await profile.save()

      return res.json(savedProfile)
    } catch (e) {
      next(e)
    }
  }
)

router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id })

      if (!profile) {
        return res.status(404).json({ profile: 'no profile found' })
      }

      profile.education = profile.education.filter(
        item => item.id !== req.params.edu_id
      )

      const savedProfile = await profile.save()

      return res.json(savedProfile)
    } catch (e) {
      next(e)
    }
  }
)

router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      } = req.body

      const { errors, isValid } = validateExperienceInput({
        title,
        company,
        from,
      })

      if (!isValid) return res.status(400).json(errors)

      const profile = await Profile.findOne({ user: req.user.id })

      if (!profile) {
        errors.profile = 'no profile found'
        return res.status(404).json(errors)
      }

      const newExperience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      }

      profile.experience.unshift(newExperience)

      const savedProfile = await profile.save()

      return res.json(savedProfile)
    } catch (e) {
      next(e)
    }
  }
)

router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const errors = {}
      const profile = await Profile.findOne({ user: req.user.id })

      if (!profile) {
        errors.profile = 'there is no profile for this user'
        return res.status(404).json(errors)
      }

      profile.experience = profile.experience.filter(
        item => item.id !== req.params.exp_id
      )

      const savedProfile = await profile.save()

      return res.json(savedProfile)
    } catch (e) {
      next(e)
    }
  }
)

// PUBLIC
router.get('/all', async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])

    if (!profiles) {
      return res.status(404).json({ profiles: 'no profiles found' })
    }

    return res.json(profiles)
  } catch (e) {
    next(e)
  }
})

router.get('/handle/:handle', async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      handle: req.params.handle,
    }).populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(404).json({ profile: 'no profile found' })
    }

    return res.json(profile)
  } catch (e) {
    next(e)
  }
})

router.get('/id/:user_id', async (req, res, next) => {
  try {
    const user = req.params.user_id

    if (!ObjectId.isValid(user)) {
      return res.status(404).json({ user: 'not a valid user id' })
    }

    const profile = await Profile.findOne({
      user,
    }).populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(404).json({ profile: 'no profile found' })
    }

    return res.json(profile)
  } catch (e) {
    next(e)
  }
})

module.exports = router
