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

    let esValido = true; // Se inicializa true para validar el formulario

    if(!validarCampo(nombre, "nombre")){
        esValido = false;
    }
    if(!validarCampo(apellido, "apellido")){
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
