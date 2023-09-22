const menuHam = document.querySelector(".nav-list");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

const openMenu = () => {
  // Alternar la visibilidad del menú
  menuHam.classList.toggle("visible");

  // Si el menú es visible (lo que significa que se acaba de abrir)
  if (menuHam.classList.contains("visible")) {
    abrir.classList.remove("abrir-menu");
    abrir.classList.add("hidden");
    cerrar.classList.add("cerrar-menu");
  } else {
    cerrar.classList.remove("cerrar-menu");
    abrir.classList.remove("hidden");
    abrir.classList.add("abrir-menu");
  }
  overlay.classList.toggle("show-overlay");
};

const closeOnClick = (e) => {
  if (!e.target.classList.contains("navbar-link")) return;
  menuHam.classList.remove("visible");
  overlay.classList.remove("show-overlay");
};

function menuHamInit() {
  abrir.addEventListener("click", openMenu);
  cerrar.addEventListener("click", openMenu);
  menuHam.addEventListener("click", closeOnClick);
}

menuHamInit();
