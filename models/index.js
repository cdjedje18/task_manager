const { Sequelize, DataTypes } = require('sequelize');
const config = require('../utils/config.js');

const db = {}

const sequelize = new Sequelize({
    dialect: config.dialect,
    storage: './database.sqlite'
  })

sequelize.authenticate()
    .then(() => { console.log("connected...") })
    .catch(err => { console.log(`Error ${err}`) })



db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tasks = require('./task.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('re-sync')
    });


module.exports = db;