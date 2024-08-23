
let publicaciones = [];


function crearPublicación() {

    // Valores inputs
    const nombre = document.getElementById('nombreUsuario').value;
    const contenido = document.getElementById('contenidoPublicacion').value;
    const imgUrl = document.getElementById('imgUrl').value;
    const audioUrl = document.getElementById('audioUrl').value;
    const videoUrl = document.getElementById('videoUrl').value;
    const fechaCreacion = new Date();

    // Validación
    if (nombre === '' || contenido === '') {
        alert('Campos vacíos. Plis ingresa nombre/contenido a la publicación');
        return;
    }

    // Crear objeto publicación
    const nuevaPublicacion = {
        nombre: nombre,
        contenido: contenido,
        imgUrl: imgUrl,
        audioUrl: audioUrl,
        videoUrl: videoUrl,
        fechaCreacion: fechaCreacion
    };

    // Añade a la lista  // Ordene cronológico
    publicaciones.push(nuevaPublicacion);
    publicaciones.sort((a, b) => b.fechaCreacion - a.fechaCreacion);

    // Llama a función de renderizado para actualizar y mostrr todas las publicaciones en el contenedor
    renderPublicacion();

    // Limpia inputs  // Borra lo que estaba en los inputs al crear la publicación.
    document.getElementById('nombreUsuario').value = '';
    document.getElementById('contenidoPublicacion').value = '';
    document.getElementById('imgUrl').value = '';
    document.getElementById('audioUrl').value = '';
    document.getElementById('videoUrl').value = '';  

}


function renderPublicacion() {

    // Limpia contenido anterior antes de renderización
    const publicacionesContainer = document.getElementById('publicaciones');
    publicacionesContainer.innerHTML = ''; 


    // Iterar sobre el array de publicaciones para mosrtar. Para cada publicación se crea un nuevo div.
    publicaciones.forEach((publicacion) => {
        //Crea div
        const publicacionDiv = document.createElement('div');
        publicacionDiv.classList.add('publicacion');

        // Añade texto (nombre, contenido, fechacreación
        const fechaFormat = publicacion.fechaCreacion.toLocaleString(); // toLocaleString() pone por default la zona en la que estamos
        publicacionDiv.innerHTML = `<h3>>Publicación de ${publicacion.nombre}</h3>
                                    <p>${publicacion.contenido}</p>
                                    <small>Publicado el: ${fechaFormat}</small>`;

        // Imagen (si hay)
        if (publicacion.imgUrl) {
            const img = document.createElement('img');
            img.src = publicacion.imgUrl;
            // img.alt = `Imagen de publicación`;
            img.style.maxWidth = '200px';  // pa ajustar el tamaño.
            publicacionDiv.appendChild(img);
        }

        
        // Audio (si hay)
        if (publicacion.audioUrl) {
            const audio = document.createElement('audio');
            audio.src = publicacion.audioUrl;
            // audio.controls = true; //controles de reprodcción
            publicacionDiv.appendChild(audio);
        }


        // Video (si hay)
        if (publicacion.videoUrl) {
            const video = document.createElement('video');
            video.src = publicacion.videoUrl;
            // video.controls = true; //controles de reprodcción
            video.style.maxWidth = '300px';  // pa ajustar el tamaño.  
            publicacionDiv.appendChild(video);
        }
        
        // Añade div de publicación al contenedor principal  // Agrega cada publicación a la lista en pantalla.
        publicacionesContainer.appendChild(publicacionDiv);

    });

}

