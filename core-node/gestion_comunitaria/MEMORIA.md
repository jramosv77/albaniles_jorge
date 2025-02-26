# Memoria del Proyecto: Gestión Comunitaria para Pueblos de Montaña

## Introducción

Este documento describe la elaboración de un proyecto de Node.js para la gestión comunitaria de pueblos de montaña. El proyecto incluye un servidor backend en Node.js y una interfaz de usuario frontend en HTML, CSS y JavaScript.

Consiste en un proyecto básico para entender el funcionamiento de un servidor backend, y establecer un punto de partida para una web comunitaria, que permita la gestión y colaboración de los ciudadanos de un valle de montaña, que por sus circunstancias socioeconómicas y su situación geográfica, pueden ver una oportunidad en una gestión de recursos colaborativa que les permita ser más autosuficientes.

## Estructura

El proyecto está compuesto por tres carpetas:

1. server: se compone de un fichero server.js, el servidor Node.js
2. public: se compone de tres ficheros, `index.html`: La estructura HTML de la página web. `script.js`: El código JavaScript del lado del cliente y un archivo CSS (`styles.css`) para los estilos.
3. ssl: se compone de dos ficheros, clave (`clave1.pem`) y certificado (`certificado1.pem`) autofirmado para entornos locales de desarrollo.

En el directorio raíz del proyecto se encuentran además, la propia memoria en formato markdown y los ficheros package.json y package-lock.json.

## Configuración del Proyecto

### Inicialización

Para iniciar el proyecto, se procede de la siguiente manera:

1. Crear un nuevo directorio para el proyecto (`gestion_comunitaria`)
2. Inicializar un proyecto de Node.js con `npm init -y`
3. Crear los archivos necesarios: `server.js`, `index.html`, `script.js`, y `styles.css`

### Dependencias

Este proyecto no utiliza dependencias externas de npm.
Únicamente utiliza nodemon para poder aplicar cambios en el proyecto sin tener que reiniciar el servidor.

## Explicación del Código

### server.js

El archivo `server.js` es el protagonista de nuestro servidor Node.js. 

Estas son las importaciones de módulos nativos de Node.js que se utilizan en el servidor. Se aprecia el uso de `import` en lugar de `require`, puesto que se están utilizando módulos ES6.

```javascript
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
```

Estas líneas han sido necesarias para obtener el directorio actual del archivo, lo cual es necesario cuando se utilizan módulos ES6.

```javascript
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```
Aquí se definen los puertos para nuestro servidor HTTP y HTTPS. Se utilizan variables de entorno si están disponibles (en caso de que queramos usar otros puertos sin modificar el código), o valores por defecto en caso contrario.

```javascript
const PORT = process.env.PORT || 3000;
const SSL_PORT = process.env.SSL_PORT || 443;
```
Esta sección maneja la configuración SSL para HTTPS. Leemos los archivos de clave y certificado, y si hay un error, se concluye el proceso.

```javascript
const SSL_KEY_PATH = process.env.SSL_KEY_PATH || path.join(__dirname, '..', 'ssl', 'clave1.pem');
const SSL_CERT_PATH = process.env.SSL_CERT_PATH || path.join(__dirname, '..', 'ssl', 'certificado1.pem');

let sslOptions;
try {
  sslOptions = {
    key: fs.readFileSync(SSL_KEY_PATH),
    cert: fs.readFileSync(SSL_CERT_PATH)
  };
} catch (error) {
  console.error('Error al cargar los archivos SSL:', error.message);
  process.exit(1);
}
```
Estas son nuestras "bases de datos" en memoria para usuarios y sesiones. En un proyecto real, se utilizaría una base de datos real (Queda pendiente para el próximo módulo de Albañiles Digitales).

```javascript
const users = [];
const sessions = {};
```

A continuación, se definen varias funciones de utilidad. 

La primera se encarga de convertir la contraseña original en una cadena de caracteres diferente e irreversible.
Para ello hemos importado el módulo `crypto`, que ofrece una forma de encapsular credenciales seguras, combinándolo con `.createHash` se utiliza un algoritmo criptógrafico y se añade la contraseña para generar un hash en formato hexadecimal.

```javascript
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}
```
La siguiente, genera un identificador único (ID) para cada sesión de usuario. Este ID se utiliza para mantener el estado de la sesión, recordar que el usuario ha iniciado sesión y permitirle acceder a las secciones protegidas. También usa el módulo `crypto`.

```javascript
function generateSessionId() {
  return crypto.randomBytes(16).toString('hex');
}
```
Con esta función, se utiliza una cookie para almacenar el ID de sesión.

```javascript
function parseCookies(cookieHeader) {
  // ... (código de la función)
}
```

La última función, verifica si el usuario está autenticado, es decir, si ha iniciado sesión correctamente. Comprobando que tiene una sesión válida antes de permitirle acceder a las secciones protegidas.

