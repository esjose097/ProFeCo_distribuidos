/**
 * App.js
 * Archivo js con la finalidad de representar la apliacación, y sus
 * funcionamientos.
 * @author La comunidad del anillo 2
 * Fecha: 07 - 12 - 2021
 */

/**
 * Exportaciones necesarias de node.js
 */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
/**
 * Aquí van los módulos de rutas
 */
const producto = require('./Routes/producto');
const oferta = require('./Routes/oferta');
const wishlist = require('./Routes/wishlist');
const detalle = require('./Routes/detalle');
const calificacion = require('./Routes/calificacion');


const app = express();

/**
 * Certificación básica para el intercambio de jsons y no tener problemas
 * mas adelante con premisos.
 */
const corsOption = {
    origin:"*",
    Credential: true,
    optionSuccessStatus:200
}

//Middlewares
app.use(morgan('dev'));
//Para entender y gestionar formatos JSON.
app.use(express.json());
//Entender datos desde inputs de formularios, datos sencillos.
app.use(express.urlencoded({extended:false}));
//Credenciales básicos para las peticiones.
app.use(cors(corsOption));


//Petición get de la página "principal".
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
  });

/**
 * Aquí van las rutas:
 */
app.use('/api/v1/productos',producto); //localhost:3032/api/v1/productos
app.use('/api/v1/ofertas',oferta); //localhost:3032/api/v1/ofertas
app.use('/api/v1/wishlist',wishlist); //localhost:3032/api/v1/wishlist
app.use('/api/v1/detalles',detalle); //localhost:3032/api/v1/detalles
app.use('/api/v1/calificacion',calificacion); //localhost:3032/api/v1/calificacion

/**Exportación del módulo.*/
module.exports = app;
