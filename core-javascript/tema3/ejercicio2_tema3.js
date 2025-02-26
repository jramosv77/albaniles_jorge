function quiz () {
    let questionmonalisa = prompt("¿Quién pintó la 'Mona Lisa'");
    let answermonalisa = questionmonalisa == "Leonardo Da Vinci";
    if (!answermonalisa) {
        alert("Incorrecto!");
    }
    
    let questioncolon = prompt("¿Quién descubrió América?");
    let answercolon = questioncolon == "Cristobal Colón";
    if (answercolon && answermonalisa) {
        alert("Ambas respuestas son correctas!");
    }
    else if (!answercolon) {
        alert ("Incorrecto!");
    }
    else (false)
            
    }


quiz()