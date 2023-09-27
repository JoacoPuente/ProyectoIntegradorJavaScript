const menuHam = document.querySelector(".nav-list");
const openMenu = document.querySelector("#abrir");
const closeMenu = document.querySelector("#cerrar");
const cartNumber = document.querySelector(".cart-number");
const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const buyBtn = document.querySelector(".btn-buy");
const deleteBtn = document.querySelector(".btn-delete");
const productsContainer = document.querySelector(".products-container");
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const showMoreBtn = document.querySelector(".btn-load");
const successModal = document.querySelector(".add-modal");
const sesionBtn = document.querySelector(".hero-button");
const logoutBtn = document.getElementById("logout-message");

// SESIONES----------------------------------------------------------------------------------

// Función determina si el usuario está conectado

const isUserLoggedIn = () => sessionStorage.getItem("activeUser") !== null;

// Nos traemos el usuario del sessionStorage
const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));

// Función de logout
const logout = () => {
  if (window.confirm("¿Estas seguro que deseas cerrar sesión?")) {
    sessionStorage.removeItem("activeUser");
    window.location.href = "./index.html";
  }
};

// Función que muestra o oculta los botones de sesion

const toggleAuthenticationButtons = () => {
  if (!isUserLoggedIn()) {
    logoutBtn.classList.add("hidden");
  } else {
    sesionBtn.classList.add("hidden");
  }
};

//MENU HAMBURGUESA---------------------------------------------------------------------------

//Función que activa o desactiva el menu hamburguesa

const toggleMenu = () => {
  menuHam.classList.toggle("visible");

  if (menuHam.classList.contains("visible")) {
    openMenu.classList.remove("abrir-menu");
    openMenu.classList.add("hidden");
    closeMenu.classList.add("cerrar-menu");
  } else {
    closeMenu.classList.remove("cerrar-menu");
    openMenu.classList.remove("hidden");
    openMenu.classList.add("abrir-menu");
  }

  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

// Función para cerrar el menú hamburguesa y el overlay cuando se hace click en un link

const closeOnClick = (e) => {
  if (!e.target.classList.contains("navbar-link")) return;
  menuHam.classList.remove("visible");
  closeMenu.classList.remove("cerrar-menu");
  openMenu.classList.add("abrir-menu");
  overlay.classList.remove("show-overlay");
};

//Función para cerrar el menú hamburguewsa y el overlay cuando se hace scroll
const closeOnScroll = () => {
  if (
    !menuHam.classList.contains("visible") &&
    !cartMenu.classList.contains("open-cart")
  )
    return;

  menuHam.classList.remove("visible");
  closeMenu.classList.remove("cerrar-menu");
  openMenu.classList.add("abrir-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

//Función para cerrar el menú hamburguewsa y el overlay cuando se hace click en el overlay
const closeOnOverlayClick = () => {
  menuHam.classList.remove("visible");
  closeMenu.classList.remove("cerrar-menu");
  openMenu.classList.add("abrir-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

//MAIN------------------------------------------------------------------------------------

let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Función para crear la card del producto

const createProductTemplate = (product) => {
  const { id, name, price, cardImg } = product;
  return `
  <div class="product">
  <img src="${cardImg}" alt="${name}" />
  <div class="product-info">
    <h3>${name}</h3>

    <span>$${price}</span>

    <button
      class="btn-add"
      data-id="${id}"
      data-name="${name}"
      data-price="${price}"
      data-img="${cardImg}"
    >
      Agregar 🛒
    </button>
  </div>
</div>`;
};

//Función que renderiza y añade una lista de productos al contenedor de productos

const renderProducts = (productList) => {
  productsContainer.innerHTML += productList
    .map(createProductTemplate)
    .join("");
};

// Lógica de los filtros

// Función para cambiar el estado de los botones de las categorias

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};

//Función para cambiar el estado del filtro activo

const changeFilterState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  changeBtnActiveState(appState.activeFilter);
  setShowMoreVisibility(appState.activeFilter);
};

// Función para si el elemento que se apretó es un boton de categoria y no esta activo
const isInactiveFilterBtn = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};

// funcion para aplicar el filtro cuando se apreta un boton de categoria

const applyFilter = (event) => {
  const { target } = event;
  console.log(target);
  if (!isInactiveFilterBtn(target)) return;
  productsContainer.innerHTML = "";

  changeFilterState(target);
  if (appState.activeFilter) {
    renderFilteredProducts();
    appState.currentProductsIndex = 0;
    return;
  }

  renderProducts(appState.products[0]);
};

// Función para filtar los productos por categoría y renderizarlos

const renderFilteredProducts = () => {
  const filteredProducts = productsData.filter(
    (product) => product.category === appState.activeFilter
  );
  renderProducts(filteredProducts);
};

// función para mostrar el modal de éxito al agregar o añadir un producto

const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg;
  setTimeout(() => {
    successModal.classList.remove("active-modal");
  }, 1500);
};

// Ver más //

//Función que determina si el índice actual de productos es el último en el límite de productos.

const isLastIndexOf = () => {
  return appState.currentProductsIndex === appState.productsLimit - 1;
};

// Función para renderizar mas productos cuando la persona apariete ver más

const showMoreProducts = () => {
  appState.currentProductsIndex += 1;
  let { products, currentProductsIndex } = appState;
  renderProducts(products[currentProductsIndex]);
  if (isLastIndexOf()) {
    showMoreBtn.classList.add("hidden");
  }
};

// función para mostrar u ocultar el boton de ver más

const setShowMoreVisibility = () => {
  if (!appState.activeFilter) {
    showMoreBtn.classList.remove("hidden");
    return;
  }
  showMoreBtn.classList.add("hidden");
};

//CARRITO DE COMPRAS---------------------------------------------------------------------------

// Función para mostrar u ocultar el menu hamburguesa y el overlay

const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (menuHam.classList.contains("visible")) {
    menuHam.classList.remove("visible");
    closeMenu.classList.remove("cerrar-menu");
    openMenu.classList.add("abrir-menu");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

// Función para crear el template de un producto en el carrito

const createCartProductTemplate = (cartProduct) => {
  const { id, name, price, img, quantity } = cartProduct;
  return `    
    <div class="cart-item">
      <img src=${img} alt=${img} />
      <div class="item-info">
        <h3 class="item-title">${name}</h3>
        <h4 class="item-price">$${price}</h4>
      </div>
      <div class="item-handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
      </div>
    </div>`;
};

// Función para renderizar los productos del carrito o el mensaje "No hay productos en el carrito"

const renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
    return;
  }
  productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};

