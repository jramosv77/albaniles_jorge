const multiplesarray = require("./ejerciciotema7");

test("Comprobar que devuelve la array deseada si se introducen números enteros positivos", () => {
  let longitud1 = 2;
  let numero1 = 4;
  let primerresultado = multiplesarray(longitud1, numero1);
  expect(primerresultado).toEqual([4, 8]);
  let longitud2 = 5;
  let numero2 = 10;
  let segundoresultado = multiplesarray(longitud2, numero2);
  expect(segundoresultado).toEqual([10, 20, 30, 40, 50]);
});
test("verificar que la longitud del array se corresponde con el primer argumento", () => {
  let longitud = 6;
  let numero = 8;
  let resultado = multiplesarray(longitud, numero);
  expect(resultado).toHaveLength(longitud);
});
test("función con un sólo argumento, valor predeterminado para el segundo(numero)", () => {
  let longitud = 1;
  let resultado = multiplesarray(longitud);
  expect(resultado).not.toBe([NaN]);
});
test("gestionar como error si no se introducen números enteros positivos", () => {
  let longitud = "hola";
  let mensajeerror = "Introduce un número entero positivo"
  expect(() => {multiplesarray(longitud);}).toThrow(mensajeerror);
});