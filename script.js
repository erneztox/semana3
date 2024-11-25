// Base de datos de productos
const productos = [
    { id: 1, nombre: "Pendrive 32GB", precio: 10, categoria: "almacenamiento" },
{ id: 2, nombre: "Cable USB-C", precio: 5, categoria: "cables" },
{ id: 3, nombre: "Memoria SSD 1TB", precio: 80, categoria: "almacenamiento" },
{ id: 4, nombre: "Teclado Mecánico", precio: 50, categoria: "periféricos" },
{ id: 5, nombre: "Ratón Inalámbrico", precio: 20, categoria: "periféricos" },
];

// Referencias al DOM
const searchInput = document.getElementById("product-search");
const searchButton = document.getElementById("search-btn");
const resultsContainer = document.getElementById("results-container");
const carritoContainer = document.getElementById("carrito-container");

// Simulación del carrito de compras
const carrito = [];

// Función para buscar productos
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    resultsContainer.innerHTML = ""; // Limpiar resultados previos

    // Filtrar productos que coincidan con el término de búsqueda
    const resultados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm)
    );

    // Mostrar resultados
    if (resultados.length > 0) {
        resultados.forEach(producto => {
            const productoDiv = document.createElement("div");
            productoDiv.className = "producto";
            productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            `;
            resultsContainer.appendChild(productoDiv);
        });
    } else {
        resultsContainer.innerHTML = `<p>No se encontraron productos.</p>`;
    }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    if (producto) {
        carrito.push(producto);
        mostrarNotificacion(`¡${producto.nombre} fue agregado al carrito!`);
        actualizarCarrito();
    }
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement("div");
    notificacion.className = "notificacion";
    notificacion.innerText = mensaje;

    document.body.appendChild(notificacion);

    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// Función para actualizar el carrito
function actualizarCarrito() {
    carritoContainer.innerHTML = "<h2>Carrito de Compras</h2>"; // Limpiar carrito

    carrito.forEach((producto, index) => {
        const item = document.createElement("div");
        item.className = "carrito-item";
        item.innerHTML = `
        <p>${producto.nombre} - $${producto.precio}</p>
        <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        carritoContainer.appendChild(item);
    });

    // Mostrar el total
    const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);
    const totalDiv = document.createElement("div");
    totalDiv.className = "carrito-total";
    totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
    carritoContainer.appendChild(totalDiv);
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    const eliminado = carrito.splice(index, 1)[0];
    mostrarNotificacion(`¡${eliminado.nombre} fue eliminado del carrito!`);
    actualizarCarrito();
}

// Mostrar promoción al cargar la página
function mostrarPromocion() {
    const promocion = document.createElement("div");
    promocion.className = "promocion";
    promocion.innerText = "¡Promoción! 10% de descuento en productos de almacenamiento.";

    document.body.appendChild(promocion);

    // Ocultar promoción después de 10 segundos
    setTimeout(() => {
        promocion.remove();
    }, 10000);
}

// Listeners
searchButton.addEventListener("click", searchProducts);

// Mostrar promoción
mostrarPromocion();
