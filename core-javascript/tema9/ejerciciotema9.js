class ValueError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValueError";
  }
}

function capitalize_last_name(nombrecompleto) {
  if (typeof nombrecompleto !== "string") {
    throw new TypeError("Debes indicar un nombre (cadena de caracteres)");
  }
  let nombres = nombrecompleto.split(" ");

  if (nombres.length !== 2) {
    throw new ValueError("Sólo se aceptarán dos palabras: un nombre y un apellido");
  }

  const [nombre, apellido] = nombres;

  return `${nombre[0].toUpperCase()}${nombre.slice(1).toLowerCase()} ${apellido.toUpperCase()}`;
}

module.exports = { ValueError, capitalize_last_name };
