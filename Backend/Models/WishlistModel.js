/**
 * WishlistModel.js
 * Archivo js que se utilizará como modelo de la entidad "wishlist"
 * @author La comunidad del anillo 2
 * Fecha: 03 - 12 - 2021
 */

const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema(
    {
        total:{type:Number, required:true},
        productos:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'detalle',
                autopopulate:true
            }],
    }, {collection:"wishList"});

const wishlistModel = mongoose.model('wishList',wishlistSchema);
module.exports = wishlistModel;