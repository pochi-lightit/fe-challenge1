/* 
- Indicar en qué HTML se cargan los elementos de la URL
- Cargar los primeros 6 elementos
- Indicar la interacción con el Load more button
- Paginado (número de página e items por página)

 */

import axios from "https://cdn.skypack.dev/axios";

let productsArray;
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

const getInitialProducts = (productsArray) => {
  console.log(productsArray);

  for (let i = 0; i < itemsPerPage; i++) {
    const productCard = createProductCard(productsArray[i]);
    productCardContainer.appendChild(productCard);
    // console.log("check ", i);
  }
  return ++currentPage;
};

//me traigo más productos de la url
const getProducts = (productsArray) => {
  console.log("This is the current page ", currentPage);
  let initialProduct = currentPage * itemsPerPage;
  console.log(initialProduct);
  let finalProduct = itemsPerPage * (currentPage + 1);
  console.log(finalProduct);

  //inserto un nuevo set de cards por cada click al boton

  for (let i = initialProduct; i < finalProduct; i++) {
    const productCard = createProductCard(productsArray[i]);
    productCardContainer.appendChild(productCard);
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

const loadButton = document.getElementById("load-btn");
loadButton.addEventListener("click", () => getProducts(productsArray));

document.addEventListener("DOMContentLoaded", getAllProducts());
