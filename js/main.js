
import { afficherProduits } from "./products.js";
import { chargerProduits } from "./api.js";
const bouton = document.getElementById("menu-mobile");
const menu = document.getElementById("navigation-mobile");

bouton.addEventListener("click", () => {
menu.classList.toggle("hidden");
const estCache = menu.classList.contains("hidden");
bouton.setAttribute("aria-expanded", !estCache);
});
const afficherDonnees = async () => {
    const produits = await chargerProduits();
    console.log(produits);
    afficherProduits(produits);
};

afficherDonnees();
