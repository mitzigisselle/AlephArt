// Función para validar credenciales
async function validarCredenciales(email, password) {
    try {
        const response = await fetch("https://alephart.up.railway.app/api/users");

        if (!response.ok) {
            throw new Error("Error");
        }

        const usuarios = await response.json();
        console.log("Usuarios obtenidos:", usuarios);
        // Buscar si hay un usuario que coincida con el email y la contraseña
        const usuario = usuarios.find(user => user.email === email && user.password === password);

        return usuario || null; // Regresa el usuario autenticado o null
    } catch (error) {
        console.error(error);
        return null; // En caso de error
    }
}


// Manejar el inicio de sesión
document.getElementById("formularioRegistro").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("inputPassword").value.trim();

    // Validar campos vacíos
    if (!email || !password) {
        Swal.fire({
            icon: "warning",
            title: "Campos vacíos",
            text: "Por favor, ingrese su correo electrónico y contraseña.",
        });
        return;
    }

    // Validar credenciales
    try {
        const usuario = await validarCredenciales(email, password);
        console.log("Usuario autenticado:", usuario);
        if (usuario) {
    // Confirmar que las propiedades existen
    console.log("ID del usuario:", usuario.id_user);
    console.log("Nombre del usuario:", usuario.first_name);
    console.log("Apellido del usuario:", usuario.last_name);
               // Almacenar en localStorage
    localStorage.setItem("userId", usuario.id_user);
    localStorage.setItem("userName", usuario.first_name);
    localStorage.setItem("userLastName", usuario.last_name);

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
} catch (error) {
    console.error(error);
    Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al iniciar sesión. Inténtalo de nuevo más tarde.",
    });
    }
});

