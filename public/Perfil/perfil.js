document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos
    const editButtons = document.querySelectorAll('.botonEditar');
    const botonConfigurar = document.getElementById('boton-configurar');
    const contenedorGeneralPerfil = document.getElementById('contenedor-general-perfil');
    
    // Configurar los eventos de edición
    const setupEditButton = (editButton, textarea, saveButton, textVisible) => {
        
        const isEdited = () => textVisible.getAttribute('data-edited') === 'true';
        
        editButton.addEventListener('click', () => {
            textarea.style.display = 'block';
            saveButton.style.display = 'block';
            editButton.style.display = 'none';
            textVisible.style.display = 'none';
            
            if (!isEdited()) {
                textarea.value = ''; // Borra el contenido del textarea al iniciar la edición solo si es la primera vez
                textVisible.setAttribute('data-edited', 'true');
            } else {
                textarea.value = textVisible.textContent; // Mantiene el texto si ya fue editado antes
            }
        });

        saveButton.addEventListener('click', () => {
            textVisible.textContent = textarea.value;
            textarea.style.display = 'none';
            saveButton.style.display = 'none';
            editButton.style.display = 'block';
            textVisible.style.display = 'block';
            saveToLocalStorage(); // Guardar cambios en localStorage
        });
    };

    // Elementos para "Sobre mí"
    const editButtonSobreMi = document.getElementById('boton-editar-sobre-mi');
    const textareaSobreMi = document.getElementById('textarea-sobreMi');
    const saveButtonSobreMi = document.getElementById('save-button-sobreMi');
    const textSobreMiVisible = document.getElementById('text-sobreMi-visible');
    setupEditButton(editButtonSobreMi, textareaSobreMi, saveButtonSobreMi, textSobreMiVisible);

    // Elementos para el "Proyecto reciente"
    const editButtonProyectoReciente = document.getElementById('boton-editar-proyecto-reciente');
    const textareaProyectoReciente = document.getElementById('textarea-proyectoReciente');
    const saveButtonProyectoReciente = document.getElementById('save-button-proyectoReciente');
    const textProyectoRecienteVisible = document.getElementById('text-proyectoReciente-visible');
    setupEditButton(editButtonProyectoReciente, textareaProyectoReciente, saveButtonProyectoReciente, textProyectoRecienteVisible);

    // Elementos para el "título del proyecto reciente"
    const editButtonTituloProyecto = document.getElementById('boton-editar-titulo-proyecto');
    const textareaTituloProyecto = document.getElementById('nombre-proyectoReciente');
    const saveButtonTituloProyecto = document.getElementById('save-button-Nombreproyecto');
    const textTituloProyectoVisible = document.getElementById('text-nombre-proyecto-visible');
    setupEditButton(editButtonTituloProyecto, textareaTituloProyecto, saveButtonTituloProyecto, textTituloProyectoVisible);

    // Elementos para la "Profesión"
    const editButtonProfesion = document.getElementById('boton-editar-profesion');
    const textareaProfesion = document.getElementById('textarea-profesion');
    const saveButtonProfesion = document.getElementById('save-button-profesion');
    const textProfesionVisible = document.getElementById('text-profesion-visible');
    setupEditButton(editButtonProfesion, textareaProfesion, saveButtonProfesion, textProfesionVisible);

    // Evento para mostrar/ocultar los iconos de edición
    botonConfigurar.addEventListener('click', () => {
        // Alternar la clase que muestra/oculta los iconos de edición
        contenedorGeneralPerfil.classList.toggle('mostrar-iconos');
        
        // Restablecer el estado de los botones de edición cuando se haga clic en el botón de configuración
        if (contenedorGeneralPerfil.classList.contains('mostrar-iconos')) {
            // Muestra todos los botones para editar 
            editButtons.forEach(button => button.style.display = 'inline');
        } else {
            // Oculta todos los botones de edición 
            editButtons.forEach(button => button.style.display = 'none');
        }
    });

    // Al inicio, ocultar los iconos de edición
    editButtons.forEach(button => button.style.display = 'none');

    // Editar imágenes
    const handleFileSelect = (fileInputId, imgId) => {
        document.getElementById(fileInputId).addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById(imgId).src = e.target.result;
                    saveToLocalStorage();
                };
                reader.readAsDataURL(file);
            }
        });
    };

    // Configura los eventos para cada input de archivo
    handleFileSelect('fileInputPerfil', 'imagenDePerfil');
    handleFileSelect('fileInputBanner', 'ImagenBannerDePerfil');
    handleFileSelect('fileInputProyecto', 'imagen-proyecto-reciente');

    // Asocia cada botón de editar con su respectivo input de archivo
    const botonesEditar = document.querySelectorAll('.botonEditar');

    botonesEditar.forEach(boton => {
        boton.addEventListener('click', function() {
            const id = this.id;
            let fileInputId;

            switch (id) {
                case 'boton-editar-foto-perfil':
                    fileInputId = 'fileInputPerfil';
                    break;
                case 'boton-editar-banner':
                    fileInputId = 'fileInputBanner';
                    break;
                case 'boton-editar-foto-proyecto':
                    fileInputId = 'fileInputProyecto';
                    break;
                default:
                    return;
            }

            document.getElementById(fileInputId).click();
        });
    });
    llamarDesdeLocalStorage(); // Cargar datos desde localStorage
});

