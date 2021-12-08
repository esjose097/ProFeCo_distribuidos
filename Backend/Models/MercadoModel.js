/**
 * MercadoModel.js
 * Archivo js que se utilizará como modelo para la entidad "mercado"
 * @author La comunidad del anillo 2
 * Fecha: 03 - 12 - 2021
 */

const mongoose = require('mongoose');

const mercadoSchema = new mongoose.Schema(
    {
        nombre:{type: String, required:true},
        usuario:{type:String, required:true},
        contra:{type:String,required:true},
        cedula:{type:String,required:true},
        encargado:{type:String, required:true},
        producto:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'producto',
                autopupulate:true
            }],
    },{collection:"mercado"});

const mercadoModel = mongoose.model('mercado',mercadoSchema);
module.exports = mercadoModel;