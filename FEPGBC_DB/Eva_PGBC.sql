
CREATE DATABASE Inventario;
GO
USE Inventario;
GO
CREATE TABLE Articulo (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Descripcion VARCHAR(250),
    Precio DECIMAL(10,2) NOT NULL
);
GO

ALTER TABLE Articulo
ADD CONSTRAINT CK_Articulo_Precio_Positive
CHECK (Precio > 0);
GO

INSERT INTO Articulo (Nombre, Descripcion, Precio)
VALUES 
('Laptop', 'Laptop de 16 GB RAM y 512 GB SSD', 18500.00),
('Mouse', 'Mouse inalámbrico', 350.50),
('Teclado', 'Teclado mecánico retroiluminado', 1250.00),
('Monitor 24"', 'Monitor LED Full HD 24 pulgadas', 3200.00),
('Impresora', 'Impresora multifuncional WiFi', 4500.00),
('Disco Duro Externo', 'Disco duro externo 1TB USB 3.0', 1500.00),
('Memoria USB 64GB', 'Memoria USB 64GB alta velocidad', 220.00),
('Audífonos', 'Audífonos inalámbricos Bluetooth', 980.00),
('Webcam', 'Cámara web Full HD con micrófono', 850.00),
('Router', 'Router inalámbrico doble banda', 1750.00),
('Tablet', 'Tablet 10 pulgadas 64GB', 4200.00),
('Smartphone', 'Smartphone Android 128GB', 8900.00),
('Bocinas', 'Bocinas estéreo USB', 650.00),
('Cargador USB', 'Cargador rápido USB-C', 320.00),
('Power Bank', 'Batería portátil 20000 mAh', 780.00),
('Cable HDMI', 'Cable HDMI 2 metros', 180.00),
('SSD 512GB', 'Unidad de estado sólido 512GB', 2100.00),
('Tarjeta Gráfica', 'Tarjeta gráfica 6GB GDDR6', 7200.00),
('Fuente de Poder', 'Fuente de poder 650W certificada', 1650.00),
('Gabinete', 'Gabinete ATX con ventilación RGB', 1950.00),
('Ventilador', 'Ventilador para CPU', 480.00),
('Laptop Gamer', 'Laptop gamer 16GB RAM RTX', 24500.00),
('Licencia Office', 'Licencia Office 365 anual', 1350.00);
GO

CREATE VIEW vw_RegistrarArticulo
AS
SELECT
    Nombre,
    Descripcion,
    Precio
FROM Articulo;
GO

SELECT * FROM Articulo;
GO

CREATE TABLE Usuario (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Rol VARCHAR(20) NOT NULL
);
GO

INSERT INTO Usuario (Username, PasswordHash, Rol)
VALUES ('proof', '$2b$10$hqOJ9CemAYwLo7x3FjpYaeZnthbf0/ON3zPsavvfbxhZYwbEwCrCy', 'ADMIN');

CREATE TABLE ReporteArticulo (
    Id INT IDENTITY PRIMARY KEY,
    Tipo VARCHAR(20) NOT NULL, -- PDF | EXCEL
    NombreArchivo VARCHAR(150) NOT NULL,
    RutaArchivo VARCHAR(300) NOT NULL,
    TotalRegistros INT NOT NULL,
    GeneradoPor VARCHAR(100),
    FechaGeneracion DATETIME DEFAULT GETDATE()
);