let container = document.getElementById("container");  

async function fetchData(page){
    try{
        let res = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page || 1}&_limit=12`);
        let data = await res.json();
        console.log(data);
        appendData(data)
    }
    catch(err){
        console.log(err);
    }
  }

  function appendData(data){
    data.forEach(item => container.append(createCard(item)));
  }

function createCard(item) {
    // Create card container element
    const card = document.createElement('div');
    card.classList.add('card');
  
    // Create image element
    const image = document.createElement('img');
    image.src = item.url;
    image.alt = item.title;
    card.appendChild(image);
  
    // Create title element
    const title = document.createElement('h2');
    title.textContent = item.title;
    card.appendChild(title);
  
    return card;
  }

fetchData();

let page=1;

 window.addEventListener("scroll",()=>{

  //complete the code

 })