// Obtener el contenedor de los eventos
const eventContainer = document.getElementById('eventContainer');

// Función para crear una tarjeta de evento
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.dataset.id = event.id; // Asignar el id del evento al atributo dataset

    card.innerHTML = `
        <div class="event-cards row">
            <div class="col">
                <div class="card p-3 h-100 mb-4 d-flex flex-column">
                    <div class="row g-0">
                        <div class="col-8">
                            <img src="${event.image}" class="img-fluid" alt="event-image">
                        </div>
                        <div class="col-4 d-flex flex-column align-items-center justify-content-between">
                            <div class="text-center">
                                <h1 class="display-4 text-danger">${event.day}</h1>
                                <p class="text-primary">${event.month}</p>
                            </div>
                            <div class="d-flex">
                                <a href="../html/formularioEditar.html?id=${event.id}">
                                    <button class="btn btn-outline-light edit-event-btn">
                                        <img src="../assets/pen-field.png" width="20" height="20">
                                    </button>
                                </a>
                                <button class="btn btn-outline-light delete-event-btn">
                                    <img src="../assets/trash.png" width="20" height="20">
                                </button>
                                <!-- Botón de compartir -->
                                <button class="btn btn-outline-light share-event-btn">
                                    <img src="../assets/share.png" width="20" height="20">
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="event-details mt-3">
                        <h4 class="event-title">${event.title}</h4>
                        <h6 class="event-place">${event.place}.</h6>
                        <p class="event-description flex-grow-1">${event.description}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Añadir eventos a los botones de edición y eliminación
    card.querySelector('.edit-event-btn').addEventListener('click', () => editEvent(event.id));
    card.querySelector('.delete-event-btn').addEventListener('click', () => Swal.fire({
        title: "¿Estás segur@?",
        text: "¡Una vez que elimines tu evento no podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          card.remove(); // Elimina la tarjeta del DOM
<<<<<<< HEAD
          deleteEvent(index); // Elimina la publicación del almacenamiento
        }
      }));
=======
          deleteEvent(event.id); // Elimina la publicación del almacenamiento
        }
      }));

    // Añadir evento al botón de compartir
    const shareButton = card.querySelector('.share-event-btn');
    shareButton.addEventListener('click', () => {
        if ("share" in navigator) {
            navigator.share({
                title: "Comparte Este Evento",
                url: window.location.href
            })
            .then(() => {
                console.log("Contenido Compartido!");
            })
            .catch(console.error);
        } else {
            alert('Lo siento, este navegador no tiene soporte para recursos compartidos.');
        }
    });
>>>>>>> 9f27a4f4df11e6a7b961f22fbaf2d44177fa0a2d

    eventContainer.appendChild(card);
}

// Función para cargar eventos desde el localStorage y crear las tarjetas
function loadEventsFromLocalStorage() {
    const events = JSON.parse(localStorage.getItem('eventos')) || [];
    events.forEach(event => {
        // Convertir la fecha a un objeto Date y ajustarla a la zona horaria
        const eventDate = new Date(event.fecha + 'T00:00:00'); // Asegura que la fecha se interprete correctamente
        
        const eventData = {
            id: event.id,
            image: '../assets/eventonuevo.png' || event.image, //se cambió el orden de la condicional para que se vea la imagen predeterminada antes de event.image
            day: eventDate.getUTCDate(), // Usar getUTCDate() para ajustar las zonas horarias automáticamente
            month: eventDate.toLocaleString('es-MX', { month: 'short', timeZone: 'UTC' }), //Formato MX, muestra un mes corto y ajusta la zona horaria
            title: event.nombre,
            place: `${event.ciudad}, ${event.estado}, ${event.hora} hrs`,
            description: event.descripcion
        };
        createEventCard(eventData);
    });
}

// Función para editar un evento
function editEvent(eventId) {
    const events = JSON.parse(localStorage.getItem('eventos')) || [];
    const eventToEdit = events.find(event => event.id === eventId);
<<<<<<< HEAD
    
=======
    // Aquí puedes agregar la lógica para editar el evento
>>>>>>> 9f27a4f4df11e6a7b961f22fbaf2d44177fa0a2d
}



// Función para eliminar un evento
function deleteEvent(eventId) {
    let events = JSON.parse(localStorage.getItem('eventos')) || [];
    events = events.filter(event => event.id !== eventId); // Filtra los eventos para excluir el que tiene el ID proporcionado
    localStorage.setItem('eventos', JSON.stringify(events)); // Guarda la nueva lista de eventos en localStorage
    // Recargar los eventos en la página
    eventContainer.innerHTML = ''; // Limpia el contenedor de eventos
    loadEventsFromLocalStorage(); // Vuelve a cargar los eventos actualizados
}

// Cargar los eventos al cargar la página
loadEventsFromLocalStorage();
