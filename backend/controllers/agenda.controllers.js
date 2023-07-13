const Agenda = require('../models/agenda.model');
const Usuario = require('../models/usuario.model');

// Controlador para registrar una nueva entrada en la agenda
const registrarAgenda = async (req, res) => {
  try {
    // Obtén los datos de la solicitud
    const { fecha, hora, tatuador, usuarioId } = req.body;

    // Verifica si el usuario existe
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Crea una nueva entrada en la agenda
    const nuevaAgenda = new Agenda({
      fecha,
      hora,
      tatuador,
      usuario: usuario._id
    });

    // Guarda la nueva entrada en la agenda
    await nuevaAgenda.save();

    res.status(201).json({ mensaje: 'Entrada de agenda registrada exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al registrar la entrada de agenda' });
  }
};

module.exports = {
  registrarAgenda
};