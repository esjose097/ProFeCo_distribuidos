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
const productoModel = require('../Models/ProductoModel');

const router = Router();
mongoose.pluralize(null);

/**
 * Método que recibe una petición HTTP GET y realiza una consulta a bd
 * y devuelve un json con una colección de wishlist.
 * localhost:3032/api/v1/wishList
 */
router.get('/lista', async(req, res) =>{    
    const data = await wishlistModel.find()
    .populate({path:"productos",populate:{path:"producto"}});
    res.status(401).json(data);
});

/**
 * Método que recibe una petición HTTP GET y realiza una consulta a bd
 * y devuelve un json con una wishlist especifica.
 * localhost:3032/api/v1/wishList/id
 */
router.get('/lista/:id', async(req, res) =>{
    const id = req.params.id;
    const data = await wishlistModel.findOne({_id:id})
    .populate({path:"productos",populate:{path:"producto"}});
    
    res.status(201).json(data);
})

/**
 * Método que recibe una petición HTTP y realiza una edición a un registro en bd
 * para de esta manera agregar un detalle en la colección de "productos" de la entidad
 * "wishlist"
 * localhost:3032/api/v1/wishList/editar/:id
 */
router.put('/editar/:id', async(req, res)=>{
    const idWishList = req.params.id;
    const idDetalle = req.body.detalle;
    
    const filter = {_id:idWishList};
    const update = {$push:{productos:idDetalle}}

    const wishlist = await wishlistModel.findOneAndUpdate(filter,update);

    res.json(wishlist);
});

/** Se exporta el módulo*/
module.exports = router;