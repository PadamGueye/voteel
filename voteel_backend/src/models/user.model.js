const bcrypt = require("bcrypt");
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
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
            unique: false
        },
        password: {
            field: 'password',
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone: {
            field: 'telephone',
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            field: 'role',
            type: Sequelize.ENUM("basic","superviseur","admin"),
            allowNull: false,
            default: 'basic',
        },
        twoFactorCode: {
            field:'two_factor_code',
            type: Sequelize.STRING,
            allowNull: true
        },
        twoFactorExpiry: {
            field:'two_factor_expiry',
            type: Sequelize.DATE,
            allowNull: true
          }
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
