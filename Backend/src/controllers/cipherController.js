const CipherLog = require('../models/CipherLog');
const { v4: uuidv4 } = require('uuid');

// Função auxiliar da Cifra de César
function caesarCipher(str, shift) {
  return str.split('').map(char => {
    const code = char.charCodeAt(0);
    
    // Letras maiúsculas (A-Z)
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
    }
    // Letras minúsculas (a-z)
    if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
    }
    // Números (0-9) e outros caracteres mantêm-se ou deslocam se necessário
    return char;
  }).join('');
}

// Criptografar
exports.encryptMessage = async (req, res) => {
  try {
    const { message, shift } = req.body;
    const userId = req.userId; // Obtido do middleware JWT

    if (!message || shift === undefined) {
      return res.status(400).json({ error: 'Mensagem e passo são obrigatórios.' });
    }

    const encryptedMessage = caesarCipher(message, Number(shift));
    const hashKey = uuidv4(); // Gera um hash único como chave privada

    const newLog = await CipherLog.create({
      userId,
      originalMessage: message,
      encryptedMessage,
      shift: Number(shift),
      hashKey,
      usado: false
    });

    return res.status(201).json({
      encryptedMessage: newLog.encryptedMessage,
      hashKey: newLog.hashKey
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno no servidor ao criptografar.' });
  }
};

// Descriptografar
exports.decryptMessage = async (req, res) => {
  try {
    const { encryptedMessage, hashKey } = req.body;

    if (!encryptedMessage || !hashKey) {
      return res.status(400).json({ error: 'Mensagem criptografada e hash são obrigatórios.' });
    }

    // Busca o registro pelo hash e mensagem
    const cipherRecord = await CipherLog.findOne({ hashKey, encryptedMessage });

    if (!cipherRecord) {
      return res.status(404).json({ error: 'Hash ou mensagem criptografada inválidos.' });
    }

    // Valida se o hash já foi utilizado anteriormente (Requisito do trabalho)
    if (cipherRecord.usado) {
      return res.status(400).json({ error: 'Erro: Este hash já foi utilizado anteriormente e não pode ser reutilizado.' });
    }

    // Marca o hash como usado
    cipherRecord.usado = true;
    await cipherRecord.save();

    return res.status(200).json({
      decryptedMessage: cipherRecord.originalMessage
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno no servidor ao descriptografar.' });
  }
};