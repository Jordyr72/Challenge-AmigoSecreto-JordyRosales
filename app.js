let nombres = [];

function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nombre = input.value.trim();

    if (nombre === "") {
        alert("Oops no ha ingresado un nombre");
        return;
    }

    if (nombres.includes(nombre)) {
        alert("Me parece que este nombre ya lo registraste");
        return;
    }

    nombres.push(nombre);
    actualizarLista();
    input.value = ""; 
}

function actualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    
    nombres.forEach(nombre => {
        let li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (nombres.length < 2) {
        alert("Ingresa al menos dos participantes porfavor");
        return;
    }

    let asignaciones = sortearNombres(nombres);
    mostrarResultado(asignaciones);
}

function sortearNombres(lista) {
    let mezclados = [...lista];

    // Algoritmo para evitar auto-asignaciones
    do {
        mezclados.sort(() => Math.random() - 0.5);
    } while (mezclados.some((nombre, index) => nombre === lista[index]));

    let resultado = {};
    for (let i = 0; i < lista.length; i++) {
        resultado[lista[i]] = mezclados[i];
    }
    return resultado;
}

function mostrarResultado(asignaciones) {
    let resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "<h3>Veamos, veamos, resultados del sorteo:</h3>";

    Object.keys(asignaciones).forEach(participante => {
        let p = document.createElement("p");
        p.textContent = `${participante} -----> ${asignaciones[participante]}`;
        resultadoDiv.appendChild(p);
    });
}
