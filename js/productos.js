
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

document.addEventListener('DOMContentLoaded', () => {
    fetch('./js/db.json')
        .then(response => response.json())
        .then(data => {
            const guitarras = data;
            crearTarjetasProductosInicio(guitarras);
            actualizarContadorCarrito();
        })
        .catch(error => console.error('Error cargando el archivo JSON:', error));
});


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

// Función para generar stock aleatorio
function generarStockAleatorio(min = 3, max = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Actualizar el stock de todos los productos con valores aleatorios
function actualizarStockAleatorio() {
    guitarras.forEach(producto => producto.stock = generarStockAleatorio()); 
    console.log("Stock actualizado:", guitarras);
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
    console.log("Agregaste este producto al carrito", producto);
}


function crearTarjetasProductosInicio(productos) {
    const contenedorTarjetas = document.getElementById("productos-container");
    contenedorTarjetas.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas tarjetas

    productos.forEach(producto => {
        const nuevaGuitarra = document.createElement("div");
        nuevaGuitarra.classList.add("tarjeta-producto");
        nuevaGuitarra.innerHTML = `
            <img src="${producto.img || './img/productos/default.jpg'}" alt="Producto ${producto.id}">
            <h3>${producto.nombre}</h3>
            <p>Cuerdas: ${producto.cuerdas}</p>
            <p>Categoria: ${producto.categoria}</p>
            <p>ID: ${producto.id}</p>
            <p>Stock: ${producto.stock}</p>
            <p class="precio">$${producto.precio}</p>
            <button data-id="${producto.id}">Agregar al carrito</button>`;

        contenedorTarjetas.appendChild(nuevaGuitarra);

        // Agregar el evento click al botón
        nuevaGuitarra.querySelector("button").addEventListener("click", () => {
            agregarAlCarrito(producto);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    crearTarjetasProductosInicio(guitarras);
    actualizarContadorCarrito();
});

actualizarStockAleatorio();