// Función para crear una tarjeta
function createCard(contenido, files, buttonImages) {
  const card = document.createElement('div');
  card.classList.add('card');

  // Contenido de la tarjeta
  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

  // Descripción de la tarjeta
  const cardDescription = document.createElement('p');
  cardDescription.classList.add('card-description');
  cardDescription.textContent = contenido;

  // Botones de la tarjeta
  const imageButtons = document.createElement('div');
  imageButtons.classList.add('image-buttons');

  buttonImages.forEach(({ src, reactions }) => {
    const button = document.createElement('button');
    button.classList.add('image-button');
    const buttonImg = document.createElement('img');
    buttonImg.src = src;
    buttonImg.alt = 'Button image';
    const reactionCount = document.createElement('span');
    reactionCount.classList.add('reaction-count');
    reactionCount.textContent = reactions;

    button.appendChild(buttonImg);
    button.appendChild(reactionCount);
    imageButtons.appendChild(button);
  });

  // Procesar archivos seleccionados
Array.from(files).forEach(file => {
  const fileURL = URL.createObjectURL(file);
  let element;

  if (file.type.startsWith('image/')) {
    element = document.createElement('img');
    element.src = fileURL;
    element.alt = 'Imagen';
    element.style.maxWidth = '700px';
    element.classList.add('card-image');
  } else if (file.type.startsWith('audio/')) {
    element = document.createElement('audio');
    element.src = fileURL;
    element.controls = true;
    element.classList.add('card-image');
  } else if (file.type.startsWith('video/')) {
    element = document.createElement('video');
    element.src = fileURL;
    element.controls = true;
    element.style.maxWidth = '300px';
    element.classList.add('card-image');
  }

  if (element) {
    cardContent.appendChild(element);
  }
});

  // Añadir elementos a la tarjeta
  cardContent.appendChild(cardDescription);
  cardContent.appendChild(imageButtons);
  card.appendChild(cardContent);

  return card;
}

// Función para agregar una nueva publicación
function agregarNuevaPublicacion() {
  const contenido = document.getElementById('formControl').value;
  const files = document.getElementById('fileInput').files;
  const buttonImages = [
    
    { src: '../../assets/iconos/meeting.png', reactions: 12 },
    { src: '../../assets/iconos/share.png', reactions: 7 },
    { src: '../../assets/iconos/sparkles.png', reactions: 25 }
  ];

  if (contenido.trim() === '') {
    alert('Por favor, ingresa algo para compartir.');
    return;
  }

  const nuevaCard = createCard(contenido, files, buttonImages);
  document.getElementById('card-container').appendChild(nuevaCard);
  // Insertar la nueva tarjeta al principio del contenedor
  //const cardContainer = document.getElementById('card-container');
  //cardContainer.insertBefore(nuevaCard, cardContainer.firstChild);

  // Limpiar inputs
  document.getElementById('formControl').value = '';
  document.getElementById('fileInput').value = ''; // Limpiar input de archivo
  // Limpiar el contenedor de previsualización
  const previewContainer = document.getElementById('preview-container');
  previewContainer.innerHTML = '';
}

// Vincular la función al botón "Publicar"
document.getElementById('button-publicar').addEventListener('click', agregarNuevaPublicacion);

// Vincular el ícono de multimedia con el input de archivo
document.getElementById('iconAddPicture').addEventListener('click', function() {
  document.getElementById('fileInput').click();
});


// Función para mostrar previsualización de archivos seleccionados
function handleFilePreview(event) {
  const fileInput = event.target;
  const files = fileInput.files;
  const previewContainer = document.getElementById('preview-container');

  // Limpiar el contenedor de previsualización
  previewContainer.innerHTML = '';

  Array.from(files).forEach(file => {
    const fileURL = URL.createObjectURL(file);
    let element;

    if (file.type.startsWith('image/')) {
      element = document.createElement('img');
      element.src = fileURL;
      element.alt = 'Imagen';
      element.style.maxWidth = '200px';
      element.classList.add('img-preview');
    } else if (file.type.startsWith('audio/')) {
      element = document.createElement('audio');
      element.src = fileURL;
      element.controls = true;
      element.classList.add('audio-preview');
    } else if (file.type.startsWith('video/')) {
      element = document.createElement('video');
      element.src = fileURL;
      element.controls = true;
      element.style.maxWidth = '300px';
      element.classList.add('video-preview');
    }

    if (element) {
      previewContainer.appendChild(element);
    }
  });
}

// Vincular la función de previsualización al input de archivo
document.getElementById('fileInput').addEventListener('change', handleFilePreview);
