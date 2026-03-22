const jwt = require('jsonwebtoken');

const senha_secreta = 'segredo';

const autenticar = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, 'segredo');
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token de autenticação inválido' });
    };
};

module.exports = { autenticar, senha_secreta }; // Faltava o module. para tornar as funções disponíveis para uso em outros arquivos