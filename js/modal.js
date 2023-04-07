export function Modal(props){
    let {data} = props
    return `
    <div class="insertModal">
            <img src="" alt="${data.attributes.name}" class="imageModal">
        <div class="infoDiv">
            <h4 >${data.attributes.nombre}</h4>
            <p>${data.attributes.description}<br><br> Disponibles
            ${data.attributes.cantidad}
            </p>
            <div class="shopDiv">
                <h4>${data.attributes.precio} $</h4>
                <buttom type="submit">Comprar</buttom>
            </div>
        </div>   
    </div>` 
}