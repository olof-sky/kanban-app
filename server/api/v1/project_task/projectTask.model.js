const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        task_id: { primaryKey: true, type: DataTypes.STRING, allowNull: false },
        project_project_id: { type: DataTypes.STRING, allowNull: false },
        task_description: { type: DataTypes.STRING, allowNull: false },
        task_assignee: { type: DataTypes.STRING, allowNull: true },
        task_admin: { type: DataTypes.JSON, allowNull: false },
        task_status: { type: DataTypes.STRING, allowNull: false },
    };
    const options = {
        timestamps: false,
    };
    return sequelize.define('Project_Task', attributes, options);
}