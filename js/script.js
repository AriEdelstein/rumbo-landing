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


document.addEventListener('DOMContentLoaded', () => {
  const data = window.trabajosData;
  const wrapper = document.querySelector('#trabajos .swiper-wrapper');

  // 1) Generar los slides
  data.forEach(proy => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.innerHTML = `
      <div class="trabajo-card">
        <img src="assets/trabajos/${proy.id}/${proy.images[0]}" alt="${proy.title}">
        <span class="label">${proy.title}</span>
        <button class="ver-mas" data-id="${proy.id}">Ver más</button>
      </div>`;
    wrapper.append(slide);
  });

  // 2) Inicializar Swiper de Trabajos
  const swiperTrab = new Swiper('.carrusel-trabajos', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      nextEl: '.trabajos-next',
      prevEl: '.trabajos-prev'
    },
    pagination: {
      el: '.trabajos-pagination',
      clickable: true
    },
    breakpoints: {
      0:   { slidesPerView: 1 },
      768: { slidesPerView: 3 }
    }
  });

  // 3) Lógica del Modal
  const modal = document.getElementById('modal-trabajos');
  const modalWrapper = modal.querySelector('.modal-swiper .swiper-wrapper');
  const cerrar = modal.querySelector('.modal-cerrar');
  let modalSwiper; // instancia del Swiper interno

  // función para abrir modal de un proyecto
  function abrirModal(id) {
    // vaciar y poblar
    modalWrapper.innerHTML = '';
    const proyecto = data.find(p => p.id === id);
    proyecto.images.forEach(img => {
      const s = document.createElement('div');
      s.classList.add('swiper-slide');
      s.innerHTML = `<img src="assets/trabajos/${id}/${img}" alt="">`;
      modalWrapper.append(s);
    });

    // inicializar o re-inicializar Swiper
    if (modalSwiper) modalSwiper.destroy(true, true);
    modalSwiper = new Swiper('.modal-swiper', {
      navigation: {
        nextEl: '.modal-next',
        prevEl: '.modal-prev'
      },
      pagination: {
        el: '.modal-pagination',
        clickable: true
      }
    });

    modal.style.display = 'flex';
  }

  // cerrar modal
  cerrar.addEventListener('click', () => modal.style.display = 'none');
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // asignar evento a cada botón “Ver más”
  document.querySelectorAll('.ver-mas').forEach(btn => {
    btn.addEventListener('click', () => abrirModal(btn.dataset.id));
  });
});
