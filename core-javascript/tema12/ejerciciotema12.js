function rangodevalores(set, min, max) {
  return [...set].filter((valor) => valor >= min && valor <= max);
}
module.exports = rangodevalores;
