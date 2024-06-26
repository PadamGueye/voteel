const bcrypt = require("bcrypt");
module.exports = (sequelize, Sequelize) => {
    const Elector = sequelize.define("electeurs", {
        id: {
            field: 'id',
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstName: {
            field: 'prenom',
            type: Sequelize.STRING,
            allowNull: false,
    
        },
        lastName: {
            field: 'nom',
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            field: 'email',
            type: Sequelize.STRING,
            allowNull: false,
            unique: false
        },       
        id_student_card: {
            field: 'numero_carte',
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        status: {
            field: 'status',
            type:Sequelize.ENUM("pas voté", "a voté"),
            allowNull: true,
            default: 'pas voté',
        }, 
        id_token: {
            field: 'id_token',
            allowNull: true,
            type: Sequelize.INTEGER
        }
    })
    return Elector;
};
