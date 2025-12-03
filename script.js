document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);

  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  
  let backdrop = document.querySelector('.menu-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'menu-backdrop';
    document.body.appendChild(backdrop);
  }

  function openMenu() {
    nav?.classList.add('open');
    toggle?.setAttribute('aria-expanded', 'true');
    backdrop.classList.add('show');
    document.body.classList.add('menu-lock');
  }

  function closeMenu() {
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    backdrop.classList.remove('show');
    document.body.classList.remove('menu-lock');
  }

  toggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);

  nav?.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && !link.classList.contains('btn-cta') && !link.hasAttribute('data-open-auditoria')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav?.classList.contains('open')) {
      closeMenu();
    }
  });

  // ====== FORMULARIO DE AUDITORÍA (NUEVO) ======
  const auditoriaModal = document.getElementById('auditoria-modal');
  const auditoriaOpenBtns = document.querySelectorAll('[data-open-auditoria]');
  const auditoriaCloseBtn = auditoriaModal?.querySelector('.auditoria-close');
  const auditoriaTabs = auditoriaModal?.querySelectorAll('.auditoria-tab');
  const auditoriaPanels = auditoriaModal?.querySelectorAll('.auditoria-panel');
  const auditoriaForms = auditoriaModal?.querySelectorAll('[data-auditoria-form]');

  // Abrir modal
  auditoriaOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      auditoriaModal?.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-lock');
      closeMenu();
    });
  });

  // Cerrar modal
  function cerrarAuditoriaModal() {
    auditoriaModal?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-lock');
  }

  auditoriaCloseBtn?.addEventListener('click', cerrarAuditoriaModal);

  auditoriaModal?.addEventListener('click', (e) => {
    if (e.target === auditoriaModal) {
      cerrarAuditoriaModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && auditoriaModal?.getAttribute('aria-hidden') === 'false') {
      cerrarAuditoriaModal();
    }
  });

  // Cambiar pestañas
  auditoriaTabs?.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.auditoriaTab;
      
      auditoriaTabs.forEach(t => {
        t.classList.remove('auditoria-tab-active');
        t.setAttribute('aria-selected', 'false');
      });
      auditoriaPanels.forEach(p => p.classList.remove('auditoria-panel-active'));
      
      tab.classList.add('auditoria-tab-active');
      tab.setAttribute('aria-selected', 'true');
      document.getElementById(`panel-${targetTab}`)?.classList.add('auditoria-panel-active');
    });
  });

  // Enviar TODOS los formularios (Marketing, UX, Desarrollo, Contacto)
  auditoriaForms?.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('✅ Gracias por tu solicitud. Nos pondremos en contacto contigo lo antes posible.');
      cerrarAuditoriaModal();
      form.reset();
      // Volver a la primera pestaña
      auditoriaTabs[0]?.click();
    });
  });
});

