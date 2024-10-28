const hamburger = document.getElementById('hamburger');
const menuHeader = document.querySelector('.menu-header');

hamburger.addEventListener('click', () => {
    menuHeader.classList.toggle('show'); // Agrega o quita la clase 'show'
});

// Obtener el botón "Añadir al carrito"
const addToCartButton = document.querySelector('.add-to-cart');

// Obtener el elemento span que contiene el contador
const itemCount = document.querySelector('.cart-icon .item-count');

// Variable para llevar el conteo de los productos en el carrito
let cartCount = 0;

// Agregar un evento al botón para incrementar el contador
addToCartButton.addEventListener('click', () => {
    cartCount++; // Incrementar el contador
    itemCount.textContent = cartCount; // Actualizar el valor del span con el nuevo contador
});
