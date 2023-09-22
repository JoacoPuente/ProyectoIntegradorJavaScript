const productsContainer = document.querySelector(".products-container");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const showMoreBtn = document.querySelector(".btn-load");
const buyBtn = document.querySelector(".btn-buy");
const cartNumber = document.querySelector(".cart-number");
const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart");
const successModal = document.querySelector(".add-modal");
const deleteBtn = document.querySelector(".btn-delete");

// seteamos el carrito
// let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

const renderProducts = (productList) => {
  productsContainer.innerHTML += productList
    .map(createProductTemplate)
    .join("");
};

// Ver más //

const isLastIndexOf = () => {
  return appState.currentProductsIndex === appState.productsLimit - 1;
};

// Función par arenderizar mas productos cuando la persona pariete ver más

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

// Lógica de los filtros

// Fucnión para cambiar el estado de los botones del filtro/categorias
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
