let multiplesarray = require("./ejerciciotema7");

describe("multiplesarray", () => {
  let longitud;
  let numero;

  beforeEach(() => {
    longitud = 5;
    numero = 3;
  });

  test("debería devolver un array vacío si la longitud es 0", () => {
    longitud = 0;
    let array = [];
    expect(multiplesarray(longitud, numero)).toEqual(array);
  });

  test("el array no debe contener ningún número que no sea multiplo", () => {
    expect(multiplesarray(longitud, numero)).not.toContain(7);
  });

  test("los elementos del array deben ser múltiplos del segundo argumento", () => {
    let resultado = multiplesarray(longitud, numero);
    resultado.forEach((elemento, indice) => {
      expect(elemento % numero).toBe(0);
    });
  });

  test("debe generar números que estén todos en un rango esperado", () => {
    let resultado = multiplesarray(longitud, numero);
    resultado.forEach((valor) => {
      expect(valor).toBeGreaterThanOrEqual(3);
      expect(valor).toBeLessThanOrEqual(15);
    });
  });
});
