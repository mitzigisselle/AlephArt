const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Habilitar CORS para todos los orígenes
app.use(cors());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal (opcional)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use(express.json());
// Ruta para guardar/actualizar el archivo JSON
app.post('/savePublicationData', (req, res) => {
    const publicationData = req.body;
  
    // Ruta al archivo JSON en la misma carpeta
    const filePath = path.join(__dirname, 'publicationData.json');
  
    // Verificar si el archivo existe, si no, crear uno nuevo
    fs.writeFile(filePath, JSON.stringify(publicationData, null, 2), { flag: 'w' }, (err) => {
      if (err) {
        console.error('Error al guardar el archivo:', err);
        return res.status(500).send('Error al guardar el archivo.');
      }
      res.send('Archivo guardado correctamente.');
    });
  });
  
  

// Iniciar el servidor en el puerto 8000
app.listen(8080, () => {
    console.log('Servidor escuchando http://localhost:8080');
});
