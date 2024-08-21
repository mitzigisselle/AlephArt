function crearPublicación() {

    // Valores inputs
    const nombre = document.getElementById('nombreUsuario').value;
    const contenido = document.getElementById('contenidoPublicacion').value;
    const imgUrl = document.getElementById('imgUrl').value;
    const audioUrl = document.getElementById('audioUrl').value;
    const videoUrl = document.getElementById('videoUrl').value;

    // Validación
    if (nombre === '' || contenido === '') {
        alert('Ingresa nobre/contenido a la publicación');
        return;
    }

    //Crea div
    const publicacionDiv = document.createElement('div');
    publicacionDiv.classList.add = 'publicacion';

    //Añade texto a nombre y publicación
    nuevaPublicacion.innerHTML = `<h3>Publicación de ${nombre}</h3><p>${contenido}</p>`; 

    // Imagen
    if (imgUrl) {
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = `Imagen de publicación`;
        // img.style.maxWidth = '200px';  // pa ajustar el tamaño.
        nuevaPublicacion.appendChild(img);
    }

    // Audio
    if (audioUrl) {
        const audio = document.createElement('audio');
        audio.src = audioUrl;
        // audio.controls = true; //controles de reprodcción
        nuevaPublicacion.appendChild(audio);
    }

    // Video
    if (videoUrl) {
        const video = document.createElement('video');
        video.src = videoUrl;
        // video.controls = true; //controles de reprodcción
        video.style.maxWidth = '300px';  // pa ajustar el tamaño.  
        nuevaPublicacion.appendChild(video);
    }

    // Ponerlo en publicaciones
    document.getelementById('publicaciones').appendChild(nuevaPublicacion);

    // Limpia inputs  // Borra lo que estaba en los inputs al crear la publicación.
    document.getElementById('nombreUsuario').value = '';
    document.getElementById('contenidoPublicacion').value = '';
    document.getElementById('imgUrl').value = '';
    document.getElementById('audioUrl').value = '';
    document.getElementById('videoUrl').value = '';    

}