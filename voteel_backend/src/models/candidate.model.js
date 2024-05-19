const bcrypt = require("bcrypt");
module.exports = (sequelize, Sequelize) => {
    const Candidate = sequelize.define("candidates", {
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
        phone: {
            field: 'telephone',
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        photo: {
            field: 'photo',
            type: Sequelize.STRING,
            allowNull: false,
        },       
        id_position: {
            field: 'id_poste',
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        status: {
            field: 'status',
            type:Sequelize.ENUM("gagnant", "perdant","en attente"),
            allowNull: true,
            default: null,
        },
    })
    
    return Candidate;
};
