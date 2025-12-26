document.addEventListener('DOMContentLoaded', () => {
  // Solo hacer scroll al inicio si no hay hash en la URL
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }

  // Manejo de formularios Formspree
  const formspreeFormsWrapper = document.querySelectorAll('form[action*="formspree.io"]');
  
  formspreeFormsWrapper.forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Redirección inmediata sin esperar respuesta para evitar notificación de Formspree
      window.location.href = 'gracias.html';
      
      // Enviar formulario en segundo plano
      try {
        fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        });
      } catch (error) {
        // Silenciar errores ya que la redirección ya ocurrió
        console.log('Formulario enviado, redirigiendo...');
      }
    });
  });

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

  // NAVEGACIÓN DEL MENÚ - Permitir navegación completamente normal
  // No hacer nada especial con los clics en enlaces, dejar que el navegador maneje la navegación

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

  // Enviar TODOS los formularios a Formspree
  auditoriaForms?.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Crear FormData para enviar a Formspree
      const formData = new FormData(form);
      
      // Enviar a Formspree
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          alert('✅ Gracias por tu solicitud. Nos pondremos en contacto contigo lo antes posible.');
          cerrarAuditoriaModal();
          form.reset();
          // Volver a la primera pestaña
          auditoriaTabs[0]?.click();
        } else {
          throw new Error('Error en el envío');
        }
      }).catch(error => {
        alert('❌ Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
        console.error('Error:', error);
      });
    });
  });

  // ====== FILTRADO DE PROYECTOS ======
  const filterButtons = document.querySelectorAll('.filter-btn');
  const proyectoItems = document.querySelectorAll('.proyecto-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover clase active de todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Añadir clase active al botón clickeado
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      proyectoItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'todos') {
          // Mostrar todos
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else if (category === filter) {
          // Mostrar solo los que coinciden
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          // Ocultar los que no coinciden
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Inicializar estilos de transición para proyectos
  proyectoItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    item.style.opacity = '1';
    item.style.transform = 'scale(1)';
  });

});


