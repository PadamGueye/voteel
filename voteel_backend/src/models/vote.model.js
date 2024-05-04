const bcrypt = require("bcrypt");
module.exports = (sequelize, Sequelize) => {
    const Vote = sequelize.define("votes", {
        id: {
            field: 'id',
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        id_candidate: {
            field: 'id_candidat',
            type: Sequelize.STRING,
            allowNull: true
        },
    })
    
    return Vote;
};
