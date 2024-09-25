const row = document.querySelector(".row");
const ul = document.querySelector("ul");
const localStorageKey = "articoli nel carrello";
let carrelloArr = [];

if (localStorage.getItem(localStorageKey)) {
  const carrelloContent = JSON.parse(localStorage.getItem(localStorageKey));
  carrelloContent.forEach((title) => {
    console.log(title);
    ul.innerHTML = `
    <li class="dropdown-item">${title}</li>
    `;
  });
} else {
  carrelloArr = [];
}

const generateColum = (dataArr) => {
  dataArr.forEach((data) => {
    row.innerHTML += `
    <div class="col-12 text-center col-md-6 col-lg-3">
        <div class="card mb-3" style="width: 18rem">
            <img src="${data.img}" height="350" class="card-img-top" alt="book-img" />
            <div class="card-body h-50">
            <h5 class="card-title">${data.title}</h5>
            <h5 class="card-title">${data.price}</h5>
            <button class="btn btn-success buy">Compra</button>
            <button class="btn btn-danger rmv">Scarta</button>
        </div>
    </div>
    `;
  });
  buy(dataArr);
  remove(dataArr);
};

const remove = (dataArr) => {
  const removeCollect = document.querySelectorAll(".rmv");
  removeCollect.forEach((rmv, i) => {
    rmv.addEventListener("click", (e) => {
      e.target.closest(".col-12").remove();
    });
  });
};

const buy = (dataArr) => {
  const compraCollect = document.querySelectorAll(".buy");
  compraCollect.forEach((compra, i) => {
    compra.addEventListener("click", () => {
      ul.innerHTML += `
        <li class="dropdown-item">${dataArr[i].title}</li>
        
        
        `;
      const li = document.querySelector("li");
      carrelloArr.push(dataArr[i].title);
      localStorage.setItem(localStorageKey, JSON.stringify(carrelloArr));
    });
  });
};

fetch("https://striveschool-api.herokuapp.com/books")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("domanda gestita male");
    }
  })
  .then((data) => {
    console.log(data);
    return generateColum(data);
  })
  .catch((err) => console.log(err));
