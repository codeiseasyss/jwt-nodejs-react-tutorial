'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  //object relational mapping
  Project_User.init({
    projectId:  DataTypes.INTEGER,
    userId:  DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Project_User',
    tableName: 'project_User',  // Đảm bảo tên bảng được khai báo chính xác
    timestamps: true,
  });
  return Project_User;
};