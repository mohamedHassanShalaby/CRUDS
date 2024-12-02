let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";

let tmp;
//1- get total
function getTotal() {
  if (price.value != "") {
    let res = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = res;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}

//2- create product
let dataProd;

if (localStorage.product != null) {
  dataProd = JSON.parse(localStorage.product);
} else {
  dataProd = [];
}

submit.onclick = function () {
  let objProd = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  // count
  if (title.value != "" && price.value != "" && objProd.count <= 100) {
    if (mood === "create") {
      if (objProd.count > 1) {
        for (let i = 0; i < objProd.count; i++) {
          dataProd.push(objProd);
        }
      } else {
        dataProd.push(objProd);
      }
    } else {
      dataProd[tmp] = objProd;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearData();
  }

  //3- save data local Storage
  localStorage.setItem("product", JSON.stringify(dataProd));
  showData();
};

//4- clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//5- read data
function showData() {
  getTotal();
  let tabel = "";
  for (let i = 0; i < dataProd.length; i++) {
    tabel += `
    <tr>
        <td>${i + 1}</td>
        <td>${dataProd[i].title}</td>
        <td>${dataProd[i].price}</td>
        <td>${dataProd[i].taxes}</td>
        <td>${dataProd[i].ads}</td>
        <td>${dataProd[i].discount}</td>
        <td>${dataProd[i].total}</td>
        <td>${dataProd[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = tabel;
  let deleteAll = document.getElementById("deleteAll");
  if (dataProd.length > 0) {
    deleteAll.innerHTML = `<button onclick = "deleteAll()">Delete All(${dataProd.length})</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}
showData();

//6- delete data
function deleteData(i) {
  dataProd.splice(i, 1); // dont work ==> delete array only --> delete from i delete 1 element
  localStorage.product = JSON.stringify(dataProd); // Delete from LocalStorage
  showData();
}

// 7- clean data
function deleteAll() {
  localStorage.clear(); // delete from localstorage
  dataProd.splice(0); // delete from array
  showData();
}

//8- update data
function updateData(i) {
  title.value = dataProd[i].title;
  price.value = dataProd[i].price;
  taxes.value = dataProd[i].taxes;
  ads.value = dataProd[i].ads;
  discount.value = dataProd[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataProd[i].category;
  submit.innerHTML = "Update";
  mood = "Update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//9- search data
let searchMood = "title";

function searchTitle(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let tabel = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataProd.length; i++) {
      if (dataProd[i].title.includes(value.toLowerCase())) {
        tabel += ` 
            <tr>
                <td>${i}</td>
                <td>${dataProd[i].title}</td>
                <td>${dataProd[i].price}</td>
                <td>${dataProd[i].taxes}</td>
                <td>${dataProd[i].ads}</td>
                <td>${dataProd[i].discount}</td>
                <td>${dataProd[i].total}</td>
                <td>${dataProd[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `;
      }
    }
  } else {
    for (let i = 0; i < dataProd.length; i++) {
      if (dataProd[i].category.includes(value.toLowerCase())) {
        tabel += ` 
            <tr>
                <td>${i}</td>
                <td>${dataProd[i].title}</td>
                <td>${dataProd[i].price}</td>
                <td>${dataProd[i].taxes}</td>
                <td>${dataProd[i].ads}</td>
                <td>${dataProd[i].discount}</td>
                <td>${dataProd[i].total}</td>
                <td>${dataProd[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = tabel;
}

//10- clean data
