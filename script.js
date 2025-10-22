function mostrarMensaje() {
    // Muestra el mensaje al hacer clic en el enlace
    document.getElementById("mensaje").style.display = "block";
}

function cerrarMensaje() {
    // Cierra el mensaje cuando el usuario hace clic en "Cerrar"
    document.getElementById("mensaje").style.display = "none";
}

// Mostrar el modal al hacer clic en el botón
document.getElementById("btnaqui").addEventListener("click", function () {
    document.getElementById("bformulario").style.display = "block";
  });
  
  // Cerrar el modal al hacer clic en la 'X'
  document.querySelector(".cerrar").addEventListener("click", function () {
    document.getElementById("bformulario").style.display = "none";
  });
  
  // Cerrar el modal si el usuario hace clic fuera del contenido
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("bformulario");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  // Mostrar mensaje de confirmación al enviar el formulario de ayuda (btnaqui)
// Mostrar mensaje de confirmación al enviar el formulario de ayuda (btnaqui)
document.querySelector('#bformulario form').addEventListener('submit', function(e) {
  e.preventDefault();
  this.style.display = 'none';
  const mensaje = document.createElement('div');
  mensaje.style.margin = '30px 0';
  mensaje.style.textAlign = 'center';
  mensaje.style.fontSize = '18px';
  mensaje.style.color = '#28a745';
  mensaje.innerHTML = '¡Gracias! Nos pondremos en contacto contigo lo antes posible.';
  this.parentNode.appendChild(mensaje);
});
 

  // test ux
 // Espera a que cargue el DOM completo
// Abrir el modal
document.getElementById("btntest").addEventListener("click", function () {
  document.getElementById("btest-ux").style.display = "block";
});

// Cerrar el modal al hacer clic en la X
document.querySelectorAll('.btest .cerrar').forEach(function(btn) {
  btn.onclick = function() {
    document.querySelector('.btest').style.display = 'none';
  };
});

// Cerrar el modal si se hace clic fuera del contenido
window.addEventListener("click", function (e) {
  const modal = document.getElementById("btest-ux");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});





  //resultados suma del test

 

function calcularResultado() {
  const form = document.getElementById('ux-test');
  const resultadoDiv = document.getElementById('resultado-test');
  const email = document.getElementById('email-usuario').value;
  const btnEnviar = document.getElementById('btn-enviar-test');
  const btnReiniciar = document.getElementById('btn-reiniciar-test');

  let total = 0;
  let respondidas = 0;

  for (let i = 1; i <= 9; i++) {
    const respuesta = form.querySelector(`input[name="p${i}"]:checked`);
    if (respuesta) {
      total += parseInt(respuesta.value);
      respondidas++;
    }
  }

  if (respondidas < 9) {
    alert("Por favor, responde todas las preguntas.");
    return;
  }

  let mensajeFinal = "";
  if (total >= 8) {
    mensajeFinal = "🔝 ¡Tu sitio web está muy bien optimizado en UX!";
  } else if (total >= 5) {
    mensajeFinal = "🛠️ Puedes mejorar varias áreas clave para potenciar tu web.";
  } else {
    mensajeFinal = "⚠️ Necesitas una revisión completa de UX.";
  }

  resultadoDiv.innerHTML = `
    <p><strong>Puntuación:</strong> ${total}/9</p>
    <p>${mensajeFinal}</p>
    <p>Enviaremos tu resultado al correo: <strong>${email}</strong></p>
  `;
  resultadoDiv.style.display = "block";

  // Oculta el botón de enviar y muestra el de reiniciar
  btnEnviar.style.display = "none";
  btnReiniciar.style.display = "block";

  // Desliza hacia el resultado
  setTimeout(() => {
    resultadoDiv.scrollIntoView({ behavior: "smooth" });
  }, 300);

  // Envía el correo
  emailjs.sendForm("service_bzgrlze", "template_test", form)
    .then(function (response) {
      console.log("Enviado ✅", response);
      alert("¡Te hemos enviado tu resultado por correo!");
    }, function (error) {
      console.error("Error ❌", error);
      alert("Hubo un problema al enviar el correo.");
    });
}

// Reiniciar el test
document.getElementById('btn-reiniciar-test').onclick = function() {
  const form = document.getElementById('ux-test');
  form.reset();
  document.getElementById('resultado-test').style.display = "none";
  this.style.display = "none";
  document.getElementById('btn-enviar-test').style.display = "block";
  // Opcional: desliza hacia arriba al inicio del test
  form.scrollIntoView({ behavior: "smooth" });
};

// Envío accesible del formulario de ayuda
const formAyuda = document.getElementById('form-ayuda');
const confirmAyuda = document.getElementById('confirm-ayuda');

if (formAyuda) {
  formAyuda.addEventListener('submit', function (e) {
    e.preventDefault();

    // validación simple
    const nombre = formAyuda.nombre.value.trim();
    const email = formAyuda.email.value.trim();
    const mensaje = formAyuda.mensaje.value.trim();
    if (!nombre || !email || !mensaje) {
      // mostrar error visible y enfocar primer campo vacío
      confirmAyuda.style.display = 'block';
      confirmAyuda.className = 'bform-confirm';
      confirmAyuda.textContent = 'Por favor completa todos los campos.';
      confirmAyuda.focus?.();
      if (!nombre) formAyuda.nombre.focus();
      else if (!email) formAyuda.email.focus();
      else formAyuda.mensaje.focus();
      return;
    }

    // aquí puedes enviar vía EmailJS o fetch a tu servidor
    // ejemplo con EmailJS (descomenta y rellena ids)
    /*
    emailjs.sendForm('TU_SERVICE_ID','TU_TEMPLATE_ID', formAyuda)
      .then(() => { ... })
      .catch(() => { ... });
    */

    // si no hay envío externo, mostramos confirmación:
    formAyuda.style.display = 'none';
    confirmAyuda.style.display = 'block';
    confirmAyuda.className = 'bform-confirm';
    confirmAyuda.textContent = '¡Gracias! Nos pondremos en contacto contigo lo antes posible.';
    confirmAyuda.setAttribute('tabindex','-1');
    confirmAyuda.focus();

    // aria-hidden toggles para el modal
    const modal = document.getElementById('bformulario');
    if (modal) modal.setAttribute('aria-hidden','true');
  });
}

//# sourceMappingURL=main.js.map
(function() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', function () {
    const opened = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(opened));
    // clase visual opcional para animar el icono
    toggle.classList.toggle('open', opened);
  });
  // cerrar menú al clicar un enlace
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
})();

// HEADER: shrink on scroll + accessible hamburger toggle with smooth open/close
(function () {
  const header = document.querySelector('.cabecera');
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');

  // scroll shrink
  const SHRINK_AT = 56; // px
  function onScroll() {
    if (!header) return;
    if (window.scrollY > SHRINK_AT) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // hamburger toggle
  if (toggle && nav) {
    toggle.addEventListener('click', function (e) {
      const opened = nav.classList.toggle('open');
      toggle.classList.toggle('open', opened);
      toggle.setAttribute('aria-expanded', String(opened));
      // move focus into menu when opening
      if (opened) {
        const firstLink = nav.querySelector('a');
        if (firstLink) firstLink.focus();
      } else {
        toggle.focus();
      }
    });

    // close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('open')) return;
      if (e.target === toggle || nav.contains(e.target)) return;
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });

    // close with Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    // close menu on link click (mobile)
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    }));
  }
})();


