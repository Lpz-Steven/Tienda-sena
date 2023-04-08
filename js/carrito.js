export function carrito(props, el){
    let {data} = props
    return `
    <div class="cart-box">
        <img src="${el.dataset.img}" alt="${data.attributes.nombre}" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${data.attributes.nombre}</div>
            <div class="cart-price">${data.attributes.precio}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>  
        <box-icon name='trash-alt' class="cart-remove"></box-icon>
    </div>
    
    ` 
}