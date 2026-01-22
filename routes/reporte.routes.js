const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/reporte.controller');

router.post('/articulos/pdf', auth, controller.generarPDF);
router.post('/articulos/excel', auth, controller.generarExcel);
router.get('/articulos', auth, controller.listarReportes);

module.exports = router;
