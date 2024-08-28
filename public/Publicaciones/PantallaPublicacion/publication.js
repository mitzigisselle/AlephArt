// Datos de publicación simulados
const publicationData = [
  {
    id: 1,
    title: "Publicación 1",
    description: "🎨✨ ¡Acabo de terminar esta obra y no podría estar más satisfecha con el resultado! Cada pincelada ha sido una expresión de mi pasión y dedicación, y ver el producto final me llena de orgullo.",
    username: "User_1",
    image: "../../assets/imgPublicaciones/1.jpg",
    likes: 20,
    share: 5,
    comments: [
      {
        username: "User_2",
        image: "../../assets/fotografa 1-perfil.png",
        text: "¡Qué maravilla! 😍",
      },
      {
        username: "User_3",
        image: "../../assets/ejemplos/27864905306_47b2f4895c_b.jpg",
        text: "💖",
      },
    ],
  },
];

// Función para crear el contenedor principal
function createPublicationContainer(publication) {
  const container = document.createElement("div");
  container.classList.add("publication-container");

  // Descripción de la publicación
  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("publication-description");

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = publication.description;

  const editDescriptionTextarea = document.createElement("textarea");
  editDescriptionTextarea.classList.add("edit-description-textarea");
  editDescriptionTextarea.value = publication.description;
  editDescriptionTextarea.style.display = "none"; // Oculto por defecto

  const saveButton = document.createElement("button");
  saveButton.classList.add("save-button");
  saveButton.textContent = "Guardar Cambios";
  saveButton.style.display = "none"; // Oculto inicialmente

  descriptionDiv.appendChild(descriptionElement);
  descriptionDiv.appendChild(editDescriptionTextarea);

  // Imagen de la publicación
  const imageElement = document.createElement("img");
  imageElement.src = publication.image;
  imageElement.alt = "Publication Image";
  imageElement.classList.add("publication-image");

  // Información del usuario y botones
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");
  const usernameElement = document.createElement("div");
  usernameElement.classList.add("username");
  usernameElement.textContent = publication.username;

  // Botones de interacción
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-group");

  const likeButton = document.createElement("button");
  likeButton.classList.add("like-button");
  const likeImage = document.createElement("img");
  likeImage.src = "../../assets/iconos/sparkles.png";
  likeImage.alt = "Like";
  likeButton.appendChild(likeImage);

  const likeNumber = document.createElement("div");
  likeNumber.classList.add("like-number");
  likeNumber.textContent = `${publication.likes}`;

  const shareButton = document.createElement("button");
  shareButton.classList.add("share-button");
  const shareImage = document.createElement("img");
  shareImage.src = "../../assets/iconos/share.png";
  shareImage.alt = "Share";
  shareButton.appendChild(shareImage);

  const shareNumber = document.createElement("div");
  shareNumber.classList.add("share-number");
  shareNumber.textContent = `${publication.share}`;

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

  editButton.addEventListener("click", () => {
    // Mostrar/ocultar el textarea de edición
    const isEditing = editDescriptionTextarea.style.display === "block";
    if (isEditing) {
      // Guardar cambios y actualizar la publicación
      publication.description = editDescriptionTextarea.value;
      descriptionElement.textContent = publication.description;
      editDescriptionTextarea.style.display = "none";
      descriptionElement.style.display = "block";
      saveButton.style.display = "none"; // Ocultar el botón "Guardar Cambios"
      savePublicationData(); // Actualiza el archivo JSON
    } else {
      // Mostrar textarea para edición
      descriptionElement.style.display = "none";
      editDescriptionTextarea.style.display = "block";
      saveButton.style.display = "inline-block"; // Mostrar el botón "Guardar Cambios"
      editDescriptionTextarea.focus();
    }
  });
  // Guardar cambios al hacer clic en el botón "Guardar Cambios"
  saveButton.addEventListener("click", () => {
    publication.description = editDescriptionTextarea.value;
    descriptionElement.textContent = publication.description;
    editDescriptionTextarea.style.display = "none";
    descriptionElement.style.display = "block";
    saveButton.style.display = "none"; // Ocultar el botón "Guardar Cambios"
    savePublicationData(); // Actualiza el archivo JSON
  });

  buttonDiv.append(shareButton, shareNumber, likeButton, likeNumber, editButton, deleteButton);

  // Mostrar botones de edición y eliminación solo si es el usuario actual
  const currentUserUsername = "User_1";
  if (publication.username === currentUserUsername) {
    buttonDiv.append(editButton, deleteButton);
  } else {
    editButton.style.display = "none";
    deleteButton.style.display = "none";
  }

  // Sección de comentarios
  const commentsDiv = document.createElement("div");
  commentsDiv.classList.add("comments");
  publication.comments.forEach((comment) => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    const avatarElement = document.createElement("img");
    avatarElement.src = comment.image;
    avatarElement.alt = "User Avatar";
    avatarElement.classList.add("comment-avatar");
    const commentContentDiv = document.createElement("div");
    commentContentDiv.classList.add("comment-content");
    const commentUsernameElement = document.createElement("div");
    commentUsernameElement.classList.add("comment-username");
    commentUsernameElement.textContent = comment.username;
    const commentTextElement = document.createElement("div");
    commentTextElement.classList.add("comment-text");
    commentTextElement.textContent = comment.text;
    commentContentDiv.appendChild(commentUsernameElement);
    commentContentDiv.appendChild(commentTextElement);
    commentDiv.appendChild(avatarElement);
    commentDiv.appendChild(commentContentDiv);
    commentsDiv.appendChild(commentDiv);
  });

  // Sección para agregar un nuevo comentario
  const commentSection = document.createElement("div");
  commentSection.classList.add("comment-section");

  const commentInput = document.createElement("textarea");
  commentInput.classList.add("comment-input");
  commentInput.placeholder = "Escribe un comentario...";

  const commentButton = document.createElement("button");
  commentButton.classList.add("comment-button");
  commentButton.textContent = "Comentar";
  commentButton.addEventListener("click", () => {
    const newComment = {
      username: currentUserUsername,
      image: "../../assets/fotografa 1-perfil.png",
      text: commentInput.value
    };
    publication.comments.push(newComment);
    updatePublicationContainer(container, publication);
    commentInput.value = ''; // Limpiar el campo de comentario
    savePublicationData(); // Actualiza el archivo JSON
  });

  commentSection.appendChild(commentInput);
  commentSection.appendChild(commentButton);

  userInfo.appendChild(usernameElement);
  userInfo.appendChild(buttonDiv);
  container.append(imageElement, userInfo, descriptionDiv, saveButton, commentsDiv, commentSection);

  return container;
}