// Función para obtener el total de la compra

const getCartTotal = () => {
  return cart.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0);
};

// Función para mostrar el total de la compra

const showCartTotal = () => {
  total.innerHTML = `$${getCartTotal()}`;
};

// Función para actualizar la burbuja de cantidad con el numero de productos en el carrito

const renderCartNumber = () => {
  cartNumber.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
};

// función para habilitar o deshabilitar un boton segun corresponda

const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};

// función para guardar el carrito en el localStorage
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// función para modificar el estado del carrito

const updateCartState = () => {
  saveCart();
  renderCart();
  showCartTotal();
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  renderCartNumber();
};

// Función para crear un objeto con info del producto a agregar del carrito

const createProductData = ({ id, name, price, img }) => {
  return {
    id,
    name,
    price,
    img,
  };
};

//Función para saber si un producto ya existe en el carrito

const isExistingCartProduct = (product) => {
  return cart.find((item) => item.id === product.id);
};

// Función para agregar una unidad a un producto que ya este en el el carrito

const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  );
};

// Función para crear un objeto con la info del producto que se quiere agregar al carrito

const createCartPorduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};

// Función para crear un objeto con la información del producto que se agrega al carrito

const addProduct = (e) => {
  if (!isUserLoggedIn()) {
    alert("Debes iniciar sesión para agregar productos al carrito.");
    document.getElementById("hero").scrollIntoView({ behavior: "smooth" });
    return;
  }

  if (!e.target.classList.contains("btn-add")) return;
  const product = createProductData(e.target.dataset);
  if (isExistingCartProduct(product)) {
    addUnitToProduct(product);
    ("Se agregó una unidad del producto al carrito");
  } else {
    createCartPorduct(product);
    showSuccessModal("El producto se ha agregado al carrito");
  }
  updateCartState();
};

// Función para agregar mas de cada producto del carrito

const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  addUnitToProduct(existingCartProduct);
};

// Función para restar de cada producto del carrito

const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);

  if (existingCartProduct.quantity === 1) {
    if (window.confirm("¿Desea eliminar el producto del carrito?")) {
      removeProductFromCart(existingCartProduct);
    }
    return;
  }
  subtractProductUnit(existingCartProduct);
};

// Función para remover un producto del carrito

const removeProductFromCart = (product) => {
  cart = cart.filter((item) => item.id !== product.id);
  updateCartState();
};

// Función para restar una unidad a un producto del carrito

const subtractProductUnit = (product) => {
  cart = cart.map((item) => {
    return item.id === product.id
      ? { ...item, quantity: Number(item.quantity) - 1 }
      : item;
  });
};

// Función para manejar los eventos al apretar el botón mas o menos del item del carrito

const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    handlePlusBtnEvent(e.target.dataset.id);
  }

  updateCartState();
};

// Función para vaciar el carrito

const resetCartItems = () => {
  cart = [];
  updateCartState();
};

// Función para completar la compra o vaciar le carrito

const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItems();
    alert(successMsg);
  }
};

// Función para disparar un mensaje de compra existosa
const completeBuy = () => {
  completeCartAction("¿Desea completar su compra?", "¡Gracias por su compra!");
};

// Función para disparar el mensaje de vaciado exitoso del carrito
const deleteCart = () => {
  completeCartAction(
    "¿Desea vaciar el carrito?",
    "¡No hay productos en el carrito!"
  );
};

const init = () => {
  openMenu.addEventListener("click", toggleMenu);
  closeMenu.addEventListener("click", toggleMenu);
  menuHam.addEventListener("click", closeOnClick);
  renderProducts(appState.products[0]);
  logoutBtn.addEventListener("click", logout);
  showMoreBtn.addEventListener("click", showMoreProducts);
  categoriesContainer.addEventListener("click", applyFilter);
  cartBtn.addEventListener("click", toggleCart);
  window.addEventListener("scroll", closeOnScroll);
  overlay.addEventListener("click", closeOnOverlayClick);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showCartTotal);
  productsContainer.addEventListener("click", addProduct);
  productsCart.addEventListener("click", handleQuantity);
  buyBtn.addEventListener("click", completeBuy);
  deleteBtn.addEventListener("click", deleteCart);
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  renderCartNumber(cart);
  toggleAuthenticationButtons();
};

init();
