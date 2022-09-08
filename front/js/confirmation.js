//===========================================//===========================================//
// Variable pour chercher le tableau "order" du localStorage:
//===========================================//===========================================//

let commandeProducts = JSON.parse(localStorage.getItem("order"));

//===========================================//===========================================//
// Fonction affichage du numéro de commande:
//===========================================//===========================================//

const numberCommande = async () => {
    if (commandeProducts) {
        await commandeProducts;
        const order = document.getElementById('orderId');
        //console.log(order);

        order.innerText = commandeProducts.map(
            (number) => number.order

        );
        //=================================================//
        // On vide le storage pour éviter le stockage:
        //=================================================//
        localStorage.clear();
    }
}
numberCommande();