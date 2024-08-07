
const guitarras = [{
        id: 1,
        nombre: "Guitarra",
        img: "./img/productos/1.jpg",
        cuerdas: 6,
        categoria: "Guitar",
        precio: 700000,
        stock: 7
    },
    {
        id: 2,
        nombre: "Guitarra 7",
        cuerdas: 7,
        categoria: "Guitar",
        precio: 800000,
        stock: 5
    },
    {
        id: 3,
        nombre: "Bajo",
        cuerdas: 4,
        categoria: "Bass",
        precio: 790000,
        stock: 3
    },
    {
        id: 4,
        nombre: "Bajo Five",
        cuerdas: 5,
        categoria: "Bass",
        precio: 890000,
        stock: 3
    },
    {
        id: 5,
        nombre: "Calibracion Guitarra",
        cuerdas: 6,
        categoria: "Setup",
        precio: 20000,
        stock: 10
    },
    {
        id: 6,
        nombre: "Calibracion Bajo",
        cuerdas: 4,
        categoria: "Setup",
        precio: 20000,
        stock: 10
    }
]

// Función para agregar un nuevo producto
function agregarProducto(nuevoProducto) {

    if (!nuevoProducto.id || !nuevoProducto.nombre || !nuevoProducto.cuerdas || !nuevoProducto.categoria || !nuevoProducto.precio || !nuevoProducto.stock) {
        console.error("Todos los campos son obligatorios.");
        return;
    }
    
    const productoExiste = guitarras.some(producto => producto.id === nuevoProducto.id);
    if (productoExiste) {
        console.error("El producto con este ID ya existe.");
        return;
    }
    
    guitarras.push(nuevoProducto);
    console.log("Producto agregado:", nuevoProducto);
}
/*
agregarProducto({
    id: 7,
    nombre: "Guitarra Electrica",
    img: "./img/productos/7.jpg",
    cuerdas: 6,
    categoria: "Guitar",
    precio: 700000,
    stock: 8
});


agregarProducto({
    id: 8,
    nombre: "Bajo Electrico",
    img: "./img/productos/8.jpg",
    cuerdas: 4,
    categoria: "Guitar",
    precio: 700000,
    stock: 3
});

*/


// Función para generar stock aleatorio
function generarStockAleatorio(min = 3, max = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function actualizarStockAleatorio() {
guitarras.forEach(producto => {
producto.stock = generarStockAleatorio(); 
});
console.log("Stock actualizado:", guitarras);
}

actualizarStockAleatorio();







function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const contadorCarrito = document.getElementById('cuenta-carrito');
    const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    contadorCarrito.textContent = cantidadTotal;
}

function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();

    const productoEnCarrito = carrito.find(item => item.id === producto.id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito(); // Actualiza el contador del carrito

    console.log("Agregaste este producto al carrito", producto);
}


document.addEventListener('DOMContentLoaded', () => {
    crearTarjetasProductosInicio(guitarras);
    actualizarContadorCarrito(); // Asegúrate de que el contador esté actualizado al cargar la página
});


const contenedorTarjetas = document.getElementById("productos-container");

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function crearTarjetasProductosInicio(productos) {
    productos.forEach(producto => {
        const nuevaGuitarra = document.createElement("div");
        nuevaGuitarra.classList = "tarjeta-producto";
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

        // Agregar el evento click al botón
        nuevaGuitarra.getElementsByTagName("button")[0].addEventListener("click", () => {
            agregarAlCarrito(producto);
        });
    });
}

function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();

    const productoEnCarrito = carrito.find(item => item.id === producto.id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito(); // Actualiza el contador del carrito

    console.log("Agregaste este producto al carrito", producto);
}

function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const contadorCarrito = document.getElementById('cuenta-carrito');
    const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    contadorCarrito.textContent = cantidadTotal;
}

// document.addEventListener('DOMContentLoaded', () => {
//     crearTarjetasProductosInicio(guitarras);
//     actualizarContadorCarrito(); // Asegúrate de que el contador esté actualizado al cargar la página
// });


