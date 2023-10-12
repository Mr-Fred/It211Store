const mongoose = require('mongoose');


class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    const uri = process.env["URI"];
    mongoose
      .connect(uri)
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error('Database connection error:', err);
      });
  }

  isConnected() {
    return mongoose.connection.readyState === 1;
  }
}


module.exports = new Database();