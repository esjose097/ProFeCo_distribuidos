/**
 * OfertaModel.js
 * Archivo js que se utilizará como modelo de la entidad "oferta".
 * @author La comunidad del anillo 2
 * Fecha: 03 - 12 - 2021
 */

const mongoose = require('mongoose');

const ofertaSchema = new mongoose.Schema(
    {
        fechaInicio:{type: Date, require},
        fechaFin:{type: Date, require},
        titulo:{type:String, require},
        descuento:{type: Number, require}
    });

const ofertaModel = mongoose.model('oferta', ofertaSchema);
module.exports = ofertaModel;