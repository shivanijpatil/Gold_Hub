let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
let wishlistItem = JSON.parse(localStorage.getItem("wishlistItem")) || [];

let wishlistCards = document.getElementsByClassName("wishlist-cards")[0];
let initialwishlist = document.getElementsByClassName("initialwishlist")[0];
let wishlistCardShows = document.getElementById("wishlist-card-shows")[0];

if (wishlistItem.length > 0) {
  initialwishlist.style.display = "none";
  appendData(wishlistItem);
} else {
  initialwishlist.style.display = "block";
}

function appendData(data) {
  wishlistCards.innerHTML = "";
  data.forEach((item, index) => {
    let Card = createCard(item, index);
    // wishlistCards.append(Card);
    wishlistCards.append(Card);
  });
}

function createCard(item, index) {
  let card = document.createElement("div");
  let imgDiv = document.createElement("div");
  let detailsDiv = document.createElement("div");
  let img = document.createElement("img");
  let title = document.createElement("p");
  let price = document.createElement("p");
  let btnDiv = document.createElement("div");
  let removeBtn = document.createElement("button");
  let deleteBtnImg = document.createElement("img");
  let moveTocartBtn = document.createElement("button");

  let removeText = document.createElement("span");
  removeText.innerText = `  Remove`;
  let wishlistText = document.createElement("span");
  wishlistText.innerText = `  Move to Cart`;
  let borderLineBtn = document.createElement("span");
  borderLineBtn.innerText = `|`;
  borderLineBtn.className = "borderLineBtn";

  deleteBtnImg.src =
    "https://www.iconsdb.com/icons/preview/brown/trash-9-xxl.png";
  deleteBtnImg.className = "deleteWishBtnImg";
  img.src = item.Img;
  img.className = "wishlistImage";
  title.innerText = item.Title;
  price.innerText = `₹ ${item.DiscountPrice}`;
  btnDiv.className = "btnDiv";
  card.className = "cardwishlist";
  imgDiv.className = "imgDivCart";
  detailsDiv.className = "detailwish";
  btnDiv.className = "wishBtnDiv";
  title.className = "titleWishlistCart";
  removeBtn.className = "removeBtnWish";
  price.className = "wishlistPrice";
  moveTocartBtn.className=" moveTocartBtn";

  removeBtn.addEventListener("click", (e) => {
    let wishlistItem = JSON.parse(localStorage.getItem("wishlistItem")) || [];
    wishlistItem.splice(index, 1);
    localStorage.setItem("wishlistItem", JSON.stringify(wishlistItem));

    appendData(wishlistItem);
  });

  moveTocartBtn.addEventListener("click", (e) => {
    let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
    let wishlistItem = JSON.parse(localStorage.getItem("wishlistItem")) || [];
    let obj = wishlistItem.splice(index, 1);
    cartItem.push(...obj);

    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    localStorage.setItem("wishlistItem", JSON.stringify(wishlistItem));

    appendData(wishlistItem);
  });

  removeBtn.append(removeText);
  moveTocartBtn.append(wishlistText);
  btnDiv.append(removeBtn, borderLineBtn, moveTocartBtn);
  detailsDiv.append(title.innerText, price, btnDiv);
  imgDiv.append(img);
  card.append(imgDiv, detailsDiv);
  // wishlistCards.append(card);
  // return wishlistCards;
  return card;
}

