// Este fichero está enlazado con Jest para la realización de test(ejerciciotema7_pruebas.test.js)

function multiplesarray(longitud, numero = 1) {
  let arraymultiplos = [];
  let longitudenteropositivo = Number.isInteger(longitud) && longitud >= 0;
  let numeroenteropositivo = Number.isInteger(numero) && numero >= 0;
  if (!longitudenteropositivo || !numeroenteropositivo) {
    throw new Error("Introduce un número entero positivo");
  } else {
    for (let posicion = 0; posicion < longitud; posicion++) {
      arraymultiplos.push(numero * (posicion + 1));
    }
  }
  return arraymultiplos;
}
module.exports = multiplesarray;