const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const articuloService = require('../services/articulo.service');
const reporteModel = require('../models/reporte.model');

/* ================= PDF ================= */
const generarPDF = async (req, res) => {
  const articulos = await articuloService.obtenerArticulos();

  const nombre = `articulos_${Date.now()}.pdf`;
  const ruta = path.join(__dirname, '../reports', nombre);

  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(fs.createWriteStream(ruta));

  doc.fontSize(18).text('Reporte de Artículos', { align: 'center' });
  doc.moveDown();

  articulos.forEach(a => {
    doc
      .fontSize(12)
      .text(`Nombre: ${a.Nombre}`)
      .text(`Descripción: ${a.Descripcion || '-'}`)
      .text(`Precio: $${a.Precio}`)
      .moveDown();
  });

  doc.end();

  await reporteModel.crear({
    tipo: 'PDF',
    nombreArchivo: nombre,
    rutaArchivo: ruta,
    totalRegistros: articulos.length,
    generadoPor: req.user.email
  });

  res.download(ruta);
};

const generarExcel = async (req, res) => {
  const articulos = await articuloService.obtenerArticulos();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Articulos');

  sheet.columns = [
    { header: 'Nombre', key: 'Nombre', width: 30 },
    { header: 'Descripción', key: 'Descripcion', width: 40 },
    { header: 'Precio', key: 'Precio', width: 15 }
  ];

  articulos.forEach(a => sheet.addRow(a));

  const nombre = `articulos_${Date.now()}.xlsx`;
  const ruta = path.join(__dirname, '../reports', nombre);

  await workbook.xlsx.writeFile(ruta);

  await reporteModel.crear({
    tipo: 'EXCEL',
    nombreArchivo: nombre,
    rutaArchivo: ruta,
    totalRegistros: articulos.length,
    generadoPor: req.user.email
  });

  res.download(ruta);
};

const listarReportes = async (req, res) => {
  const reportes = await reporteModel.listar();
  res.json(reportes);
};

module.exports = {
  generarPDF,
  generarExcel,
  listarReportes
};
