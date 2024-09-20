// Variables globales
const eventContainer = document.getElementById('eventContainer');
let allEvents = []; // Variable para almacenar todos los eventos

// Event Listener para cargar los eventos al inicio
document.addEventListener('DOMContentLoaded', loadEventsFromAPI);

// Funciones de carga y creación de cards de eventos
function loadEventsFromAPI() { // Cambiado a API
    fetch('https://alephart.up.railway.app/api/events')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar eventos');
            return response.json();
        })
        .then(data => {
            allEvents = data; // Guardamos los eventos en la variable
            const sortedEvents = sortEventsByDate(allEvents);
            renderEvents(sortedEvents); // Renderizamos los eventos ordenados
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function formatEventData(event) {
    const eventDate = new Date(event.fecha + 'T00:00:00'); 
        
    return {
        id: event.id,
        image: event.image || '../assets/eventonuevo.png',
        day: eventDate.getUTCDate(),
        month: eventDate.toLocaleString('es-MX', { month: 'short', timeZone: 'UTC' }),
        title: event.nombre,
        place: `${event.ciudad}, ${event.estado}, ${event.hora} hrs`,
        description: event.descripcion
    };
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.dataset.id = event.id;
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
                                <h3 id="day" class="display-4">${event.day}</h3>
                                <p id="month" class="event-month">${event.month}</p>
                            </div>
                            <div class="d-flex">
                             <br>
                             <a href="../html/formularioEditar.html?id=${event.id}">
                             <button class="btn btn-outline-light edit-event-btn">
                                <img src="../assets/pen-field.png" width="20" height="20">
                             </button>
                             </a>
                             <button class="btn btn-outline-light delete-event-btn">
                             <img src="../assets/trash.png" width="20" height="20">
                             </button>
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
    
    // Añadir eventos a los botones de edición, eliminación y compartir
    card.querySelector('.edit-event-btn').addEventListener('click', () => editEvent(event.id));
    card.querySelector('.delete-event-btn').addEventListener('click', () => confirmDelete(event.id, card));
    card.querySelector('.share-event-btn').addEventListener('click', () => shareEvent(event));
    
    eventContainer.appendChild(card);
}

function sortEventsByDate(events) {
    return events.sort((a, b) => {
        const dateA = new Date(a.fecha);
        const dateB = new Date(b.fecha);
        return dateA - dateB; // Orden ascendente
    });
}

function shareEvent(event) {
    if ("share" in navigator) {
        navigator.share({
            title: `Evento: ${event.title}`,
            text: event.description,
            url: window.location.href
        })
        .then(() => {
            console.log("Contenido Compartido!");
        })
        .catch(console.error);
    } else {
        alert('Lo siento, este navegador no tiene soporte para recursos compartidos.');
    }
}

function confirmDelete(eventId, card) {
    Swal.fire({
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
            deleteEvent(eventId); // Elimina el evento a través de la API
        }
    });
}

// Función para renderizar los eventos
function renderEvents(events) {
    eventContainer.innerHTML = ''; // Limpiamos el contenedor
    events.forEach(event => createEventCard(formatEventData(event)));

    const noEventsImage = document.getElementById('no-events-image');
    noEventsImage.style.display = events.length === 0 ? 'block' : 'none';
}

// Funciones de edición y eliminación
function editEvent(eventId) {
    // Implementa la lógica para editar el evento, si es necesario
}

function deleteEvent(eventId) {
    fetch(`https://alephart.up.railway.app/api/events/${eventId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al eliminar el evento');
        // Actualizamos la lista de eventos después de eliminar
        allEvents = allEvents.filter(event => event.id !== eventId);
        renderEvents(allEvents);
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo eliminar el evento."
        });
    });
}

// Funciones de filtrado y renderizado
function filterByMonth(month) {
    return allEvents.filter(event => new Date(event.fecha).getMonth() + 1 === month);
}

function filterByCategory(category) {
    return allEvents.filter(event => event.categoria === category);
}

// Eventos de los botones de filtrado
document.getElementById('b1').addEventListener('click', () => renderEvents(filterByMonth(new Date().getMonth() + 1)));
document.getElementById('b2').addEventListener('click', () => renderEvents(filterByMonth(new Date().getMonth() + 2)));
document.getElementById('b3').addEventListener('click', () => renderEvents(filterByCategory('Categoría1')));
document.getElementById('b4').addEventListener('click', () => renderEvents(filterByCategory('Categoría2')));
document.getElementById('b5').addEventListener('click', () => renderEvents(filterByCategory('Categoría3')));
document.getElementById('b6').addEventListener('click', () => renderEvents(filterByCategory('Categoría4')));
document.getElementById('b7').addEventListener('click', () => renderEvents(filterByCategory('Categoría5')));
