document.getElementById('formularioContacto').addEventListener('submit', function(event) {
    // Evitar que el formulario se envíe automáticamente
    event.preventDefault();
    
    // Obtener valores de los campos
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const teléfono = document.getElementById('teléfono').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;

    // Obtener referencias a los elementos de error
    const nombreError = document.getElementById('nombre');
    const apellidoError = document.getElementById('apellido');
    const emailError = document.getElementById('email');
    const teléfonoError = document.getElementById('teléfono');
    const asuntoError = document.getElementById('asunto');
    const mensajeError = document.getElementById('mensaje');

    // Limpiar los mensajes de error previos
    nombreError.textContent = '';
    apellidoError.textContent = '';
    emailError.textContent = '';
    teléfonoError.textContent = '';
    asuntoError.textContent = '';
    mensajeError.textContent = '';

    // Variables para verificar si hay errores
    let isValid = true;

    // Validar el nombre
    if (nombre.trim() === '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El nombre es requerido.",
            customClass: {
                container: 'my-custom-container',
                title: 'my-custom-title',
                content: 'my-custom-content',
                confirmButton: 'my-custom-confirm-button'
            },
            buttonsStyling: false

        });
        isValid = false;
        
    }

    // Validar el apellido
    if (apellido.trim() === '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El apellido es requerido.",
            customClass: {
                container: 'my-custom-container',
                title: 'my-custom-title',
                content: 'my-custom-content',
                confirmButton: 'my-custom-confirm-button'
            },
            buttonsStyling: false
        });
        isValid = false;
    }

    // Validar el correo electrónico
    if (!validateEmail(email)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ingresa un correo electrónico válido.",
            customClass: {
                container: 'my-custom-container',
                title: 'my-custom-title',
                content: 'my-custom-content',
                confirmButton: 'my-custom-confirm-button'
            },
            buttonsStyling: false
        });
        isValid = false;
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
        return regex.test(email);
    }

    // Validar el teléfono
    if (isNaN(teléfono) | teléfono.length < 10) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El teléfono debe tener al menos 10 dígitos.",
            customClass: {
                container: 'my-custom-container',
                title: 'my-custom-title',
                content: 'my-custom-content',
                confirmButton: 'my-custom-confirm-button'
            },
            buttonsStyling: false
        });
        isValid = false;
    }

    // Validar el Asunto
    if (asunto.length < 4) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El asunto debe ser más largo.",
            customClass: {
                container: 'my-custom-container',
                title: 'my-custom-title',
                content: 'my-custom-content',
                confirmButton: 'my-custom-confirm-button'
            },
            buttonsStyling: false
        });
        isValid = false;
    }

    // Validar el mensaje
    if (mensaje.length < 5) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El mensaje debe ser más largo.",
            customClass: {
                container: 'my-custom-container',
                title: 'my-custom-title',
                content: 'my-custom-content',
                confirmButton: 'my-custom-confirm-button'
            },
            buttonsStyling: false
        });
        isValid = false;
    }


    // Enviar el formulario si es válido
    if (isValid) {
        Swal.fire({
            icon: "success",
            title: "¡Listo!",
            text: "Formulario enviado correctamente.",
        customClass: {
            container: 'my-custom-container',
            title: 'my-custom-title',
            content: 'my-custom-content',
            confirmButton: 'my-custom-confirm-button'
            },
            buttonsStyling: false            
        });

    }
});

    

/*Enviar a correo electrónico*/

/////////////////////Correo//////////////////////
const btn = document.getElementById('btn-enviar');

document.getElementById('formularioContacto')
.addEventListener('submit', function(event) {
event.preventDefault();



const serviceID = 'default_service';
const templateID = 'template_we94yl3';

emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
    btn.value = 'Send Email';
    }, (err) => {
    btn.value = 'Send Email';
    alert(JSON.stringify(err));
    });
    this.reset();
});





