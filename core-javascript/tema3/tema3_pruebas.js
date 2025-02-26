function consultadiametro() {
  const diametro = Number(prompt('¿Cuál es el diametro de la rueda?(metros)'));
  const vehiculogrande = diametro > 1.4;
  const vehiculomediano = diametro > 0.8 & diametro <= 1.4;

  if (vehiculogrande) {
    document.write('La rueda es para un vehiculo grande');
  } else if (vehiculomediano) {
    document.write('La rueda es para un vehiculo mediano');
  } else {
    document.write('La rueda es para un vehiculo pequeño');
  }
  setTimeout(() => consultagrosor(diametro), 200);
}

function consultagrosor(diametro) {
  const insuficiente1 = diametro > 1.4 & Number(prompt('¿Cuál es su grosor?(metros)')) < 0.4;
  const insuficiente2 = diametro <= 1.4 & Number(prompt('¿Cuál es su grosor?(metros)')) < 0.25;
  const grosorinsuficiente = insuficiente1 || insuficiente2;

  if (grosorinsuficiente) {
    document.write('El grosor para esta rueda es insuficiente');
  }
}

consultadiametro();
