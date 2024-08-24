/*Funciones para formulario para crear publicaciones*/

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
  
  /*Terminan funciones para formulario para crear publicaciones*/
  
  
  
  // script.js
  
  function createCard(imageSrc, title, description, buttonImages) {
    const card = document.createElement('div');
    card.classList.add('card');
  
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = title;
    img.classList.add('card-image');
  
    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
  
    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = title;
  
    const cardDescription = document.createElement('p');
    cardDescription.classList.add('card-description');
    cardDescription.textContent = description;
  
    const imageButtons = document.createElement('div');
    imageButtons.classList.add('image-buttons');
  
    buttonImages.forEach(({ src, reactions }) => {
        const button = document.createElement('button');
        button.classList.add('image-button');
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Button image';
        const reactionCount = document.createElement('span');
        reactionCount.classList.add('reaction-count');
        reactionCount.textContent = reactions;
  
        button.appendChild(img);
        button.appendChild(reactionCount);
        imageButtons.appendChild(button);
    });
  
    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardDescription);
    cardContent.appendChild(imageButtons);
    card.appendChild(img);
    card.appendChild(cardContent);
  
    return card;
  }
  
  const cardContainer = document.getElementById('card-container');
  
  // Lista de imágenes, títulos y descripciones
  const images = [
    '../../../assets/imgPublicaciones/1.jpg',
    '../../../assets/imgPublicaciones/2.jpg',
    '../../../assets/imgPublicaciones/3.jpg',
    '../../../assets/imgPublicaciones/4.jpg',
    '../../../assets/imgPublicaciones/5.jpg',
    '../../../assets/imgPublicaciones/6.jpg',
    '../../../assets/imgPublicaciones/7.jpg',
    '../../../assets/imgPublicaciones/8.jpg',
    '../../../assets/imgPublicaciones/9.jpg',
    '../../../assets/imgPublicaciones/10.jpg'
  ];
  
  const titles = [
    'Usuario 1',
    'Usuario 2',
    'Usuario 3',
    'Usuario 4',
    'Usuario 5',
    'Usuario 6',
    'Usuario 7',
    'Usuario 8',
    'Usuario 9',
    'Usuario 10'
  ];
  
  const descriptions = [
    '"🎨✨ ¡Acabo de terminar esta obra y no podría estar más satisfecho/a con el resultado! Cada pincelada ha sido una expresión de mi pasión y dedicación, y ver el producto final me llena de orgullo."',
    '“Preparándome para capturar el momento perfecto 📸✨”',
    '“Un verdadero tesoro del pasado que cuenta historias y conecta con la historia de manera única. ¡Increíble!”',
    '“¡La música cobra vida en mis manos! 🎸✨”',
    '“Sumergido en la magia del concierto, rodeado de buena música y grandes vibraciones. ¡Una noche inolvidable llena de ritmo y emoción! 🎶✨”',
    '“Dejando que las cuerdas del violín cuenten mi historia. 🎻✨ ¡Cada nota es un viaje musical que disfruto al máximo!”',
    '“Perdiéndome en el ritmo y las melodías de la guitarra. 🎸✨ Cada acorde es una expresión de pasión y creatividad. ¡Así es como vivo la música!”',
    '“Explorando el arte a través de formas y texturas. 🗿✨ Cada escultura es una obra maestra que inspira y cuenta una historia. ¡Un deleite para los sentidos!”',
    '“Preparándome para capturar el momento perfecto. 📸✨ ¡Listo para inmortalizar esta instantánea y convertirla en un recuerdo!”',
    '“Preparado para dar vida a un lienzo en blanco. 🎨✨ ¡Pronto empezarán a surgir colores y formas que transformarán esta obra!”'
  ];
  
  // Crear y agregar 10 tarjetas con imágenes, títulos y descripciones únicas
  for (let i = 0; i < 10; i++) {
    const newCard = createCard(
        images[i], // Imagen específica para cada tarjeta
        titles[i], // Título específico para cada tarjeta
        descriptions[i], // Descripción específica para cada tarjeta
        [
            { src: '../../assets/iconos/meeting.png', reactions: 12 },
            { src: '../../assets/iconos/share.png', reactions: 7 },
            { src: '../../assets/iconos/sparkles.png', reactions: 25 }
        ]
    );
    cardContainer.appendChild(newCard);
  }
  