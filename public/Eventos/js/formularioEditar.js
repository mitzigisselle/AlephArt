

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del evento desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    // Vincula el boton agregar imagen con el input de archivo
    document.getElementById('addImgEvents').addEventListener('click', function() {
        document.getElementById('inputImg').click();
        });
        
        document.getElementById('inputImg').addEventListener('change', function() {
            const files = this.files;
            if (files.length > 0) {
                const file = files[0];
                const reader = new FileReader();
        
                reader.onloadend = function() {
                    const base64data = reader.result; // Aquí tienes la imagen en Base64
                    document.getElementById('portada').src = base64data;
        
                    // Guarda la URL Base64 en el objeto item
                    item.image = base64data;
        
                    // Limpia el input
                    document.getElementById('inputImg').value = '';
                };
        
                reader.readAsDataURL(file); // Lee el archivo como una URL de datos
            }
        });

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
            document.getElementById('inputHora').value = eventToEdit.hora;
            document.getElementById('inputMode').value = eventToEdit.modalidad;
            document.getElementById('descripcion').value = eventToEdit.descripcion;

            // Actualizar la imagen si es necesario
            document.getElementById('portada').src =  eventToEdit.image || '/public/Eventos/assets/audience-1867754_1280.jpg'; //Se cambió el orden d ela condición para mostrar la imagen predeterminada
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
            hora: document.getElementById('inputHora').value,
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