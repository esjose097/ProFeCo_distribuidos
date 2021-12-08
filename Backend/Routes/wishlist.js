/**
 * wishlist.js
 * Archivo js con la finalidad de atender las peticiones HTTP relacionado a "wishlist"
 * @author La comunidad del anillo 2
 * Fecha: 08 - 12 - 2021
 */
const {Router} = require('express');
const mongoose = require('mongoose');
const wishlistModel = require('../Models/WishlistModel');
const detalleModel = require('../Models/DetalleModel');

const router = Router();
mongoose.pluralize(null);

/**
 * No me devuelve el valor pero nose si es porque:
 * Recuerda preguntar a victor jose del futuro!
 * - no hay wishlists en la bd
 * - El nombre de la tabla esta incorrecto
 * - Otro problema desconocido.
 * 
 * //localhost:3032/api/v1/wishlist
 */
router.get('/lista', async(req, res) =>{    
    const data = await wishlistModel.find();
    res.json(data);
});

module.exports = router;