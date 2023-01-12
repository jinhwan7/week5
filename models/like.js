'use strict';
const {  Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{targetKey:"userId",onDelete:"cascade", foreignKey:"UserId"})
      this.belongsTo(models.Post,{targetKey:"postId",onDelete:"cascade", foreignKey:"PostId"})
    }
  }
  Like.init({
    likeId: {
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};