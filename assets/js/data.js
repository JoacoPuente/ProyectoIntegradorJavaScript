const productsData = [
  {
    id: 1,
    name: "Mouse Pad con gel 'Bosque Encantado'",
    price: 5400,
    category: "bosque",
    cardImg: "./assets/imgs/Productos/Bosque/bosque-gel-1.png",
  },
  {
    id: 2,
    name: "Mouse Pad chico 'Bosque Encantado'",
    price: 8700,
    category: "bosque",
    cardImg: "./assets/imgs/Productos/Bosque/bosque-chico-1.png",
  },
  {
    id: 3,
    name: "Mouse Pad grande 'Bosque Encantado'",
    price: 12000,
    category: "bosque",
    cardImg: "./assets/imgs/Productos/Bosque/bosque-grande-1.png",
  },
  {
    id: 4,
    name: "Mouse Pad con gel 'Océano Profundo'",
    price: 5400,
    category: "oceano",
    cardImg: "./assets/imgs/Productos/oceano/oceano-gel-1.png",
  },
  {
    id: 5,
    name: "Mouse Pad chico 'Océano Profundo'",
    price: 8700,
    category: "oceano",
    cardImg: "./assets/imgs/Productos/oceano/oceano-chico-1.png",
  },
  {
    id: 6,
    name: "Mouse Pad grande 'Océano Profundo'",
    price: 12000,
    category: "oceano",
    cardImg: "./assets/imgs/Productos/oceano/oceano-grande-1.png",
  },
  {
    id: 7,
    name: "Mouse Pad con gel 'Cielo Estrellado'",
    price: 5400,
    category: "cielo",
    cardImg: "./assets/imgs/Productos/cielo/cielo-gel-1.png",
  },
  {
    id: 8,
    name: "Mouse Pad chico 'Cielo Estrellado'",
    price: 8700,
    category: "cielo",
    cardImg: "./assets/imgs/Productos/cielo/cielo-chico-1.png",
  },
  {
    id: 9,
    name: "Mouse Pad grande 'Cielo Estrellado'",
    price: 12000,
    category: "cielo",
    cardImg: "./assets/imgs/Productos/cielo/cielo-grande-1.png",
  },
  {
    id: 10,
    name: "Mouse Pad con gel 'Desierto al Atardecer'",
    price: 5400,
    category: "desierto",
    cardImg: "./assets/imgs/Productos/desierto/desierto-gel-1.png",
  },
  {
    id: 11,
    name: "Mouse Pad chico 'Desierto al Atardecer'",
    price: 8700,
    category: "desierto",
    cardImg: "./assets/imgs/Productos/desierto/desierto-chico-1.png",
  },
  {
    id: 12,
    name: "Mouse Pad grande 'Desierto al Atardecer'",
    price: 12000,
    category: "desierto",
    cardImg: "./assets/imgs/Productos/desierto/desierto-grande-1.png",
  },
];

const divideProductsInParts = (size) => {
  let productsList = [];
  for (let i = 0; i < productsData.length; i += size) {
    productsList.push(productsData.slice(i, i + size));
  }
  return productsList;
};

const appState = {
  products: divideProductsInParts(6),
  currentProductsIndex: 0,
  productsLimit: divideProductsInParts(6).length,
  activeFilter: null,
};
