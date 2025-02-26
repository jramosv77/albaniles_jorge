const express = require("express");

const mustacheExpress = require('mustache-express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const studentsRepository = require("./repositories/students");
const teachersRepository = require("./repositories/teachers");
const usersRepository = require("./repositories/users");

const userRoutes = require('./routes/usersRoutes');
const teacherRoutes = require('./routes/teachersRoutes');
const studentRoutes = require('./routes/studentsRoutes');

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Middleware para manejo de sesiones
app.use(
  session({
    secret: 'clave_antihackers',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

// Configuración del motor de plantillas
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/users', userRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);

// Login Endpoint
app.get('/login', (req, res, next) => {
  try {
    res.render('login', {
      title: 'Inicio de Sesión',
      header: '¡Bienvenido! Inicia sesión',
    }); // Renderiza la vista con los datos dinámicos
  } catch (error) {
    next(error);
  }
});

// POST /login
app.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Buscar usuario por email
    const user = await usersRepository.getUserByEmail(username);

    if (!user) {
      return res.status(401).render('error-login', { message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña enviada con la almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).render('error-login', { message: 'Contraseña incorrecta' });
    }

    // Establecer las variables de sesión
    req.session.isLoggedIn = true;
    req.session.user = {
      id: user.id,
      email: user.email,
      type: user.type,
      active: user.active,
    };

    // Redirigir a la página de inicio
    res.redirect('/home');
  } catch (error) {
    next(error);
  }
});

// GET /users

app.get('/users', async (req, res, next) => {
  try {
    // Verificar que el usuario esté autenticado y sea admin
    if (!req.session.isLoggedIn || req.session.user.type !== 'admin') {
      return res.status(401).send('Acceso no autorizado');
    }

    // Obtener todos los usuarios del sistema
    const users = await usersRepository.getAllUsers();

    // Renderizar la vista con el listado de usuarios
    res.render('users', { users });
  } catch (error) {
    next(error);
  }
});

// GET /home

app.get('/home', async (req, res, next) => {
  try {
    if (!req.session.isLoggedIn) {
      return res.redirect('/login');
    }

    // Si el usuario es admin, redirigir a /users
    if (req.session.user.type === 'admin') {
      return res.redirect('/users');
    }

    // Obtener el profesor asociado al usuario logueado
    const teacher = await teachersRepository.getTeacherByUserId(req.session.user.id);

    if (!teacher) {
      return res.status(404).send('Profesor asociado no encontrado');
    }

    // Renderizar la vista home con los datos del profesor
    res.render('home', { teacher });
  } catch (error) {
    next(error);
  }
});

// POST /logout

app.post('/logout', (req, res, next) => {
  try {
    // Destruye la sesión del usuario
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al cerrar la sesión', error: err.message });
      }

      // Redirige a la página de login
      res.redirect('/login');
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/token
const JWT_SECRET = 'mi_contraseña_indescifrable';

app.post('/api/token', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Username y password son requeridos' });
    }

    // Busca al usuario en la base de datos
    const user = await usersRepository.getUserByEmail(username);

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Compara la contraseña encriptada
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Genera el token JWT
    const token = jwt.sign(
      { username: user.email }, // Datos que irá en el payload del token
      JWT_SECRET,
      { expiresIn: '15m' },
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

// Middleware para manejo centralizado de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Error interno del servidor',
      status: err.status || 500,
    },
  });
});

app.listen(port, () => {
  console.log(`Example server listening on http://localhost:${port}`);
});
