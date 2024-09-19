// Función para crear una tarjeta
function createCard(usuario, contenido, files = [], imageUrl = '', index, fechaCreacion = '') {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.index = index;

  let fileElements = '';

  Array.from(files).forEach(file => {
    const fileURL = typeof file === 'string' ? file : URL.createObjectURL(file);
    console.log('fileURL:', fileURL); // Verificar la URL del archivo
    if (file.type?.startsWith('image/') || fileURL.startsWith('blob:')) {
      fileElements += `<img src="${fileURL}" alt="Imagen" class="card-image">`;
    } else if (file.type?.startsWith('audio/')) {
      fileElements += `<audio src="${fileURL}" alt="audio" controls class="card-image"></audio>`;
    } else if (file.type?.startsWith('video/')) {
      fileElements += `<video src="${fileURL}" controls class="card-image"></video>`;
    }
  });

  card.innerHTML = `
  <div class="card-media">
    ${imageUrl ? `<img src="${imageUrl}" alt="Imagen" class="card-image">` : fileElements}
  </div>
  <div class="card-content">
    <div class="card-title">
      <span class="card-username">${usuario}</span>
      <div class="card-buttons">
        <button class="image-buttons edit-button hover-button">
          <img src="../../assets/iconos/pen-field.png" alt="edit">
        </button>
        <button class="image-buttons delete-button hover-button">
          <img src="../../assets/iconos/trash.png" alt="delete">
        </button>
        <button class="image-buttons hover-button">
          <img src="../../assets/iconos/sparkles.png" alt="Like">
        </button>
        <div class="like-number"></div>
        <button class="image-buttons hover-button">
          <img src="../../assets/iconos/share.png" alt="Share">
        </button>
      </div>
    </div>
    <div class="card-date">${fechaCreacion}</div> 
    <p class="card-description">${contenido}</p>
    <div class="edit-form" style="display: none;">
      <textarea class="edit-textarea">${contenido}</textarea>
      <button class="save-button">Guardar</button>
    </div>
  </div>
`;
  // Obtener los elementos que necesitan eventos
  const editButton = card.querySelector('.edit-button');
  const deleteButton = card.querySelector('.delete-button');
  const editForm = card.querySelector('.edit-form');
  const saveButton = card.querySelector('.save-button');
  const cardDescription = card.querySelector('.card-description');
  const editTextarea = card.querySelector('.edit-textarea');

  // Eventos de edición
  editButton.addEventListener('click', () => {
    editForm.style.display = editForm.style.display === 'none' ? 'block' : 'none';
  });

  saveButton.addEventListener('click', () => {
    const newContent = editTextarea.value;
    if (newContent.trim() !== '') {
      cardDescription.textContent = newContent;
      updatePublicationData(index, { description: newContent });
      editForm.style.display = 'none';
    }
  });

  // Evento de eliminación
  deleteButton.addEventListener('click', () => {
    Swal.fire({
      title: "¿Estás segur@?",
      text: "¡Una vez que elimines tu publicación no podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        card.remove(); //Eliminar la card
        deletePublicationData(index); //Eliminar del JSON
      }
    });
  });

  return card;
}

// Actualizar los datos de la publicación en el localStorage
function updatePublicationData(index, updatedData) {
  const publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
  if (index >= 0 && index < publicaciones.length) {
    publicaciones[index] = { ...publicaciones[index], ...updatedData };
    localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
  }
}

// Eliminar la publicación del localStorage
function deletePublicationData(index) {
  const publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
  if (index >= 0 && index < publicaciones.length) {
    publicaciones.splice(index, 1);
    localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
  }
}

// Función para agregar una nueva publicación y guardarla en el localStorage
function agregarNuevaPublicacion() {
  const usuario = "Usuario 1";
  const contenido = document.getElementById('formControl').value;
  const files = document.getElementById('fileInput').files;

  if (contenido.trim() === '') {
    alert('Por favor, ingresa algo para compartir.');
    return;
  }

  const publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];

  // Crear una lista de URLs para los archivos
  const fileURLs = Array.from(files).map(file => URL.createObjectURL(file));

  const fechaCreacion = new Date().toLocaleString(); // Captura la fecha y hora actual

  const nuevaPublicacion = {
    name: usuario,
    description: contenido,
    files: fileURLs,
    date: fechaCreacion // Guarda la fecha en el objeto
  };

  publicaciones.push(nuevaPublicacion);
  localStorage.setItem("publicaciones", JSON.stringify(publicaciones));

  // Crear la nueva tarjeta
  const card = createCard(usuario, contenido, files, '', publicaciones.length - 1, fechaCreacion);
  document.getElementById('card-container').appendChild(card);

  // Limpiar inputs
  document.getElementById('formControl').value = '';
  document.getElementById('fileInput').value = ''; 
  const previewContainer = document.getElementById('preview-container');
  previewContainer.innerHTML = ''; 
}

// Función para cargar las publicaciones desde el localStorage
function loadItemsFromLocalStorage() {
  const storageItems = localStorage.getItem("publicaciones");
  if (storageItems) {
    const publicaciones = JSON.parse(storageItems);
    publicaciones.forEach((publicacion, index) => {
      const card = createCard(publicacion.name, publicacion.description, publicacion.files, '', index, publicacion.date);
      document.getElementById('card-container').appendChild(card);
    });
  }
}

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

// Vincular la función al botón "Publicar"
document.getElementById('button-publicar').addEventListener('click', agregarNuevaPublicacion);

// Vincular el ícono de multimedia con el input de archivo
document.getElementById('iconAddPicture').addEventListener('click', function() {
  document.getElementById('fileInput').click();
});

// Vincular la función de previsualización al input de archivo
document.getElementById('fileInput').addEventListener('change', handleFilePreview);

