const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
/**
 * Aquí van los módulos de rutas
 */

const app = express();

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

/**
 * Aquí van las rutas una vez tengamos estas.
 */

//Exportación del módulo.
module.exports = app;
