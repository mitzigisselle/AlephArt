// Función para crear una tarjeta
function createCard(usuario, contenido, files = [], buttonImages = [], imageUrl = '') {
  const card = document.createElement('div');
  card.classList.add('card');

  // Nombre del usuario
  const cardUser = document.createElement('div'); //Contenedor
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
      card.appendChild(cardImage); // Se agrega en la card
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
              card.appendChild(element); // Si hay un archivo, se agrega en la card
          }
      });
  }

  
  // Botones en la misma línea que el nombre de usuario
  const imageButtons = document.createElement('div');
  imageButtons.classList.add('image-buttons');

   const likeButton = document.createElement("button");
   likeButton.classList.add("like-button");
   const likeImage = document.createElement("img");
   likeImage.src = "../../assets/iconos/sparkles.png";
   likeImage.alt = "Like";
   likeButton.appendChild(likeImage);
 
   const likeNumber = document.createElement("div");
   likeNumber.classList.add("like-number");
   //likeNumber.textContent = `${publication.likes}`;
 
   const shareButton = document.createElement("button");
   shareButton.classList.add("share-button");
   const shareImage = document.createElement("img");
   shareImage.src = "../../assets/iconos/share.png";
   shareImage.alt = "Share";
   shareButton.appendChild(shareImage);
 
   const shareNumber = document.createElement("div");
   shareNumber.classList.add("share-number");
   //shareNumber.textContent = `${publication.share}`;
 
   const editButton = document.createElement("button");
   editButton.classList.add("edit-button");
   const editImage = document.createElement("img");
   editImage.src = "../../assets/iconos/pen-field.png";
   editImage.alt = "edit";
   editButton.appendChild(editImage);
 
   const deleteButton = document.createElement("button");
   deleteButton.classList.add("delete-button");
   const deleteImage = document.createElement("img");
   deleteImage.src = "../../assets/iconos/trash.png";
   deleteImage.alt = "delete";
   deleteButton.appendChild(deleteImage);
 
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
         // Eliminar la publicación
         const index = publicationData.indexOf(publication);
         if (index !== -1) {
           publicationData.splice(index, 1);
           savePublicationData(); // Actualiza el archivo JSON
           container.remove(); // Elimina el contenedor del DOM
         }
       }
     });
   });

   
   imageButtons.append(shareButton, shareNumber, likeButton, likeNumber, editButton, deleteButton);

/*
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

  */
  // Añadir elementos a la tarjeta
  cardUser.appendChild(usuarioElement);
  cardContent.appendChild(cardUser); // Añadir el usuario antes del contenido
  cardContent.appendChild(cardDescription);
  cardUser.appendChild(imageButtons);
  card.appendChild(cardContent);

  return card;
}

// Función para agregar una nueva publicación y guardarla en el localStorage
function agregarNuevaPublicacion() {
  const usuario = "Usuario 1"; // Nombre de Usuario
  const contenido = document.getElementById('formControl').value; //Información obtenida del TextArea
  const files = document.getElementById('fileInput').files;
  const buttonImages = [
      { src: '/public/assets/iconos/meeting.png', reactions: 12 },
      { src: '/public/assets/iconos/share.png', reactions: 7 },
      { src: '/public/assets/iconos/sparkles.png', reactions: 25 },
      { src: '/public/assets/iconos/pen-field.png', reactions: 25 },
      { src: '/public/assets/iconos/trash.png', reactions: 25 },

  ];

  if (contenido.trim() === '') {  //Si no escribe nada
      alert('Por favor, ingresa algo para compartir.');
      return;
  }

  // Crear la nueva tarjeta
  const nuevaCard = createCard(usuario, contenido, files, buttonImages);
  document.getElementById('card-container').appendChild(nuevaCard);

  // Guardar en el localStorage
  const newItem = {
      name: usuario,
      img: files.length > 0 ? URL.createObjectURL(files[0]) : '',
      description: contenido
  };
  const items = JSON.parse(localStorage.getItem("items")) || [];
  items.push(newItem);
  localStorage.setItem("items", JSON.stringify(items));

  // Limpiar inputs
  document.getElementById('formControl').value = '';
  document.getElementById('fileInput').value = ''; // Limpiar input de archivo
  const previewContainer = document.getElementById('preview-container');
  previewContainer.innerHTML = ''; // Limpiar el contenedor de previsualización
}

// Función para cargar las publicaciones desde el localStorage
function loadItemsFromLocalStorage() {
  const storageItems = localStorage.getItem("items");
  if (storageItems) {
      const items = JSON.parse(storageItems);
      items.forEach(item => {
          const card = createCard(item.name, item.description, [], [], item.img);
          document.getElementById('card-container').appendChild(card);
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
document.addEventListener('DOMContentLoaded', loadItemsFromLocalStorage);

