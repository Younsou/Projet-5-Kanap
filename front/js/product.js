//===========================================//===========================================//===========================================
// Récupération de l'ID du canapé de la page grace à URLSearchParams
//===========================================//===========================================//===========================================
const queryString = window.location.search;
const Params = new URLSearchParams(queryString);
const id = Params.get("id");



// Tableau de donnée des produits selectionné
let selectedKanap = {};
// Le produit selectionné est l'id du produit
selectedKanap._id = id;
console.log(selectedKanap);
//===========================================//===========================================//===========================================
// Récupération des produits de l'api et traitement des données
//===========================================//===========================================//===========================================
fetch(`https://back-kanap-d3iv3cjtx-younsou.vercel.app/api/products/${id}`)
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

        let kanapImg = document.createElement("img");
        let kanapName = document.getElementById("title");
        let kanapPrice = document.getElementById("price");
        let kanapDescription = document.getElementById("description");

        kanapImg.src = productData.imageUrl;
        kanapName.textContent = productData.name;
        kanapPrice.textContent = productData.price;
        kanapDescription.textContent = productData.description;

        kanapImgContainer.appendChild(kanapImg);
        remplirListeCouleurs(productData);
        SelectionnerQuantity(productData);
        console.log(productData);
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
function SelectionnerQuantity() {
    let SelectQuantity = document.querySelector('input[type="number"]');
    // On écoute ce qu'il se passe dans input[name="itemQuantity"]:
    SelectQuantity.addEventListener("input", (e) => {
        console.log(SelectQuantity);
        // On récupère la valeur de la cible de l'évènement dans input:
        let quantityProduct = e.target.value;

        // On ajoute la quantité à l'objet quantityProduct:
        selectedKanap.quantity = quantityProduct;
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
            selectedKanap.quantity < 1 ||
            selectedKanap.quantity > 100 ||
            selectedKanap.quantity === undefined ||
            color === "" ||
            color === undefined
        ) {
            alert("Veuillez renseigner une couleur, et/ou une quantité valide entre 1 et 100");
        } else {
            selectedKanap.color = color;
            // Appel la fonction si condition ok:
            ajouterPanier();

        }
    });
}

//===========================================//===========================================//===========================================
// Fonction pour sauvegarder un Produit au Panier
//===========================================//===========================================//===========================================
// Tableau localstorage:
let saveProducts = [];
console.log(saveProducts);

function ajouterPanier() {
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
            currentProduct._id === selectedKanap._id &&
            currentProduct.color === selectedKanap.color
        ) {
            found = true;
            alert("Attention! Cet article est déjà dans votre panier. La quantité a été mis à jour.");
            // Additionne l'ancienne quantité avec la nouvelle:
            let newQuantity =
                parseInt(currentProduct.quantity) + parseInt(selectedKanap.quantity);
            currentProduct.quantity = JSON.stringify(newQuantity);
        }
    }
    if (!found) {
        saveProducts.push(selectedKanap);
        alert("Article ajouté au panier")
    }
    // Renvoi au localStorage:
    localStorage.productStorage = JSON.stringify(saveProducts);
    console.log(saveProducts);
}