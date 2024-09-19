// Función para validar credenciales
function validarCredenciales(email, contraseña) {
    const usuariosAlmacenados = JSON.parse(localStorage.getItem("users"));
    if (!usuariosAlmacenados) {
        return false; // No hay usuarios almacenados
    }

    // Validar si el email y la contraseña coinciden con algún usuario almacenado
    return usuariosAlmacenados.some(user => user.email === email && user.contraseña === contraseña);
}

// Manejar el inicio de sesión
document.getElementById("formularioRegistro").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const contraseña = document.getElementById("inputPassword").value.trim();

    // Validar campos vacíos
    if (!email || !contraseña) {
        Swal.fire({
            icon: "warning",
            title: "Campos vacíos",
            text: "Por favor, ingrese su correo electrónico y contraseña.",
        });
        return;
    }

    // Validar credenciales
    if (validarCredenciales(email, contraseña)) {
        Swal.fire({
            icon: "success",
            title: "Inicio de sesión exitoso",
            text: "¡Bienvenido!",
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            window.location.href = "../Publicaciones/Principal/principal.html"; // Redirige a la página de publicaciones
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Credenciales inválidas",
            text: "Nombre de usuario o contraseña incorrectos.",
        });
    }
});
