function consultadiametro() {
let diametro = Number(prompt("¿Cuál es el diametro de la rueda?(metros)"));

let vehiculogrande = diametro > 1.4;
let vehiculomediano = diametro > 0.8 & diametro <= 1.4;

if (vehiculogrande) {
    document.getElementById("response").innerHTML = "La rueda es para un vehiculo grande";
}
else if (vehiculomediano) {
    document.getElementById("response").innerHTML = "La rueda es para un vehiculo mediano";
}
else {
    document.getElementById("response").innerHTML = "La rueda es para un vehiculo pequeño";
}
setTimeout(() => consultagrosor(diametro), 200);
}

function consultagrosor(diametro) {

let grosor = Number(prompt("¿Cuál es su grosor?(metros)"));
let insuficiente1 = diametro > 1.4 & grosor < 0.4;
let insuficiente2 = diametro <= 1.4 & grosor < 0.25; 
let grosorinsuficiente = insuficiente1 | insuficiente2;

if (grosorinsuficiente) {
    document.getElementById("response").innerHTML += "<br>El grosor para esta rueda es inferior al recomendado";
}
}

consultadiametro();