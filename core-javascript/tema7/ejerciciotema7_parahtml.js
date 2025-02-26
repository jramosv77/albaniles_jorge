// Este fichero está enlazado con el fichero html (ejerciciotema7.html)

function inputusuario() {
  let longitud = parseInt(prompt("Indica el tamaño del array:"), 10);
  let numero = parseInt(prompt("Indica el número que va a mostrar sus múltiplos:"), 10);

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
      return arraymultiplos;
    }
  }
  let resultado = multiplesarray(longitud, numero);
  document.getElementById("response").innerHTML = resultado.join(", ");
}
