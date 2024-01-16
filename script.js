/* 
1. Indicar en qué HTML se cargan los elementos de la URL
2. Indicar la interacción con el Load more button
3. Paginado (número de página e items por página)

 */

import axios from "https://cdn.skypack.dev/axios";

let productsArray;
let currentPage = 1;
let itemsPerPage = 9;

//indico el container de los productos
const productCardContainer = document.getElementById("products-container");

//me traigo los productos de la url
const getProducts = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    let productsArray = response.data.products;
    console.log("resultado del axios ", productsArray);

    //inserto una card por cada producto que me traigo de la url
    productsArray.forEach((product) => {
      const productCard = createProductCard(product);
      productCardContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error(error);
  }
};

//Recreo la card con cada producto que me traigo de la url
const createProductCard = (product) => {
  const productCard = document.createElement("div");
  productCard.classList.add("product");
  productCard.innerHTML = `<img src="${product.images[0]}" alt="${product.name}" />
    <h3>"${product.title}"</h3>
    <p>"${product.description}"</p>
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

loadButton.addEventListener("click", () => {
  getProducts();
});
