require('dotenv').config();
const jwt = require('jsonwebtoken');

const autenticar = (req, res) => {
    try {
        const { usuario, senha } = req.body;

        if (usuario === 'admin' && senha === 'admin') {
            const token = jwt.sign({ usuario }, process.env.JWT_SECRET, { expiresIn: '1min' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao autenticar usuário', error: error.message });
    }
};

module.exports = { autenticar };