const cartMenu = document.querySelector(".cart");
const menuHam = document.querySelector(".nav-list");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (menuHam.classList.contains("visible")) {
    menuHam.classList.remove("visible");
    cerrar.classList.remove("cerrar-menu");
    abrir.classList.add("abrir-menu");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

const carritoinit = () => {
  cartBtn.addEventListener("click", toggleCart);
};

carritoinit();
