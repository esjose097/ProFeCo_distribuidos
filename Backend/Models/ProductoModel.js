/**
 * ProductoModel
 * Este archivo sirve como modelo de la entidad "Producto"
 * @author La comunidad del anillo 2
 * Fecha: 03 - 12 - 2021
 */

const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema(
    {
        nombre:{type: String, require: true},
        precio:{type: Number, require: true},
        oferta:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"oferta",
            autopopulate:true
        },
    },
    {collection:"producto"});

const productoModel = mongoose.model('producto', productoSchema);
module.exports = productoModel;