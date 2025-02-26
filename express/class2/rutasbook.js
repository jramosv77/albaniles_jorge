// bookRoutes.js
const express = require('express');

const router = express.Router();

// Middleware para JSON
router.post('/json', (req, res) => {
  const { title } = req.body;
  res.send(title ? `Title: ${title}` : 'Titulo no proporcionado');
});

// Middleware para texto plano
router.post('/text', (req, res) => {
  const title = req.body;
  res.send(title ? `Title: ${title}` : 'Titulo no proporcionado');
});

// Middleware para datos codificados en URL
router.post('/urlencoded', (req, res) => {
  const { title } = req.body;
  res.send(title ? `Title: ${title}` : 'Titulo no proporcionado');
});

// Middleware para validar el ID
router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id > 99) {
    const error = new Error('ID invalido: El ID debe ser un numero menor o igual a 99.');
    error.status = 400;
    return next(error);
  }
  // Construir la respuesta con múltiples datos
  const response = {
    hostname: req.hostname,
    ip: req.ip,
    params: req.params,
    route: req.route.path,
  };

  res.json(response); // Envía la respuesta como un objeto JSON
});

module.exports = router;
