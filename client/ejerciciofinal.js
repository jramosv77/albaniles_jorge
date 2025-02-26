document.getElementById('button').addEventListener('click', obtenerUbicacion);

// Función que obtiene la ubicación del usuario
function obtenerUbicacion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        
        // Mostrar latitud y longitud en HTML
        document.getElementById('latitud').innerHTML = latitud;
        document.getElementById('longitud').innerHTML = longitud;
        
        // llamada AJAX con las coordenadas obtenidas
        ajaxCheckWeather(latitud, longitud);
      },
      (error) => {
        alert('No se ha podido obtener la ubicación.');
      }
    );
  } else {
    alert('Este navegador no soporta la Geolocalización.');
  }
}
// llamada AJAX a OpenWeatherMap usando latitud y longitud
function ajaxCheckWeather(latitude, longitude) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  const claveapi = '2123b15abf5dbccb4b78d19ccea8dd7d';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=es&appid=${claveapi}`;
 
  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => responseManager(JSON.parse(result)))
    .catch((error) => alert('error', error));
}

/* funcion principal que gestiona la respuesta a la llamada AJAX */
function responseManager(resp) {
  console.log(resp);
  cambiaIcono(resp.weather[0].icon);
  muestraDesc(resp.weather[0].description);
  muestraTemperatura(resp.main.temp);
  muestraHumedad(resp.main.humidity);
}

/* funciones auxiliares para cambiar el HTML/CSS */

function cambiaIcono(nombreIco) {
  // añade o cambia el icono que tiene el id icono
  // utiliza iconos que se enecuentran en el directorio "img" y que tienen el nombre en formato  nombreIco@2x.png
  icono = document.getElementById('icono');
  icono.src = `img/${nombreIco}@2x.png`;
}

function muestraDesc(desc) {
  // Lleva un texto ( que contiene la descripción de la previsión) a la página HTML
  prev = document.getElementById('prevision');
  prev.innerHTML = desc;
}

// Muestra la temperatura en Celsius
function muestraTemperatura(temp) {
  // Convierte de Kelvin a Celsius
  const temperaturaCelsius = temp - 273.15;

  // Coloca la temperatura en el HTML
  tempelemento = document.getElementById('temperatura');
  tempelemento.innerHTML = temperaturaCelsius.toFixed(1);
}

// Muestra la humedad
function muestraHumedad(humedad) {
  humedadelemento = document.getElementById('humedad');
  humedadelemento.innerHTML = humedad;
}
