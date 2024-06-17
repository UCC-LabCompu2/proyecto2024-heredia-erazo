/*
 * Descripción: Valida si un campo de un form está vacío
 * @method validarCampo
 * @param {String} campo - ID del elemento HTML del campo a validar
 * @param {String} nombreCampo - Nombre del campo a validar (para mensajes de alerta)
 * @return {boolean} - True si el campo está vacío, false si no lo está
 */
let validarCampo = (campo, nombreCampo) => {
    if(campo.value === ""){ // Se verifica si el campo está vacío
        alert("Ingrese su " + nombreCampo);
        campo.value = "";
        return false;
    }
    return true;
}
/*
 * Descripción: Valida si se selecciona una opción de género
 * @method validarGenero
 * @return {boolean} - True si se selecciona una opción de género, false si no se selecciona
 */
let validarGenero = () => {
    let generos = document.getElementsByName("genero");
    for(let i = 0; i < generos.length; i++) {
        if(generos[i].checked) { // si existe alguna opción seleccionada está ok
            return true;
        }
    }
    alert("ERROR / Seleccione un género");
    return false;
}
/*
 * Descripción: Valida si un mail tiene el formato válido
 * @method validarEmail
 * @param {String} email - Mail a validar
 * @return {boolean} - Devuelve true si el mail tiene un formato válido, false si no lo tiene
 */

let validarEmail = (email) => {
    const emailPatron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Se define el patrón del mail
    return emailPatron.test(email); // Prueba si el mail concuerda con el patrón
}

/*
 * Descripción: Valida si un formulario tiene todos los campos completados
 * @method validarForm
 * @return {boolean} esValido - Devuelve true si todos los campos están completados y validados, false si no lo están
 */


const validarForm = () => {
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let edad = document.getElementById("edad");
    let email = document.getElementById("email");
    let comentario = document.getElementById("comentario");

    let esValido = true;

    if(!validarCampo(nombre, "nombre")){
        esValido = false;
    }
    if(!validarCampo(apellido, "apellido")){
        esValido = false;
    }

    if (!validarGenero()) {
        esValido = false;
    }

    if (edad.value === "" || edad.value < 0 || edad.value > 200) {
        alert("ERROR / Ingrese una edad válida entre 0 y 200");
        edad.value = "";
        esValido = false;
    }

    if (!validarEmail(email.value)) {
        alert("ERROR / Ingrese un email válido");
        email.value = "";
        esValido = false;
    }

    if (!validarCampo(comentario, "comentario")){
        esValido = false;
    }

    return esValido;
}

// ...


let anadirProducto = (nombreProducto, precio) => {
    let carro = JSON.parse(localStorage.getItem('carro')) || [];

    carro.push({ nombreProducto, precio });

    localStorage.setItem('carro', JSON.stringify(carro));

    alert(nombreProducto + ' se agregó al carrito.');
}

let eliminarProducto = (index) => {
    let carro = JSON.parse(localStorage.getItem('carro')) || [];

    carro.splice(index, 1);

    localStorage.setItem('carro', JSON.stringify(carro));

    compraLocal();
    dibujarTicket();
}

let compraLocal = () => {
    let carro = JSON.parse(localStorage.getItem('carro')) || [];
    let carroInfo = document.getElementById('carro-info');
    let total = 0;

    carroInfo.innerHTML = ''; // Limpia el contenido previo, no sacar

    for (let i = 0; i < carro.length; i++) {
        let producto = carro[i];
        let div = document.createElement('div');

        div.className = 'items-carrito';
        div.innerHTML = `
            <p>${producto.nombreProducto}</p>
            <p>Precio: $${producto.precio}</p>
            <button class="button" onclick="eliminarProducto(${i})">Eliminar producto</button>
        `;
        carroInfo.appendChild(div);

        total += producto.precio;
    }

    document.getElementById('precio-total').textContent = 'Total: $' + total;
}


    /*
    * Descripcion: valida la busqueda si se ingresan letras
    * method: busqueda
    * pa
    */

let busquedaCorrecta = () => {
    let busqueda = document.getElementById("buscar").value;
    let caracteres = /^[A-Za-z]+$/;
    if (caracteres.test(busqueda)) {
        window.location.href = 'productos.html';
        return true;
    } else {
        alert('ERROR / ingrese valor valido (solo letras)');
        document.getElementById("buscar").value = "";
        return false;
    }
}

let dibujarTicket = () => {
    const productos = JSON.parse(localStorage.getItem('carro')) || [];
    const canvas = document.getElementById('ticketCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia canvas

    ctx.font = '16px Outfit';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';

    let x = 30;
    let y = 30;
    let total= 0;

    ctx.fillText('Ticket de Compra', x+70, y);
    y += 30;

    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        ctx.fillText(`${producto.nombreProducto}: $${producto.precio.toFixed(2)}`, x, y);
        total += producto.precio;
        y += 30;
    }

    // Dibuja línea en el medio
    ctx.beginPath();
    ctx.moveTo(10, y);
    ctx.lineTo(390, y);
    ctx.stroke();
    y += 25;

    ctx.fillText('Total: $' + total.toFixed(2), x, y);
}

let comprar = () => {
    const canvas = document.getElementById('ticketCanvas');
    canvas.style.display = 'block'; // Mostrar el canvas
    dibujarTicket();
}