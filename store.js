if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName("btn-danger")
    console.log(removeCartItemButtons)
    for (var i = 0; i<removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity-input")
    for (var i = 0; i<quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButton = document.getElementsByClassName("shop-item-btn")
    for (var i = 0; i<addToCartButton.length; i++) {
        var button = addToCartButton[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
    console.log("clicked")
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value<=0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
    var imageSource = shopItem.getElementsByClassName("shop-item-image")[0].src
    console.log(title, price, imageSource)
    addItemToCart(title,price,imageSource)
    updateCartTotal()
    
}

function addItemToCart(title,price,imageSource) {
    var cartRow = document.createElement('div')
    cartRow.classList.add("cart-row")
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemsNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i<cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title) {
            alert("This item is already added to the cart")
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img src="${imageSource}" class="cart-item-image" width="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input type="number" value="1" class="cart-quantity-input">
            <button role="button" class="btn btn-danger ">REMOVE</button>
        </div>`
        cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', updateCartTotal)
}


function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace("$",""))
        var quantity = quantityElement.value
        total= total + (price * quantity)
    }

    total = Math.round(total *100)/100
    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total
}