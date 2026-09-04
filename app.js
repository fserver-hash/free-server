let productosData = {};

// Cargar catálogo desde productos.json al iniciar
document.addEventListener('DOMContentLoaded', () => {
  fetch('productos.json')
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar productos.json");
      return response.json();
    })
    .then(data => {
    productosData = data;
    console.log("Catálogo FREE SERVER cargado correctamente.");
    cargarProductos('cctv', 'Cámaras y Seguridad CCTV');
  })
  .catch(error => console.error("Error en la carga del catálogo:", error));
  
  // Configuración de eventos del modal y menú
  inicializarEventos();
});

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
      const mensajeWA = encodeURIComponent(`Hola FREE SERVER, deseo información sobre el equipo: ${producto.nombre} (Ref: ${producto.sku || 'N/A'})`);
      const linkWA = `https://wa.me/593983278876?text=${mensajeWA}`;

      const card = document.createElement("div");
      card.className = "producto-card";
      card.innerHTML = `
        <div>
          <img src="${producto.imagen || 'img/productos/placeholder.jpg'}" alt="${producto.nombre}" class="producto-imagen" loading="lazy">
          <h3 class="producto-titulo">${producto.nombre}</h3>
          <p class="producto-descripcion">${producto.descripcion}</p>
        </div>
        <div>
          <div class="producto-precio">${producto.precio}</div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn-ver-detalle" data-producto='${JSON.stringify(producto).replace(/'/g, "&#39;")}'>
              🔍 Ver detalles
            </button>
            <a href="${linkWA}" target="_blank" rel="noopener" class="btn-comprar-wa" style="flex:1;">
              💬 Cotizar
            </a>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    document.querySelectorAll('.btn-ver-detalle').forEach(btn => {
      btn.addEventListener('click', function() {
        const producto = JSON.parse(this.dataset.producto);
        abrirModal(producto);
      });
    });
  }

  document.getElementById("tienda-productos").scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// FUNCIONES DEL MODAL
// ==========================================
function abrirModal(producto) {
  document.getElementById('modal-img').src = producto.imagen || 'img/productos/placeholder.jpg';
  document.getElementById('modal-img').alt = producto.nombre;
  document.getElementById('modal-nombre').textContent = producto.nombre;
  document.getElementById('modal-sku').textContent = `Código: ${producto.sku || 'N/A'}`;
  document.getElementById('modal-descripcion').textContent = producto.descripcion;
  document.getElementById('modal-precio').textContent = producto.precio;

  const listaEspec = document.getElementById('modal-especificaciones');
  listaEspec.innerHTML = '';
  if (producto.especificaciones && producto.especificaciones.length > 0) {
    producto.especificaciones.forEach(esp => {
      const li = document.createElement('li');
      li.textContent = esp;
      listaEspec.appendChild(li);
    });
  } else {
    listaEspec.innerHTML = '<li>No hay especificaciones disponibles.</li>';
  }

  const listaIncluye = document.getElementById('modal-incluye');
  listaIncluye.innerHTML = '';
  if (producto.incluye && producto.incluye.length > 0) {
    producto.incluye.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      listaIncluye.appendChild(li);
    });
  } else {
    listaIncluye.innerHTML = '<li>No se especifican accesorios incluidos.</li>';
  }

  document.getElementById('modal-garantia').innerHTML = `🛡️ Garantía: <strong>${producto.garantia || 'No especificada'}</strong>`;
  document.getElementById('modal-stock').innerHTML = `📦 Stock: <strong>${producto.stock || 'Consultar'}</strong>`;

  const mensajeWA = encodeURIComponent(`Hola FREE SERVER, deseo información sobre: ${producto.nombre} (Ref: ${producto.sku || 'N/A'})`);
  document.getElementById('modal-whatsapp').href = `https://wa.me/593983278876?text=${mensajeWA}`;

  document.getElementById('modal-producto').classList.add('activo');
  document.getElementById('modal-overlay').classList.add('activo');
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  document.getElementById('modal-producto').classList.remove('activo');
  document.getElementById('modal-overlay').classList.remove('activo');
  document.body.style.overflow = '';
}

function inicializarEventos() {
  const btnCerrar = document.getElementById('modal-cerrar');
  const overlay = document.getElementById('modal-overlay');

  if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);
  if (overlay) overlay.addEventListener('click', cerrarModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModal();
  });

  // Menú móvil
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.querySelector('.nav-links');
  const overlayMenu = document.getElementById('overlay-menu');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('abierto');
      if (overlayMenu) overlayMenu.classList.toggle('visible');
    });
  }
}