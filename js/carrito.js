// Obtener el carrito del localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Guardar el carrito en el localStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Mostrar el carrito en la página
function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const contenedorCarrito = document.getElementById('carrito-container');
    const totalCarrito = document.getElementById('total-carrito');

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
        totalCarrito.textContent = 'Total: $0';
        return;
    }

    let total = 0;

    contenedorCarrito.innerHTML = '';
    carrito.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto-carrito');
        divProducto.innerHTML = `
            <img src="./img/productos/${producto.id}.jpg" alt="Producto ${producto.id}">
            <h3>${producto.nombre}</h3>
            <p>Cuerdas: ${producto.cuerdas}</p>
            <p>Categoria: ${producto.categoria}</p>
            <p>ID: ${producto.id}</p>
            <p>Stock: ${producto.stock}</p>
            <p class="precio">$${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>`;
        contenedorCarrito.appendChild(divProducto);
        
        total += producto.precio * producto.cantidad;
    });

    // totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    totalCarrito.textContent = `Total: ${formatearMonto(total)}`;
}


// Vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito'); // Elimina el carrito del localStorage
    document.getElementById('carrito-container').innerHTML = '<p>Tu carrito está vacío.</p>';
    document.getElementById('total-carrito').textContent = 'Total: $0';
    document.getElementById('cuenta-carrito').textContent = '0'; // Asegúrate de que este ID coincide con el contador del carrito en index.html
}

// Añadir el evento al botón para vaciar el carrito
document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
    document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
});

function formatearMonto(monto) {
    return monto.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
    });
}