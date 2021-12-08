/**
 * ConsumidorModel.js
 * Este archivo se utilizará como modelo de la entidad "Consumidor"
 * @author La comunidad del anillo 2
 * Fecha: 03 - 12 - 2021
 */

const mongoose = require("mongoose");

const consumidorSchema = new mongoose.Schema(
    {
        nombre:{type: String, require:true},
        usuario:{type: String,require:true},
        contra:{type: String, require:true},
        wishlist:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'oferta',
            autopopulate: true,
        }
    },{collection:"consumidor"}
);

    const consumidorModel = mongoose.model('consumidor', consumidorSchema);
    module.exports = consumidorModel;