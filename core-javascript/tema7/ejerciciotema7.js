let input = require("prompt-sync")({ sigint: true });

function multiplesarray(longitud, numero) {
  let arrayMultiplos = [];
  for (let posicion = 0; posicion < longitud; posicion++) {
    arrayMultiplos.push(numero * (posicion + 1));
  }
  return arrayMultiplos;
}

function inputusuario() {
  let longitud = parseInt(input("Indica el tamaño del array: "), 10);
  let numero = parseInt(input("Indica el número que va a mostrar sus múltiplos: "), 10);
  let resultado = multiplesarray(longitud, numero);
  console.log(resultado.join(", "));
}
if (require.main === module) {
  inputusuario();
}

module.exports = multiplesarray;
