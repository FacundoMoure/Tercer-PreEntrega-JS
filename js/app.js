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
        // Si el producto ya está en el carrito, solo incrementa la cantidad
        productoEnCarrito.cantidad += 1;
    } else {
        // Si el producto no está en el carrito, agrégalo con cantidad 1
        carrito.push({ ...producto, cantidad: 1 });
    }


    guardarCarrito(carrito);

    console.log("Agregaste este producto al carrito", producto);
}


document.addEventListener('DOMContentLoaded', () => {
    crearTarjetasProductosInicio(guitarras);
});
