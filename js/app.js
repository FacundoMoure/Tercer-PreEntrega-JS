// Función filtrado de productos con operador ternario

document.addEventListener('keyup', e => {

    if (e.target.matches('#buscador')) {
        document.querySelectorAll('.tarjeta-producto').forEach(card => {
            card.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ? card.classList.remove('filtro')
            : card.classList.add('filtro');
        })
    }
})

// Obtén el contenedor de tarjetas
const contenedorTarjetas = document.getElementById("productos-container");


/** Crea las tarjetas de productos teniendo en cuenta la lista en productos.js */
/*
function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevaGuitarra = document.createElement("div");
    nuevaGuitarra.classList = "tarjeta-producto"
    nuevaGuitarra.innerHTML = `
    <img src="./img/productos/${producto.id}.jpg" alt="Producto 1">
    <h3>${producto.nombre}</h3>
    <p>Cuerdas: ${producto.cuerdas}</p>
    <p>Categoria: ${producto.categoria}</p>
    <p>ID: ${producto.id}</p>
    <p>Stock: ${producto.stock}</p>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`
    contenedorTarjetas.appendChild(nuevaGuitarra);
    nuevaGuitarra.getElementsByTagName("button")[0].addEventListener("click",() => 
    console.log("Agregaste este producto al carrito"))
  });
}
crearTarjetasProductosInicio(guitarras);

*/

// productos.js


// Función para obtener el carrito del localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Función para guardar el carrito en el localStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para crear las tarjetas de productos
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

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();

    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(item => item.id === producto.id);

    if (productoEnCarrito) {
        // Si el producto ya está en el carrito, solo incrementa la cantidad
        productoEnCarrito.cantidad += 1;
    } else {
        // Si el producto no está en el carrito, agrégalo con cantidad 1
        carrito.push({ ...producto, cantidad: 1 });
    }

    // Guardar el carrito actualizado en el localStorage
    guardarCarrito(carrito);

    // Confirmar que se ha agregado el producto
    console.log("Agregaste este producto al carrito", producto);
}

// Asegúrate de que esta función se llama con el array de productos adecuado
document.addEventListener('DOMContentLoaded', () => {
    // Aquí deberías cargar los productos desde algún lugar
    crearTarjetasProductosInicio(guitarras);
});
