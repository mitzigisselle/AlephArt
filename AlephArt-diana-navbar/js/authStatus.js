
function checkAuthStatus() {
    return true; //para efectos de prueba retorna false para simular un estado de autenticación
    // Aquí implementariamos una verificación de estado de autenticación con la comprobación de un token en local storage o
    //llamar a una API para verificar el estado de autenticación
  }
  
function updateNavbar() {
    const isAuthenticated = checkAuthStatus();
    const authNav = document.getElementById('loggedInItems'); //Traemos los elementos del navbar que se deben mostrar cuando el usuario inicia sesión
    const autNavIcons = document.getElementById('loggedInIcons'); //Iconos de perfil y salir
    const nonAuthNav = document.getElementById('loggedOutItems'); //Traemos los elementos del navbar que se deben mostrar cuando el usuario no inicia sesión
  
    if (isAuthenticated) {
      authNav.style.display = 'flex';
      nonAuthNav.style.display = 'none';
      autNavIcons.style.display = 'flex';
    } else {
      authNav.style.display = 'none';
      nonAuthNav.style.display = 'flex';
      autNavIcons.style.display = 'none';
    }
  }
  

  

  document.addEventListener('DOMContentLoaded', updateNavbar);