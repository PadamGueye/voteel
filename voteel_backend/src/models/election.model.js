const bcrypt = require("bcrypt");
module.exports = (sequelize, Sequelize) => {
    const Election = sequelize.define("elections", {
        id: {
            field: 'id',
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            field: 'nom',
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
    
        },
        status: {
            field: 'status',
            type:Sequelize.ENUM("en attente", "en cours","terminé"),
            allowNull: false,
            default: 'en attente',
        }
    })
    
    return Election;
};
