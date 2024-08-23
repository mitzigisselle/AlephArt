function crearPublicacion() {
    // Valores inputs
    const nombre = document.getElementById('nombreUsuario').value;
    const contenido = document.getElementById('contenidoPublicacion').value;
    const files = document.getElementById('fileInput').files;

    // Validación
    if (nombre === '' || contenido === '') {
        alert('Ingresa nombre/contenido a la publicación');
        return;
    }

    // Crear div
    const publicacionDiv = document.createElement('div');
    publicacionDiv.classList.add('publicacion');

    // Añadir texto a nombre y contenido de la publicación
    publicacionDiv.innerHTML = `<h3>Publicación de ${nombre}</h3><p>${contenido}</p>`;

    // Procesar archivos seleccionados
    Array.from(files).forEach(file => {
        const fileURL = URL.createObjectURL(file);
        let element;

        if (file.type.startsWith('image/')) {
            element = document.createElement('img');
            element.src = fileURL;
            element.alt = `Imagen de publicación`;
            element.style.maxWidth = '200px';
        } else if (file.type.startsWith('audio/')) {
            element = document.createElement('audio');
            element.src = fileURL;
            element.controls = true;
        } else if (file.type.startsWith('video/')) {
            element = document.createElement('video');
            element.src = fileURL;
            element.controls = true;
            element.style.maxWidth = '300px';
        }

        if (element) {
            publicacionDiv.appendChild(element);
        }
    });

    // Añadir la nueva publicación al contenedor de publicaciones
    document.getElementById('publicaciones').appendChild(publicacionDiv);

    // Limpiar inputs
    document.getElementById('nombreUsuario').value = '';
    document.getElementById('contenidoPublicacion').value = '';
    document.getElementById('fileInput').value = ''; // Limpiar input de archivo
}

// Vincular el ícono de multimedia con el input de archivo
document.getElementById('iconAddPicture').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});
