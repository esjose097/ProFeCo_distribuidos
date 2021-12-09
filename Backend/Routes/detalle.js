/**
 * detalle.js
 * Archivo js con la finalidad de manejar las peticiones HTTP relacionadas con "detalle".
 * @author La comunidad del anillo 2
 * Fecha: 08 - 12 - 2021
 */

const {Router} = require('express');
const mongoose = require('mongoose');
const detalleModel = require('../Models/DetalleModel');
const productoModel = require('../Models/ProductoModel');
const ofertaModel = require('../Models/OfertaModel');

const router = Router();
mongoose.pluralize(null);


/**
 * Método que recibe una petición HTTP GET y realiza una consulta a bd
 * y devuelve un json con una colección de "detalles".
 * localhost:3032/api/v1/detalles/lista
 */
router.get('/lista', async(req, res) =>{    
    const data = await detalleModel.find().populate({path:"producto",model:"producto"});
    res.json(data);
});

/**
 * Método que recibe una petición HTTP GET y realiza una consulta a bd
 * y devuelve un json con un "detalle" especifico.
 * localhost:3032/api/v1/detalles/lista/id
 */
router.get('/lista/:id', async(req, res) =>{    
    const id = req.params.id;
    const data = await detalleModel.findOne({_id:id})
    .populate({path:"producto",model:"producto"});
    if(data != null || data.producto != null)
    {
        res.status(401).json(data);
    }    
    else
    {
        res.status(404).json({message:"Articulo no encontrado!"});
    }
});

/**
 * Método que recibe una petición HTTP POST y realiza un registro en bd de
 * un "detalle" acalculando su respectivo subTotal.
 * localhost:3032/api/v1/detalles/agrega
 */
router.post('/agrega', async(req, res)=>{
    const {cantidad, productoId} = req.body;
    const producto = await productoModel.findOne({_id:productoId})
    .populate({path:"oferta",model:"oferta"});
    if(cantidad && producto && producto.oferta)
    {
        const subTotal = ((((100 - producto.oferta.descuento) * producto.precio)/100) * cantidad);
        const detalleNuevo = new detalleModel({cantidad:cantidad,subTotal:subTotal,producto:productoId});
        
        await detalleNuevo.save(err =>{
            if(err != null)
            {
                res.status(401).send(err);
            }
            res.status(201).json({message:"El detalle con descuento ha sido registrado con exito!"});
        });
    }
    else if(cantidad && producto)
    {
        const subTotal = producto.precio * cantidad
        const detalleNuevo = new detalleModel({cantidad:cantidad, subTotal:subTotal,producto:productoId});
        detalleNuevo.save(err =>{
            if(err != null)
            {
                res.status(401).json({error:err});
            }
            res.status(201).json({message:"El detalle sin descuento ha sido registrado con exito!"});
        });
    }
});

module.exports = router;