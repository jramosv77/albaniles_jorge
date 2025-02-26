import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const SSL_PORT = process.env.SSL_PORT || 3443;

// Rutas a los archivos de clave y certificado
const SSL_KEY_PATH = process.env.SSL_KEY_PATH || path.join(__dirname, '..', 'ssl', 'clave1.pem');
const SSL_CERT_PATH = process.env.SSL_CERT_PATH || path.join(__dirname, '..', 'ssl', 'certificado1.pem');

// Configuración SSL
let sslOptions;
try {
  sslOptions = {
    key: fs.readFileSync(SSL_KEY_PATH),
    cert: fs.readFileSync(SSL_CERT_PATH)
  };
} catch (error) {
  console.error('Error al cargar los archivos SSL:', error.message);
  console.error('Asegúrese de que los archivos existen en las rutas especificadas o configure las variables de entorno SSL_KEY_PATH y SSL_CERT_PATH.');
  process.exit(1);
}

// Almacenamiento en memoria para usuarios y sesiones
const users = [];
const sessions = {};

// Función para generar un hash de contraseña
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Función para generar un ID de sesión
function generateSessionId() {
  return crypto.randomBytes(16).toString('hex');
}

// Función para parsear cookies
function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const parts = cookie.split('=');
      cookies[parts[0].trim()] = (parts[1] || '').trim();
    });
  }
  return cookies;
}

// Función para verificar la autenticación
function authenticateUser(req, res) {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies.sessionId;
  return sessionId ? sessions[sessionId] : null;
}

// Objeto para manejar las rutas
const routes = {
  GET: {},
  POST: {}
};

// Función para agregar rutas
function addRoute(method, path, handler) {
  routes[method][path] = handler;
}

// Definición de rutas
addRoute('GET', '/', (req, res) => serveFile(res, '/public/index.html', 'text/html'));
addRoute('GET', '/styles.css', (req, res) => serveFile(res, '/public/styles.css', 'text/css'));
addRoute('GET', '/script.js', (req, res) => serveFile(res, '/public/script.js', 'text/javascript'));

addRoute('GET', '/api/dashboard', (req, res) => {
  const user = authenticateUser(req, res);
  if (user) {
    sendJsonResponse(res, 200, { username: user.username });
  } else {
    sendJsonResponse(res, 401, { error: 'No autorizado' });
  }
});

addRoute('GET', '/api/agricolas', (req, res) => {
  const user = authenticateUser(req, res);
  if (user) {
    const recursosAgricolas = [
      { nombre: "Semillas de tomate", cantidad: 100 },
      { nombre: "Azada", cantidad: 5 },
      { nombre: "Fertilizante orgánico", cantidad: 20 }
    ];
    sendJsonResponse(res, 200, recursosAgricolas);
  } else {
    sendJsonResponse(res, 401, { error: 'No autorizado' });
  }
});

addRoute('GET', '/api/riego', (req, res) => {
  const user = authenticateUser(req, res);
  if (user) {
    const datosRiego = {
      programacion: "Cada 2 días, a las 8:00 AM",
      humedad: "60%",
      consumo: "100 litros/día"
    };
    sendJsonResponse(res, 200, datosRiego);
  } else {
    sendJsonResponse(res, 401, { error: 'No autorizado' });
  }
});

addRoute('GET', '/api/cultivos', (req, res) => {
  const user = authenticateUser(req, res);
  if (user) {
    const datosCultivos = [
      { nombre: "Tomates", fechaSiembra: "2023-10-26", estado: "En crecimiento" },
      { nombre: "Lechugas", fechaSiembra: "2023-11-15", estado: "Lista para cosechar" }
    ];
    sendJsonResponse(res, 200, datosCultivos);
  } else {
    sendJsonResponse(res, 401, { error: 'No autorizado' });
  }
});

addRoute('GET', '/api/trabajo', (req, res) => {
  const user = authenticateUser(req, res);
  if (user) {
    const datosTrabajo = [
      { tarea: "Cosecha de tomates", fecha: "2023-12-10", participantes: ["Juan", "María"] },
      { tarea: "Mantenimiento del sistema de riego", fecha: "2023-12-15", participantes: ["Pedro"] }
    ];
    sendJsonResponse(res, 200, datosTrabajo);
  } else {
    sendJsonResponse(res, 401, { error: 'No autorizado' });
  }
});

addRoute('GET', '/api/cosechas', (req, res) => {
  const user = authenticateUser(req, res);
  if (user) {
    const datosCosechas = [
      { cultivo: "Tomates", fecha: "2023-12-05", cantidad: "50 kg" },
      { cultivo: "Lechugas", fecha: "2023-12-12", cantidad: "20 kg" }
    ];
    sendJsonResponse(res, 200, datosCosechas);
  } else {
    sendJsonResponse(res, 401, { error: 'No autorizado' });
  }
});

addRoute('GET', '/logout', (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies.sessionId;
  if (sessionId) {
    delete sessions[sessionId];
  }
  res.writeHead(302, {
    'Set-Cookie': 'sessionId=; HttpOnly; Path=/; Max-Age=0',
    'Location': '/'
  });
  res.end();
});

addRoute('POST', '/api/register', (req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    try {
      const { username, password } = JSON.parse(body);
      if (!username || !password) {
        sendJsonResponse(res, 400, { error: 'Se requieren nombre de usuario y contraseña' });
        return;
      }

      const existingUser = users.find(u => u.username === username);
      if (existingUser) {
        sendJsonResponse(res, 409, { error: 'El nombre de usuario ya existe' });
        return;
      }

      const hashedPassword = hashPassword(password);
      users.push({ username, password: hashedPassword });

      sendJsonResponse(res, 201, { message: 'Usuario registrado exitosamente' });
    } catch (e) {
      sendJsonResponse(res, 400, { error: 'JSON inválido' });
    }
  });
});

addRoute('POST', '/api/login', (req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    try {
      const { username, password } = JSON.parse(body);
      const user = users.find(u => u.username === username && u.password === hashPassword(password));
      if (user) {
        const sessionId = generateSessionId();
        sessions[sessionId] = user;
        res.writeHead(200, {
          'Set-Cookie': `sessionId=${sessionId}; HttpOnly; Path=/`,
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ success: true, message: 'Inicio de sesión exitoso' }));
      } else {
        sendJsonResponse(res, 401, { error: 'Credenciales inválidas' });
      }
    } catch (e) {
      sendJsonResponse(res, 400, { error: 'JSON inválido' });
    }
  });
});

// Función para manejar las solicitudes
const requestHandler = (req, res) => {
  const { method, url } = req;
  const route = routes[method] && routes[method][url];

  if (route) {
    route(req, res);
  } else {
    sendJsonResponse(res, 404, { error: 'Ruta no encontrada' });
  }
};

// Función para servir archivos estáticos
function serveFile(res, filePath, contentType) {
  const fullPath = path.join(__dirname, '..', filePath);
  fs.readFile(fullPath, (err, content) => {
    if (err) {
      sendJsonResponse(res, 500, { error: 'Error interno del servidor' });
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}

// Función para enviar respuestas JSON
function sendJsonResponse(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Crear servidores HTTP y HTTPS
const httpServer = http.createServer(requestHandler);
const httpsServer = https.createServer(sslOptions, requestHandler);

// Iniciar servidores
httpServer.listen(PORT, () => {
  console.log(`Servidor HTTP ejecutándose en el puerto ${PORT}`);
});

httpsServer.listen(SSL_PORT, () => {
  console.log(`Servidor HTTPS ejecutándose en el puerto ${SSL_PORT}`);
});