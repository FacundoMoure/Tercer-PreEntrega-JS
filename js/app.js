// Obtener el carrito del localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Actualizar el contador del carrito en el navbar
function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const cantidadTotal = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    document.getElementById('cuenta-carrito').textContent = cantidadTotal;
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const productoEnCarrito = carrito.find(item => item.id === producto.id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
    Toastify({
        text: `Agregaste ${producto.nombre} al carrito.`,
        duration: 2000,
        gravity: "bottom",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}

function crearTarjetasProductosInicio(productos) {
    const contenedorTarjetas = document.getElementById("productos-container");
    contenedorTarjetas.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas tarjetas

    productos.forEach(producto => {
        const nuevaGuitarra = document.createElement("div");
        nuevaGuitarra.classList.add("tarjeta-producto");
        nuevaGuitarra.innerHTML = `
            <img src="./img/productos/${producto.id}.jpg" alt="Producto ${producto.id}">
            <h3>${producto.nombre}</h3>
            <p>Cuerdas: ${producto.cuerdas}</p>
            <p>Categoria: ${producto.categoria}</p>
            <p>ID: ${producto.id}</p>
            <p>Stock: ${producto.stock}</p>
            <p class="precio">$${producto.precio}</p>
            <button data-id="${producto.id}">Agregar al carrito</button>`;

        contenedorTarjetas.appendChild(nuevaGuitarra);

        nuevaGuitarra.querySelector("button").addEventListener("click", () => {
            agregarAlCarrito(producto);
        });
    });
}

// Filtrado de productos
document.addEventListener('keyup', e => {
    if (e.target.matches('#buscador')) {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.tarjeta-producto').forEach(card => {
            const textContent = card.textContent.toLowerCase();
            card.classList.toggle('filtro', !textContent.includes(query));
        });
    }
});

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

    totalCarrito.textContent = `Total: ${formatearMonto(total)}`;
}

// Vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito'); // Elimina el carrito del localStorage
    document.getElementById('carrito-container').innerHTML = '<p>Tu carrito está vacío.</p>';
    document.getElementById('total-carrito').textContent = 'Total: $0';
    document.getElementById('cuenta-carrito').textContent = '0'; // Actualizar el contador del carrito
}

// Formatear monto en ARS
function formatearMonto(monto) {
    return monto.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
    });
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productos-container')) {
        crearTarjetasProductosInicio(guitarras);
    }
    
    if (document.getElementById('carrito-container')) {
        mostrarCarrito();
        document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
    }

    actualizarContadorCarrito();
});
