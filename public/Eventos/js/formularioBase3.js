document.addEventListener('DOMContentLoaded', () => {
    const newEventForm = document.querySelector('#formularioEvento');
    

    // Verificar si estamos editando un evento existente
    if (!newEventForm) {
        console.error('El formulario con id "formularioEvento" no se encuentra en el DOM.');
        return;
    }


    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    newEventForm.addEventListener('submit', function(event) {
        console.log('Formulario enviado');
        // Prevent default action
        event.preventDefault();

        // Obtener los valores de los inputs
        const item = {
            nombre: document.getElementById('nombre').value.trim(),
            inputDate: document.getElementById('inputDate').value.trim(),
            inputCity: document.getElementById('inputCity').value.trim(),
            inputState: document.getElementById('inputState').value,
            inputCategory: document.getElementById('inputCategory').value,
            inputMode: document.getElementById('inputMode').value,
            descripcion: document.getElementById('descripcion').value.trim()
        };

        const errores = [];

        // Limpiar mensajes anteriores
        document.getElementById('nombreError').textContent = '';
        document.getElementById('inputDateError').textContent = '';
        document.getElementById('inputCityError').textContent = '';
        document.getElementById('inputStateError').textContent = '';
        document.getElementById('inputCategoryError').textContent = '';
        document.getElementById('inputModeError').textContent = '';
        document.getElementById('descripcionError').textContent = '';

        // Validación de campos
        if (item.nombre === '') {
            errores.push('Nombre');
            document.getElementById('nombreError').textContent = 'Este campo es obligatorio.';
        }
        if (item.inputDate === '') {
            errores.push('Fecha');
            document.getElementById('inputDateError').textContent = 'Este campo es obligatorio.';
        }
        if (item.inputCity === '') {
            errores.push('Ciudad');
            document.getElementById('inputCityError').textContent = 'Este campo es obligatorio.';
        }
        if (item.inputState === '' || item.inputState === 'Estado') {
            errores.push('Estado');
            document.getElementById('inputStateError').textContent = 'Debes seleccionar un estado.';
        }
        if (item.inputCategory === '' || item.inputCategory === 'Categoría') {
            errores.push('Categoría');
            document.getElementById('inputCategoryError').textContent = 'Debes seleccionar una categoría.';
        }
        if (item.inputMode === '' || item.inputMode === 'Modalidad') {
            errores.push('Modalidad');
            document.getElementById('inputModeError').textContent = 'Debes seleccionar una modalidad.';
        }
        if (item.descripcion === '') {
            errores.push('Descripción');
            document.getElementById('descripcionError').textContent = 'Este campo es obligatorio.';
        }

        // Mostrar alertas Swal según el número de errores
        if (errores.length === 0) {
            Swal.fire({
                icon: "success",
                title: "¡Formulario enviado!",
                text: "Formulario enviado correctamente. Tu evento será publicado."
            }).then(() => {
                // Almacenar o actualizar el evento en localStorage
                let eventos = JSON.parse(localStorage.getItem('eventos')) || [];

                if (eventId) {
                    // Editar evento existente
                    const index = eventos.findIndex(event => event.id === eventId);
                    if (index !== -1) {
                        eventos[index] = {
                            id: eventId,
                            image: document.getElementById('portada').src,
                            nombre: item.nombre,
                            fecha: item.inputDate,
                            ciudad: item.inputCity,
                            estado: item.inputState,
                            categoria: item.inputCategory,
                            modalidad: item.inputMode,
                            descripcion: item.descripcion
                        };
                        localStorage.setItem('eventos', JSON.stringify(eventos));
                    }
                } else {
                    // Crear nuevo evento
                    const nuevoEvento = {
                        id: Date.now().toString(), // Usar timestamp como ID único
                        image: document.getElementById('portada').src,
                        nombre: item.nombre,
                        fecha: item.inputDate,
                        ciudad: item.inputCity,
                        estado: item.inputState,
                        categoria: item.inputCategory,
                        modalidad: item.inputMode,
                        descripcion: item.descripcion
                    };
                    eventos.push(nuevoEvento);
                    localStorage.setItem('eventos', JSON.stringify(eventos));
                }

                // Redirigir después de 2 segundos
                setTimeout(() => {
                    window.location.href = '../html/eventos.html'; // Página de eventos
                }, 2000);
            });
            
            // Limpiar los campos del formulario
            document.getElementById('nombre').value = '';
            document.getElementById('inputDate').value = '';
            document.getElementById('inputCity').value = '';
            document.getElementById('inputState').value = 'Estado'; // Reestablecer valor predeterminado
            document.getElementById('inputCategory').value = 'Categoría'; // Reestablecer valor predeterminado
            document.getElementById('inputMode').value = 'Modalidad'; // Reestablecer valor predeterminado
            document.getElementById('descripcion').value = '';
        } else if (errores.length === 1) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `El campo ${errores[0]} es obligatorio.`
            });
        } else if (errores.length === 7) {
            Swal.fire({
                icon: "error",
                title: "Completa el formulario",
                text: "Todos los campos son obligatorios."
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Verifica los datos faltantes",
                text: "Hay varios campos que necesitan ser completados."
            });
        }
    });

    // Cargar datos del evento para edición si existe
    if (eventId) {
        const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
        const eventoToEdit = eventos.find(event => event.id === eventId);

        if (eventoToEdit) {
            document.getElementById('eventId').value = eventoToEdit.id;
            document.getElementById('nombre').value = eventoToEdit.nombre;
            document.getElementById('inputDate').value = eventoToEdit.fecha;
            document.getElementById('inputCity').value = eventoToEdit.ciudad;
            document.getElementById('inputState').value = eventoToEdit.estado;
            document.getElementById('inputCategory').value = eventoToEdit.categoria;
            document.getElementById('inputMode').value = eventoToEdit.modalidad;
            document.getElementById('descripcion').value = eventoToEdit.descripcion;
            document.getElementById('portada').src = eventoToEdit.image;
        }
    }
});
