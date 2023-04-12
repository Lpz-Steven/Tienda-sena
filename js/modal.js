export function Modal(props){
    let {data} = props
    return `
    <div class="insertModal">
            <box-icon name='arrow-back' id="close-cart" class="close-btn"></box-icon>
            <img src="" class="imageModal">
        <div class="infoDiv">
            <form id="form">
                <input type="text" class="inputs-modal" name="nombre" value="${data.attributes.nombre}"></input>
                <input type="text" class="inputs-modal" name="cantidad" value="${data.attributes.cantidad}"></input>
                <input type="text" class="inputs-modal" name="precio" value="${data.attributes.precio}"></input>
            </form>    
            <p>${data.attributes.description}<br></p>     
    
            <div class="shopDiv">
                <buttom type="submit" class="edit" data-id="${data.id}" data-name="${data.attributes.nombre}" data-price="${data.attributes.precio}" data-cantidad="${data.attributes.cantidad}">Editar</buttom>
                <buttom type="submit" class="delete" data-id="${data.id}" >Eliminar</buttom>
            </div>
        </div>   
    </div>` 
}