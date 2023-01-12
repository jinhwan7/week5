'use strict';
const { Model } = require('sequelize');
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {targetKey:"userId", foreignKey:"UserId"});
      this.hasMany(models.Comment, {sourceKey:"postId", foreignKey:"PostId"});
      this.hasMany(models.Like,{sourceKey:"postId",foreignKey:"PostId"});
    }
  }
  Post.init({
    postId: {    
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    UserId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};