// Aqui comienzo guardando los nombres en una lista
let nombres = [];

// Agrego una función para agregar amigos
function agregarAmigo() {
    let input = document.getElementById("amigo"); 
    let nombre = input.value.trim(); // obtiene el valor de nombre

    // Hice esta funcion para verifcar si hay algun espacio vacío
    if (nombre === "") {
        alert("Oops, verifique si puso un nombre");
        return;
    }

    // Este es interesante, lo puse para que no repita nombres
    if (nombres.includes(nombre)) {
        alert("Me parece que ya registró este nombre");
        return;
    }

    // Agrega el nombre al array y actualiza la lista en pantalla
    nombres.push(nombre);
    actualizarLista();
    input.value = ""; 
}

// Esta funcion es para que se muestre la lista de amigos en la pantalla
function actualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; 

    // este ciclo va buscando los nombres agregados y los agrega como elementos <li> en la lista
    for (let i = 0; i < nombres.length; i++) {
        let li = document.createElement("li");
        li.textContent = nombres[i];
        lista.appendChild(li);
    }
}

// Esta función ya sería cuando se inicie el sorteo
function sortearAmigo() {
    // Le puse un if para validar que se hayan puesto minimo 2 nombres
    if (nombres.length < 2) {
        alert("Losiento, debe haber dos participantes registrados para iniciar");
        return;
    }

    // Lo que hace es llamar la funcion sortearNombres
    let asignaciones = sortearNombres(nombres);
    mostrarResultado(asignaciones);
}

// Esta funcion puedo decir que es basicamente para evitar que no haya un nombre repetido en el sorteo
function sortearNombres(lista) {
    let mezclados = [...lista]; //Y claro aquí copio la lista original

    // Entonces con esto hago que alguien no se asigne a si mismo
    let mezcladoCorrecto = false;
    while (!mezcladoCorrecto) {
        mezclados.sort(() => Math.random() - 0.5); // con math.random hago que se mezcle al azar
        mezcladoCorrecto = true;

        // Vuelvo lo con lo mismo de que nadie se haya asignado a si mismo
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] === mezclados[i]) {
                mezcladoCorrecto = false;
                break;
            }
        }
    }

    // Ya aqui se va creando cada persona a su amigo secreto
    let resultado = {};
    for (let i = 0; i < lista.length; i++) {
        resultado[lista[i]] = mezclados[i];
    }
    return resultado;
}

// Ya luego de todo acá se muestran los resultados
function mostrarResultado(asignaciones) {
    let resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "<h3>Veamoss, Resultados del sorteo:</h3>";

    // Acá se crea una fila para cada amigo secreto asignado
    for (let participante in asignaciones) {
        let p = document.createElement("p");
        p.textContent = `${participante} ----> ${asignaciones[participante]}`;
        resultadoDiv.appendChild(p);
    }
}
