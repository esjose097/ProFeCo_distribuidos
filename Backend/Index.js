//Gestión de base de datos.
const mongoose = require('mongoose');
//Para utilizar las variables de entorno o variables globales.
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
//Módulo App.
const app = require('./App');
const DB = process.env.DATABASE;

/**
 * Se realiza la conexión a la base de datos
 */
mongoose.connect(DB).then(con=>{
    console.log('Se conecto correctamente a la BD');
})
.catch(err=>{
    console.log(err);
});

//Se inicializa el puerto en base a la variable global.
const PORT = process.env.PORT || 3000;

/**
 * Se arranca el servidor en el puerto 3032.
 */
const server = app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto: ",PORT);
});

