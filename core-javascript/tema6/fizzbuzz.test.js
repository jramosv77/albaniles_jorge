const fizzbuzz = require("./fizzbuzz");

test("number is divided by 3 and/or 5", () => {
  expect(fizzbuzz(3)).toEqual("fizz");
  expect(fizzbuzz(5)).toEqual("buzz");
  expect(fizzbuzz(15)).toEqual("fizzbuzz");
  expect(fizzbuzz(7)).toEqual(`${7}`);
  expect(() => {fizzbuzz(0);}).toThrow("Introduce un número diferente a 0");
  expect(() => {fizzbuzz("hola");}).toThrow("Introduce un número diferente a 0");
});