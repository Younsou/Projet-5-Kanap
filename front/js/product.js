//===========================================//===========================================//===========================================
// Récupération de l'ID du canapé de la page grace à URLSearchParams
//===========================================//===========================================//===========================================
const queryString = window.location.search;
const Params = new URLSearchParams(queryString);
const id = Params.get("id");

//===========================================//===========================================//===========================================
// Récupération des produits de l'api et traitement des données
//===========================================//===========================================//===========================================
fetch(`http://localhost:3000/api/products/${id}`)
    // Renvoi une réponse en promesse traité en json
    .then(res => res.json())
    .then(productData => {
        // Affichage du produit:
        let kanapImgContainer = document.getElementsByClassName("item__img")[0];

        /* 
        start // EXEMPLE DE DANGER DU "innerHTML" !!!!
        let imgUrl = products.imageUrl;
        imgUrl = '" /><script>alert(1234);</script><img src="';
        kanapImgContainer.innerHTML = '<img src="' + imgUrl + '" />';
        end 
        */

        let kanapName = document.getElementById("title");
        let kanapPrice = document.getElementById("price");
        let kanapDescription = document.getElementById("description");
        let kanapImg = document.createElement("img");

        kanapImg.src = productData.imageUrl;
        kanapName.innerText = productData.name;
        kanapPrice.innerText = productData.price;
        kanapDescription.innerText = productData.description;

        kanapImgContainer.appendChild(kanapImg);
        remplirListeCouleurs(productData);
        SelectionnerQuantity(productData);
    })
    .catch(err => console.log("erreur :(", err));


//===========================================//===========================================//===========================================
// Construction du choix des couleurs
//===========================================//===========================================//===========================================
function remplirListeCouleurs(productData) {
    let kanapColors = document.getElementById("colors");
    productData.colors.forEach((color) => {
        let showColor = document.createElement("option");
        showColor.value = color;
        showColor.innerText = color;
        kanapColors.appendChild(showColor);
    });
}

//===========================================//===========================================//===========================================
// Choix quantité dynamique
//===========================================//===========================================//===========================================
function SelectionnerQuantity(productData) {
    let SelectQuantity = document.querySelector('input[type="number"]');
    // On écoute ce qu'il se passe dans input[name="itemQuantity"]:
    SelectQuantity.addEventListener("input", (e) => {
        console.log(SelectQuantity);
        // On récupère la valeur de la cible de l'évènement dans input:
        let quantityProduct = e.target.value;

        // On ajoute la quantité à l'objet quantityProduct:
        productData.quantity = quantityProduct;
        console.log(quantityProduct);
    });

    //===========================================//===========================================//===========================================
    // Conditions de validation au clic via le bouton ajouter au panier
    //===========================================//===========================================//===========================================
    let orderButton = document.getElementById("addToCart");
    // On écoute ce qu'il se passe sur le bouton #addToCart pour faire l'action:
    orderButton.addEventListener("click", () => {

        // Conditions:
        let color = document.getElementById("colors").value;
        console.log(color);
        if (
            // Valeurs créées dynamiquement au clic (voir choix quantité et choix colors):
            productData.quantity < 1 ||
            productData.quantity > 100 ||
            productData.quantity === undefined ||
            color === "" ||
            color === undefined
        ) {
            alert("Veuillez renseigner une couleur, et/ou une quantité valide entre 1 et 100");
        } else {
            productData.color = color;
            // Appel la fonction si condition ok:
            ajouterPanier(productData);
            alert("Article ajouté au panier")
        }
    });
}

//===========================================//===========================================//===========================================
// Fonction pour sauvegarder un Produit au Panier
//===========================================//===========================================//===========================================
// Tableau localstorage:
let saveProducts = [];

function ajouterPanier(productData) {
    console.log(productData);
    // Variable du tableau localStorage ('productStorage'):
    saveProducts = JSON.parse(localStorage.getItem("productStorage"));
    // Si produits Enregistrés:
    if (saveProducts == null) {
        saveProducts = [];
    }
    var found = false;
    for (let currentProduct of saveProducts) {
        // Compare si l'article existe dans le panier:
        if (
            currentProduct._id === productData._id &&
            currentProduct.color === productData.color
        ) {
            found = true;
            alert("Attention! Cet article est déjà dans votre panier");
            // Additionne l'ancienne quantité avec la nouvelle:
            let newQuantity =
                parseInt(currentProduct.quantity) + parseInt(productData.quantity);
            currentProduct.quantity = JSON.stringify(newQuantity);
        }
    }
    if (!found) {
        saveProducts.push(productData);
    }
    // Renvoi au localStorage:
    localStorage.productStorage = JSON.stringify(saveProducts);
}