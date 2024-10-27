'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserTask.hasMany(models.Task, {
        foreignKey: 'task_id',
        as: 'tasks_fk'
      });
      UserTask.hasMany(models.User, {
        foreignKey: 'user_id',
        as: 'users_fk'
      });
    }
  }
  UserTask.init({
    completed: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserTask',
  });
  return UserTask;
};