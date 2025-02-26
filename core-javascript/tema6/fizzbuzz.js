function fizzbuzz(numero) {
  if (typeof numero !== 'number' || numero === 0) {
    throw new Error('Introduce un número diferente a 0');
  }
  if (numero % 15 === 0) {
    return 'fizzbuzz';
  } else if (numero % 3 === 0) {
    return 'fizz';
  } else if (numero % 5 === 0) {
    return 'buzz';
  } else {
    return `${numero}`;
  }
}
module.exports = fizzbuzz;
