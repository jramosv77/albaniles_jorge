const mapwithcb = require('./mapwithcb');

test("Comprobar que no hay llamada si array está vacío", () => {
  let mockcallback = jest.fn();
  let arrayvacio = [];
  mapwithcb(arrayvacio, mockcallback);
  expect(mockcallback).not.toHaveBeenCalled();
});

test("Si no se pasa como argumento un array, debe devolver typeof null", () => {
  let mockcallback = jest.fn();
  let input = mapwithcb("no es un array", mockcallback);
  expect(input).toBeNull();
});

test("mapwithcb debe devolver un array con elementos (precios por ejemplo) modificados (ejemplo aplicando IVA) al llamar a la función callback", () => {
  let mockcallback = jest.fn((x) => x * 1.21);
  let array = [100, 200, 300];
  let entrada = mapwithcb(array, mockcallback);
  expect(entrada).toEqual([121, 242, 363]);
});

test("Asegurar que se llama a la función callback tantas veces como elementos hay en el array", () => {
  let mockcallback = jest.fn();
  let array = [1, 3, 5, 7, 9];
  mapwithcb(array, mockcallback);
  expect(mockcallback).toHaveBeenCalledTimes(array.length);
});
