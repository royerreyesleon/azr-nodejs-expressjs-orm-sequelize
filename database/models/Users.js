const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

// CREAMOS EL MODELO Y CADA UNO DE SUS ATRIBUTOS CON SUS TIPOS DE DATOS
class User extends Model {}
User.init({
  // ATRIBUTOS
  name: DataTypes.STRING,
  birthday: DataTypes.DATE
}, {
    sequelize,
    modelName: 'user' // TABLA DE BD.
});

// (async () => {
//   await sequelize.sync();
//   const jane = await User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
//   });
//   console.log(jane.toJSON());
// })();

module.exports = User;