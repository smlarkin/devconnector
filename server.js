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
app.use(passport.initialize())

require('./config/passport')(passport)

app.use('/api', apiRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

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

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`))
