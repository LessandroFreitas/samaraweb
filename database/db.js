require('dotenv').config();
const mongoose = require('mongoose');

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log('Conexão com o banco de dados realizada com sucesso!');
      })
      .catch(err => {
        console.error('Erro ao conectar com o banco de dados:', err.message);
        process.exit(1);
      });
  }
}

module.exports = new Database()

