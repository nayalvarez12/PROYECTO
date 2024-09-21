document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Más información del producto próximamente.');
    });
});

document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Producto agregado al carrito.');
    });
});

$(document).ready(function() {
    $('#piñataTable').DataTable();
});
