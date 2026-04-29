let products = JSON.parse(localStorage.getItem("products")) || [];
let currentIndex = null;

let nameInput = document.getElementById("name");
let categoryInput = document.getElementById("category");
let priceInput = document.getElementById("price");
let descInput = document.getElementById("desc");
let mainBtn = document.getElementById("mainBtn");

function displayProducts() {
    let table = "";

    for (let i = 0; i < products.length; i++) {
        table += `
      <tr>
        <td>${i}</td>
        <td>${products[i].name}</td>
        <td>${products[i].category}</td>
        <td>${products[i].price}</td>
        <td>${products[i].desc}</td>
        <td><button onclick="updateProduct(${i})">Update</button></td>
        <td><button onclick="deleteProduct(${i})">Delete</button></td>
      </tr>
    `;
    }

    document.getElementById("tableBody").innerHTML = table;
}

function addProduct() {
    let product = {
        name: nameInput.value,
        category: categoryInput.value,
        price: priceInput.value,
        desc: descInput.value
    };

    if (currentIndex === null) {
        products.push(product);
    } else {
        products[currentIndex] = product;
        currentIndex = null;
        mainBtn.innerText = "AddProduct";
    }

    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    clearInputs();
}

function deleteProduct(i) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

function updateProduct(i) {
    let p = products[i];

    nameInput.value = p.name;
    categoryInput.value = p.category;
    priceInput.value = p.price;
    descInput.value = p.desc;

    currentIndex = i;
    mainBtn.innerText = "UpdateProduct";
}

function clearInputs() {
    nameInput.value = "";
    categoryInput.value = "";
    priceInput.value = "";
    descInput.value = "";
}

function searchProduct() {
    let val = document.getElementById("search").value.toLowerCase();
    let table = "";

    for (let i = 0; i < products.length; i++) {
        if (
            products[i].name.toLowerCase().includes(val) ||
            products[i].category.toLowerCase().includes(val) ||
            products[i].price.toString().includes(val) ||
            products[i].desc.toLowerCase().includes(val)
        ) {
            table += `
        <tr>
          <td>${i}</td>
          <td>${products[i].name}</td>
          <td>${products[i].category}</td>
          <td>${products[i].price}</td>
          <td>${products[i].desc}</td>
          <td><button onclick="updateProduct(${i})">Update</button></td>
          <td><button onclick="deleteProduct(${i})">Delete</button></td>
        </tr>
      `;
        }
    }

    document.getElementById("tableBody").innerHTML = table;
}

displayProducts();