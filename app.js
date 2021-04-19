const express = require('express')
const app = express();
const sequelize = require('./database/db');
const User = require('./database/models/Users');

// CONFIGURACION
const port = process.env.PORT || 3006



// RUTAS
app.get('/insertar' , (req , res)=>{
   User.create({
       name:"Royer",
       birthday: new Date(1997, 11, 16)
   }).then(user => {
       res.json(user);
   });
})

app.get('/listar' , (req , res)=>{
    User.findAll().then(users => {
        res.json(users);
    });
 })



// INICIANDO SERVIDOR
app.listen(port , ()=> {
    console.log('> Server is up and running on port : ' + port);

    // CONECTAMOS A BD.
    // sequelize.authenticate().then(() => {
    // sync({force : false}) crea las tablas
    // sync({force : true}) elimina y crea las tablas
    sequelize.sync({ force:false}).then(() => {
        console.log('Conexion exitosa a BD');
    }).catch(error => {
        console.log('Ocurrio un error al conectar a BD: ', error);
    })
})