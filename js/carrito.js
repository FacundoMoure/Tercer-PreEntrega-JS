// carrito.js


function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}


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

    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}


document.addEventListener('DOMContentLoaded', mostrarCarrito);
