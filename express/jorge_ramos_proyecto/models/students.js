'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    static associate(models) {
      this.belongsTo(models.teachers, { foreignKey: 'teacher_id' });
    }
  }
  students.init(
    {
      dni: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      date_of_birth: { type: DataTypes.DATE, allowNull: false },
      teacher_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'students',
      tableName: 'students',
    },
  );
  return students;
};
