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
                            <img src="${event.image}" class="img-fluid" alt="Imagen">
                        </div>
                        <div class="col-4 d-flex flex-column align-items-center justify-content-between">
                            <div class="text-center">
                                <h1 class="display-4 text-danger">${event.day}</h1>
                                <p class="text-primary">${event.month}</p>
                            </div>
                            <div class="d-flex">
                                <button class="btn btn-outline-light me-1">
                                    <img src="../resourses/wishlist-star.png" width="20" height="20">
                                </button>
                                <button class="btn btn-outline-light">
                                    <img src="../resourses/calendar-plus.png" width="20" height="20">
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="event-details mt-3">
                        <h4 class="event-title">${event.title}</h4>
                        <h6 class="event-place">${event.place}.</h6>
                        <p class="event-description flex-grow-1">${event.description}</p>
                        <br>
                        <a href="../html/formularioEditar.html?id=${event.id}">
                        <button class="btn btn-outline-light edit-event-btn">
                            <img src="../resourses/pen-field.png" width="20" height="20">
                        </button>
                        </a>

                        
                        <button class="btn btn-outline-light delete-event-btn">
                            <img src="../resourses/trash.png" width="20" height="20">
                        </button>
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
          deleteEvent(index); // Elimina la publicación del almacenamiento
        }
      }));

    eventContainer.appendChild(card);
}

// Función para cargar eventos desde el localStorage y crear las tarjetas
function loadEventsFromLocalStorage() {
    const events = JSON.parse(localStorage.getItem('eventos')) || [];
    events.forEach(event => {
        const eventData = {
            id: event.id,
            image: event.image || '../resourses/eventonuevo.png',
            day: new Date(event.fecha).getDate(),
            month: new Date(event.fecha).toLocaleString('es-ES', { month: 'short' }),
            title: event.nombre,
            place: `${event.ciudad}, ${event.estado}`,
            description: event.descripcion
        };
        createEventCard(eventData);
    });
}

// Función para editar un evento
function editEvent(eventId) {
    const events = JSON.parse(localStorage.getItem('eventos')) || [];
    const eventToEdit = events.find(event => event.id === eventId);
    
}



// Función para eliminar un evento
function deleteEvent(eventId) {
    let events = JSON.parse(localStorage.getItem('eventos')) || [];
    events = events.filter(event => event.id !== eventId);
    localStorage.setItem('eventos', JSON.stringify(events));
    // Recargar los eventos en la página
    eventContainer.innerHTML = '';
    loadEventsFromLocalStorage();
}

// Cargar los eventos al cargar la página
loadEventsFromLocalStorage();
