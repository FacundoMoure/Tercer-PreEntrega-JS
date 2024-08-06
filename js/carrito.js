// carrito.js

// Función para obtener el carrito del localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const contenedorCarrito = document.getElementById('carrito-container');

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
        return;
    }

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
    });
}

// Llamar a la función para mostrar el carrito cuando la página se haya cargado
document.addEventListener('DOMContentLoaded', mostrarCarrito);
