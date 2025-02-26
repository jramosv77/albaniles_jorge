function titulo(cadena) {
  return cadena
    .split(" ")
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
    .join(" ");
}
let texto_prueba = "COMPROBANDO MAYÚSCULAS Y MINÚSCULAS";
let muestra_resultado = titulo(texto_prueba);
console.log(muestra_resultado);
