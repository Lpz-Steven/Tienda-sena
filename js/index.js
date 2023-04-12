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
            <div class="product-box content estilos" >
                    <img src="${imagen}" class="product-img" />
                    <h2 class="product-title">${name}</h2>
                    <span class="price">${precio}</span>
                    <label for="btn-modal" name='shopping-bag' id="cart-icon2" class="add-cart" data-id="${id}" data-img="${imagen}">Buy</label>
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
            $carrito.innerHTML += carrito(json, e.target)
            console.log(json)
        })
        .catch(err => console.log(err))  
    }
    if(e.target.matches(".btn-buy")){
        let btnCantidad = d.querySelectorAll(".cart-quantity")
        let precio= d.querySelectorAll(".cart-price")

        let cantidadArr = Array.from(btnCantidad)
        console.log(cantidadArr)
        let precioArr = Array.from(precio)
        let totalPrecio = 0;
        
        console.log(cantidadArr[0].value)
        console.log(precioArr[0].textContent)

        for(let i = 0; cantidadArr.length -1 >= i; i++){
            console.log(i)
           totalPrecio += cantidadArr[i].value * precioArr[i].textContent
        }

        let totalPrice= d.getElementById("total-price")
        totalPrice.innerHTML=`${totalPrecio}`
    }
})

d.addEventListener('keyup', e=>{
    if(e.target.matches('#buscador')){
        document.querySelectorAll('.content').forEach(product=>{
            product.textContent.toLowerCase().includes(e.target.value)
            ? product.classList.remove('notShow')
            : product.classList.add('notShow')
        })
    }
})






