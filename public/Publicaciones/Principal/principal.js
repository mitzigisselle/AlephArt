// Función para crear una tarjeta
function createCard(usuario, contenido, files = [], imageUrl = '', index) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.index = index; // Asignar el índice de la publicación

  // Nombre del usuario
  const cardUser = document.createElement('div');
  cardUser.classList.add('card-title');

  const usuarioElement = document.createElement('span');
  usuarioElement.textContent = usuario;

  // Contenido de la tarjeta
  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

  // Descripción de la tarjeta
  const cardDescription = document.createElement('p');
  cardDescription.classList.add('card-description');
  cardDescription.textContent = contenido;

  // Procesar archivos seleccionados o URL de la imagen
  if (imageUrl) {
    const cardImage = document.createElement('img');
    cardImage.src = imageUrl;
    cardImage.alt = 'Imagen';
    cardImage.classList.add('card-image');
    card.appendChild(cardImage);
  } else {
    Array.from(files).forEach(file => {
      const fileURL = URL.createObjectURL(file);
      let element;

      if (file.type.startsWith('image/')) {
        element = document.createElement('img');
        element.src = fileURL;
        element.alt = 'Imagen';
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
        element.classList.add('card-image');
      }

      if (element) {
        card.appendChild(element);
      }
    });
  }

  // Botones en la misma línea que el nombre de usuario
  const imageButtons = document.createElement('div');
  imageButtons.classList.add('image-buttons');

  const likeButton = document.createElement("button");
  likeButton.classList.add("image-buttons");
  const likeImage = document.createElement("img");
  likeImage.src = "../../assets/iconos/sparkles.png";
  likeImage.alt = "Like";
  likeButton.appendChild(likeImage);

  const likeNumber = document.createElement("div");
  likeNumber.classList.add("like-number");

  const shareButton = document.createElement("button");
  shareButton.classList.add("image-buttons");
  const shareImage = document.createElement("img");
  shareImage.src = "../../assets/iconos/share.png";
  shareImage.alt = "Share";
  shareButton.appendChild(shareImage);

  const shareNumber = document.createElement("div");
  shareNumber.classList.add("image-buttons");

  const editButton = document.createElement("button");
  editButton.classList.add("image-buttons");
  const editImage = document.createElement("img");
  editImage.src = "../../assets/iconos/pen-field.png";
  editImage.alt = "edit";
  editButton.appendChild(editImage);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("image-buttons");
  const deleteImage = document.createElement("img");
  deleteImage.src = "../../assets/iconos/trash.png";
  deleteImage.alt = "delete";
  deleteButton.appendChild(deleteImage);

  // Editar
  const editForm = document.createElement('div');
  editForm.classList.add('edit-form');
  editForm.style.display = 'none'; // Inicialmente oculto

  const editTextarea = document.createElement('textarea');
  editTextarea.value = contenido;
  editTextarea.classList.add('edit-textarea');

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Guardar';
  saveButton.classList.add('save-button');
  //Guardar cambios
  saveButton.addEventListener('click', () => {
    const newContent = editTextarea.value;
    if (newContent.trim() !== '') {
      cardDescription.textContent = newContent;
      updatePublicationData(index, { description: newContent });
      editForm.style.display = 'none'; // Ocultar formulario después de guardar
    } 
  });

  editForm.appendChild(editTextarea);
  editForm.appendChild(saveButton);

  editButton.addEventListener('click', () => {
    if (editForm.style.display === 'none') {
      editForm.style.display = 'block'; // Mostrar formulario
    } else {
      editForm.style.display = 'none'; // Ocultar formulario si ya está visible
    }
  });

  deleteButton.addEventListener("click", () => {
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
        card.remove(); // Elimina la tarjeta del DOM
        deletePublicationData(index); // Elimina la publicación del almacenamiento
      }
    });
  });

  imageButtons.append(shareButton, shareNumber, likeButton, likeNumber, editButton, deleteButton);
  cardContent.appendChild(editForm); // Añadir formulario al contenido

  // Añadir elementos a la tarjeta
  cardUser.appendChild(usuarioElement);
  cardContent.appendChild(cardUser); // Añadir el usuario antes del contenido
  cardContent.appendChild(cardDescription);
  cardUser.appendChild(imageButtons);
  card.appendChild(cardContent);

  return card;
}

// Actualizar los datos de la publicación en el localStorage
function updatePublicationData(index, updatedData) {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  if (index >= 0 && index < items.length) {
    items[index] = { ...items[index], ...updatedData };
    localStorage.setItem("items", JSON.stringify(items));
  }
}

// Eliminar la publicación del localStorage
function deletePublicationData(index) {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  if (index >= 0 && index < items.length) {
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
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

  const items = JSON.parse(localStorage.getItem("items")) || []; //Recupera los items en el localStorage, JSON -> array, array vacío
  const newItem = {  //Se crea un objeto
      name: usuario,
      img: files.length > 0 ? URL.createObjectURL(files[0]) : '', //Se crea una URL temporal
      description: contenido
  };
  items.push(newItem);
  localStorage.setItem("items", JSON.stringify(items)); //Convierte array -> JSON

  // Crear la nueva tarjeta
  const nuevaCard = createCard(usuario, contenido, files, files.length > 0 ? URL.createObjectURL(files[0]) : '', items.length - 1);
  document.getElementById('card-container').appendChild(nuevaCard);

  // Limpiar inputs
  document.getElementById('formControl').value = '';
  document.getElementById('fileInput').value = ''; 
  const previewContainer = document.getElementById('preview-container');
  previewContainer.innerHTML = ''; 
}

// Función para cargar las publicaciones desde el localStorage
function loadItemsFromLocalStorage() {
  const storageItems = localStorage.getItem("items"); //Obtiene JSON
  if (storageItems) { //Si se recupera los objetos
      const items = JSON.parse(storageItems); //JSON -> array
      items.forEach((item, index) => { //Se itera sobre cada item (objeto, posición)
          const card = createCard(item.name, item.description, [], [], item.img, index);
          document.getElementById('card-container').appendChild(card); //Agrega la card al contenedor
      });
  }
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

// Cargar las publicaciones al cargar la página
document.addEventListener('DOMContentLoaded', loadItemsFromLocalStorage); //Recarga la página y muestra las publicaciones guardadas
