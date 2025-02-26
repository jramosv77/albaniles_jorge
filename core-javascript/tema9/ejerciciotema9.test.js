const { capitalize_last_name, ValueError } = require("./ejerciciotema9");

describe("ValueError", () => {
  test('debe contener un stack trace', () => {
    const error = new ValueError("Un mensaje de error");
    expect(error.stack).toBeDefined();
  });
});

describe("capitalize_last_name", () => {
  test("TypeError si el argumento no es una string", () => {
    expect(() => capitalize_last_name(11811)).toThrow(TypeError);
    expect(() => capitalize_last_name(11811)).toThrow("Debes indicar un nombre (cadena de caracteres)");
  });

  test("ValueError si no hay exactamente dos palabras", () => {
    expect(() => capitalize_last_name("Jose")).toThrow(ValueError);
    expect(() => capitalize_last_name("Jose")).toThrow("Sólo se aceptarán dos palabras: un nombre y un apellido");
    expect(() => capitalize_last_name("Jose María De Carlos")).toThrow(ValueError);
    expect(() => capitalize_last_name("Jose María De Carlos")).toThrow("Sólo se aceptarán dos palabras: un nombre y un apellido");
  });

  test("todas las letras del apellido en mayúsculas", () => {
    expect(capitalize_last_name("asunción renedo")).toMatch(/RENEDO/);
  });

  test("el apellido empezando por mayúscula debe estar en el resultado", () => {
    let resultado = capitalize_last_name("segismundo andino");
    expect(resultado).toContain("Segismundo");
  });
});
