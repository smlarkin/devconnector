const path = require('path')
const express = require('express')
const mongoose = require('mongoose')

const apiRouter = require('./routes')
const db = require('./config/keys').mongoURI

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', apiRouter)
app.use(express.static(path.join(__dirname, '..', 'public')))

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
// CONNECT & LISTEN
;(async () => {
  try {
    await mongoose.connect(db, () => console.log('MongoDB is connected'))
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`))
  } catch (e) {
    console.error(e)
  }
})()
