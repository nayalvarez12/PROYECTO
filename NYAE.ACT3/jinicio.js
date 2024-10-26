$(document).ready(function () {
    // Abrir y cerrar el panel de notificaciones
    $('#notificacionesBtn').on('click', function () {
        $('#notificacionesPanel').toggleClass('active');
    });

    // Cerrar el panel de notificaciones
    $('#notificacionesPanel .close-panel').on('click', function () {
        $('#notificacionesPanel').removeClass('active');
    });

    // Abrir y cerrar el panel del carrito
    let carritoTimer; // Variable para el temporizador de cierre automático

    $('#carritoBtn').on('click', function () {
        $('#carritoPanel').toggleClass('active');
        
        // Si el panel está activo, inicia el temporizador de inactividad
        if ($('#carritoPanel').hasClass('active')) {
            iniciarTemporizadorCarrito();
        } else {
            clearTimeout(carritoTimer); // Detén el temporizador si el panel se cierra manualmente
        }
    });

    // Función para iniciar el temporizador de inactividad en el carrito
    function iniciarTemporizadorCarrito() {
        clearTimeout(carritoTimer); // Reinicia el temporizador cada vez que se llama
        carritoTimer = setTimeout(function () {
            $('#carritoPanel').removeClass('active'); // Cierra el carrito automáticamente después de 5 segundos de inactividad
        }, 5000); // Tiempo en milisegundos (5 segundos)
    }

    // Reiniciar el temporizador de inactividad al hacer clic en cualquier parte de la página
    $(document).on('click', function (event) {
        // Evitar que los clics en el carrito o en el botón de abrir carrito cierren el panel
        if (!$(event.target).closest('#carritoPanel, #carritoBtn').length && $('#carritoPanel').hasClass('active')) {
            iniciarTemporizadorCarrito();
        }
    });

    // Cerrar el panel del carrito
    $('#carritoPanel .close-panel').on('click', function () {
        $('#carritoPanel').removeClass('active');
        clearTimeout(carritoTimer); // Detén el temporizador al cerrar manualmente
    });

    // Agregar productos al carrito
    $('.cart-btn').on('click', function () {
        const producto = $(this).closest('.producto').data('producto');
        const precio = $(this).closest('.producto').data('precio');

        $('#carritoItems').append(`<li>${producto} - $${precio} <button class="remove-btn">Eliminar</button></li>`);
        iniciarTemporizadorCarrito(); // Reinicia el temporizador al agregar un producto
    });

    // Confirmación para eliminar producto del carrito
    $('#carritoPanel').on('click', '.remove-btn', function () {
        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este producto del carrito?');
        if (confirmDelete) {
            $(this).parent().remove();
        }
    });

    // Evento de cambio de tema (oscuro/claro)
    let darkMode = false;
    $('#themeSwitch').on('click', function () {
        darkMode = !darkMode;
        $('body, header, button, .side-panel, .side-panel-left').toggleClass('dark-mode');
        $(this).attr('src', darkMode ? 'imagenes/off.png' : 'imagenes/on.png');
    });
});
