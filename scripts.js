/**
 * Descripción: Valida si un campo de un form está vacío y si es correcto
 * @method validarCampo
 * @param campo {Object} - Campo del formulario
 * @param {String} nombreCampo - Nombre del campo a validar (para mensajes de alerta)
 * @return {boolean} - True si el campo está vacío, false si no lo está
 */
let validarCampo = (campo, nombreCampo) => {
    const caracteres = /^[A-Za-zñ\s]+$/;
    if (campo.value === "") {
        alert(`Ingrese su ${nombreCampo}.`);
        campo.value = "";
        return false;
    } else if (!caracteres.test(campo.value)) {
        alert(`Ingrese un ${nombreCampo} válido (solo letras).`);
        campo.value = "";
        return false;
    }
    return true;
}
/**
 * Descripción: Valida si se selecciona una opción de género
 * @method validarGenero
 * @return {boolean} - True si se selecciona una opción de género, false si no se selecciona
 */
let validarGenero = () => {
    const generos = document.getElementsByName('genero');
    for (let i = 0; i < generos.length; i++) {
        if (generos[i].checked) { // si existe alguna opción seleccionada está ok
            return true;
        }
    }
    alert("Seleccione un género.");
    return false;
}
/**
 * Descripción: Valida si un mail tiene el formato válido
 * @method validarEmail
 * @param {String} email - Mail a validar
 * @return {boolean} - Devuelve true si el mail tiene un formato válido, false si no lo tiene
 */

let validarEmail = (email) => {
    const emailPatron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPatron.test(email);
}

/**
 * Descripción: Valida si un formulario tiene todos los campos completados
 * @method validarForm
 * @return {boolean} esValido - Devuelve true si todos los campos están completados y validados, false si no lo están
 */


const validarForm = () => {
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const edad = document.getElementById('edad');
    const email = document.getElementById('email');
    const comentario = document.getElementById('comentario');

    let esValido = true;

    if (!validarCampo(nombre, "nombre")) {
        esValido = false;
    }
    if (!validarCampo(apellido, "apellido")) {
        esValido = false;
    }
    if (edad.value === "" || edad.value < 0 || edad.value > 200) {
        alert("Ingrese una edad válida entre 0 y 200.");
        edad.value = "";
        esValido = false;
    }
    if (!validarGenero()) {
        esValido = false;
    }
    if (!validarEmail(email.value)) {
        alert("Ingrese un email válido.");
        email.value = "";
        esValido = false;
    }
    if (comentario.value === "") {
        alert("Ingrese un comentario.");
        esValido = false;
    }
    if (esValido) {
        alert("Formulario enviado con éxito.");
    }
    return esValido;
}

/**
 * Descripción: Añade un producto al carrito de compras
 * @method anadirProducto
 * @param {String} nombreProducto - Nombre del producto a añadir
 * @param {number} precio - Precio del producto a añadir
 */
let anadirProducto = (nombreProducto, precio) => {
    const carro = JSON.parse(localStorage.getItem('carro')) || [];

    carro.push({nombreProducto, precio});

    localStorage.setItem('carro', JSON.stringify(carro));

    alert(`${nombreProducto} se agregó al carrito.`);
}
/**
 * Descripción: Elimina un producto del carrito
 * @method eliminarProducto
 * @param {number} index - Índice del producto a eliminar en el carrito
 */
let eliminarProducto = (index) => {
    const carro = JSON.parse(localStorage.getItem('carro')) || [];

    carro.splice(index, 1);

    localStorage.setItem('carro', JSON.stringify(carro));

    compraLocal();

    if (carro.length === 0) {
        setTimeout(() => {
            alert("Se eliminaron todos los productos del carrito, seleccione nuevos productos.");
        }, 500);
    }
}
/**
 * Descripción: Muestra el contenido del carrito de compras
 * @method compraLocal
 */
let compraLocal = () => {
    const carro = JSON.parse(localStorage.getItem('carro')) || [];
    const carroInfo = document.getElementById('carro-info');
    let total = 0;

    carroInfo.innerHTML = ''; // Limpia el contenido previo, no sacar

    for (let i = 0; i < carro.length; i++) {
        const producto = carro[i];
        const div = document.createElement('div');

        div.className = 'items-carrito';
        div.innerHTML = `
            <p>${producto.nombreProducto}</p>
            <p>Precio: $${producto.precio}</p>
            <button class="button-eliminar" onclick="eliminarProducto(${i})">Eliminar producto</button>
        `;
        carroInfo.appendChild(div);

        total += producto.precio;
    }

    document.getElementById('precio-total').textContent = `Total: $${total}`;
}

/**
 * Descripción: Valida que la búsqueda concuerde con los productos y redirige a la página de productos si existe el producto
 * @method busquedaCorrecta
 * @return {boolean} - Devuelve true si la búsqueda es válida, false si no lo es
 */
let busquedaCorrecta = () => {
    let busqueda = document.getElementById('buscar');
    const busquedaMin = busqueda.value.toLowerCase();
    if (busquedaMin === "buzo" || busquedaMin === "remera") {
        window.location.href = 'productos.html';
        return true;
    } else {
        alert("El producto que deseas buscar no existe, ingrese uno correcto.");
        busqueda.value = "";
        return false;
    }
}
/**
 * Descripción: Dibuja un ticket de compra en el canvas con los productos del carrito
 * @method dibujarTicket
 */
let dibujarTicket = () => {
    const productos = JSON.parse(localStorage.getItem('productosTicket')) || [];
    const canvas = document.getElementById('ticketCanvas');
    const ctx = canvas.getContext('2d');

    const x = 30;
    let y = 30;
    let total = 0;

    const alturaLinea = 30; // espacio entre cada línea
    const alturaEncabezado = 60;  // linea superior -> título -> espacio
    const alturaFooter = 55;  // linea -> total -> espacio (25)

    let alturaCanvas = alturaEncabezado + (productos.length * alturaLinea) + alturaFooter;

    canvas.height = alturaCanvas;

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = '18px Outfit';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    // Encabezado
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, alturaEncabezado - 20);

    ctx.fillStyle = 'black';
    ctx.fillText("Ticket de Compra", canvas.width / 2, y);
    y += alturaLinea;

    ctx.textAlign = 'left';

    // Productos
    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        ctx.fillText(`${producto.nombreProducto}: $${producto.precio.toFixed(2)}`, x, y);
        total += producto.precio;
        y += alturaLinea;
    }

    // Línea en el medio
    ctx.beginPath();
    ctx.moveTo(10, y);
    ctx.lineTo(390, y);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    y += alturaLinea;

    ctx.fillText(`Total: $${total.toFixed(2)}`, x, y);
}

/**
 * Descripción: Verifica si hay productos en el carrito. Si los hay, muestra el ticket de compra.
 * @method comprar
 */
let emitirTicket = () => {
    const productos = JSON.parse(localStorage.getItem('carro')) || [];
    if (productos.length === 0) {
        alert("No hay productos en el carrito, ingrese productos para comprar.")
        window.location.href = 'productos.html';
    } else {
        localStorage.setItem('productosTicket', JSON.stringify(productos));
        alert("La compra se realizó correctamente.");
        window.location.href = 'ticket.html';
    }
}
