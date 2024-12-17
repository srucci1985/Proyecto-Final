// Función para generar el array de productos
function generarProductos() {
    // Crear el array de productos con un atributo de imagen
    const productos = [
      {
        id: 1,
        name: 'Edward Kenway',
        description: 'Este producto es increíble, tiene características excepcionales y un precio competitivo.',
        amount: 10000.00,
        image: '../img/23-figurine-funko-pop-assassin-s-creed-edward-kenway.jpg'  // Ruta relativa a la carpeta img
      },
      {
        id: 2,
        name: 'Altair Ibn La Ahad',
        description: 'Este producto es ideal para personas que buscan calidad y buen precio.',
        amount: 15050.25,
        image: '../img/20-figurine-funko-pop-assassin-s-creed-altair-ibn-la-ahad.jpg'  // Ruta relativa a la carpeta img
      },
      {
        id: 3,
        name: 'Ezio Auditore',
        description: 'Con este producto, tendrás una experiencia única que no encontrarás en otro lugar.',
        amount: 25690.99,
        image: '../img/21-figurine-funko-pop-assassin-s-creed-ezio-auditore.jpg'  // Ruta relativa a la carpeta img
      },
      {
        id: 4,
        name: 'Connor Kenway',
        description: 'Ideal para quienes buscan durabilidad y un diseño elegante.',
        amount: 23487.75,
        image: '../img/22-figurine-funko-pop-assassin-s-creed-connor-kenway.jpg'  // Ruta relativa a la carpeta img
      }
    ];
  
    // Mostrar los productos en la consola
    console.log(productos);
  
    // Obtener el contenedor donde se agregarán los productos
    const contenedor = document.getElementById('productos-container');
  
    // Iterar sobre el array de productos y crear el HTML correspondiente
    productos.forEach(producto => {
      // Crear un div para cada producto
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');
  
      // Crear el contenido HTML para cada producto
      productoDiv.innerHTML = `
        <h3>${producto.name}</h3>
        <img src="${producto.image}" alt="${producto.name}">
        <p><strong>Precio:</strong> $${producto.amount}</p>
      <button class="btn-descripcion" id="verDescripcionBtn_${producto.id}">Descripción Ampliada</button>
      <div id="descripcion_${producto.id}" class="descripcion-ampliada" style="display:none;"></div>
      <div id="tresPuntos_${producto.id}" class="tres-puntos" style="display:none;">
          <button class="btn-tres-puntos">...</button>
        </div>
      <button id="agregarCarritoBtn_${producto.id}" class="btn-carrito">Añadir al Carrito</button>
      `;
  
      // Agregar el producto al contenedor
      contenedor.appendChild(productoDiv);
  
      // Obtener el botón de "Ver Descripción Ampliada"
      const botonDescripcion = document.getElementById(`verDescripcionBtn_${producto.id}`);
      // Obtener el contenedor donde se mostrará la descripción
      const descripcionContenedor = document.getElementById(`descripcion_${producto.id}`);
      // Obtener el contenedor de los tres puntos
      const tresPuntosContenedor = document.getElementById(`tresPuntos_${producto.id}`);

      // Asignar el evento de click al botón
      botonDescripcion.addEventListener('click', () => {
        // Al hacer clic, mostrar la descripción ampliada
        descripcionContenedor.textContent = producto.description;  // Añadir la descripción ampliada
        descripcionContenedor.style.display = 'block';  // Hacer visible el contenedor
        botonDescripcion.style.display = 'none';  // Ocultar el botón después de hacer clic
        tresPuntosContenedor.style.display = 'block';  // Mostrar los tres puntos
      });
      // Obtener el botón de "Tres Puntos" para ocultar la descripción
      const botonTresPuntos = document.querySelector(`#tresPuntos_${producto.id} .btn-tres-puntos`);
        
      // Asignar el evento de click a los tres puntos
      botonTresPuntos.addEventListener('click', () => {
        // Al hacer clic en los tres puntos, ocultar la descripción y mostrar el botón
        descripcionContenedor.style.display = 'none';  // Ocultar la descripción
        botonDescripcion.style.display = 'block';  // Mostrar el botón de descripción ampliada
        tresPuntosContenedor.style.display = 'none';  // Ocultar los tres puntos
      });
          // Obtener el botón de "Añadir al Carrito"
      const botonCarrito = document.getElementById(`agregarCarritoBtn_${producto.id}`);

        // Asignar el evento de click para añadir al carrito
        botonCarrito.addEventListener('click', () => {
        agregarAlCarrito(producto);  // Llamar a la función que añade al carrito
        });

    });
  }

  // Función para añadir un producto al carrito en localStorage
function agregarAlCarrito(producto) {
    // Obtener el carrito del localStorage (si existe)
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    // Comprobar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);
  
    if (productoExistente) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      productoExistente.cantidad += 1;
    } else {
      // Si el producto no está en el carrito, añadirlo
      producto.cantidad = 1;  // Establecer cantidad inicial
      carrito.push(producto);
    }

    // Calcular el total
    let total = 0.00;
    carrito.forEach(item => {
        // Asegurarnos de que el precio es un número válido
        const precio = parseFloat(item.amount);
        if (isNaN(precio)) {
            console.error(`Precio inválido para el producto: ${item.nombre}`);
        } else {
            total += precio * item.cantidad; // Multiplicamos el precio por la cantidad
        }
    });

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    // Guardar el total actualizado en localStorage también
    localStorage.setItem('total', total.toFixed(2));

    // Actualizar el carrito visualmente
    actualizarCarrito();
  }
  
  // Función para actualizar el carrito visualmente
  function actualizarCarrito() {
    // Obtener el carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Si no hay carrito, total debe ser 0
    let total = 0.00;

    // Si el carrito no está vacío, calculamos el total
    if (carrito.length > 0) {
        // Obtener el total desde localStorage, si está presente
        total = parseFloat(localStorage.getItem('total')) || 0.00;

        // Iterar sobre los productos del carrito
        const carritoList = document.getElementById('carrito-list');
        carritoList.innerHTML = ''; // Limpiar el contenido del carrito

        // Mostrar los productos del carrito
        carrito.forEach(producto => {
            const itemCarrito = document.createElement('li');
            itemCarrito.textContent = `${producto.name} - $${producto.amount} x ${producto.cantidad}`;
            carritoList.appendChild(itemCarrito);
        });
    } else {
        // Si el carrito está vacío, mostramos un mensaje
        const carritoList = document.getElementById('carrito-list');
        carritoList.innerHTML = '<li>El carrito está vacío</li>';
    }

    // Mostrar el total actualizado en el HTML
    const totalElement = document.getElementById('total-carrito');
    totalElement.textContent = `Total: $${total.toFixed(2)}`; // Mostrar total con 2 decimales
}

  
  // Función para ver el carrito (opcional)
  function verCarrito() {
    // Podrías redirigir a otra página o mostrar un modal con los detalles del carrito
    alert('¡Ver carrito completo no implementado aún completamente!');
  }
  
  function borrarCarrito() {
    // Eliminar el carrito del localStorage
    localStorage.removeItem('carrito');
    localStorage.removeItem('total');
    // Actualizar la interfaz de usuario (vaciar la lista de productos en el carrito y el total)
    actualizarCarrito();
  }
  // Inicializar los productos y el carrito
  generarProductos();
  actualizarCarrito();