//===========================================//===========================================//===========================================
// Récupération des produits de l'api
//===========================================//===========================================//===========================================

// On va chercher l'API avec la méthode fetch:
fetch(`https://back-kanap-d3iv3cjtx-younsou.vercel.app/api/products`)
    .then(res => res.json()) // On fait une promesse en renvoyant la réponse traité en JSON.
    .then((kanaps) => {
        // appel de la fonction panierInit
        panierInit(kanaps);  // On définit un paramètre pour products en réutilisant .then 
    })
    .catch(err => console.log("erreur :(", err));

// Récupère info de l'API   
function panierInit(kanaps) {
    // On récupère le panier avec info des produit sélectionner par le client:
    let panierClient = JSON.parse(localStorage.getItem("productStorage"));
    // Si il y a un panier:
    if (panierClient && panierClient.length != 0) {
        // On récupère un article dans le panier:
        for (let articleClient of panierClient) {
            // On crée boucle pour récupèrer un produit de la Data:
            for (let p = 0; p < kanaps.length; p++) {
                // Si article id choisi a correspondance avec un produit en data:
                if (articleClient._id === kanaps[p]._id) {
                    // Création et ajout des valeurs correspondante:
                    articleClient.name = kanaps[p].name;
                    articleClient.price = kanaps[p].price;
                    articleClient.image = kanaps[p].imageUrl;
                    articleClient.description = kanaps[p].description;
                    articleClient.alt = kanaps[p].altTxt;
                    console.log(articleClient);
                }
            }

        }
        panierDisplay(panierClient);
    }
}

