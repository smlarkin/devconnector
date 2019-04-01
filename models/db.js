const { connect } = require('mongoose')
const { mongoURI } = require('../config/keys')

class Database {
  constructor() {
    this._connect()
  }
  async _connect() {
    try {
      await connect(
        mongoURI,
        { useNewUrlParser: true },
        () => console.log('Database connection successful')
      )
    } catch (e) {
      console.error('Database connection error', e)
    }
  }
}
module.exports = new Database()
