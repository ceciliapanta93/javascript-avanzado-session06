const form = document.querySelector("form");
const inputUsuario = document.getElementById('usuario');
const inputNombre = document.getElementById('nombre');
const inputContrasena = document.getElementById('contrasena');
const inputOtraContrasena = document.getElementById('otraContrasena');
const inputCorreo = document.getElementById('correo');
const inputTelefono = document.getElementById('telefono');

agregarValidacionPara(inputUsuario)
agregarValidacionPara(inputNombre)
agregarValidacionPara(inputContrasena)
agregarValidacionPara(inputCorreo)
agregarValidacionPara(inputTelefono)

form.addEventListener("submit", (event) => {

    if (
        !inputUsuario.validity.valid ||
        !inputNombre.validity.valid ||
        !inputContrasena.validity.valid ||
        !inputCorreo.validity.valid ||
        !inputTelefono.validity.valid
    ) {
        event.preventDefault();
        validarInput(inputContrasena, event)
        validarInput(inputUsuario, event)
        validarInput(inputNombre, event)
        validarInput(inputCorreo, event)
        validarInput(inputTelefono, event)
    }
});

function validarInput(inputElement) {
    if (!inputElement.validity.valid) {
        showError(inputElement);
        //event.preventDefault();
    }
}

function agregarValidacionPara(inputElement) {
    const input = inputElement;
    const errorMessage = input.parentNode.nextElementSibling;
    const label = input.parentNode.previousElementSibling;
    input.addEventListener("input", () => {
        input.className = 'touched'
        if (input.validity.valid) {
            errorMessage.textContent = ""; 
            errorMessage.className = "error"; // Reset the visual state of the message
            label.className = ""; // Reset the visual state of the message
        } else {
            showError(input);
        }
    });
}

function showError(inputElement) {
    const input = inputElement;
    const errorMessage = input.parentNode.nextElementSibling;
    const label = input.parentNode.previousElementSibling;
    console.log(input.validity,'validay', input)
    if (input.validity.valueMissing) {
        errorMessage.textContent = `El ${label.textContent} es requerido`;
    } else if (input.validity.typeMismatch) {
        errorMessage.textContent = "Ingrese un correo válido";
    } else if (input.validity.patternMismatch) {
        console.log(input.validity)
        reglasPatternOn(input, errorMessage)
    } else if (input.validity.tooShort) {
        errorMessage.textContent = `El ${label.textContent} tiene que ser como mínimo ${input.minLength} a ${input.maxLength} dígitos`;
    }

  // Set the styling appropriately
    errorMessage.className = "error active";
    label.className = "error-text"
}


function reglasPatternOn(input, errorMessage) {
    if (input.id === 'nombre') {
        errorMessage.textContent = "El nombre solo puede contener letras y espacios entre letras";
    }
    if (input.id === 'usuario') {
        errorMessage.textContent = "El usuario solo puede contener números, letras y guión bajo";
    }
    if (input.id === 'telefono') {
        errorMessage.textContent = "El telefono solo puede contener 9 números";
    }
}

