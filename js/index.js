import { Modal } from "./modal.js";
import { carrito } from "./carrito.js";

const d = document
const $modal= d.querySelector(".modal")
const $carrito = d.querySelector(".cart-content")

let cart = d.querySelector('.cart')
let closeCart = d.querySelector('.close-cart')



d.addEventListener("DOMContentLoaded", e=>{
    
    fetch("http://localhost:1337/api/productos?populate=*")
    .then(response=>response.json())
    .then(data=>{
        const arregloP=data.data
        console.log(arregloP)
        arregloP.map((element)=>{
            let id=element.id
            console.log(id)

            let name= element.attributes.nombre
            console.log(name)

            let imagen= element.attributes.image.data[0].attributes.url
            console.log(imagen)

            let precio = element.attributes.precio
            console.log(precio)

            const target =`
            <div class="product-box">
                    <img src="${imagen}" class="product-img" />
                    <h2 class="product-title">${name}</h2>
                    <span class="price">${precio}</span>
                    <label for="btn-modal" name='shopping-bag' id="cart-icon2" class="add-cart" data-id="${id}" data-img="${imagen}"> Comprar </label>
            </div>
            `
            document.getElementById('content-products').innerHTML += target
        })
    })
});


d.addEventListener("click", async e=>{
    if(e.target.matches(".btnModal")){
        $modal.classList.toggle("showModal")

        let btnId= e.target.dataset.id;
        console.log(btnId)

        await fetch(`http://localhost:1337/api/productos/${btnId}`)
        .then(res=> res.ok ? res.json(): Promise.reject(res))
        .then(json =>{
            $modal.innerHTML=Modal(json)
            $modal.querySelector("img").src=e.target.dataset.img
        })
        .catch(err => console.log(err))  
    }

    if(e.target.matches("#cart-icon")){
        cart.classList.toggle('active')
    }
    if(e.target.matches("#close-cart")){
        cart.classList.remove('active')
    }

    if(e.target.matches(".add-cart")){
        let btnI = e.target.dataset.id;
        await fetch(`http://localhost:1337/api/productos/${btnI}`)
        .then(res=> res.ok ? res.json(): Promise.reject(res))
        .then(json =>{
            $carrito.innerHTML +=carrito(json, e.target)
            console.log(json)
        })
        .catch(err => console.log(err))  
    }

})

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready();
}

function ready(){
    var removeCartButtons =document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for(var i = 0; i< removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for(var i = 0; i< quantityInputs.length; i++){
        var input =quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addCart = document.getElementsByClassName('add-cart')
    for(var i = 0; i< addCart.length; i++){
        var button= addCart[i];
        button.addEventListener("click", addCartClicked);
    }
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value)|| input.value <= 0){
        input.value = 1
    }
    updatetotal();
}

//Add to cart

function addCartClicked (event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText
    console.log(title);
}

function updatetotal(){
    var cartContent= d.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i = 0; i< cartBoxes.length; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement =cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerHTML.replace("$",""));
        var quantity= quantityElement.value
        total = total + (price * quantity);
        total = Math.round(total*100)/100;

        document.getElementsByClassName('total-price')[0].innerHTML= "$" + total;
    }
}