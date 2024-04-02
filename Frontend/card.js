let card_container = document.getElementById("card_container");
let sortSelect = document.getElementById("sortSelect");
let url = `https://pixel-prerana-2345.onrender.com/products?_page=1&_limit=10`;
let pagination_btn = document.getElementById("pagination_btn");
let products = [];
let page = 1;
let perPage = 14;
let isLoading = false;

// loadFetchdata();

async function loadFetchdata() {
  if (isLoading) return;""
  isLoading = true;

  try {
    let res = await fetch(url);
    let newProducts = await res.json();
    if (newProducts.length === 0) {
      // No more data to load
      window.removeEventListener("scroll", handleScroll);
      return;
    }
    products = [...products, ...newProducts];
    card_container(newProducts);
    page++;
    isLoading = false;
  } catch (error) {
    console.log("Error: ", error);
    isLoading = false;
  }
}

///pagination start
async function fetchData(link, query) {
  try {
    let res = await fetch(`${link}${query || ""}`);
    let dat = await res.json();
    console.log(dat);
    //for pagination 
    let TotalData = res.headers.get('X-Total-Count');
    let limit = 5;
    let totalPages = Math.ceil(TotalData / limit);
    //to create button
    pagination_btn.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      let btn = document.createElement("button");
      btn.classList.add("pagebtn");
      btn.innerText = i;

      btn.addEventListener("click", () => {
        card_container.innerHTML = "";
        fetchData(`${url}&_page=${i}&_limit=16`);
      })
      pagination_btn.append(btn);

    }

    //creating elements from array and appending to main container

    dat.forEach((item) => {
      card_container.append(card_creator(item));

    })
  } catch (err) { console.log(err) }
}
fetchData(url);

//sorting function
sortSelect.addEventListener('change', () => {
  if (sortSelect.value == "priceLowToHigh") {
    pagination_btn.innerHTML = "";
    fetchData(`${url}`, "&_sort=Price");
  } else if (sortSelect.value == "priceHighToLow") {
    pagination_btn.innerHTML = "";
    fetchData(`${url}`, "&_sort=Price&_order=desc")
  }
})






//card creation loop
function create_card(data) {
  data.forEach((element) => {
    let card = card_creator(element);
    card_container.append(card);
  });
}

// card creation part
function card_creator(element) {
  let card = document.createElement("div");
  card.classList.add("card");

  // Create card elements...
  let card_img = document.createElement("div");
  card_img.classList.add("card-image");

  let img = document.createElement("img");
  img.src = element.Img[0];
  img.alt = element.Title;

  let second_img = document.createElement("div");
  second_img.classList.add("second-image");
  second_img.style.backgroundImage = `url(${element.Img[1]})`;

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

  card_img.append(img, second_img, heart_icon, span);

  let card_container = document.createElement("div");

  card_container.classList.add("card-content");

  let card_title = document.createElement("div");

  card_title.classList.add("card-title");
  card_title.innerText = element.Title;

  let card_price = document.createElement("div");

  card_price.classList.add("card-price");
  card_price.innerText = `₹${element.Price}`;

  let card_action = document.createElement("div");

  card_action.classList.add("card-actions");

  let button = document.createElement("button");
  button.classList.add("check-delivery-button");
  button.innerText = "Check Delivery Date";
  
  // Add event listener to navigate to productinfo.html on button click
  button.addEventListener("click", () => {
    window.location.href = url;
  });



  card_action.append(button);

  card_container.append(card_title, card_price, card_action);

  card.append(card_img, card_container);

  return card;
}




function handleScroll() {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    !isLoading
  ) {
    loadFetchdata();
  }
}

window.addEventListener("scroll", handleScroll);

document.getElementById("sortSelect").addEventListener("change", function () {
  let sortValue = this.value;
  let sortedProducts = [];

  switch (sortValue) {
    case "bestMatches":
      sortedProducts = products;
      break;
    case "bestSellers":
      sortedProducts = products.filter((product) => product.bestSeller);
      break;
    case "newArrivals":
      sortedProducts = products.filter((product) => product.newArrival);
      break;
    case "popularity":
      sortedProducts = products.sort((a, b) => b.popularity - a.popularity);
      break;
    case "priceLowToHigh":
      sortedProducts = products.sort((a, b) => a.Price - b.Price);
      break;
    case "priceHighToLow":
      sortedProducts = products.sort((a, b) => b.Price - a.Price);
      break;
    default:
      sortedProducts = products;
  }

  card_container.innerHTML = "";
  create_card(sortedProducts);
});










