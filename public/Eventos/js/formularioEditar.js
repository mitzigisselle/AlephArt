
document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del evento desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    if (eventId) {
        // Cargar los datos del evento desde localStorage
        const events = JSON.parse(localStorage.getItem('eventos')) || [];
        const eventToEdit = events.find(event => event.id === eventId);

        if (eventToEdit) {
            document.getElementById('eventId').value = eventToEdit.id;
            document.getElementById('nombre').value = eventToEdit.nombre;
            document.getElementById('inputDate').value = eventToEdit.fecha.split('T')[0]; // Ajustar según formato de fecha
            document.getElementById('inputCity').value = eventToEdit.ciudad;
            document.getElementById('inputState').value = eventToEdit.estado;
            document.getElementById('inputCategory').value = eventToEdit.categoria;
            document.getElementById('inputMode').value = eventToEdit.modalidad;
            document.getElementById('descripcion').value = eventToEdit.descripcion;

            // Actualizar la imagen si es necesario
            document.getElementById('portada').src = '/public/Eventos/assets/audience-1867754_1280.jpg' || eventToEdit.image ; //Se cambió el orden d ela condición para mostrar la imagen predeterminada
        }
    }

    // Manejar la presentación del formulario
    document.getElementById('formularioEvento').addEventListener('submit', (event) => {
        event.preventDefault();

        // Obtener los valores del formulario
        const updatedEvent = {
            id: document.getElementById('eventId').value,
            image: document.getElementById('portada').src,
            nombre: document.getElementById('nombre').value,
            fecha: document.getElementById('inputDate').value,
            ciudad: document.getElementById('inputCity').value,
            estado: document.getElementById('inputState').value,
            categoria: document.getElementById('inputCategory').value,
            modalidad: document.getElementById('inputMode').value,
            descripcion: document.getElementById('descripcion').value
        };

        // Actualizar el evento en localStorage
        const events = JSON.parse(localStorage.getItem('eventos')) || [];
        const index = events.findIndex(event => event.id === eventId);
        if (index !== -1) {
            events[index] = updatedEvent;
            localStorage.setItem('eventos', JSON.stringify(events));
            window.location.href = './eventos.html'; // Redirigir a la página principal después de guardar
        }
    });
});
