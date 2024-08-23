// Ejemplo de donde se obtiene la data
const publicationData = [
  {
    id: 1,
    title: "Publicación 1",
    description:
      "¡Hoy fue un día increíble en el Museo de Arte Moderno! 🎨✨ Pasé la mañana explorando exposiciones fascinantes y descubrí algunas obras que realmente me hicieron reflexionar. Desde las impresionantes esculturas abstractas hasta las coloridas pinturas contemporáneas, cada rincón del museo ofreció algo nuevo y emocionante.",
    username: "User_1",
    image: "/public/assets/ejemplos/27864905306_47b2f4895c_b.jpg",
    likes: 20,
    share: 5,
    comments: [
      {
        username: "User_2",
        image: "/public/assets/fotografa 1-perfil.png",
        text: "¡Qué maravilla! 😍",
      },
      {
        username: "User_3",
        image: "/public/assets/ejemplos/27864905306_47b2f4895c_b.jpg",
        text: "¡Qué envidia! La última vez que fui, la sección de pintura estaba cerrada por renovación. Gracias por compartir estas fotos, ¡se ven increíbles!",
      },
    ],
  },
];

// Función para crear el contenedor principal
function createPublicationContainer(publication) {
  const container = document.createElement("div");
  container.classList.add("publication-container");

  // Creamos el elemento para la descripción de la publicación
  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("publication-description");
  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = publication.description;
  descriptionDiv.appendChild(descriptionElement);

  // Creamos el elemento imagen
  const imageElement = document.createElement("img");
  imageElement.src = publication.image;
  imageElement.alt = "Publication Image";
  imageElement.classList.add("publication-image");

  // Creamos la sección de la publicación
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");

  // Creamos el elemento de nombre de usuario
  const usernameElement = document.createElement("div");
  usernameElement.classList.add("username");
  usernameElement.textContent = publication.username;

  // Creamos los botones
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-group");

  const likeButton = document.createElement("button");
  likeButton.classList.add("like-button");
  const likeImage = document.createElement("img");
  likeImage.src = "/public/assets/iconos/sparkles.png";
  likeImage.alt = "Like";
  likeButton.appendChild(likeImage);

  const likeNumber = document.createElement("div");
  likeNumber.classList.add("like-number");
  likeNumber.textContent = `${publication.likes}`;


  const shareButton = document.createElement("button");
  shareButton.classList.add("share-button");
  const shareImage = document.createElement("img");
  shareImage.src = "/public/assets/iconos/share.png";
  shareImage.alt = "Share";
  shareButton.appendChild(shareImage);

  const shareNumber = document.createElement("div");
  shareNumber .classList.add("share-number");
  shareNumber .textContent = `${publication.share}`;

  const editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  const editImage = document.createElement("img");
  editImage.src = "/public/assets/iconos/pen-field.png";
  editImage.alt = "edit";
  editButton.appendChild(editImage);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-Button");
  const deleteImage = document.createElement("img");
  deleteImage.src = "/public/assets/iconos/trash.png";
  deleteImage.alt = "edit";
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
        console.log('post eliminado')
      }
    });
  });

  buttonDiv.append(shareButton, shareNumber, likeButton,likeNumber);

  // if para verificar si la publicación es del usuario o no y mostrar los botones adecuados
  const currentUserUsername = "User_1"; //simulación, pero podemos usar un local storage más adelante para checar que usuario esta logeado

  if (publication.username === currentUserUsername) {
    buttonDiv.append(editButton, deleteButton);
  } else {
    editButton.style.display = "none";
    deleteButton.style.display = "none";
  }

  // Creamos la sección de comentarios
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

  // Creamos la sección de agregar comentario del usuario
  const commentSection = document.createElement("div");
  commentSection.classList.add("comment-section");

  // Creamos el elemento de entrada de texto para el comentario
  const commentInput = document.createElement("textarea");
  commentInput.classList.add("comment-input");
  commentInput.placeholder = "Escribe un comentario...";

  // Creamos el botón de enviar comentario
  const commentButton = document.createElement("button");
  commentButton.classList.add("comment-button");
  commentButton.textContent = "Comentar";

  // Agregamos los elementos de comentario al commentSection
  commentSection.appendChild(commentInput);
  commentSection.appendChild(commentButton);

  // Agregamos todos los elementos a nuestro div con append
  userInfo.appendChild(usernameElement);
  userInfo.appendChild(buttonDiv);
  container.append(
    imageElement,
    userInfo,
    descriptionDiv,
    commentsDiv,
    commentSection
  );

  return container;
}
// Función que simula cual publicación selecciono el usuario previamente para ver en pantalla
function getUserSelectedPublication() {
  return publicationData[0];
}

// Obtenemos el div publication-container y generamos el contenedor de la publicación que se debe mostrar
const publicationContainer = document.getElementById(
  "publication-main-container"
);
publicationContainer.appendChild(
  createPublicationContainer(getUserSelectedPublication())
);
