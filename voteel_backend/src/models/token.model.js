module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define("tokens", {
        id: {
            field: 'id',
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        token: {
            field: 'token',
            type: Sequelize.STRING,
            allowNull: true
        },
    },
    {
        timestamps: false
    })
    
    return Token;
};
