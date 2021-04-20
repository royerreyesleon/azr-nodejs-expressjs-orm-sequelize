const express   = require('express')
const app       = express();
const sequelize = require('./database/db');
const path      = require('path');

// const User = require('./database/models/Users');

// CONFIGURACION
const port = process.env.PORT || 3006;



// CLIENTE
app.set('views', path.join(__dirname, 'views')); // VISTAS
app.set('view engine', 'ejs'); // ESTABLECER EL MOTOR DE PLANTILLA


// MIDDLEWARE
app.use(express.json()); // PARA PODER RECIBIR DATOS EN FORMATO JSON.
app.use(express.urlencoded({extended:false})); // PARA PODER PASAR DATOS LIVIANOS.



// RUTAS | CLIENTE
app.get('/' , (req , res)=>{
   // res.json("Hola mundo");
   res.render("index.ejs");
});



// RUTAS | API
app.use('/api/posts', require('./routes/posts'));



// STATIC FILES (ARCHIVOS ESTATICOS PUBLICOS)
app.use(express.static(path.join(__dirname, 'public')));



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