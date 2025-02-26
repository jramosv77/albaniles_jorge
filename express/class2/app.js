// Se carga el módulo de Express
const express = require('express');
// Se cargan las rutas "book"
const rutasbook = require('./rutasbook');
// Creo la aplicación Express
const app = express();
// Declaro el puerto de escucha
const port = 3000;

// Middlewares globales
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Usar las rutas de book
app.use('/book', rutasbook);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || 'An unexpected error occurred.',
    },
  });
});

// Creo el servidor en el puerto ${port}
app.listen(port, () => {
  // Se escribe la URL para el acceso al servidor
  console.log(`Example server listening on http://localhost:${port}`);
});
