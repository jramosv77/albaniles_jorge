const input = require('prompt-sync')({ sigint: true });

function multiplesArray1(longitud, numero = 1) {
  let arrayMultiplos = [];
  let longitudEnteroPositivo = Number.isInteger(longitud) && longitud >= 0;
  let numeroEnteroPositivo = Number.isInteger(numero) && numero >= 0;

  if (!longitudEnteroPositivo || !numeroEnteroPositivo) {
    throw new Error("Introduce un número entero positivo");
  } else {
    for (let posicion = 0; posicion < longitud; posicion++) {
      arrayMultiplos.push(numero * (posicion + 1));
    }
    return arrayMultiplos;
  }
}

function inputUsuario1() {
  let longitud = parseInt(input("Indica el tamaño del array: "), 10);
  let numero = parseInt(input("Indica el número que va a mostrar sus múltiplos: "), 10);
  try {
    let resultado = multiplesArray1(longitud, numero);
    console.log(resultado.join(", "));
  } catch (error) {
    console.error(error.message);
  }
}
inputUsuario1();
