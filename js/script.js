// CARRUSEL SWIPER
const swiper = new Swiper('.carrusel-servicios', {
  slidesPerView: 3,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  speed: 800,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    // ≤768px: 1 slide (responsivo)
    0: {
      slidesPerView: 1
    },
    // >768px: 3 slides (desktop)
    768: {
      slidesPerView: 3
    }
  }
});

// VALIDACIÓN DEL FORMULARIO DE CONTACTO
const form = document.getElementById("form-contacto");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const mensajeError = document.getElementById("mensaje-error");

form.addEventListener("submit", function (e) {
  mensajeError.style.display = "none";
  mensajeError.textContent = "";

  const nombreValido = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,50}$/.test(nombre.value.trim());
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

  if (!nombreValido) {
    e.preventDefault();
    mensajeError.textContent = "Por favor ingresá un nombre válido (solo letras y espacios).";
    mensajeError.style.display = "block";
    nombre.focus();
    return;
  }
  if (!emailValido) {
    e.preventDefault();
    mensajeError.textContent = "Por favor ingresá un correo electrónico válido.";
    mensajeError.style.display = "block";
    email.focus();
    return;
  }
});

// ASIGNACIÓN DINÁMICA DE LA ACTION (oculta el mail en el HTML)
document.addEventListener("DOMContentLoaded", () => {
  const formContacto = document.getElementById("form-contacto");
  const user = "rumbocomunicacion1";
  const domain = "gmail.com";
  formContacto.action = `https://formsubmit.co/${user}@${domain}`;
});
