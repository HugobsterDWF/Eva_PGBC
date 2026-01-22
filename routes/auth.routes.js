const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/login', login);

router.get('/me', auth, (req, res) => {
    res.json({
        user: req.user
    });
});

module.exports = router;
