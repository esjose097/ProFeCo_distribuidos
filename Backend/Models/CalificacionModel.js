/**
 * CalificacionModel.js
 * Archivo js que se utilizará como modelo de la entidad "modelo".
 * @author La comunidad del anillo 2
 * Fecha: 03 - 12 - 2021
 */

const mongoose = require('mongoose');

const calificacionSchema = new mongoose.Schema(
    {
        comentario: {type:String},
        valoralizacion: {type:Number,required},
        tipo:{type:String,
        enum:['QUEJA','SUJERENCIA']},
        consumidor:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'consumidor',
            autopopulate:true
        },
        producto:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'producto',
            autopopulate: true
        }
    },{collection:"calificacion"});

const calificacionModel = mongoose.model('calificacion',calificacionSchema);
module.exports = calificacionModel;