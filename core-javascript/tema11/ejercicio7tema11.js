document.getElementById("botonfetch").addEventListener("click", () => {
  let numarticulo = document.getElementById("numarticulo").value;
  let urlenlace = `https://jsonplaceholder.typicode.com/posts/${numarticulo}`;

  fetch(urlenlace)
    .then((response) => {
      console.log("Estatus de la petición:", response.status);
      return response.json();
    })
    .then((data) => {
      let contenidopantalla = document.getElementById("articulo");
      contenidopantalla.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.body}</p>
            `;
    });
});
