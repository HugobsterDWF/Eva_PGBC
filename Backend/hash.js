const bcrypt = require('bcryptjs');

const passwordPlano = '';

bcrypt.hash(passwordPlano, 10).then(hash => {
    console.log(hash);
});

