/**
 * calificación.js
 * Archivo js encargado del routing para las calificaciones.
 * @author La comunidad del anillo 2
 * Fecha: 08 - 12 - 2021
 */
const {Router} = require('express');
const mongoose = require('mongoose');
const calificacionModel = require('../Models/CalificacionModel');
const productoModel = require('../Models/ProductoModel');
const consumidorModel = require('../Models/ConsumidorModel');

const router = Router();
mongoose.pluralize(null);

/**
 * Método que recibe una petición HTTP GET y se encarga de realizar una consulta a la BD
 * y devolver un json con una colección de calificaciones.
 * localhost:3032/api/v1/calificacion/lista
 */
router.get('/lista', async(req,res)=>{
    const data = await calificacionModel.find().
    populate({path:"consumidor", model:"consumidor"})
    .populate({path:"producto",model:"producto"});
    if(data != null)
    {
        res.status(201).json(data);
    }
    else
    {
        res.status(401).json({message:"Error, la consulta no pudo ser realizada"});
    }
});

/**
 * Método que recibe una petición HTTP GET y realiza una consulta a bd
 * y regresa un json con una calificación especifica.
 * localhost:3032/api/v1/calificacion/lista/id
 */
router.get('/lista/:id', async(req,res)=>{
    const id = req.params.id;
    const data = await calificacionModel.findOne({_id:id})
    .populate({path:"consumidor",model:"consumidor"})
    .populate({path:"producto",model:"producto"});
    if(data != null)
    {
        res.status(201).json(data);
    }
    else
    {
        res.status(404).json({message:"Objeto no encontrado!"});
    }
});

/**
 * Método que recibe una petición HTTP POST y realiza un registro a bd de una
 * calificación.
 * localhost:3032/api/v1/calificacion/alta
 */
router.post('/alta',async(req,res)=>{
    const {comentario, valoralizacion, tipo, consumidor, producto} = req.body;
    if(comentario && valoralizacion, tipo, consumidor, producto)
    {
        const calificacion = new calificacionModel({comentario:comentario,valoralizacion:valoralizacion,tipo:tipo,consumidor:consumidor,producto:producto});
        calificacion.save(err=>{
            if(err != null)
            {
                res.status(401).send(err);
            }
        });
        res.status(201).json({message:"El comentario ha sido asignado con exito!"});
    }
});

module.exports = router;