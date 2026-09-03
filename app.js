// Base de datos de productos estructurada por subcategorías
const productosData = {
  "laptops-nuevas": [
    {
      nombre: "Laptop Dell Vostro 3400",
      descripcion: "Core i5 11ª Gen, 8GB RAM, 256GB SSD, Pantalla 14\" FHD.",
      precio: "$650.00",
      imagen: "https://via.placeholder.com/300x200?text=Laptop+Dell",
      sku: "LAP-NEW-01"
    },
    {
      nombre: "Laptop HP ProBook 450 G8",
      descripcion: "Core i7 11ª Gen, 16GB RAM, 512GB SSD, Pantalla 15.6\" FHD.",
      precio: "$890.00",
      imagen: "https://via.placeholder.com/300x200?text=Laptop+HP",
      sku: "LAP-NEW-02"
    }
  ],
  "laptops-usadas": [
    {
      nombre: "Lenovo ThinkPad T480 (Reacondicionada)",
      descripcion: "Core i5 8ª Gen, 16GB RAM, 256GB SSD. Estado 9/10.",
      precio: "$380.00",
      imagen: "https://via.placeholder.com/300x200?text=ThinkPad+T480",
      sku: "LAP-USD-01"
    }
  ],
  "pc-mesa": [
    {
      nombre: "PC Ensamblada Workstation i7",
      descripcion: "Core i7 12ª Gen, 32GB RAM, SSD NVMe 1TB, GPU RTX 3060.",
      precio: "$1,250.00",
      imagen: "https://via.placeholder.com/300x200?text=PC+Workstation",
      sku: "PC-DESK-01"
    }
  ],
  "cases": [
    {
      nombre: "Case Gamer Mid-Tower RGB",
      descripcion: "Panel de vidrio templado, incluye 4 ventiladores RGB.",
      precio: "$65.00",
      imagen: "https://via.placeholder.com/300x200?text=Case+Gamer",
      sku: "CASE-01"
    }
  ]
};

// Función para cargar los productos en la pantalla
function cargarProductos(categoriaKey, titulo) {
  const grid = document.getElementById("grid-productos");
  const tituloElemento = document.getElementById("titulo-categoria");
  const subtituloElemento = document.getElementById("subtitulo-categoria");

  tituloElemento.textContent = titulo;
  grid.innerHTML = ""; // Limpiar contenido previo

  const productos = productosData[categoriaKey];

  if (!productos || productos.length === 0) {
    grid.innerHTML = `<p style="color:#a0aec0; grid-column: 1/-1;">Próximamente agregaremos productos a la categoría <strong>${titulo}</strong>.</p>`;
    return;
  }

  // Generar HTML de cada producto
  productos.forEach(producto => {
    const mensajeWA = encodeURIComponent(`Hola FREE SERVER, deseo información o comprar el equipo: ${producto.nombre} (Ref: ${producto.sku})`);
    const linkWA = `https://wa.me/593983278876?text=${mensajeWA}`;

    const card = document.createElement("div");
    card.className = "producto-card";
    card.innerHTML = `
      <div>
        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
        <h3 class="producto-titulo">${producto.nombre}</h3>
        <p class="producto-descripcion">${producto.descripcion}</p>
      </div>
      <div>
        <div class="producto-precio">${producto.precio}</div>
        <a href="${linkWA}" target="_blank" rel="noopener" class="btn-comprar-wa">
          Cotizar por WhatsApp
        </a>
      </div>
    `;
    grid.appendChild(card);
  });

  // Desplazamiento suave hasta la sección de productos
  document.getElementById("tienda-productos").scrollIntoView({ behavior: 'smooth' });
}