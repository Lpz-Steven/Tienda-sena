import { Modal } from "./modal.js";
import { carrito } from "./carrito.js";

const d = document;
const $modal = d.querySelector(".modal");
const $carrito = d.querySelector(".cart-content");

//console.log($carrito);

let qrdiv = document.getElementById("contenedorQR");
let btnConvertir = d.getElementById("convertir");

let correctProduct = [];
//console.log(correctProduct);

const qrcode = new QRCode(qrdiv, {
  width: 200,
  height: 200,
});

let cart = d.querySelector(".cart");
let closeCart = d.querySelector(".close-cart");

const valor =d.getElementById("contador")
let contador = 0;

d.addEventListener("DOMContentLoaded", (e) => {
  fetch(`http://10.190.80.165:1337/api/productos?populate=*`)
    .then((response) => response.json())
    .then((data) => {
      const arregloP = data.data;
      //console.log(arregloP);

      arregloP.map((element) => {
        let id = element.id;
        //console.log(id);
        let name = element.attributes.nombre;
        //console.log(name);

        let precio = element.attributes.precio;
        //console.log(precio);

        let srcimg = element.attributes.srcimage;
        //console.log(srcimg);

        let categoria = element.attributes.categoria;
        //console.log(categoria);

        const target = `
            <div class="product-box content estilos" data-category="${categoria}" >
                    <img src="${srcimg}" class="product-img" data-id="${id}" data-img="${srcimg}" />
                    <div class="info-div" id="info-div">
                        <div>
                            <h2 class="product-title">${name}</h2>
                            <span class="price">${precio} $</span>
                        </div>
                        <button for="btn-modal" name='shopping-bag' id="cart-icon2" class="add-cart " data-id="${id}" data-img="${srcimg}">Buy</button>
                    </div>
            </div>
            `;
        document.getElementById("content-products").innerHTML += target;
      });
    });
});

const arrayCart = [];

d.addEventListener("click", async (e) => {
  if (e.target.matches(".btnModal")) {
    $modal.classList.toggle("showModal");

    let btnId = e.target.dataset.id;
    //console.log(btnId);

    await fetch(`http://10.190.80.165:1337/api/productos/${btnId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        $modal.innerHTML = Modal(json);
        $modal.querySelector("img").src = e.target.dataset.img;
      })
      .catch((err) => console.log(err));
  }
  if (e.target.matches(".product-img")) {
    $modal.classList.toggle("showModal");

    let btnId = e.target.dataset.id;
    //console.log(btnId);

    await fetch(`http://10.190.80.165:1337/api/productos/${btnId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        $modal.innerHTML = Modal(json);
        console.log(json);
        $modal.querySelector("img").src = e.target.dataset.img;
      })
      .catch((err) => console.log(err));

    let $shopDiv = d.querySelector(".shopDiv");
    $shopDiv.classList.add("notShowBtn");
    //console.log($shopDiv);
  }
  if (e.target.matches("#close-cart")) {
    $modal.classList.remove("showModal");
  }

  if (e.target.matches("#cart-icon")) {
    cart.classList.toggle("active");
  }
  if (e.target.matches("#close-cart")) {
    cart.classList.remove("active");
  }

  if (e.target.matches(".add-cart")) {

    contador++;
    valor.innerHTML=contador;

    let btnI = e.target.dataset.id;

    await fetch(`http://10.190.80.165:1337/api/productos/${btnI}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        $carrito.innerHTML += carrito(json, e.target);
        const { data } = json;
        const { target } = e;
        arrayCart.push({ data });
        //console.log(json);
        correctProduct.push(json);
      })
      .catch((err) => console.log(err));
  }

  let cartBox = d.getElementById("cart-box");

  if (e.target.matches(".cart-remove")) {
    contador--;
    valor.innerHTML=contador;

    let btnId = e.target.dataset.id;
    //console.log(btnId);
    cartBox.remove(btnId);
  }

  if (e.target.matches(".btn-buy")) {
    let btnCantidad = d.querySelectorAll(".cart-quantity");
    let precio = d.querySelectorAll(".cart-price");
    let nombreProduct = d.querySelectorAll(".cart-product-title");

    let cantidadArr = Array.from(btnCantidad);
    let precioArr = Array.from(precio);
    let totalPrecio = 0;
    let nombreP = Array.from(nombreProduct);

    //console.log(cantidadArr[0].value);
    //console.log(precioArr[0].textContent);
    //console.log(nombreP[0].textContent);

    for (let i = 0; cantidadArr.length - 1 >= i; i++) {
      //console.log(i);
      totalPrecio += cantidadArr[i].value * precioArr[i].textContent;
    }

    let totalPrice = d.getElementById("total-price");
    totalPrice.innerHTML = `${totalPrecio}`;

    //console.log(arrayCart);

    const qr = new QRCode(d.getElementById("contenedorQR"), {
      Text: "Hola",
      width: 150,
      height: 150,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });

    function codigoQR() {
      arrayCart.forEach((element) => console.log(element));
      qr.makeCode(`${arrayCart[0].data.attributes.nombre},`);
    }
    codigoQR();

    //console.log(qr);
  }
  

  // Seleccionar todos los elementos .content y guardarlos en una variable global
  const contentElements = Array.from(document.querySelectorAll(".content"));
  //console.log(contentElements)

  // Definir la función de filtrado
  function filtrar(Data) {
    contentElements.forEach((product) => {
      if (Data === "all" || product.dataset.category === Data) {
        product.classList.remove("notShow");
      } else {
        product.classList.add("notShow");
      }
    });
  }

  // Manejar el evento de clic en el botón
  if (e.target.matches(".btn-category")) {
    const Data = e.target.dataset.category;
    //console.log(Data);
    filtrar(Data);
    console.log(e.target.dataset.category);
  }
});

d.addEventListener("keyup", (e) => {
  if (e.target.matches("#buscador")) {
    document.querySelectorAll(".content").forEach((product) => {
      product.textContent.toLowerCase().includes(e.target.value)
        ? product.classList.remove("notShow")
        : product.classList.add("notShow");
    });
  }
});
