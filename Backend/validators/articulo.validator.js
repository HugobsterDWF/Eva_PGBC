const Joi = require('joi');

const articuloSchema = Joi.object({
    nombre: Joi.string().max(50).required(),
    descripcion: Joi.string().max(250).allow('', null),
    precio: Joi.number().precision(2).positive().required()
});

module.exports = {
    articuloSchema
};
