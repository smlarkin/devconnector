const path = require('path')
const express = require('express')
const passport = require('passport')
const volleyball = require('volleyball')
const apiRouter = require('./routes')

const PORT = process.env.PORT || 5000
const app = express()

app.use(volleyball)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(passport.initialize())

require('./config/passport')(passport)

app.use('/api', apiRouter)

// TEMPORARY
app.get('/', (req, res, next) => res.send('<h1>Hello World!</h1>'))

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  console.error(err)
  res.send('Something went wrong: ' + err.message)
})

// CONNECT & LISTEN (can convert to async if necessary)
;(() => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`))
  } catch (e) {
    console.error(e)
  }
})()
