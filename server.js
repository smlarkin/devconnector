const path = require('path')
const express = require('express')
// const mongoose = require('mongoose')
const volleyball = require('volleyball')
const { db } = require('./models')
const apiRouter = require('./routes')
// const db = require('./config/keys').mongoURI

const PORT = process.env.PORT || 5000
const app = express()

app.use(volleyball)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '..', 'public')))
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
// CONNECT & LISTEN
;(async () => {
  try {
    // await mongoose.connect(db, { useNewUrlParser: true }, () =>
    //   console.log('MongoDB is connected')
    // )
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`))
  } catch (e) {
    console.error(e)
  }
})()
