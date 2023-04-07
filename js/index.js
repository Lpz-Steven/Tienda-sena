import { Modal } from "./modal.js";

const d = document
const $modal= d.querySelector(".modal")

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
            <div id="divProduct">
                <div class="imageDiv">
                    <img src="${imagen}"/>
                </div>
                <div class="textInfo">
                    <h2>${name}</h2>
                    <h4>${precio}</h4>
                    <div class="btnInfo">
                        <label for="btn-modal" class=${"btnModal"} data-id="${id}" data-img="${imagen}">
                        INFO
                        </label>
                    </div>
                </div>
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
})