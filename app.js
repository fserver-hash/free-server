const productosData = {
  // COMPUTADORAS
  "laptops-nuevas": [
    {
      nombre: "Laptop Dell Vostro 3400",
      descripcion: "Core i5 11ª Gen, 8GB RAM, 256GB SSD, Pantalla 14\" FHD.",
      precio: "$650.00",
      imagen: "https://via.placeholder.com/300x200?text=Laptop+Dell",
      sku: "LAP-NEW-01"
    }
  ],
  "laptops-usadas": [
    {
      nombre: "Lenovo ThinkPad T480",
      descripcion: "Core i5 8ª Gen, 16GB RAM, 256GB SSD. Reacondicionada A++.",
      precio: "$380.00",
      imagen: "https://via.placeholder.com/300x200?text=ThinkPad+T480",
      sku: "LAP-USD-01"
    }
  ],
  "pc-mesa": [],
  "cases": [],
  "pc-usadas": [],
  "monitores": [],

  // ALMACENAMIENTO (Subcategorías agregadas)
  "discos-solidos": [
    {
      nombre: "SSD Kingston NV2 1TB NVMe M.2",
      descripcion: "Velocidad de lectura de hasta 3500MB/s.",
      precio: "$82.00",
      imagen: "https://via.placeholder.com/300x200?text=SSD+NVMe+1TB",
      sku: "ALM-SSD-01"
    }
  ],
  "discos-mecanicos": [
    {
      nombre: "Disco Duro Western Digital Blue 2TB",
      descripcion: "3.5 pulgadas, 7200 RPM, SATA III 6Gb/s.",
      precio: "$65.00",
      imagen: "https://via.placeholder.com/300x200?text=HDD+2TB",
      sku: "ALM-HDD-01"
    }
  ],
  "micro-sd": [],
  "memorias-flash": [],
  "discos-externos": [],

  // OTRAS CATEGORÍAS
  "memorias-ram": [],
  "punto-de-venta": [],
  "camaras": [],
  "celulares": []
};

function cargarProductos(categoriaKey, titulo) {
  const grid = document.getElementById("grid-productos");
  const tituloElemento = document.getElementById("titulo-categoria");

  if (!grid) return;

  tituloElemento.textContent = titulo;
  grid.innerHTML = "";

  const productos = productosData[categoriaKey];

  if (!productos || productos.length === 0) {
    grid.innerHTML = `<p style="color:#a0aec0; grid-column: 1/-1; text-align:center; font-size: 1.1rem; padding: 40px 0;">Próximamente agregaremos productos disponibles en <strong>${titulo}</strong>.</p>`;
  } else {
    productos.forEach(producto => {
      const mensajeWA = encodeURIComponent(`Hola FREE SERVER, deseo información sobre el equipo: ${producto.nombre} (Ref: ${producto.sku})`);
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
  }

  document.getElementById("tienda-productos").scrollIntoView({ behavior: 'smooth' });
}
// ==========================================
// MENÚ HAMBURGUESA PARA MÓVIL
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const overlay = document.getElementById('overlay-menu');

  function toggleMenu() {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('abierto');
    overlay.classList.toggle('visible');
    document.body.style.overflow = navMenu.classList.contains('abierto') ? 'hidden' : '';
  }

  function cerrarMenu() {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('abierto');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', cerrarMenu);

  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      // Si es un enlace que carga productos, esperar un poco
      if (this.getAttribute('onclick')) {
        setTimeout(cerrarMenu, 300);
      } else {
        cerrarMenu();
      }
    });
  });

  // Manejar los desplegables en móvil (Computadoras y Almacenamiento)
  document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      const menu = this.nextElementSibling;
      if (window.innerWidth <= 768) {
        e.preventDefault();
        menu.classList.toggle('abierto');
      }
    });
  });
});