//===========================================//===========================================//===========================================
// Affichage des produits du panier
//===========================================//===========================================//===========================================
function panierDisplay(kanaps) {
    // On récupère ce qu'il y a dans le local storage:   
    let selectionClient = JSON.parse(localStorage.getItem("productStorage"));
    for (let i = 0; i < selectionClient.length; i++) {

        let cartItems = document.getElementById("cart__items");

        // On ajoute l'élément "article":
        let cartArticles = document.createElement("article");
        cartItems.appendChild(cartArticles);
        cartArticles.data_id = selectionClient[i]._id;
        cartArticles.data_color = selectionClient[i].color;
        cartArticles.className = "cart__item";


        // On ajoute l'élément div qui va contenir l'img: 
        let imageContainer = document.createElement("div");
        imageContainer.className = "cart__item__img";
        cartArticles.appendChild(imageContainer);

        // On ajoute l'élément img: 
        let cartImages = document.createElement("img");
        cartImages.src = kanaps[i].image;
        cartImages.alt = kanaps[i].alt;
        imageContainer.appendChild(cartImages)

        // On ajoute une div en lien avec "article":
        let divCartItems = document.createElement("div");
        divCartItems.className = "cart__item__content";
        cartArticles.appendChild(divCartItems);

        // On ajoute une div en lien avec le nom, couleur et prix du produit:
        let divDescription = document.createElement("div");
        divDescription.className = "cart__item__content__description";
        divCartItems.appendChild(divDescription);

        // Ajout du "h2" qui va contenir le nom du produit:
        let cartName = document.createElement("h2");
        divDescription.appendChild(cartName);
        cartName.innerText = kanaps[i].name;

        // Ajout d'un "p" qui va contenir la couleur du produit:
        let cartColor = document.createElement("p");
        divDescription.appendChild(cartColor);
        cartColor.innerText = selectionClient[i].color;

        // Ajout d'un "p" qui va contenir le prix du produit:
        let cartPrice = document.createElement("p");
        divDescription.appendChild(cartPrice);
        cartPrice.innerText = `${kanaps[i].price} €`;


        // Ajout d'une div en lien avec les differents produits:
        let divSetting = document.createElement("div");
        divSetting.className = "cart__item__content__settings";
        divCartItems.appendChild(divSetting);

        // Ajout d'une div en lien avec la quantité:
        let divQuantity = document.createElement("div");
        divQuantity.className = "cart__item__content__settings__quantity";
        divSetting.appendChild(divQuantity);

        // Ajout d'un "p" qui va contenir le mot "Qté :" 
        let cartQuantity = document.createElement("p");
        divQuantity.appendChild(cartQuantity);
        cartQuantity.innerText = "Qté : ";

        // Ajout de l'input qui va contenir la quantité:
        let inputQuantity = document.createElement("input");
        divQuantity.appendChild(inputQuantity);
        inputQuantity.value = selectionClient[i].quantity;
        inputQuantity.className = "itemQuantity";
        inputQuantity.setAttribute("type", "number");
        inputQuantity.setAttribute("min", "1");
        inputQuantity.setAttribute("max", "100");
        inputQuantity.setAttribute("name", "itemQuantity");

        // Ajout d'une div en lien avec le bouton delete:
        let divDelete = document.createElement("div");
        divDelete.className = "cart__item__content__settings__delete";
        divCartItems.appendChild(divDelete);

        // Ajout d'un "p" qui va contenir le bouton "Supprimer": 
        let deleteItem = document.createElement("p");
        deleteItem.className = "deleteItem";
        divDelete.appendChild(deleteItem);
        deleteItem.innerText = "Supprimer";

        ////// Fin de l'affichage des produits panier ///////


        //===========================================//===========================================//===========================================
        // Affichage nombre total produit et coût total
        //===========================================//===========================================//===========================================
        const totalProduct = () => {

            // On cible la class "itemQuantity":
            let itemQuantity = document.getElementsByClassName("itemQuantity");
            // On stock la quantité des produits dans une variable:
            let productQuantity = itemQuantity.length;

            let totalArticle = 0; // On fixe la quantité à 0 de base

            for (let j = 0; j < productQuantity; ++j) {
                totalArticle += itemQuantity[j].valueAsNumber; // On va chercher la quantité dans le tableau avec une boucle for   
            }

            // AFFICHAGE DU PRIX TOTAL:

            let totalPrice = 0; // On fixe le prix total à 0 de base

            for (let k = 0; k < productQuantity; ++k) {
                // On multiplie la quantité par le prix  (prix récupéré de l'api):
                totalPrice += itemQuantity[k].valueAsNumber * kanaps[k].price;
            }

            // On cible l'id "totalQuantity":
            let totalQuantity = document.getElementById("totalQuantity");

            // On affiche la quantité sur la page html:
            totalQuantity.innerText = totalArticle;

            let productTotalPrice = document.getElementById("totalPrice");
            productTotalPrice.innerText = totalPrice;

        }
        totalProduct();


        //===========================================//===========================================//===========================================
        // Fonction modifier la Quantité 
        //===========================================//===========================================//===========================================
        const quantityChanged = () => {
            let quantityModif = document.querySelectorAll(".itemQuantity");


            for (let l = 0; l < quantityModif.length; l++) {
                quantityModif[l].addEventListener("change", (e) => {
                    e.preventDefault();

                    // On stock la quantité reçu par la boucle dans une variable:
                    let inputValue = quantityModif[l].valueAsNumber;

                    // On récupère la quantité du localStorage:
                    selectionClient[l].quantity = inputValue;

                    // On rappelle la fonction pour que le prix s'actualise en temps réel:
                    totalProduct();

                    // On rafraichi la quantité dans le localStorage:
                    localStorage.setItem("productStorage", JSON.stringify(selectionClient));

                });
            }
        }
        quantityChanged();

        //===========================================//===========================================//===========================================
        // Fonction supprimer
        //===========================================//===========================================//===========================================
        const deleteProducts = () => {

            deleteItem.addEventListener("click", () => {
                // Confirmation window (méthode js):
                if (window.confirm("Voulez vous supprimer cet article?")) {

                    // On enregistre l'id et la couleur séléctionnés par le bouton supprimer:
                    let deleteId = selectionClient[i]._id;
                    let deleteColor = selectionClient[i].color;

                    // Filtre l'élément cliqué par le bouton supprimer:
                    selectionClient = selectionClient.filter(el => el._id !== deleteId || el.color !== deleteColor);

                    // On rafraichi la quantité dans le localStorage:
                    localStorage.setItem("productStorage", JSON.stringify(selectionClient));
                    // Rafraichi la page:
                    location.reload();
                }
            });
        }

        deleteProducts();
    }

}
//===========================================//===========================================//===========================================
// Formulaire pour passer commande
//===========================================//===========================================//===========================================
// Conditions (REGEX) pour le remplissage du prénom, nom et ville:
function validDivers(value) {
    return /^[A-Z-a-z\s]{3,25}$/.test(value)
}

// Conditions pour le remplissage de l'adresse:
function validAdresse(value) {
    // return /^[A-Z-a-z-0-9\s]{3,40}$/.test(value)
    return /^[0-9]{1,5}[a-z-A-Z\s]{2,8}[a-z-A-Z -.,]{3,40}$/.test(value)

}

// Condition pour le remplissage de l'Email:
function validEmail(value) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
}

//==================================================================\\
// Vérification de la validité du prénom
//==================================================================\\
const prenom = document.getElementById("firstName");
prenom.addEventListener("change", (e) => {
    if (validDivers(prenom.value)) {
        firstNameErrorMsg.classList.add("opacity");
        firstNameErrorMsg.textContent = "";
    } else {
        firstNameErrorMsg.classList.remove("opacity");
        firstNameErrorMsg.textContent = `Doit Contenir entre 3 et 25 caractères`;
        e.preventDefault()
    }
});

