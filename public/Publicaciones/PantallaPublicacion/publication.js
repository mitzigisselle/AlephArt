// Ejemplo de donde se obtiene la data
const publicationData = [
  {
    id: 1,
    title: "Publicación 1",
    description: "Esta es la descripción de la publicación 1.",
    username: "User_1",
    image: "/public/assets/ejemplos/27864905306_47b2f4895c_b.jpg",
    likes: 0,
    comments: [
      {
        username: "User_2",
        image: "/public/assets/ejemplos/27864905306_47b2f4895c_b.jpg",
        text: "This is a comment on Publication 1.",
      },
      {
        username: "User_3",
        image: "/public/assets/ejemplos/27864905306_47b2f4895c_b.jpg",
        text: "Another comment on Publication 1.",
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

  // Creamos la sección de comentarios
  const commentsDiv = document.createElement("div");
  commentsDiv.classList.add("comments");
  publication.comments.forEach((comment) => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    const avatarElement = document.createElement("img");
    avatarElement.src = publication.image;
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

  // Agregamos todos los elementos a nuestro div con append
  container.append(descriptionDiv, imageElement,commentsDiv );

  return container;
}
// Función que simula cual publicación selecciono el usuario previamente para ver en pantalla
function getUserSelectedPublication() {
  return publicationData[0];
}

// Obtenemos el div publication-container y generamos el contenedor de la publicación que se debe mostrar
const publicationContainer = document.getElementById("publication-main-container");
publicationContainer.appendChild(createPublicationContainer(getUserSelectedPublication()));