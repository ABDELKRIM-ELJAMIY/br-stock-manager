const prompt = require("prompt-sync")();
const fs = require('fs');
const Product = require("./product");
class Inventory {
    constructor() {
        this.Products = [];
        this.filePath = 'products.json';
        this.currentId = 1;
    }
    saveToFile() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.Products, null, 3));
            console.log("Données sauvegardées !");
        } catch (error) {
            console.error("Erreur lors de la sauvegarde :", error.message);
        }
    }
    AddProduct() {
        const id = this.currentId;
        this.currentId++
        const name = prompt("Veuillez entrer le nom de ce produit:");
        const description = prompt("Veuillez décrire le produit:")
        const quantity = prompt("Veuillez entrer la quantité du produit:");
        if (isNaN(quantity) || quantity <= 0) {
            console.log("Quantité invalide ! Veuillez entrer un nombre valide et positif");
            return;
        }
        const price = prompt("Veuillez entrer le prix de chaque produit :");
        if (isNaN(price) || price <= 0) {
            console.log("Prix invalide ! Veuillez entrer un nombre valide et positif");
            return;
        }
        const product = new Product(id, name, description, quantity, price);
        this.Products.push(product);
        this.saveToFile();
        console.log("Le produit a été ajouté avec succès.");
    };
    displayProduct() {
        if (this.Products.length === 0)
            console.log(" le stock est vide!!!!")
        else
            console.log("------------------------------------------");
        console.log("--- Liste des produits dans le stock : ---");
        console.log("------------------------------------------");
        this.Products.forEach(product => {
            console.log(` ID:${product.id}`);
            console.log(` Nome:${product.name}`);
            console.log(` Description:${product.description}`);
            console.log(` Quantité:${product.quantity}`);
            console.log(` Prix:${product.price}`);
            console.log("------------------------------------------");
        });
    };
    updateProduct() {
        if (this.Products.length === 0) {
            console.log(" le stock est vide!!!!")
            return;
        } else {
            const id = +prompt(" ID du produit ");
            const product = this.Products.find(p => p.id == id);
            if (product) {
                let nvQuantity = +prompt("nouvelle quantité:");
                if (isNaN(nvQuantity) || nvQuantity <= 0) {
                    console.log("quantité invalide.");
                    return;
                }
                let nvPrix = +prompt("nouveau prix:");
                if (isNaN(nvPrix) || nvPrix <= 0) {
                    console.log(" prix invalide.");
                    return;
                }
                product.quantity = nvQuantity;
                product.price = nvPrix;
                this.saveToFile();
            } else {
                console.log("Produit non trouvé.");
            }
        }
    };
    deleteProduct() {
        if (this.Products.length === 0) {
            console.log("Stock vide !")
            return;
        }
        const id = +prompt(" entrer le ID à supprimer:")
        const index = this.Products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.Products.splice(index, 1);
            console.log("Produit supprimé!!");
            this.saveToFile();
        } else {
            console.log("Produit introuvable")
        }
    };
}
module.exports = Inventory