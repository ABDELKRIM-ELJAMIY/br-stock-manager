const prompt = require("prompt-sync")();
const Inventory = require("./inventory");
const myInventory = new Inventory();
let choix;
do {
    console.log(`-------MENU:-----`);
    console.log("1:Ajouter");
    console.log("2:Afficher");
    console.log("3:Mettre à jour");
    console.log("4:Supprimer");
    console.log("5:Quitter");
    console.log(`-----------------`);
    choix = prompt(" votre choix:");
    switch (choix) {
        case '1':
            console.log("Ajout d'un produit...")
            myInventory.AddProduct(); break;;
        case '2':
            console.log("Affichage des produits...")
            myInventory.displayProduct(); break;
        case '3':
            console.log("Mise à jour d'un produit...")
            myInventory.updateProduct();
            break;
        case '4':
            console.log("Suppression d'un produit...")
            myInventory.deleteProduct();
            break;
        case '5': console.log("Sortie du programme..."); break;
        default:
            console.log("Option invalide, veuillez réessayer !");
    }
}
while (choix !== '5');
