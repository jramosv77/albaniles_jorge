class Metodostring {
  constructor(string) {
    this.string = string;
  }

  arraycaracteres() {
    return this.string.split("");
  }

  ordencaracteresrandom() {
    return this.arraycaracteres().sort(() => Math.random() - Math.random()).join("");
  }

  inversioncaracteres() {
    return this.arraycaracteres().reverse().join("");
  }

  sinvocales() {
    return this.string.replace(/[aeiouáéíóúAEIOUÁÉÍÓÚ]/g, "");
  }

  sinconsonantes() {
    return this.string.replace(/[^aeiouáéíóúAEIOUÁÉÍÓÚ\s]/g, "");
  }

  arraypalabras() {
    return this.string.split(" ");
  }

  inversionpalabras() {
    return this.arraypalabras().reverse().join(" ");
  }
}

module.exports = Metodostring;
