class ArticuloDTO {
    constructor({ Id, Nombre, Descripcion, Precio }) {
        this.id = Id;
        this.nombre = Nombre;
        this.descripcion = Descripcion;
        this.precio = Precio;
    }
}

module.exports = ArticuloDTO;
