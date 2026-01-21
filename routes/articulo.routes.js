const express = require('express');
const router = express.Router();
const controller = require('../controllers/articulo.controller');
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate');

const validateParams = require('../middlewares/validateParams');
const idSchema = require('../validators/id.validator');


router.post('/',auth ,controller.crear);
router.get('/',auth , controller.obtenerTodos);
router.get('/:id', validateParams(idSchema), controller.obtenerPorId);

router.put('/:id', validateParams(idSchema), controller.actualizar);

router.delete('/:id', validateParams(idSchema), controller.eliminar);

module.exports = router;
