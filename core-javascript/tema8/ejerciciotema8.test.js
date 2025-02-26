const Metodostring = require("./ejerciciotema8");

describe("Metodostring", () => {
  let prueba = "Álgebra y cálculo, la asignatura pendiente";
  let instanciaprueba;

  beforeEach(() => {
    instanciaprueba = new Metodostring(prueba);
  });

  test("arraycaracteres debe devolver un array de caracteres que coincidan con el string original", () => {
    let arrayCaracteres = instanciaprueba.arraycaracteres();
    for (let i = 0; i < prueba.length; i++) {
      expect(arrayCaracteres[i]).toBe(prueba[i]);
    }
  });

  test("ordencaracteresrandom debe devolver el string con caracteres en orden aleatorio", () => {
    let resultado = instanciaprueba.ordencaracteresrandom();
    expect(resultado).not.toBe(prueba);
    expect(resultado.length).toBe(prueba.length);
  });

  test("inversioncaracteres debe invertir el orden de los caracteres", () => {
    expect(instanciaprueba.inversioncaracteres()).toBe("etneidnep arutangisa al ,oluclác y arbeglÁ");
  });

  test("sinvocales debe eliminar todas las vocales del string", () => {
    expect(instanciaprueba.sinvocales()).toBe("lgbr y clcl, l sgntr pndnt");
  });

  test("sinconsonantes debe eliminar todas las consonantes del string", () => {
    expect(instanciaprueba.sinconsonantes()).toBe("Áea  áuo a aiaua eiee");
  });

  test("arraypalabras debe convertir el string en un array de palabras", () => {
    expect(instanciaprueba.arraypalabras()).toEqual([
      "Álgebra", "y", "cálculo,", "la", "asignatura", "pendiente",
    ]);
  });

  test("inversionpalabras debe invertir el orden de las palabras", () => {
    expect(instanciaprueba.inversionpalabras()).toBe("pendiente asignatura la cálculo, y Álgebra");
  });
});
