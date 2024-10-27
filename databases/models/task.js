'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.StatusTask, {
        foreignKey: 'status_id',
      });
      Task.belongsTo(models.Project, {
        foreignKey: 'project_id',
      });
    };
  }
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};