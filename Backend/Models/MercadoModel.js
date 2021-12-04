/**
 * MercadoModel.js
 * Archivo js que se utilizará como modelo para la entidad "mercado"
 * @author La comunidad del anillo 2
 * Fecha: 03 - 12 - 2021
 */

const mongoose = require('mongoose');

const mercadoSchema = new mongoose.Schema(
    {
        nombre:{type: String, required},
        usuario:{type:String, required},
        contra:{type:String,required},
        cedula:{type:String,required},
        encargado:{type:String, required},
        producto:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'producto',
                autopupulate:true
            }],
    });

const mercadoModel = mongoose.model('mercado',mercadoSchema);
module.exports = mercadoModel;