const dbConfig = require('../config/db.config').DEV
const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port:dbConfig.PORT,
    pool: dbConfig.pool
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model")(sequelize, Sequelize);
db.elector = require("./elector.model")(sequelize, Sequelize);
db.vote = require('./vote.model')(sequelize, Sequelize);
db.token = require('./token.model')(sequelize, Sequelize);
db.position = require('./position.model')(sequelize, Sequelize);
db.election = require('./election.model')(sequelize, Sequelize);
db.candidate = require('./candidate.model')(sequelize, Sequelize);
module.exports = db;
