document.addEventListener('DOMContentLoaded', () => {
    const newEventForm = document.querySelector('#formularioEvento');

    if (!newEventForm) {
        console.error('El formulario con id "formularioEvento" no se encuentra en el DOM.');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    document.getElementById('addImgEvents').addEventListener('click', function() {
        document.getElementById('inputImg').click();
    });

    document.getElementById('inputImg').addEventListener('change', function() {
        const files = document.getElementById('inputImg').files;
        if (files.length > 0) {
            const file = files[0];
            const fileURL = URL.createObjectURL(file);
            document.getElementById('portada').src = fileURL;
            item.image = fileURL;
            document.getElementById('inputImg').value = '';
        }
    });

    newEventForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const item = {
            nombre: document.getElementById('nombre').value.trim(),
            inputDate: document.getElementById('inputDate').value.trim(),
            inputCity: document.getElementById('inputCity').value.trim(),
            inputState: document.getElementById('inputState').value,
            inputCategory: document.getElementById('inputCategory').value,
            inputHora: document.getElementById('inputHora').value,
            inputMode: document.getElementById('inputMode').value,
            descripcion: document.getElementById('descripcion').value.trim(),
            image: document.getElementById('portada').src,
        };

        const errores = [];
        
        // Limpiar mensajes anteriores
        document.getElementById('nombreError').textContent = '';
        document.getElementById('inputDateError').textContent = '';
        document.getElementById('inputCityError').textContent = '';
        document.getElementById('inputStateError').textContent = '';
        document.getElementById('inputCategoryError').textContent = '';
        document.getElementById('inputHoraError').textContent = '';
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
        if (item.inputCategory === '' || item.inputCategory === 'Hora') {
            errores.push('Hora');
            document.getElementById('inputHoraError').textContent = 'Debes agregar un horario';
        }
        if (item.inputMode === '' || item.inputMode === 'Modalidad') {
            errores.push('Modalidad');
            document.getElementById('inputModeError').textContent = 'Debes seleccionar una modalidad.';
        }
        if (item.descripcion === '') {
            errores.push('Descripción');
            document.getElementById('descripcionError').textContent = 'Este campo es obligatorio.';
        }

        if (errores.length === 0) {
            Swal.fire({
                icon: "success",
                title: "¡Formulario enviado!",
                text: "Formulario enviado correctamente. Tu evento será publicado."
            }).then(() => {
                const apiUrl = 'https://alephart.up.railway.app/api/events';

                if (eventId) {
                    // Editar evento existente
                    fetch(`${apiUrl}/${eventId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            image: item.image,
                            nombre: item.nombre,
                            fecha: item.inputDate,
                            ciudad: item.inputCity,
                            estado: item.inputState,
                            categoria: item.inputCategory,
                            hora: item.inputHora,
                            modalidad: item.inputMode,
                            descripcion: item.descripcion
                        })
                    })
                    .then(response => {
                        if (!response.ok) throw new Error('Error en la actualización');
                        return response.json();
                    })
                    .then(data => {
                        // Redirigir después de 2 segundos
                        setTimeout(() => {
                            window.location.href = '../html/eventos.html';
                        }, 2000);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "No se pudo actualizar el evento."
                        });
                    });
                } else {
                    // Crear nuevo evento
                    fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            image: item.image,
                            nombre: item.nombre,
                            fecha: item.inputDate,
                            ciudad: item.inputCity,
                            estado: item.inputState,
                            categoria: item.inputCategory,
                            hora: item.inputHora,
                            modalidad: item.inputMode,
                            descripcion: item.descripcion
                        })
                    })
                    .then(response => {
                        if (!response.ok) throw new Error('Error en la creación');
                        return response.json();
                    })
                    .then(data => {
                        // Redirigir después de 2 segundos
                        setTimeout(() => {
                            window.location.href = '../html/eventos.html';
                        }, 2000);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "No se pudo crear el evento."
                        });
                    });
                }

                // Limpiar los campos del formulario
                document.getElementById('nombre').value = '';
                document.getElementById('inputDate').value = '';
                document.getElementById('inputCity').value = '';
                document.getElementById('inputState').value = 'Estado';
                document.getElementById('inputCategory').value = 'Categoría';
                document.getElementById('inputHora').value = '';
                document.getElementById('inputMode').value = 'Modalidad';
                document.getElementById('descripcion').value = '';
            });
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
        fetch(`https://alephart.up.railway.app/api/events/${eventId}`)
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar el evento');
                return response.json();
            })
            .then(eventoToEdit => {
                document.getElementById('eventId').value = eventoToEdit.id;
                document.getElementById('nombre').value = eventoToEdit.nombre;
                document.getElementById('inputDate').value = eventoToEdit.fecha;
                document.getElementById('inputCity').value = eventoToEdit.ciudad;
                document.getElementById('inputState').value = eventoToEdit.estado;
                document.getElementById('inputCategory').value = eventoToEdit.categoria;
                document.getElementById('inputHora').value = eventoToEdit.hora;
                document.getElementById('inputMode').value = eventoToEdit.modalidad;
                document.getElementById('descripcion').value = eventoToEdit.descripcion;
                document.getElementById('portada').src = eventoToEdit.image;
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo cargar el evento."
                });
            });
    }
});
