let card_creator1 = document.getElementById("card_creator1");

async function loadFetchdata() {
  // if (isLoading) return;
  // isLoading = true;

  let url = `http://localhost:3000/Sheet1`;

  try {
    let res = await fetch(url);
    let newProducts = await res.json();
    newProducts.forEach((item) => {
      card_creator1.append(card_creator(item));


    })
    if (newProducts.length === 0) {
      // No more data to load
      window.removeEventListener("scroll", handleScroll);
      return;
    }
    // products = [...products, ...newProducts];
    // create_card(newProducts);
     console.log(newProducts);
    // page++;
    isLoading = false;
  } catch (error) {
    console.log("Error: ", error);
    // isLoading = false;
  }
}


// function create_card(data) {
//   data.forEach((element) => {
//     let card = card_creator(element);
//     // card_container.append(card);
//     card_creator1.append(card);
//   });

// }



function card_creator(element) {
  let card = document.createElement("div");
  card.classList.add("card");

  // Create card elements...
  let card_img = document.createElement("div");
  card_img.classList.add("card-image");

  let img = document.createElement("img");
  img.src = element.image;
  img.alt = element.title;
  let title = document.createElement( "h2" );
  title.innerText = element.title;
  // let second_img = document.createElement("div");
  // second_img.classList.add("second-image");
  // second_img.style.backgroundImage = `url(${element.Img[1]})`;

  let heart_icon = document.createElement("div");
  heart_icon.classList.add("heart-icon");

  let i = document.createElement("i");
  i.classList.add("fas", "fa-heart");

  heart_icon.append(i);
  heart_icon.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the default behavior
    let wishlistItem = JSON.parse(localStorage.getItem("wishlistItem")) || [];
    wishlistItem.push(element);
    localStorage.setItem("wishlistItem", JSON.stringify(wishlistItem));
  });

  let span = document.createElement("span");
  span.classList.add("wishlist-text");
  span.innerText = "♥";

  card_img.append(img,heart_icon, span);

  let card_container = document.createElement("div");

  card_container.classList.add("card-content");

  let card_title = document.createElement("div");

  card_title.classList.add("card-title");
  card_title.innerText = element.title;

  let card_price = document.createElement("div");

  card_price.classList.add("card-price");
  card_price.innerText = `₹${element.price}`;

  let card_action = document.createElement("div");

  card_action.classList.add("card-actions");

  let button = document.createElement("button");
  button.classList.add("check-delivery-button");
  button.innerText = "Check Delivery Date";

  // Add event listener to navigate to productinfo.html on button click
  button.addEventListener("click", () => {
    window.location.href = `productinfo.html?id=${element.id}`;
  });

  card_action.append(button);

  card_container.append(card_title, card_price, card_action);

  card.append(card_img, card_container);

  return card;
}
loadFetchdata();


// function handleScroll() {
//   if (
//     window.innerHeight + window.scrollY >= document.body.offsetHeight &&
//     !isLoading
//   ) {
//     loadFetchdata();
//   }
// }

// window.addEventListener("scroll", handleScroll);

// document.getElementById("sortSelect").addEventListener("change", function () {
//   let sortValue = this.value;
//   let sortedProducts = [];

//   switch (sortValue) {
//     case "bestMatches":
//       sortedProducts = products;
//       break;
//     case "bestSellers":
//       sortedProducts = products.filter((product) => product.bestSeller);
//       break;
//     case "newArrivals":
//       sortedProducts = products.filter((product) => product.newArrival);
//       break;
//     case "popularity":
//       sortedProducts = products.sort((a, b) => b.popularity - a.popularity);
//       break;
//     case "priceLowToHigh":
//       sortedProducts = products.sort((a, b) => a.Price - b.Price);
//       break;
//     case "priceHighToLow":
//       sortedProducts = products.sort((a, b) => b.Price - a.Price);
//       break;
//     default:
//       sortedProducts = products;
//   }

//   card_container.innerHTML = "";
//   create_card(sortedProducts);
// });

// // search addEventListener

// function create_card(data) {
//   let searchInput = document
//     .getElementById("searchInIphone")
//     .value.toLowerCase();

//   data.forEach((element) => {
//     if (element.Title.toLowerCase().includes(searchInput)) {
//       let card = card_creator(element);
//       card_container.append(card);
//     }
//   });
// }

// document
//   .getElementById("searchInIphone")
//   .addEventListener("input", function () {
//     card_container.innerHTML = "";
//     create_card(products);
//   });