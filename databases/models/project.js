'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.StatusProject, {
        foreignKey: 'status_id',
      });
      Project.belongsTo(models.Module, {
        foreignKey: 'module_id',
      });
      Project.hasMany(models.Task, {
        foreignKey: 'project_id',
        as: 'tasks_fk'
      });
    }
  }
  Project.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    publish: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE,
    url: DataTypes.STRING,
    status_id: DataTypes.INTEGER,
    module_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};