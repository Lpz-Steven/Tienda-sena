import { Modal } from "./modal.js";
import { carrito } from "./carrito.js";

const d = document
const $modal= d.querySelector(".modal")
const $carrito = d.querySelector(".cart-content")

console.log($carrito)

let qrdiv= document.getElementById('contenedorQR')
let btnConvertir = d.getElementById('convertir')

let correctProduct=[]
console.log(correctProduct)

const qrcode = new QRCode(qrdiv,{
    width:200,
    height:200
})

let cart = d.querySelector('.cart')
let closeCart = d.querySelector('.close-cart')


d.addEventListener("DOMContentLoaded", e=>{
    fetch(`http://192.168.1.3:1337/api/productos?populate=*`)
    .then(response=>response.json())
    .then(data=>{
        const arregloP=data.data
        console.log(arregloP)

        arregloP.map((element)=>{
            let id=element.id
            console.log(id)

            let name= element.attributes.nombre
            console.log(name)

            let precio = element.attributes.precio
            console.log(precio)

            let srcimg= element.attributes.srcimage
            console.log(srcimg)

            const target =`
            <div class="product-box content estilos" >
                    <img src="${srcimg}" class="product-img" />
                    <h2 class="product-title">${name}</h2>
                    <span class="price">${precio} $</span>
                    <label for="btn-modal" name='shopping-bag' id="cart-icon2" class="add-cart" data-id="${id}" data-img="${srcimg}">Buy</label>
            </div>
            `
            document.getElementById('content-products').innerHTML += target
        })
    })
});

const arrayCart = []



d.addEventListener("click", async e=>{
    if(e.target.matches(".btnModal")){
        $modal.classList.toggle("showModal")

        let btnId= e.target.dataset.id;
        console.log(btnId)

        await fetch(`http://192.168.1.3:1337/api/productos/${btnId}`)
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
        
        await fetch(`http://192.168.1.3:1337/api/productos/${btnI}`)
        .then(res=> res.ok 
            ? res.json()
            : Promise.reject(res))
        .then(json =>{
            $carrito.innerHTML += carrito(json, e.target)
            const {data}=json
            const {target}=e
            arrayCart.push({data})
            console.log(json)
            correctProduct.push(json)
        })
        .catch(err => console.log(err))
    }

    let cartBox = d.getElementById("cart-box")

    if(e.target.matches(".cart-remove")){
            let btnId = e.target.dataset.id;      
            console.log(btnId)
            cartBox.remove(btnId)
        
    }

    if(e.target.matches(".btn-buy")){
        let btnCantidad = d.querySelectorAll(".cart-quantity")
        let precio= d.querySelectorAll(".cart-price")
        let nombreProduct =d.querySelectorAll(".cart-product-title") 

        let cantidadArr = Array.from(btnCantidad)
        let precioArr = Array.from(precio)
        let totalPrecio = 0;
        let nombreP= Array.from(nombreProduct)
        
        console.log(cantidadArr[0].value)
        console.log(precioArr[0].textContent)
        console.log(nombreP[0].textContent)

        for(let i = 0; cantidadArr.length -1 >= i; i++){
            console.log(i)
           totalPrecio += cantidadArr[i].value * precioArr[i].textContent
        }

        let totalPrice= d.getElementById("total-price")
        totalPrice.innerHTML=`${totalPrecio}`

        console.log(arrayCart)

        const qr = new QRCode(d.getElementById("contenedorQR"),{
            Text:"Hola",
            width:150,
            height:150,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        })

        function codigoQR(){
            arrayCart.forEach(element=>console.log(element))
            qr.makeCode(`${arrayCart[0].data.attributes.nombre},`)
        }
        codigoQR();

        console.log(qr)
    
    }
  
    if(e.target.matches(".btn-category")){
        
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









