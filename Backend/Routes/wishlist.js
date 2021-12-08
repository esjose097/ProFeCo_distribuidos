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
 * //localhost:3032/api/v1/wishList
 * Devuelve todas las wishlist
 */
router.get('/lista', async(req, res) =>{    
    const data = await wishlistModel.find()
    .populate({path:"productos",model:"detalle"});
    res.status(401).json(data);
});

/**
 * //localhost:3032/api/v1/wishList/id
 */
router.get('/lista/:id', async(req, res) =>{
    const id = req.params.id;
    const data = await wishlistModel.findOne({_id:id})
    .populate({path:"productos",populate:{path:"producto"}});
    
    res.status(201).json(data);
})

/**
 * //localhost:3032/api/v1/wishList/editar/:id
 * Esta en proceso, decidí terminar todas las consultas ademas
 * de no saber como se hace de primeras.
 */
router.put('/editar/:id', async(req, res)=>{
    const id = req.params.id;
    
});

module.exports = router;