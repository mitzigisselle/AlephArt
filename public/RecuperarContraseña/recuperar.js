// Inicializa EmailJS con tu User ID
emailjs.init('Eivo698efOjc7hKRe');

// Función para enviar el formulario
document.getElementById('formularioRegistro').addEventListener('submit', function(event) {
    event.preventDefault();

    const emailField = document.getElementById('correo');
    const emailValue = emailField.value.trim();

    // Verifica si el campo de correo está vacío
    if (!emailValue) {
        Swal.fire({
            icon: 'warning',
            title: 'Campo requerido',
            text: 'Por favor, ingresa tu correo electrónico.'
        });
        return;
    }

    // Verifica si el correo electrónico tiene un formato válido
    if (!validateEmail(emailValue)) {
        Swal.fire({
            icon: 'warning',
            title: 'Correo inválido',
            text: 'Por favor, ingresa una dirección de correo electrónico válida.'
        });
        return;
    }

    const serviceID = 'default_service'; // Asegúrate de que esto coincida con tu Service ID
    const templateID = 'template_hydfmji'; // Asegúrate de que esto coincida con tu Template ID

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: '¡Listo revisa tu correo!',
                text: 'Hemos enviado un enlace de restablecimiento de contraseña a tu correo. Por favor, revisa tu bandeja de entrada y sigue las instrucciones para continuar.'
            });
        }, (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un problema al enviar el correo. Inténtalo de nuevo.'
            });
            console.error('Error al enviar el correo:', err);
        });
});

// Función para validar el formato del correo electrónico
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
