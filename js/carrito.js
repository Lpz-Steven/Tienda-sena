export function carrito(props, el){
    let {data} = props
    return `
    <div class="cart-box">
        <img src="${el.dataset.img}" alt="${data.attributes.nombre}" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${data.attributes.nombre}</div>
            <span class="cart-price" id="cart-price">${data.attributes.precio}</span>
            <input type="number" value="" class="cart-quantity" id="input-cantidad">
        </div>  
        <box-icon name='trash-alt' class="cart-remove"></box-icon>
    </div>
    
    ` 
}