fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => {
    console.log("Estatus de la petición:", response.status);
    return response.json();
  })
  .then((data) => {
    let totalarticulos = data.length;
    document.getElementById("numeroarticulos").textContent = `Número de artículos: ${totalarticulos}`;

    let titulos = document.getElementById("titulos");
    data.forEach(articulo => {
      let linea = document.createElement("li");
      linea.textContent = articulo.title;
      titulos.appendChild(linea);
    });

    let tabla = document.getElementById("tabla").querySelector("tbody");
    data.forEach((articulo) => {
      let fila = document.createElement("tr");

      let celdatitulo = document.createElement("td");
      celdatitulo.textContent = articulo.title;
      fila.appendChild(celdatitulo);

      let celdacontenido = document.createElement("td");
      celdacontenido.textContent = articulo.body;
      fila.appendChild(celdacontenido);

      tabla.appendChild(fila);
    });
  });
