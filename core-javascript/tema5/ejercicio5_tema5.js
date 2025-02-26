function contardigito() {
  let digito = prompt("Ingresa un dígito del 0 al 9");
  let numero = prompt("Ingresa un número");
  let contar = 0;

  for (let posicion = 0; posicion < numero.length; posicion++) {
    if (numero[posicion] === digito) {
      contar++;
    }
  }

  if (contar > 0) {
    document.getElementById("response").innerHTML = "El dígito proporcionado (" + digito + ")" + " aparece " + contar + " veces en el número indicado " + "(" + numero + ")"
  }
  else {
    document.getElementById("response").innerHTML = "El digito proporcionado no aparece en el número indicado";
  }
}
contardigito();
