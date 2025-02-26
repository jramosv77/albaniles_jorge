const rangodevalores = require("./ejerciciotema12");

describe("test función rangodevalores", () => {
  test("Debe devolver valores dentro del rango", () => {
    let muestravalores = new Set([3, 5, 7, 19, 23, 25]);
    expect(rangodevalores(muestravalores, 6, 24)).toEqual([7, 19, 23]);
  });

  test("Si no se indican valores dentro del rango, debe devolver un array vacío", () => {
    let muestravalores = new Set([3, 5, 7, 19, 23, 25]);
    expect(rangodevalores(muestravalores, 9, 18)).toEqual([]);
  });

  test("Si el valor mínimo y/o el máximo se encuentran en el set, deben devolverse en el array", () => {
    let muestravalores = new Set([3, 5, 7, 19, 23, 25]);
    expect(rangodevalores(muestravalores, 19, 25)).toEqual([19, 23, 25]);
  });

  test("Si se indica un set vacío, debe devolver un array vacío", () => {
    let muestravalores = new Set();
    expect(rangodevalores(muestravalores, 12, 55)).toEqual([]);
  });

  test("Si se indica el rango de forma inversa, debe retornar un array vacío", () => {
    let muestravalores = new Set([3, 5, 7, 19, 23, 25]);
    expect(rangodevalores(muestravalores, 23, 8)).toEqual([]);
  });

  test("Debe utilizar además numeros negativos", () => {
    let muestravalores = new Set([-25, -7, 0, 23, 25]);
    expect(rangodevalores(muestravalores, -15, 24)).toEqual([-7, 0, 23]);
  });

  test("Si se indica al menos un valor en el set, debe devolver un array no vacío", () => {
    let muestravalores = new Set([3, 5, 7, 19, 23, 25]);
    let resultado = rangodevalores(muestravalores, 5, 15);
    expect(resultado).toBeTruthy();
  });
});
