let productosData = {};

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
    
  inicializarEventos();
});

function cargarProductos(categoriaKey, titulo) {
  const grid = document.getElementById("grid-productos");
  const tituloElemento = document.getElementById("titulo-categoria");

  if (!grid) return;

  if (tituloElemento) tituloElemento.textContent = titulo;
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
          <img src="${producto.imagen || ''}" alt="${producto.nombre}" class="producto-imagen" loading="lazy" onerror="this.style.display='none'">
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

  const secProductos = document.getElementById("tienda-productos");
  if (secProductos) {
    secProductos.scrollIntoView({ behavior: 'smooth' });
  }
}

function abrirModal(producto) {
  const imgModal = document.getElementById('modal-img');
  if (imgModal) {
    imgModal.src = producto.imagen || '';
    imgModal.alt = producto.nombre;
  }
  
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
// CONTROL DEL MENÚ MÓVIL
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.nav-item.dropdown');

  // Abrir / cerrar menú principal al presionar la hamburguesa
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
    });
  }

  // Desplegar submenús al tocar categorías en móviles
  dropdowns.forEach(dropdown => {
    const toggleBtn = dropdown.querySelector('.dropdown-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    }
  });

  // Cerrar menú al hacer clic fuera de él
  document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active')) {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
      }
    }
  });
});