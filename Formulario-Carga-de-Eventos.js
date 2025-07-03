let eventoActual = null;

document.querySelector('.boton-personalizado').addEventListener('click', function () {
    const form = document.getElementById('formulario-evento');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
});

function agregarEvento() {
    const titulo = document.getElementById('titulo-evento').value.trim();
    const fecha = document.getElementById('fecha-evento').value;
    const hora = document.getElementById('hora-evento').value;
    const descripcion = document.getElementById('descripcion-evento').value.trim();
    const ubicacion = document.getElementById('ubicacion-evento').value.trim();
    const tipo = document.getElementById('tipo-evento').value;

    if (titulo && fecha) {
        const eventoCard = document.createElement('div');
        eventoCard.className = 'evento-card';
        eventoCard.innerHTML = `
            <h3>${titulo}</h3>
            <div class="evento-detalles">
                <p class="evento-fecha">${formatearFecha(fecha)} - ${hora}</p>
                <p>${descripcion}</p>
                <p><strong>Ubicación:</strong> ${ubicacion}</p>
                <p><strong>Tipo:</strong> ${tipo}</p>
            </div>
        `;

        const contenedorIzq = document.querySelector('.tarjetas-equipo .carta-miembro');
        contenedorIzq.appendChild(eventoCard);

        // Agregar el evento de clic inmediatamente después de crear la tarjeta
        eventoCard.addEventListener('click', function() {
            moverEventoAlRectangulo(this);
        });

        // Limpiar formulario
        document.getElementById('titulo-evento').value = '';
        document.getElementById('fecha-evento').value = '';
        document.getElementById('hora-evento').value = '';
        document.getElementById('descripcion-evento').value = '';
        document.getElementById('ubicacion-evento').value = '';
        document.getElementById('tipo-evento').value = 'presencial';
        
        document.getElementById('formulario-evento').style.display = 'none';
    }
}

function moverEventoAlRectangulo(nuevoEvento) {
    const destino = document.getElementById('eventos-destino');
    const origen = document.querySelector('.tarjetas-equipo .carta-miembro');
    const editor = document.getElementById('editor-evento');

    // Si hay un evento actual en el rectángulo, devolverlo al origen
    if (eventoActual && eventoActual !== nuevoEvento) {
        origen.appendChild(eventoActual);
        // Volver a agregar el evento de clic
        eventoActual.addEventListener('click', function() {
            moverEventoAlRectangulo(this);
        });
    }

    // Limpiar el destino y mover el nuevo evento
    destino.innerHTML = '';
    destino.appendChild(nuevoEvento);
    eventoActual = nuevoEvento;

    // Mostrar el editor y llenar los campos
    editor.style.display = 'block';
    const titulo = nuevoEvento.querySelector('h3').textContent;
    const fechaHora = nuevoEvento.querySelector('.evento-fecha').textContent.split(' - ');
    const descripcion = nuevoEvento.querySelector('.evento-detalles p:nth-child(2)').textContent;
    const ubicacion = nuevoEvento.querySelector('.evento-detalles p:nth-child(3)').textContent.replace('Ubicación: ', '');
    const tipo = nuevoEvento.querySelector('.evento-detalles p:nth-child(4)').textContent.replace('Tipo: ', '');

    document.getElementById('editar-titulo').value = titulo;
    document.getElementById('editar-fecha').value = convertirFechaAInput(fechaHora[0]);
    document.getElementById('editar-hora').value = fechaHora[1];
    document.getElementById('editar-descripcion').value = descripcion;
    document.getElementById('editar-ubicacion').value = ubicacion;
    document.getElementById('editar-tipo').value = tipo.toLowerCase();
}

function guardarEdicion() {
    if (eventoActual) {
        const titulo = document.getElementById('editar-titulo').value;
        const fecha = document.getElementById('editar-fecha').value;
        const hora = document.getElementById('editar-hora').value;
        const descripcion = document.getElementById('editar-descripcion').value;
        const ubicacion = document.getElementById('editar-ubicacion').value;
        const tipo = document.getElementById('editar-tipo').value;

        eventoActual.innerHTML = `
            <h3>${titulo}</h3>
            <div class="evento-detalles">
                <p class="evento-fecha">${formatearFecha(fecha)} - ${hora}</p>
                <p>${descripcion}</p>
                <p><strong>Ubicación:</strong> ${ubicacion}</p>
                <p><strong>Tipo:</strong> ${tipo}</p>
            </div>
        `;

        // Volver a agregar el evento de clic después de la edición
        eventoActual.addEventListener('click', function() {
            moverEventoAlRectangulo(this);
        });
    }
}

function formatearFecha(fecha) {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

function convertirFechaAInput(fechaTexto) {
    const fecha = new Date(fechaTexto);
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${año}-${mes}-${dia}`;
}