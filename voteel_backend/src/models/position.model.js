const bcrypt = require("bcrypt");
module.exports = (sequelize, Sequelize) => {
    const Position = sequelize.define("postes", {
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
            allowNull: false
        },
    })
    
    return Position;
};
