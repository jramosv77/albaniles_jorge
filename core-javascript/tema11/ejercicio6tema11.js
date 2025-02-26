fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    console.log("Estatus de la petición:", response.status);
    return response.json();
  })
  .then((data) => {
    let contenidopantalla = document.getElementById("articulo");
    contenidopantalla.innerHTML = `
        <h1>${data.title}</h1>
        <h2>${data.body}</h2>
    `;
  });
