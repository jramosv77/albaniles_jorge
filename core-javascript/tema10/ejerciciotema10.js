let minutos = 0;
let segundos = 0;
let idintervalo;
let tiempoenmarcha = false;

function actualizarcronometro() {
  segundos++;
  if (segundos === 60) {
    minutos++;
    segundos = 0;
  }
  document.getElementById("cronometro").textContent = `${minutos < 10 ? `0${minutos}` : minutos}:${segundos < 10 ? `0${segundos}` : segundos}`;
}

function iniciarcronometro() {
  document.getElementById("botoniniciopausa").addEventListener("click", () => {
    if (tiempoenmarcha) {
      clearInterval(idintervalo); // Pausar cronómetro
    } else {
      idintervalo = setInterval(actualizarcronometro, 1000); // Reanudar cronómetro
    }
    tiempoenmarcha = !tiempoenmarcha;
  });
  document.getElementById("botonreseteo").addEventListener("click", () => {
    clearInterval(idintervalo); // Detener cronómetro
    minutos = 0;
    segundos = 0;
    document.getElementById("cronometro").textContent = "00:00"; // Reiniciar visualmente
    tiempoenmarcha = false; // Asegurarse de que está detenido
  });
}
function pruebastiempo(pruebasminutos, pruebassegundos) {
  minutos = pruebasminutos;
  segundos = pruebassegundos;
}
if (typeof jest === "undefined") {
  iniciarcronometro();
}

module.exports = { actualizarcronometro, iniciarcronometro, pruebastiempo };
