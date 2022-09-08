// creation du panier ====================================

function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
    addBasket(product);
}

function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return [];
    } else {
        return JSON.parse(basket);
    }

}

function addBasket(product) {
    let basket = getBasket();        // on récupère le panier qui existe dans le localStorage
    let foundProduct = basket.find(p = p._id == product._id); // on cherche dans le panier la quantité du produit
    if (foundProduct != undefined) {
        foundProduct.quantity++;     // si ajoute 1 à la quantité 
    } else {
        product.quantity = 1;       // sinon 
        basket.push(product);       // on lui ajoute le produit
    }
    saveBasket(basket);             // on enregistre dans le nouveau panier
}

// supprimer un produit du panier
function removeFromBasket(product) {
    let basket = getBasket();
    basket = basket.filter(p => p._id == product._id);
    saveBasket(basket);
}

//gestion de la quantité
function changeQuantity(product, quantity) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p._id == product._id);
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
            removeFromBasket(foundProduct);
        } else {
            saveBasket(basket);
        }
    }
}

//gestion du prix 
function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number += product.quantity;
    }
    return number;
}

function getTotalPrice() {
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
        total += product.quantity * product.price;
    }
    return total;
}