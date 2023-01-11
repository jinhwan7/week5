'use strict';
const {  Model } = require('sequelize');
const Sequelize  = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post,{sourceKey:"userId",foreignKey:"UserId"})
      this.hasMany(models.Comment, {sourceKey:"userId",foreignKey:"UserId"})
    }
  }
  User.init({
    userId: {
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    password: DataTypes.STRING,
    nickname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};