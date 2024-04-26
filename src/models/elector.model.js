const bcrypt = require("bcrypt");
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("candidates", {
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
            allowNull: true,
    
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
            unique: true
        },       
        id_student_card: {
            field: 'numero_carte',
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        status: {
            field: 'status',
            type: Sequelize.STRING,
            allowNull: false
        },      
    },
    {
    hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        }
    })
    
    return User;
};