// Guardar datos en local storage
function saveToLocalStorage() {
    const data = {
        profesion: document.getElementById('text-profesion-visible').textContent,
        sobreMi: document.getElementById('text-sobreMi-visible').textContent,
        proyectoReciente: document.getElementById('text-proyectoReciente-visible').textContent,
        tituloProyecto: document.getElementById('text-nombre-proyecto-visible').textContent,
        imagenPerfil: document.getElementById('imagenDePerfil').src,
        imagenBanner: document.getElementById('ImagenBannerDePerfil').src,
        imagenProyecto: document.getElementById('imagen-proyecto-reciente').src
    };
    
    localStorage.setItem('perfilData', JSON.stringify(data));
}
//Cargar los datos desde local storage
function llamarDesdeLocalStorage() {
    const data = JSON.parse(localStorage.getItem('perfilData'));

    if (data) {
        document.getElementById('text-profesion-visible').textContent = data.profesion;
        document.getElementById('text-sobreMi-visible').textContent = data.sobreMi;
        document.getElementById('text-proyectoReciente-visible').textContent = data.proyectoReciente;
        document.getElementById('text-nombre-proyecto-visible').textContent = data.tituloProyecto;
        document.getElementById('imagenDePerfil').src = data.imagenPerfil;
        document.getElementById('ImagenBannerDePerfil').src = data.imagenBanner;
        document.getElementById('imagen-proyecto-reciente').src = data.imagenProyecto;
    }
}

//Funcion para cargar las publicaciones del usuario en la galeria
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('publicaciones')) || [];
    console.log(posts);
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; 

    const postsWithFiles = posts.filter(post => 
        post.files && post.files.length > 0 && post.files[0].trim() !== ""
    );

      postsWithFiles.forEach((post, index) => {
      const imgContainer = document.createElement('div');
      imgContainer.className = 'gallery-img-container';
      
      const img = document.createElement('img');
      img.src = post.files[0];
      img.className = 'gallery-img';
      img.alt = `Imagen de publicación ${index + 1}`;
      img.dataset.description = post.description || '';
      
      img.addEventListener('click', function() {
        openImageModal(this.src, this.dataset.description);
      });
      
      imgContainer.appendChild(img);
      gallery.appendChild(imgContainer);
    });
  }


//Función para que se abra el modal al dar click en la imagen
  function openImageModal(imageSrc, description) {
    const modal = new bootstrap.Modal(document.getElementById('modalContainer'));
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    
    modalImage.src = imageSrc;
    modalDescription.textContent = description;
    
    modal.show();
  }

  document.addEventListener('DOMContentLoaded', loadPosts);
