const articuloService = require('../services/articulo.service');

const crear = async (req, res) => {
    try {
         console.log('BODY RECIBIDO:', req.body);
        await articuloService.crearArticulo(req.body);
        res.status(201).json({ message: 'Artículo creado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerTodos = async (req, res) => {
    try {
        const articulos = await articuloService.obtenerArticulos();
        res.json(articulos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerPorId = async (req, res) => {
    try {
        const articulo = await articuloService.obtenerArticuloPorId(req.params.id);
        if (!articulo) {
            return res.status(404).json({
                message: 'Artículo no encontrado'
            });
        }
        res.json(articulo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizar = async (req, res) => {
    try {
        const existe = await articuloService.obtenerArticuloPorId(req.params.id);
        if (!existe) {
            return res.status(404).json({
                message: 'Artículo no encontrado'
            });
        }

        await articuloService.actualizarArticulo(req.params.id, req.body);

        res.json({ message: 'Artículo actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminar = async (req, res) => {
    try {
        const existe = await articuloService.obtenerArticuloPorId(req.params.id);

        if (!existe) {
            return res.status(404).json({
                message: 'Artículo no encontrado'
            });
        }

        await articuloService.eliminarArticulo(req.params.id);

        res.json({ message: 'Artículo eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    crear,
    obtenerTodos,
    obtenerPorId,
    actualizar,
    eliminar
};
