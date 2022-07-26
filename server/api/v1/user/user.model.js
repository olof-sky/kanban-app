const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_id: { primaryKey: true, type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        password_hash: { type: DataTypes.STRING, allowNull: false },
        first_name: { type: DataTypes.STRING, allowNull: false },
        last_name: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: false },
        refresh_token: { type: DataTypes.STRING, allowNull: true },
    };

    const options = {
        timestamps: false,
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['password_hash', 'refresh_token'] },
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: { exclude: ['refresh_token']}, },
            withRefreshToken: { attributes: { exclude: ['password_hash'] }, },
            withAll: { attributes: { }, },
        }
    };

    return sequelize.define('User', attributes, options);
}