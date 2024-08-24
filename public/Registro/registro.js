document.getElementById('formularioContacto').addEventListener('submit', function(event) {
    // Evitar que el formulario se envíe automáticamente
    event.preventDefault();
    
    // Obtener valores de los campos
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const perfil = document.getElementById('perfil').value;
    const asunto = document.getElementById('contraseña').value;
    const mensaje = document.getElementById('contraseña2').value;

    // Obtener referencias a los elementos de error
    const nombreError = document.getElementById('nombre');
    const apellidoError = document.getElementById('apellido');
    const emailError = document.getElementById('email');
    const perfilError = document.getElementById('perfil');
    const contraseñaError = document.getElementById('contraseña');
    const contraseña2Error = document.getElementById('contraseña2');

    // Limpiar los mensajes de error previos
    nombreError.textContent = '';
    apellidoError.textContent = '';
    emailError.textContent = '';
    perfilError.textContent = '';
    contraseñaError.textContent = '';
    contraseña2Error.textContent = '';

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

    // Validar el perfil
    if (!perfil) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Debes seleccionar un perfil.",
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

    function validateContraseña(contraseña) {
        const regex = - /.{8,16}/.test(password) && /\d/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[^A-Za-z0-9]/.test(password);
        return regex.test(contraseña);
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




