// Obtener el índice de la publicación desde la URL
const urlParams = new URLSearchParams(window.location.search);
const index = urlParams.get('index');

// Event Listener para cargar los eventos al inicio
document.addEventListener('DOMContentLoaded', () => {
  loadPublicationFromLocalStorage(index);
});

// Cargar la publicación específica desde el localStorage
function loadPublicationFromLocalStorage(index) {
  const publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
  if (index >= 0 && index < publicaciones.length) {
    const publicacion = publicaciones[index];
    const fileURLs = publicacion.files;
    const usuario = publicacion.name;
    const fechaCreacion = publicacion.date;
    const contenido = publicacion.description;
    const comentarios = publicacion.comments || [];

    const cardPublicacion = document.getElementById('publication-main-container');
    cardPublicacion.innerHTML = `
    <div class="publication-container">
        <img src="${fileURLs}" alt="imagen" class="publication-image">
        <div class="user-info">
          <div class="card-title">
            <span class="username">${usuario}</span>
          </div> 
        <div class="button-group">
            <button class="image-buttons share-button hover-button">
             <img src="../../assets/iconos/share.png" alt="edit">
            </button>
            <button class="image-buttons edit-button hover-button">
             <img src="../../assets/iconos/pen-field.png" alt="Comentar"> 
            </button> 
            <button class="image-buttons delete-button hover-button">
             <img src="../../assets/iconos/trash.png" alt="Share">
            </button>
        </div>
    
    </div class="publication-description">
        <div id="content">
         <div class="card-date">${fechaCreacion}</div> 
         <p class="card-description">${contenido}</p>
        </div>
    <div class="edit-form" style="display: none;">
        <textarea class="edit-description-textarea">${contenido}</textarea>
        <button class="save-button">Guardar</button>
    </div>

    <!-- Sección de comentarios -->
        <div class="comments">
          <!-- Aquí se crean las cards con nuevos comentarios-->
          ${comentarios.map(comment => `
            <div class="comment">
              <img src="${comment.image}" alt="User Avatar" class="comment-avatar">
              <div class="comment-content">
                <div class="comment-username">${comment.username}</div>
                <div class="comment-text">${comment.text}</div>
              </div>
            </div>
          `).join('')}
        </div>

    <!-- Formulario para agregar nuevos comentarios -->
    <div class="comment-section">
        <textarea id="new-comment-text" class="comment-input" placeholder="Escribe un comentario..."></textarea>
        <button id="add-comment-button" class="comment-button">Comentar</button>
    </div>      
         </div>
        </div>
      </div>
    </div>
    `;

    // Añadir funcionalidad para el botón de editar, eliminar y comaprtir
    cardPublicacion.querySelector('.edit-button').addEventListener('click', () => editPost(index, cardPublicacion));
    cardPublicacion.querySelector('.delete-button').addEventListener('click', () => deletePost(index, cardPublicacion));
    cardPublicacion.querySelector('.share-button').addEventListener('click', () => shareEvent(publicacion));
    // Agregar funcionalidad para el botón de agregar comentarios
    document.getElementById('add-comment-button').addEventListener('click', () => handleComment(index));
  } else {
    console.log('No se encontró la publicación');
  }
}

//---------COMPARTIR PUBLICACIONES----------------
function shareEvent(event) {
  if ("share" in navigator) {
      navigator.share({
          title: `Publicación de ${event.name}`, // Personaliza el título con el nombre del usuario
          text: event.description, // Añade la descripción de la publicación
          url: window.location.href // Comparte la URL actual de la página
      })
      .then(() => {
          console.log("Contenido Compartido!");
      })
      .catch(console.error);
  } else {
      alert('Lo siento, este navegador no tiene soporte para compartir.');
  }
}

//---------EDITAR PUBLICACIONES----------------
function editPost(index, card) {
  const editForm = card.querySelector('.edit-form');
  const cardDescription = card.querySelector('.card-description');
  const saveButton = card.querySelector('.save-button');

  // Mostrar el formulario de edición
  editForm.style.display = 'block';
  cardDescription.style.display = 'none';

  // Guardar los cambios
  saveButton.addEventListener('click', () => {
    const updatedText = card.querySelector('.edit-description-textarea').value;

    // Actualizar la publicación en localStorage
    let publicaciones = JSON.parse(localStorage.getItem('publicaciones')) || [];
    publicaciones[index].description = updatedText;

    localStorage.setItem('publicaciones', JSON.stringify(publicaciones));

    // Actualizar el DOM
    card.querySelector('.card-description').textContent = updatedText;
    
    // Ocultar el formulario de edición
    editForm.style.display = 'none';
    cardDescription.style.display = 'block';
    
    // Mostrar mensaje de confirmación
    Swal.fire('Guardado', 'Tu publicación ha sido actualizada.', 'success');
  });
}

//---------ELIMINAR PUBLICACIONES----------------
function deletePost(index, card) {
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
      // Eliminar la publicación del localStorage
      let publicaciones = JSON.parse(localStorage.getItem('publicaciones')) || [];
      publicaciones.splice(index, 1); // Eliminar la publicación del array
      localStorage.setItem('publicaciones', JSON.stringify(publicaciones)); // Guardar cambios

      // Eliminar la publicación del DOM
      card.remove();
      
      // Mostrar mensaje de confirmación
      Swal.fire("Eliminado", "Tu publicación ha sido eliminada.", "success");
    }
  });
}

//---------AÑADIR COMENTARIOS EN PUBLICACIONES----------------
function handleComment(index) {
  const text = document.getElementById('new-comment-text').value;
  const currentUser = {
    username: "Usuario Actual", // Este sería el nombre del usuario que está haciendo el comentario
    image: "ruta/a/la/imagen/de/perfil.jpg" // Esta sería la ruta de la imagen del perfil del usuario
  };

  if (text) {
    // Crear un nuevo comentario con la información del usuario actual
    const newCommentHTML = `
      <div class="comment">
        <img src="${currentUser.image}" alt="User Avatar" class="comment-avatar">
        <div class="comment-content">
          <div class="comment-username">${currentUser.username}</div>
          <div class="comment-text">${text}</div>
        </div>
      </div>
    `;

    // Obtener el contenedor de comentarios dentro de la publicación actual
    const commentsContainer = document.querySelector('.comments'); // Asegúrate de seleccionar correctamente el contenedor de comentarios

    // Añadir el nuevo comentario al contenedor de comentarios
    commentsContainer.innerHTML += newCommentHTML;

    // Limpiar el campo de texto después de comentar
    document.getElementById('new-comment-text').value = "";

    // Actualizar el localStorage
    let publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
    const publicacion = publicaciones[index];
    publicacion.comments = publicacion.comments || [];

    // Añadir el nuevo comentario a la lista de comentarios de la publicación
    publicacion.comments.push({
      username: currentUser.username,
      text: text,
      image: currentUser.image
    });

    // Guardar las publicaciones actualizadas en localStorage
    publicaciones[index] = publicacion;
    localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
  } else {
    alert("Por favor, escribe un comentario.");
  }
}
