document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('userToken'); // Obtener el token del localStorage

    if (token) {
        // El usuario está autenticado, muestra los elementos de "loggedInItems" y "loggedInIcons"
        document.getElementById('loggedInItems').style.display = 'block';
        document.getElementById('loggedInIcons').style.display = 'flex'; // Para que las imágenes y botones se muestren bien

        // Oculta los elementos de "loggedOutItems"
        document.getElementById('loggedOutItems').style.display = 'none';
    } else {
        // El usuario no está autenticado, muestra los elementos de "loggedOutItems"
        document.getElementById('loggedOutItems').style.display = 'block';

        // Oculta los elementos de "loggedInItems" y "loggedInIcons"
        document.getElementById('loggedInItems').style.display = 'none';
        document.getElementById('loggedInIcons').style.display = 'none';
    }
});

/**----------------CERRAR SESIÓN-------------------- */

document.getElementById('exit-button').addEventListener('click', function () {
    // Eliminar el token del localStorage
    localStorage.removeItem('userToken');
    
    // Redirigir al usuario a la página de login
    window.location.href = '/public/Login/login.html';
});