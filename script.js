document.addEventListener('DOMContentLoaded', () => {
  // Forzar scroll al inicio al cargar
  window.scrollTo(0, 0);

  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  
  // Crear backdrop si no existe
  let backdrop = document.querySelector('.menu-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'menu-backdrop';
    document.body.appendChild(backdrop);
  }

  function openMenu() {
    nav.classList.add('open');
    toggle?.setAttribute('aria-expanded', 'true');
    backdrop.classList.add('show');
    document.body.classList.add('menu-lock');
  }

  function closeMenu() {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    backdrop.classList.remove('show');
    document.body.classList.remove('menu-lock');
  }

  // Toggle menú
  toggle?.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Cerrar al hacer clic en backdrop
  backdrop.addEventListener('click', closeMenu);

  // Cerrar al hacer clic en enlaces
  nav?.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && !link.hasAttribute('data-open')) {
      closeMenu();
    }
  });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu();
      }
    });
  });

 