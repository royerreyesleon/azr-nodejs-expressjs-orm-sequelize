const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

// CREAMOS EL MODELO Y CADA UNO DE SUS ATRIBUTOS CON SUS TIPOS DE DATOS
class Post extends Model {}
Post.init({
  // ATRIBUTOS
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
}, {
    sequelize,
    modelName: 'post' // TABLA DE BD.
});

module.exports = Post;