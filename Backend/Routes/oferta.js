/**
 * oferta.js
 * Archivo js, con la finalidad de hacer el ruteo de el objeto "oferta"
 * @author La comunidad del anillo 2
 * Fecha: 07 - 12 - 2021
 */

 const {Router} = require('express');
 const mongoose = require('mongoose');
 const ofertaModel = require('../Models/OfertaModel');
 
 const router = Router();
 mongoose.pluralize(null);

/**
  * http://localhost:3032/api/v1/ofertas/lista
  */
router.get('/lista', async(req, res) =>{
    const data = await ofertaModel.find();
    res.status(201).json(data);
});

router.get('/lista/:id', async(req, res)=>{
    const id = req.params.id;
    const oferta = await ofertaModel.findOne({_id:id});
    if(oferta != null)
    {
/*Ocupo encontrar el porque no esta jalando en este ambiente si es muy similar al anterior
        const formatDate = (date)=>{
            let formatted_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
            return formatted_date;
        };        
*/
        let auxOferta = 
        {
            titulo: oferta.titulo,
            fechaInicio: oferta.fechaInicio,
            fechaFin: oferta.fechaFin,
            descuento: oferta.descuento
        };

        const ofertaFormat = auxOferta;
        res.status(401).json(ofertaFormat);
    }
    else
    {
        res.status(401).json({message:"Ha ocurrido un error, objeto no encontrado!"});
    }
});

module.exports = router;