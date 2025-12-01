document.addEventListener('DOMContentLoaded', () => {
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

  // Toggle al hacer clic en el botón hamburguesa
  toggle?.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Cerrar al hacer clic en el backdrop
  backdrop.addEventListener('click', closeMenu);

  // Cerrar al hacer clic en un enlace del menú
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && !link.hasAttribute('data-open')) {
      closeMenu();
    }
  });

  // Cerrar con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
    }
  });

  // Gestión del modal de formulario
  const modal = document.getElementById('bformulario');
  const btnsCta = document.querySelectorAll('[data-open="#bformulario"]');
  const btnsClose = modal?.querySelectorAll('[data-close], .cerrar');

  btnsCta.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal?.setAttribute('aria-hidden', 'false');
      modal?.style.setProperty('display', 'flex');
      document.body.classList.add('menu-lock');
      closeMenu(); // Cerrar menú si está abierto
    });
  });

  btnsClose?.forEach(btn => {
    btn.addEventListener('click', () => {
      modal?.setAttribute('aria-hidden', 'true');
      modal?.style.setProperty('display', 'none');
      document.body.classList.remove('menu-lock');
    });
  });

  // Cerrar modal al hacer clic fuera
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.setAttribute('aria-hidden', 'true');
      modal.style.setProperty('display', 'none');
      document.body.classList.remove('menu-lock');
    }
  });
});