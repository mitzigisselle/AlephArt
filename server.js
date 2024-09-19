const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Habilitar CORS para todos los orígenes
app.use(cors());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Servir archivos estáticos desde la carpeta 'public/assets'
app.use(express.static(path.join(__dirname, 'public/assets')));

// Servir archivos estáticos desde la carpeta 'public/Eventos'
app.use(express.static(path.join(__dirname, 'public/Eventos')));

// Ruta para servir el archivo 'navbar.html'
app.get('/navbar', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/Navbar', 'navbar.html'));
});

// Ruta para servir el archivo 'navbarAuth.html'
app.get('/navbarAuth', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/Navbar', 'navbarAuth.html'));
});
// Ruta para servir el archivo 'navbarAuth.html'
app.get('/navbarAuth-css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/Navbar', 'navbar.css'));
});

// Ruta para servir el archivo 'footer.html'
app.get('/footer', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/Footer', 'footer.html'));
});

// Ruta para servir el archivo 'footer.css'
app.get('/footer-css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/Footer', 'footer.css'));
});

// Ruta para la página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/Login', 'login.html'));
});

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pantallaPrincipal.html'));
});

// Iniciar el servidor en el puerto 8080
app.listen(8080, () => {
    console.log('Servidor escuchando http://localhost:8080');
});