//==================================================================\\
// Vérification de la validité du nom
//==================================================================\\
const nom = document.getElementById("lastName");
nom.addEventListener("change", (e) => {
    if (validDivers(nom.value)) {
        lastNameErrorMsg.classList.add("opacity");
        lastNameErrorMsg.textContent = "";
    } else {
        lastNameErrorMsg.classList.remove("opacity");
        lastNameErrorMsg.textContent = `Doit Contenir entre 3 et 25 caractères`;
        e.preventDefault()
    }
});
//==================================================================\\
// Vérification de la validité de l'adresse
//==================================================================\\
const adresse = document.getElementById("address");
adresse.addEventListener("change", (e) => {
    if (validAdresse(adresse.value)) {
        addressErrorMsg.classList.add("opacity");
        addressErrorMsg.textContent = "";
    } else {
        addressErrorMsg.classList.remove("opacity");
        addressErrorMsg.textContent = `Adresse invalide, exemple: 13 rue du kanap`;
        e.preventDefault()
    }
});

//==================================================================\\
// Vérification de la validité de la ville
//==================================================================\\
const ville = document.getElementById("city");
ville.addEventListener("change", (e) => {
    if (validDivers(ville.value)) {
        cityErrorMsg.classList.add("opacity");
        cityErrorMsg.textContent = "";
    } else {
        cityErrorMsg.classList.remove("opacity");
        cityErrorMsg.textContent = `Pas de caractères ou de chiffres`;
        e.preventDefault()
    }
});

//==================================================================\\
// Vérification de la validité du mail
//==================================================================\\
const email = document.getElementById("email");
email.addEventListener("change", (e) => {
    if (validEmail(email.value)) {
        emailErrorMsg.classList.add("opacity");
        emailErrorMsg.textContent = "";
    } else {
        emailErrorMsg.classList.remove("opacity");
        emailErrorMsg.textContent = `Email incorrect ex: support@name.com`;
        e.preventDefault()
    }
});

//===========================================//===========================================//===========================================
// Ecoute du formulaire pour envoie info API
//===========================================//===========================================//===========================================
const validateCommand = document.getElementById("order")

// Si tout est correctement rempli alors on passe à la commande:
validateCommand.addEventListener("click", async (e) => {
    e.preventDefault();
    // Si condition formulaire remplie:
    if (validDivers(nom.value) &&
        validDivers(prenom.value) &&
        validAdresse(adresse.value) &&
        validDivers(ville.value) &&
        validEmail(email.value)) {

        // On créer un total:
        const commandeFinal = JSON.parse(localStorage.getItem("productStorage"));
        console.log(commandeFinal);

        // Création tableau de ma commande:
        let commandeId = [];

        // Push info commande final dans commandId:
        await commandeFinal.forEach((commande) => {
            commandeId.push(commande._id); //voir ajout: quantité, selectionClient, couleur


            // On Stock les info dans la data pour envoyer à l'API par method Post:
        });
        const data = {
            contact: {
                lastName: nom.value,
                firstName: prenom.value,
                address: adresse.value,
                city: ville.value,
                email: email.value
            },
            products: commandeId,
        }

        //===========================================//===========================================//===========================================
        // Formulaire envoi Requète API + redirection confirmation .html
        //===========================================//===========================================//===========================================
        let commandeProducts = JSON.parse(localStorage.getItem("order"));

        // Méthode 'post' pour envoyer au back avec les arguments attendu:
        fetch(`https://back-kanap-d3iv3cjtx-younsou.vercel.app/api/products/order`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },

        })
            .then((res) => res.json())
            // Stock la réponse obtenu du serveur dans promise:
            .then((promise) => {
                let reponseServeur = promise;

                // Stock la réponse en variable avec ses arguments:
                const dataCommande = {
                    contact: reponseServeur.contact,
                    order: reponseServeur.orderId,
                };

                // Création local storage de dataCommande:
                if (commandeProducts == null) {
                    commandeProducts = [];
                    commandeProducts.push(dataCommande);
                    localStorage.setItem("order", JSON.stringify(commandeProducts));
                } else if (commandeProducts != null) {
                    commandeProducts.push(dataCommande);
                    localStorage.setItem("order", JSON.stringify(commandeProducts));
                }
                // Renvoie vers la page confirmation:
                localStorage.removeItem("productStorage");
                window.location.href = `confirmation.html?commande=${reponseServeur.orderId}`;
            });
    } else {
        alert("Veuillez remplir correctement le formulaire");
    }
});