/**
 * producto.js
 * Módulo routing para productos.
 * @author La comunidad del anillo 2
 * Fecha: 08 - 12 - 2021
 */

/**
 * Exportaciones necesarias.
 */
const {Router} = require('express');
const mongoose = require('mongoose');
const productoModel = require('../Models/ProductoModel');
const ofertaModel = require('../Models/OfertaModel');

const router = Router();
mongoose.pluralize(null);

/**
 * Método que recibe una petición HTTP GET para de esta forma realizar una consulta a bd
 * y devolver un Json con una colección de productos.
 * http://localhost:3032/api/v1/productos/lista
 */
router.get('/lista', async(req, res) =>{    
    const data = await productoModel.find()
    .populate({path:"oferta",model:"oferta"});
    res.json(data);
});

/*
 Método que recibe una petición HTTP GET
 http://localhost:3032/api/v1/productos/listaNombre/nombre
router.get('/listaNombre/:nombre', async(req, res)=>{
    const nombre = req.body.nombre;
    const data = await productoModel.find()
    .populate({path:"oferta",model:"oferta"});
    if(data != null)
    {
        const productosFiltrados = data.filter(x => x.nombre == nombre);
        res.status(201).json(productosFiltrados);
    }
    else
    {
        res.status(401).json({message:"Ha ocurrido un problema inesperado!"});
    }
});
*/
/**
 * Método que recibe una petición HTTP GET y realiza una consulta a bd y devuelve
 * un json con los datos de un registro de producto especifico.
 * http://localhost:3032/api/v1/productos/lista/id
 */
router.get('/lista/:id', async(req, res) =>{    
    const id = req.params.id;
    const data = await productoModel.findOne({_id:id})
    .populate({path:"oferta",model:"oferta"});
    res.json(data);
});

/**
 * Método encargado de recibir una petición HTTP POST y dar de alta un producto
 * en la base de datos
 * http://localhost:3032/api/v1/productos/agrega
 */
router.post('/agrega', async(req, res) => {   
    const {nombre, precio, oferta} = req.body;
    if(nombre && precio && oferta)
    {
        const producto = new productoModel({nombre:nombre,precio:precio,oferta:oferta});
        producto.save(err =>{
            if(err != null)
            {
                res.status(401).send(err);
            }
            res.status(201).json({menssage:"Producto agregado con exito!"});
        });
    }
    else if(nombre && precio)
    {
        const producto = new productoModel({nombre:nombre,precio:precio,oferta:null});
        producto.save(err =>{
            if(err != null)
            {
                res.status(401).send(err);
            }
            res.status(201).json({menssage:"Producto agregado con exito!"});
        });
    } 
    else
    {
        res.status(401).json({message:"Ha ocurrido un error inesperado"});
    }
});

/**
 * Método que recibe una petición HTTP DELETE Y elimina un registro de la bd
 * http://localhost:3032/api/v1/productos/eliminar
 */
router.delete('/eliminar:id', async(req, res) =>{
    const id = req.params.id;
    const producto = await productoModel.findByIdAndDelete({_id:id}, err =>{
        if(err != null)
        {
            res.status(401).json({message:"Ha ocurrido un error!"});
        }
        else
        {
            res.status(201).json({message:"La baja se ha realizado con exito"});        
        }
    });
});


/**
 * Se exporta el módulo.
 */
module.exports = router;
