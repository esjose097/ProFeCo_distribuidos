/**
 * OfertaModel.js
 * Archivo js que se utilizará como modelo de la entidad "oferta".
 * @author La comunidad del anillo 2
 * Fecha: 03 - 12 - 2021
 */

const mongoose = require('mongoose');

const ofertaSchema = new mongoose.Schema(
    {
        fechaInicio:{type: Date, require:true},
        fechaFinal:{type: Date, require:true},
        titulo:{type:String, require:true},
        descuento:{type: Number, require:true}
    });

const ofertaModel = mongoose.model('oferta', ofertaSchema);
module.exports = ofertaModel;