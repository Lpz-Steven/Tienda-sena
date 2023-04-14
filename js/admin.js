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

            let cantidad = element.attributes.cantidad
            console.log(cantidad)

            const target =`
            <div class="product-box content estilos">
                    <img src="${imagen}" class="product-img" />
                    <div class="info-div">
                      <div>
                        <h2 class="product-title">${name}</h2>
                        <span class="price">${precio}</span>
                      </div>
                      <label for="btn-modal"  id="cart-icon2" class="btnModal" class="add-cart" data-id="${id}" data-img="${imagen}"><i class="fa-solid fa-pen-to-square"></i></label>
                    </div>
                    
            </div>
            `
            document.getElementById('content-products').innerHTML += target
        })
    })
});


d.addEventListener("click", async e=>{
    let $form=d.getElementById("form")
    if(e.target.matches(".btnModal")){
        $modal.classList.toggle("showModal")

        let btnId= e.target.dataset.id;
        console.log(btnId)

        await fetch(`http://localhost:1337/api/productos/${btnId}`)
        .then(res=> res.ok ? res.json(): Promise.reject(res))
        .then(json =>{
            $modal.innerHTML=Modal(json)
            console.log(json)
            $modal.querySelector("img").src=e.target.dataset.img
        })
        .catch(err => console.log(err))  
    }
    if(e.target.matches(".edit")){
        try {
          let data = {
            data:{
              nombre: $form.nombre.value,
              cantidad:$form.cantidad.value,
              precio: parseFloat($form.precio.value)
            }
          }
          const options = {
            method: "PUT",
            headers: {
              "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(data)
          };


          const res = await fetch(`http://localhost:1337/api/productos/${e.target.dataset.id}`, options);
          console.log(JSON.stringify(data))
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const json = await res.json();
          console.log(json);
          location.reload()

    
        } catch (error) {
          console.error(`Error: ${error}`);
          console.log($form.price.value)
        }
      }

      if(e.target.matches(".delete")){
        try{
            let options ={
            method:"DELETE", 
            headers:{
            "Content-type": "application/json; charset=utf-8"
            }
        }
            res=await fetch(`http://localhost:1337/api/productos/${e.target.dataset.id}`, options)
            json=await res.json();
        }catch{
        }
        location.reload();
    
        }
        
        if(e.target.matches(".close-btn")){
          $modal.classList.remove("showModal")
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
