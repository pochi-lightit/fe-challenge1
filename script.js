/* 
- ✅ Indicar en qué HTML se cargan los elementos de la URL
- ✅ Cargar los primeros 6 elementos
- ✅ Indicar la interacción con el Load more button
- ✅ Paginado (número de página e items por página)
-   Search
-   Order by
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

//Cargo los primeros 6 elementos
const getInitialProducts = (products) => {
  console.log(
    "Este es el listado de productos que recibe getInitialProducts ",
    products
  );

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
      <img
        class="heartIcon"
        src="/challenge1/media/Icons/Heart.svg"
        alt="heart icon"
        title="add to Favorites"
      />
    </div>`;

  return productCard;
};

//Sorting
const sortBy = () => {
  console.log("this is sort by ", sortOption.value);

  productsSorted = [...productsArray];

  if (sortOption.value === "none") {
    productsSorted = productsArray;
  }

  if (sortOption.value === "price-low") {
    productsSorted = productsArray.sort((a, b) => a.price - b.price);
  }

  if (sortOption.value === "price-high") {
    productsSorted = productsArray.sort((a, b) => b.price - a.price);
  }

  if (sortOption.value === "name-A") {
    productsSorted = productsArray.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  if (sortOption.value === "name-Z") {
    productsSorted = productsArray.sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  productCardContainer.innerHTML = "";
  getInitialProducts(productsSorted);
  return productsSorted;
};
document.addEventListener("DOMContentLoaded", getAllProducts());

const loadButton = document.getElementById("load-btn");
loadButton.addEventListener("click", () => getProducts());

const sortOption = document.getElementById("sort");
sortOption.addEventListener("change", sortBy);

// localStorage.setItem("allProducts", JSON.stringify(productsArray));
// console.log(localStorage);
