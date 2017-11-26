const Sequelize = require('sequelize');
const {DATABASE_URI} = require('../../.config');
const sequelize = new Sequelize(DATABASE_URI, {
  dialectOptions: {
      ssl: true
      // define: {
      //   underscored: true
      // }
  }
});

// Connect all the models/tables in the database to a db object,
// so everything is accessible via one object across the app
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.users = require('../models/users.js')(sequelize, Sequelize);
db.presentations = require('../models/presentations.js')(sequelize, Sequelize);
db.slides = require('../models/slides.js')(sequelize, Sequelize);

// Relations
// db.users        .hasMany(db.presentations);
// db.presentations.belongsTo(db.users);
// db.presentations.hasMany(db.slides);
// db.slides       .belongsTo(db.presentations);

module.exports = db;