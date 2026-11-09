const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Chave secreta do JWT (em produção, utilize variáveis de ambiente em process.env.JWT_SECRET)
const JWT_SECRET = process.env.JWT_SECRET || 'segredo_jwt_padrao_fatec';

// Função auxiliar para gerar o token JWT
function generateToken(params = {}) {
  return jwt.sign(params, JWT_SECRET, {
    expiresIn: '8h', // Token expira em 8 horas
  });
}

// 1. Cadastro de Usuário
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
    }

    // Verifica se o usuário ou e-mail já existem
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Nome de usuário ou e-mail já cadastrados.' });
    }

    // Hash da senha por segurança
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Oculta a senha na resposta
    user.password = undefined;

    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno no servidor ao cadastrar usuário.' });
  }
};

// 2. Login de Usuário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Informe o e-mail e a senha.' });
    }

    // Busca o usuário pelo e-mail (permitindo também buscar por username se preferir)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Valida a senha informada com o hash salvo no banco
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    user.password = undefined;

    // Gera o token JWT para autenticar nas rotas protegidas
    const token = generateToken({ id: user._id });

    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno no servidor ao realizar login.' });
  }
};