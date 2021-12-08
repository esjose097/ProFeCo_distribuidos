/**
 * detalle.js
 * Archivo js con la finalidad de manejar las peticiones HTTP relacionadas con "detalle".
 * @author La comunidad del anillo 2
 * Fecha: 08 - 12 - 2021
 */

const {Router} = require('express');
const mongoose = require('mongoose');
const detalleModel = require('../Models/DetalleModel');
const productoModel = require('../Models/ProductoModel');

const router = Router();
mongoose.pluralize(null);


/**
 * localhost:3032/api/v1/detalles/lista
 * Obtiene todos los detalles, probablemente este no se utilice.
 */
router.get('/lista', async(req, res) =>{    
    const data = await detalleModel.find().populate({path:"producto",model:"producto"});
    res.json(data);
});

/**
 * localhost:3032/api/v1/detalles/lista/id
 * Obtiene un detalle en base a su id.
 */
router.get('/lista/:id', async(req, res) =>{    
    const id = req.params.id;
    const data = await detalleModel.findOne({_id:id})
    .populate({path:"producto",model:"producto"});
    res.json(data);
});

module.exports = router;