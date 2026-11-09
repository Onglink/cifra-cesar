const { Router } = require('express');
const authController = require('../controllers/authController');
const cipherController = require('../controllers/cipherController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

// Rotas Públicas (Autenticação)
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rotas Protegidas (Exigem JWT)
router.post('/encrypt', authMiddleware, cipherController.encryptMessage);
router.post('/decrypt', authMiddleware, cipherController.decryptMessage);

module.exports = router;