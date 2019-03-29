const mongoose = require('mongoose')
const db = require('../config/keys').mongoURI

class Database {
  constructor() {
    this._connect()
  }
  async _connect() {
    try {
      await mongoose.connect(db, { useNewUrlParser: true }, () =>
        console.log('Database connection successful')
      )
    } catch (e) {
      console.error('Database connection error', e)
    }
  }
}
module.exports = new Database()
