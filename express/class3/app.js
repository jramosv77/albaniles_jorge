// Se carga el módulo de Express
const express = require('express');
// Creo la aplicación Express
const app = express();
// Declaro el puerto de escucha
const port = 3000;

const path = require('path');

app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, '..', 'README.md');
  res.download(filePath, 'LEEME.md', (err) => {
    if (err) {
      console.error('Error al descargar el archivo:', err);
      res.status(500).send('Error al descargar el archivo');
    } else {
      console.log('Archivo descargado exitosamente');
    }
  });
});

app.get('/usuario', (req, res) => {
  const usuario = {
    id: 1,
    nombre: 'Jorge',
    email: 'george@example.com',
    activo: true,
  };
  res.json(usuario);
});

app.get('/antigua', (req, res) => {
  res.redirect(301, '/nueva');
});

app.get('/nueva', (req, res) => {
  res.send('Esta es la nueva URL');
});

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta para renderizar la vista con datos dinámicos
app.get('/renderizado', (req, res) => {
  const title = 'Página Dinámica';
  const message = 'Este contenido es generado dinámicamente.';
  res.render('index', { title, message });
});

app.get('/success', (req, res) => {
  res.sendStatus(200); // Envía un código de estado 200 y el texto "OK"
});

app.get('/not-found', (req, res) => {
  res.sendStatus(404); // Envía un código de estado 404 y el texto "Not Found"
});

app.get('/server-error', (req, res) => {
  res.sendStatus(500); // Envía un código de estado 500 y el texto "Internal Server Error"
});

// Creo el servidor en el puerto ${port}
app.listen(port, () => {
  // Se escribe la URL para el acceso al servidor
  console.log(`Example server listening on http://localhost:${port}`);
});
