const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  const menuHeader = document.querySelector('.menu-header');
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


document.getElementById("myForm").addEventListener("submit", function(event) {
    const captchaCheckbox = document.getElementById("captchaCheckbox");
    const errorMessage = document.getElementById("errorMessage");

    // Verificamos si el captcha está marcado
    if (!captchaCheckbox.checked) {
        event.preventDefault(); // Evita el envío del formulario
        errorMessage.style.display = "block"; // Muestra el mensaje de error
    } else {
        errorMessage.style.display = "none"; // Oculta el mensaje de error si está marcado
        alert("Formulario enviado correctamente.");
    }
});


  