document
  .getElementById("formularioRegistro")
  .addEventListener("submit", function (event) {
    // Evitar que el formulario se envíe automáticamente
    event.preventDefault();

    // Obtener valores de los campos
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value;
    const contraseña = document.getElementById("contraseña").value.trim();
    const contraseña2 = document.getElementById("contraseña2").value.trim();

    // Obtener referencias a los elementos de error
    const nombreError = document.getElementById("nombreError");
    const apellidoError = document.getElementById("apellidoError");
    const emailError = document.getElementById("emailError");
    const telefonoError = document.getElementById("telefonoError");
    const contraseñaError = document.getElementById("contraseñaError");
    const contraseña2Error = document.getElementById("contraseña2Error");

    // Limpiar los mensajes de error previos
    nombreError.textContent = "";
    apellidoError.textContent = "";
    emailError.textContent = "";
    telefonoError.textContent = "";
    contraseñaError.textContent = "";
    contraseña2Error.textContent = "";

    // Variables para verificar si hay errores
    let isValid = true;

    // Validar el nombre
    if (nombre === "") {
      nombreError.textContent = "El nombre es requerido.";
      isValid = false;
    }
    // Validar el apellido
    if (apellido === "") {
      apellidoError.textContent = "El apellido es requerido.";
      isValid = false;
    }
    // Validar el correo electrónico
    if (!validateEmail(email)) {
      emailError.textContent = "Ingresa un correo electrónico válido.";
      isValid = false;
    }
    // Validar el teléfono
    if (isNaN(telefono) || (telefono.length < 10)) {
      telefonoError.textContent = "Ingresa un teléfono válido.";
      isValid = false;
    }
    // Validar la contraseña
    if (!validateContraseña(contraseña)) {
      contraseñaError.textContent =
        "La contraseña debe tener entre 8 y 16 caracteres, incluyendo al menos un número, una letra mayúscula, una letra minúscula y un carácter especial.";
      isValid = false;
    }

    // Validar que las contraseñas coincidan
    if (contraseña !== contraseña2) {
      contraseña2Error.textContent = "Las contraseñas no coinciden.";
      isValid = false;
    }
    // Enviar el formulario si es válido
    if (isValid) {
    // Verificar si el correo ya existe
    fetch(`https://alephart.up.railway.app/api/users?email=${encodeURIComponent(email)}`) // encodeURIComponent se asegura de que los caracteres especiales en una cadena (como símbolos @) sean transformados en un formato que pueda ser transmitido a través de una URL sin causar problemas.
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al verificar usuario');
        }
        return response.json();
    })
    .then(users => {
      const UserExists = users.some(user => user.email === email);

      if (UserExists) {
        throw new Error('El correo electrónico ya está registrado.'); // Lanza un error específico
      } else {
        // Creamos usuario
        const newUser = {
          first_name: nombre,
          last_name: apellido,
          email: email,
          phone_number: telefono,
          password: contraseña 
      };
        // Solicitud POST a la API para crear el nuevo usuario
  return fetch('https://alephart.up.railway.app/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
      });
    }
})
    .then(response => {
      if (!response.ok) throw new Error('Error al registrarse');
          return response.json();
        })
.then(data => {
            Swal.fire({
                icon: 'success',
                title: '¡Listo!',
                html: 'Haz completado el formulario. <br> ¡Te damos la bienvenida a la comunidad más grande de artistas!',//html, en lugar de text para poder meter salto de línea con <br>
                customClass: {
                    container: 'my-custom-container',
                    title: 'my-custom-title',
                    content: 'my-custom-content',
                    confirmButton: 'my-custom-confirm-button'
                },
                buttonsStyling: false            
            }).then(() => {
                window.location.href = "/login";
            });
          })
          .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: error.message,
                customClass: {
                    container: 'my-custom-container',
                    title: 'my-custom-title',
                    content: 'my-custom-content',
                    confirmButton: 'my-custom-confirm-button'
                },
                buttonsStyling: false
            });
        });
}
});
// Función para validar email
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Función para validar contraseña
function validateContraseña(contraseña) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;
  return regex.test(contraseña);
}
