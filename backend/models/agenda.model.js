const mongoose = require("mongoose");

const agendaSchema = new mongoose.Schema({
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    tatuador: { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    
  });
  

const Agenda = mongoose.model('Agenda', agendaSchema);
module.exports = Agenda;