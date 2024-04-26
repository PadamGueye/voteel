const bcrypt = require("bcrypt");
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("election", {
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
            allowNull: true,
    
        },
        positions: {
            field: 'postes',
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
