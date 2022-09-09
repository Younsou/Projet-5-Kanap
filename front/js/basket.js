
// FICHIER NON UTILISER POUR LE PROJET 5 (ici à titre d'exemple) /////////////////////////////////////
// ce code a été suivi etape par etape du webinaire du CONTENU EXCLUSIF des ressource du P5 //////////


// Création du panier ====================================

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
    let basket = getBasket();        // On récupère le panier qui existe dans le localStorage
    let foundProduct = basket.find(p = p._id == product._id); // on cherche dans le panier la quantité du produit
    if (foundProduct != undefined) {
        foundProduct.quantity++;     // Si ajoute 1 à la quantité 
    } else {
        product.quantity = 1;       // Sinon 
        basket.push(product);       // On lui ajoute le produit
    }
    saveBasket(basket);             // On enregistre dans le nouveau panier
}

// Supprimer un produit du panier
function removeFromBasket(product) {
    let basket = getBasket();
    basket = basket.filter(p => p._id == product._id);
    saveBasket(basket);
}

// Gestion de la quantité
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

// Gestion de la quantité 
function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number += product.quantity;
    }
    return number;
}

// Gestion du prix 
function getTotalPrice() {
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
        total += product.quantity * product.price;
    }
    return total;
}