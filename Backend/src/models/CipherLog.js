const mongoose = require('mongoose');

const CipherLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  originalMessage: { type: String, required: true },
  encryptedMessage: { type: String, required: true },
  shift: { type: Number, required: true },
  hashKey: { type: String, required: true, unique: true },
  usado: { type: Boolean, default: false }, // Valida se o hash já foi utilizado
}, { timestamps: true });

module.exports = mongoose.model('CipherLog', CipherLogSchema);