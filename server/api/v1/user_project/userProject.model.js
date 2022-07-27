const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_id: { primaryKey: true, type: DataTypes.STRING, allowNull: false },
        project_id: { primaryKey: true, type: DataTypes.STRING, allowNull: false },
    };
    const options = {
    };
    return sequelize.define('User_Projects', attributes, options);
}