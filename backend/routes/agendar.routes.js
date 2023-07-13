const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agenda.controllers');

// Ruta para registrar una nueva entrada en la agenda
router.post('/agenda', agendaController.registrarAgenda);

module.exports = router;