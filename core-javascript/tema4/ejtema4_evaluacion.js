function multiplicacionbucle() {
  
    let num1 = Number(prompt("Indica el primer operando"));
    let num2 = Number(prompt("Indica el segundo operando"));
    let resultado = num1 * num2;
    document.getElementById("response").innerHTML = "El resultado es " + resultado;
    setTimeout(multiplicacionbucle, 500);
      }
   
   multiplicacionbucle();