//===========================================//===========================================//===========================================
// Affichage des valeurs et données des produits stocker dans l'API
//===========================================//===========================================//===========================================

// On va chercher l'API avec la méthode fetch:
fetch("https://back-kanap-d3iv3cjtx-younsou.vercel.app/api/products")
    .then(res => res.json()) // On renvoi une réponse en promesse traité en JSON
    .then(mappedProducts => { // On définit un paramètre pour mappedProducts en réutilisant .then
        for (let product of mappedProducts) {
            let kanap_id = document.createElement("a");
            let kanapImg = document.createElement("img");
            let kanapName = document.createElement("h3");
            let kanapAltText = document.createElement("alt")
            let kanapPrice = document.createElement("p");
            let kanapDescription = document.createElement("p");
            let kanapElement = document.createElement("article");

            kanap_id.href = ("./html/product.html?id=" + product._id);
            kanapImg.src = product.imageUrl;
            kanapName.innerText = product.name;
            kanapAltText.alt = product.name;
            kanapPrice.textContent = "Prix : " + product.price + " €";
            kanapDescription.textContent = product.description;

            kanap_id.appendChild(kanapElement);
            kanapElement.appendChild(kanapImg);
            kanapElement.appendChild(kanapName);
            kanapElement.appendChild(kanapAltText);
            kanapElement.appendChild(kanapPrice);
            kanapElement.appendChild(kanapDescription);

            document.getElementById("items").appendChild(kanap_id);
        }
    })
    .catch(err => console.log("erreur :(", err));