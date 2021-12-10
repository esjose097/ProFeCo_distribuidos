/**
 * consumidor.js
 * Modulo de routing para el apartado de "consumidor"
 * @author La comunidad del anillo 2
 * Fecha: 09 - 12 - 2021
 */

/**
 * Exportaciones necesarias para el funcionamiento.
 */
const {Router} = require('express');
const mongoose = require('mongoose');
const wishlistModel = require('../Models/WishlistModel');
const consumidorModel = require('../Models/ConsumidorModel');

const router = Router();
mongoose.pluralize(null);

/**
 * Método que recibe una petición HTTP POST y realiza una validación de usuario
 * y contraseña con la base de datos y devuelve un json con el estado de esta
 * validación siento "true" como validado y "false" como no validado.
 *
 *  localhost:3032/api/v1/consumidor/login
 * 
 * Sabemos perfectamente bien que esta no es la manera correcta de validar un usuario via web
 * y originalmente ibamos a implementar una validación con tokens, pero por falta de tiempo
 * se tuvo que hacer así, de verdad una disculpa de parte de todo el equipo.
 */
router.post('/login', async(req,res)=>{
    const usuario = req.body.usuario;
    const contra = req.body.contra;

    const data = await consumidorModel.find();
    if(data)
    {
        let auxUsuario;
        for(x of data)
        {
            if(x.usuario == usuario)
            {
                auxUsuario = x;
                break;
            }
        }
        if(!auxUsuario)
        {
            res.status(404).json({validado:false,message:"Usuario/contraseña invalidos!"});
        }
        if(auxUsuario)
        {
            if(auxUsuario.contra == contra)
            {
                res.status(201).json({validado:true,message:"Inicio de sesión exitoso!",idConsumidor:auxUsuario._id});
            }
            else
            {
                res.status(401).json({validado:false, message:"La contraseña es incorrecta!"});
            }
        }
    }
});

/**
 * Método que recibe una petición HTTP GET y realiza una consulta a la base de datos
 * y devuelve la wishlist de un consumidor especifico.
 * 
 * localhost:3032/api/v1/consumidor/getWishlist/id
 */
router.get('/getWishlist/:id', async(req,res)=>{
    const id = req.params.id;
    const consumidor = await consumidorModel.findOne({_id:id})
    .populate({path:"wishlist",
    populate:{path:"productos",
    populate:{path:"producto"}}});
    const wishlist = consumidor.wishlist;
    res.status(201).json(wishlist);
});

module.exports = router;