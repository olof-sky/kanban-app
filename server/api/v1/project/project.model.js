const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        project_id: { primaryKey: true, type: DataTypes.STRING, allowNull: false },
        project_name: { type: DataTypes.STRING, allowNull: false },
        project_type: { type: DataTypes.STRING, allowNull: false },
        project_admins: { type: DataTypes.JSON, allowNull: false},
    };

    return sequelize.define('Project', attributes);
}