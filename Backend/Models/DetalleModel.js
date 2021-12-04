/**
 * DetalleModel.js
 * Archivo js que se utilizará como modelo de la entidad "detalle".
 * @author La comunidad del anillo
 * Fecha: 03 - 12 - 2021
 */

const mongoose = require('mongoose');

const detalleSchema = new mongoose.Schema(
    {
        cantidad:{type:Number,required},
        subTotal:{type:Number, required},
        producto:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'producto',
            autopopulate:true
        }
    });

const detalleModel = mongoose.model('detalle',detalleSchema);
module.exports = detalleModel;