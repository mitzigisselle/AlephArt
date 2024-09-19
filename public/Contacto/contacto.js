document.getElementById('formularioContacto').addEventListener('submit', function(event) {
    
    // Evitar que el formulario se envíe automáticamente
    event.preventDefault();

    // Inicializar la variable isValid
    let isValid = true;
    
    // Obtener valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;

    // Obtener referencias a los elementos de error
    const nombreError = document.getElementById('nombreError');
    const apellidoError = document.getElementById('apellidoError');
    const emailError = document.getElementById('emailError');
    const telefonoError = document.getElementById('telefonoError');
    const asuntoError = document.getElementById('asuntoError');
    const mensajeError = document.getElementById('mensajeError');

    // Limpiar los mensajes de error previos
    nombreError.textContent = '';
    apellidoError.textContent = '';
    emailError.textContent = '';
    telefonoError.textContent = '';
    asuntoError.textContent = '';
    mensajeError.textContent = '';

    // Validar el nombre
    if (nombre === '') {
        nombreError.textContent = 'El nombre es requerido.';
        isValid = false;
    }
    // Validar el apellido
    if (apellido === '') {
        apellidoError.textContent = 'El apellido es requerido.';
        isValid = false;
    }
        // Validar el correo electrónico
    if (!validateEmail(email)) {
        emailError.textContent = 'Ingresa un correo electrónico válido.';
        isValid = false;
    }    
    
    if (isNaN(telefono) | telefono.length < 10) {
    telefonoError.textContent = 'Ingresa un teléfono válido.';
    isValid = false;
    }  

    if (asunto.length < 4){
    asuntoError.textContent = 'El asunto debe ser más largo.';
    isValid = false;
    }  

    if (mensaje.length < 5){
    mensajeError.textContent = 'El mensaje debe ser más largo.';
    isValid = false;
    }
    
/*   */


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
        }).then(() => {
        const btn = document.getElementById('btn-enviar');
        const serviceID = 'default_service';
        const templateID = 'template_we94yl3';
    
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
        btn.value = 'Send Email';
        document.getElementById('formularioContacto').reset(); //para borrar los datos si se cumple la promesa de envío
        }, (err) => {
        btn.value = 'Send Email';
        alert(JSON.stringify(err));
        });
    });
    }
});

// Función para validar email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}