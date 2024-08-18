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
      Project.belongsToMany(models.Group,{ through: 'Project_User' });

    }
  }

  //object relational mapping
  Project.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.STRING,
    customerId:  DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'project',  // Đảm bảo tên bảng được khai báo chính xác
    timestamps: true,
  });
  return Project;
};