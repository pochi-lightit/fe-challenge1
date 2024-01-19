/* 
- ✅ Indicar en qué HTML se cargan los elementos de la URL
- ✅ Cargar los primeros 6 elementos
- ✅ Indicar la interacción con el Load more button
- ✅ Paginado (número de página e items por página)
- ✅ Search
 - Aplicar el orderby al search result
- ✅ Order by
- Favorites
 */

import axios from "https://cdn.skypack.dev/axios";

let productsArray;
let productsSorted;
let currentPage = 0;
let itemsPerPage = 6;
let productsURL = "https://dummyjson.com/products";

//indico el container de los productos
const productCardContainer = document.getElementById("products-container");

//guardo los productos en una única axios call
const getAllProducts = async () => {
  try {
    const response = await axios.get(productsURL);
    productsArray = response.data.products;
  } catch {
    console.error(error);
  }
  getInitialProducts(productsArray);
  return productsArray;
};

//Cargo los primeros 6 elementos desordenados
const getInitialProducts = (products) => {
  currentPage = 0;

  for (let i = 0; i < itemsPerPage; i++) {
    const productCard = createProductCard(products[i]);
    productCardContainer.appendChild(productCard);
    // console.log("check ", i);
  }
  return ++currentPage;
};

//me traigo más productos de la url, chequeo si hay un sort aplicado
const getProducts = () => {
  let initialProduct = currentPage * itemsPerPage;
  let finalProduct = itemsPerPage * (currentPage + 1);
  let productCard;
  console.log("These are the productsSorted ", productsSorted);
  //inserto un nuevo set de cards por cada click al boton

  //si están ordenados, recorro la lista ordenada
  if (productsSorted !== undefined) {
    for (let i = initialProduct; i < finalProduct; i++) {
      console.log("entró en products sorted");
      productCard = createProductCard(productsSorted[i]);
      productCardContainer.appendChild(productCard);
    }
  } else {
    for (let i = initialProduct; i < finalProduct; i++) {
      console.log("entró en products NOT sorted");
      productCard = createProductCard(productsArray[i]);
      productCardContainer.appendChild(productCard);
    }
  }
  return ++currentPage;
};

//Recreo la card con cada producto que me traigo de la url
const createProductCard = (product) => {
  const productCard = document.createElement("div");

  function toggleFavorite(id) {
    console.log("this is the id ", id);
  }

  productCard.classList.add("product");
  productCard.innerHTML = `
  <div class='productHead'>
    <div class="productImage">
    <img src=${product.images[0]} alt=${product.name} />
    </div>
    <h3>${product.title}</h3>
    <p>${product.description}</p>
  </div>
    <div class="price">
      <p>
        € <a>${product.price}</a>
      </p>
      <button class="favorite">
      <img
        class="heartIcon"
        src="./media/Icons/Heart.svg"
        alt="heart icon"
        title="add to Favorites"
        onclick="toggleFavorite(${product.id})"
      />
      <img
        class="heartIcon"
        src="./media/Icons/Heart-full.svg"
        alt="added to Favorites"
        title="remove from Favorites"
        hidden
      />
      </button>
    </div>`;

  return productCard;
};

//Sorting
const sortBy = () => {
  console.log("this is sort by ", sortOption.value);

  if (sortOption.value === "none") {
    productsSorted = undefined;
    console.log("None: ", productsSorted);
    productCardContainer.innerHTML = "";
    console.log(productsArray);
    getInitialProducts(productsArray);
    return;
  }

  productsSorted = [...productsArray];
  if (sortOption.value === "price-low") {
    productsSorted = productsSorted.sort((a, b) => a.price - b.price);
  }

  if (sortOption.value === "price-high") {
    productsSorted = productsSorted.sort((a, b) => b.price - a.price);
  }

  if (sortOption.value === "name-A") {
    productsSorted = productsSorted.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  if (sortOption.value === "name-Z") {
    productsSorted = productsSorted.sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  productCardContainer.innerHTML = "";
  getInitialProducts(productsSorted);
  return productsSorted;
};
document.addEventListener("DOMContentLoaded", getAllProducts());

// Favorites
let favoriteProducts = JSON.parse(localStorage.getItem("favorites")) || [];
console.log(favoriteProducts);

favoriteProducts.forEach((favorite) => {
  document.getElementById(favorite).className = "favorite";
});

const handleFavorite = (productId) => {};
// const addFavorite = (product) => {
//   console.log(product);
//   favoriteProducts.push(product);
//   localStorage.setItem("favorites", favoriteProducts);
//   console.log(
//     "This is the local storage ",
//     localStorage,
//     "and this the favorties array ",
//     favoriteProducts
//   );
// };

//Search
const handleSearch = (searchInput) => {
  let filteredProducts = [...productsArray];

  filteredProducts = filteredProducts.filter((product) => {
    return product.title.toLowerCase().includes(searchInput.toLowerCase());
  });

  productCardContainer.innerHTML = "";
  getInitialProducts(filteredProducts);
  return filteredProducts;
};

//!Event listeners
//Search & Input
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = document.querySelector("#searchBar input").value;
  handleSearch(searchInput);
});

//Load more
const loadButton = document.getElementById("load-btn");
loadButton.addEventListener("click", () => getProducts());

//Sorting
const sortOption = document.getElementById("sort");
sortOption.addEventListener("change", sortBy);

//Favorites

//!Buscar un approach con onClick > me permite acceder a los atributos
