'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class teachers extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.hasMany(models.students, { foreignKey: 'teacher_id' });
    }
  }
  teachers.init(
    {
      dni: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      date_of_birth: { type: DataTypes.DATE, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'teachers',
      tableName: 'teachers',
    },
  );
  return teachers;
};
