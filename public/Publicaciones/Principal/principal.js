// Función para crear una tarjeta
function createCard(usuario, contenido, files = [], imageUrl = '', index, fechaCreacion = '') {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.index = index;

  let fileElements = '';

  files.forEach(file => {
    if (file.startsWith('data:image/')) {
      fileElements += `<img src="${file}" alt="Imagen" class="card-image">`;
    } else if (file.startsWith('data:audio/')) {
      fileElements += `<audio src="${file}" controls class="card-image"></audio>`;
    } else if (file.startsWith('data:video/')) {
      fileElements += `<video src="${file}" controls class="card-image"></video>`;
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
        <button class="image-buttons comment-button hover-button">
          <img src="../../assets/iconos/meeting.png" alt="Comentar"> 
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
  const commentButton = card.querySelector('.comment-button'); //Se añade botón para comentar

  //Se añade evento para redirigir a comentarios
commentButton.addEventListener('click', () => {
  window.location.href = `/Publicaciones/PantallaPublicacion/pantallaPublicacion.html?index=${index}`;
});

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

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
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
async function agregarNuevaPublicacion() {
  const usuario = "Usuario 1";
  const contenido = document.getElementById('formControl').value;
  const files = document.getElementById('fileInput').files;

  if (contenido.trim() === '') {
    alert('Por favor, ingresa algo para compartir.');
    return;
  }

  const publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];

  // Convertir archivos a base64
  const filePromises = Array.from(files).map(file => fileToBase64(file));
  const fileBase64 = await Promise.all(filePromises);

  const fechaCreacion = new Date().toLocaleString();

  const nuevaPublicacion = {
    name: usuario,
    description: contenido,
    files: fileBase64,
    date: fechaCreacion
  };

  publicaciones.push(nuevaPublicacion);
  localStorage.setItem("publicaciones", JSON.stringify(publicaciones));

  // Crear la nueva tarjeta
  const card = createCard(usuario, contenido, fileBase64, '', publicaciones.length - 1, fechaCreacion);
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
// Modificar la función handleFilePreview para usar base64
async function handleFilePreview(event) {
  const fileInput = event.target;
  const files = fileInput.files;
  const previewContainer = document.getElementById('preview-container');

  previewContainer.innerHTML = '';

  for (const file of files) {
    const fileBase64 = await fileToBase64(file);
    let element;

    if (file.type.startsWith('image/')) {
      element = document.createElement('img');
      element.src = fileBase64;
      element.alt = 'Imagen';
      element.style.maxWidth = '200px';
      element.classList.add('img-preview');
    } else if (file.type.startsWith('audio/')) {
      element = document.createElement('audio');
      element.src = fileBase64;
      element.controls = true;
      element.classList.add('audio-preview');
    } else if (file.type.startsWith('video/')) {
      element = document.createElement('video');
      element.src = fileBase64;
      element.controls = true;
      element.style.maxWidth = '300px';
      element.classList.add('video-preview');
    }

    if (element) {
      previewContainer.appendChild(element);
    }
  }
}

document.getElementById('button-publicar').addEventListener('click', async () => {
  await agregarNuevaPublicacion();
});

// Vincular el ícono de multimedia con el input de archivo
document.getElementById('iconAddPicture').addEventListener('click', function() {
  document.getElementById('fileInput').click();
});

// Vincular la función de previsualización al input de archivo
document.getElementById('fileInput').addEventListener('change', handleFilePreview);

// Cargar las publicaciones al cargar la página
document.addEventListener('DOMContentLoaded', loadItemsFromLocalStorage); //Recarga la página y muestra las publicaciones guardadas