// Función para actualizar el contenedor de la publicación
function updatePublicationContainer(container, publication) {
  const commentsDiv = container.querySelector(".comments");
  commentsDiv.innerHTML = ''; // Limpiar comentarios existentes

  publication.comments.forEach((comment) => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    const avatarElement = document.createElement("img");
    avatarElement.src = comment.image;
    avatarElement.alt = "User Avatar";
    avatarElement.classList.add("comment-avatar");
    const commentContentDiv = document.createElement("div");
    commentContentDiv.classList.add("comment-content");
    const commentUsernameElement = document.createElement("div");
    commentUsernameElement.classList.add("comment-username");
    commentUsernameElement.textContent = comment.username;
    const commentTextElement = document.createElement("div");
    commentTextElement.classList.add("comment-text");
    commentTextElement.textContent = comment.text;
    commentContentDiv.appendChild(commentUsernameElement);
    commentContentDiv.appendChild(commentTextElement);
    commentDiv.appendChild(avatarElement);
    commentDiv.appendChild(commentContentDiv);
    commentsDiv.appendChild(commentDiv);
  });
}

// Función que simula la selección de la publicación del usuario
function getUserSelectedPublication() {
  return publicationData[0];
}
// Función para renderizar publicaciones (Muestra publicaciones)
function renderPublications() {
  const publicationsContainer = document.getElementById("publications-container"); //Contenedor donde se muestran todas las publicaciones
  publicationsContainer.innerHTML = ""; // Limpiar publicaciones existentes

  publicationData.forEach((publication) => { //Iteración sobre cada publicación
    const container = createPublicationContainer(publication);
    publicationsContainer.appendChild(container);
  });
}
// Obtenemos el div publication-container y generamos el contenedor de la publicación que se debe mostrar
const publicationContainer = document.getElementById("publication-main-container");//Contenedor principal de una publicación en específico
const publication = getUserSelectedPublication();
const publicationElement = createPublicationContainer(publication);
publicationContainer.appendChild(publicationElement);

function savePublicationData() {
  fetch('/savePublicationData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(publicationData),
  })
  .then(response => response.text())
  .then(data => {
    console.log(data); // Mensaje de éxito del servidor
  })
  .catch(error => {
    console.error('Error al guardar los datos:', error);
  });
}

// Llamada para guardar los datos (puedes vincular esto a un botón si lo prefieres)
savePublicationData();
