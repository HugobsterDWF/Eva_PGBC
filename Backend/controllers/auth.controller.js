const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');

const login = async (req, res) => {
    const { username, password } = req.body;

    const usuario = await authService.obtenerUsuarioPorUsername(username);
    if (!usuario) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.PasswordHash);
    if (!passwordValida) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
        {
            id: usuario.Id,
            username: usuario.Username,
            rol: usuario.Rol
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token });
};

module.exports = { login };