```javascript
function authenticateUser(req, res) {
  // ... (código de la función)
}
```
A partir de este punto, se implementa un sistema de enrutamiento simple. `routes` es un objeto que almacena nuestras rutas. 

Obsérvese, que el enrutamiento se utiliza para dirigir las peticiones del usuario a la sección adecuada de la aplicación. Cuando un usuario visita una URL específica, el enrutamiento determina qué código debe ejecutarse para responder a esa petición. Organizando así la aplicación en diferentes APIs, evitando así que cada vez que el usuario navegue a una sección diferente, el servidor tenga que enviar todo el HTML, aumentando así el tiempo de carga.

```javascript
const routes = {
  GET: {},
  POST: {}
};
```

`addRoute` es una función para agregar nuevas rutas.

```javascript
function addRoute(method, path, handler) {
  routes[method][path] = handler;
}
```

A continuación, se definen las diferentes rutas. Cada ruta se define con un método HTTP, una ruta y una función manejadora.

```javascript
addRoute('GET', '/', (req, res) => serveFile(res, '/public/index.html', 'text/html'));
addRoute('GET', '/styles.css', (req, res) => serveFile(res, '/public/styles.css', 'text/css'));
addRoute('GET', '/script.js', (req, res) => serveFile(res, '/public/script.js', 'text/javascript'));

addRoute('GET', '/api/dashboard', (req, res) => {
  // ... (código de la ruta)
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

// ... (más rutas)
```
Nótese también que el servidor devuelve "datos simulados", como comentado anteriormente, queda pendiente para el módulo de Bases de Datos continuar con la vinculación a una base de datos que se considere adecuada.

Esta es nuestra función principal de manejo de solicitudes. Busca la ruta correspondiente y la ejecuta si existe.

```javascript
const requestHandler = (req, res) => {
  const { method, url } = req;
  const route = routes[method] && routes[method][url];

  if (route) {
    route(req, res);
  } else {
    sendJsonResponse(res, 404, { error: 'Ruta no encontrada' });
  }
};
```
Finalmente, se crean e inician los servidores HTTP y HTTPS:

```javascript
const httpServer = http.createServer(requestHandler);
const httpsServer = https.createServer(sslOptions, requestHandler);

httpServer.listen(PORT, () => {
  console.log(`Servidor HTTP ejecutándose en el puerto \${PORT}`);
});

httpsServer.listen(SSL_PORT, () => {
  console.log(`Servidor HTTPS ejecutándose en el puerto \${SSL_PORT}`);
});
```

### index.html

El archivo `index.html` define la estructura de nuestra página web. Incluye secciones para autenticación, dashboard y varias funcionalidades de la aplicación (recursos agrícolas, riego, cultivos, etc.).

### script.js

El archivo `script.js` maneja la interactividad del lado del cliente. 

Todo el código está dentro del siguiente evento para asegurarnos de que se ejecute después de que el DOM esté completamente cargado.

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // ... (código dentro del evento DOMContentLoaded)
});
```

Estas funciones manejan el registro y el login de usuarios, haciendo solicitudes POST al servidor.

```javascript
formularioRegistro.addEventListener('submit', async (e) => {
  // ... (código para manejar el registro)
});

formularioLogin.addEventListener('submit', async (e) => {
  // ... (código para manejar el login)
});
```

La siguiente función maneja la navegación entre diferentes secciones de la aplicación, haciendo solicitudes GET al servidor para obtener los datos necesarios. Se encarga de controlar qué sección de contenido se muestra en la página web, ocultando las demás.  

```javascript
function mostrarSeccion(seccionId) {
  // ... (código para mostrar diferentes secciones)
}
```

La última parte del fichero `script.js` permite a los usuarios interactuar con la aplicación: agregar nuevos cultivos, programar actividades y registrar cosechas, entre otros. La información se muestra dinámicamente en la página sin necesidad de recargarla.

```javascript
// Manejar envío de formulario de Recursos Agrícolas
  const formAgregarRecurso = document.getElementById('form-agregar-recurso');
  formAgregarRecurso.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const nombreRecurso = document.getElementById('nombre-recurso').value;
    const cantidadRecurso = document.getElementById('cantidad-recurso').value;

    const seccionAgricolas = document.getElementById('agricolas');
    const listaRecursos = seccionAgricolas.querySelector('ul');
    const nuevoElemento = document.createElement('li');
    nuevoElemento.textContent = `${nombreRecurso} - Cantidad: ${cantidadRecurso}`;
    listaRecursos.appendChild(nuevoElemento);

    formAgregarRecurso.reset();
  });
```

## Recursos externos
Para la fuente de la página web: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&family=Playfair+Display:wght@700&display=swap'

Para la imagen de fondo: 'https://images.unsplash.com/photo-1732495767492-bec0c6b86362?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

Se han utilizado para la elaboración de este trabajo los modelos de IA GPT-4o y Gemini 1.5 Pro, así como la web https://v0.dev/
