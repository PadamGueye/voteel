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
            allowNull: true,
    
        },
        electors: {
            field: 'electeurs',
            type: Sequelize.STRING,
            allowNull: true,
    
        },
        supervisors: {
            field: 'superviseurs',
            type: Sequelize.STRING,
            allowNull: true,
    
        },
        positions: {
            field: 'postes',
            type: Sequelize.STRING,
            allowNull: false
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
    
    return Election;
};
