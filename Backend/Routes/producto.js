/**
 * Módulo routing para productos.
 */

/**
 * Exportaciones necesarias.
 */
const {Router} = require('express');
const mongoose = require('mongoose');
const productoModel = require('../Models/ProductoModel');
const ofertaModel = require('../Models/OfertaModel');

const router = Router();
mongoose.pluralize(null);

router.get('/lista', async(req, res) =>{
    const data = await productoModel.find();
    console.log(data);
    //Prueba de respuesta
    res.json(data);
});

/**
 * Se exporta el módulo.
 */
module.exports = router;
