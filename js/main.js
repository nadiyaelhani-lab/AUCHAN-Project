
import { afficherProduits } from "./products.js";
import { chargerProduits } from "./api.js";

// Menu mobile
const bouton = document.getElementById("menu-mobile");
const menu = document.getElementById("navigation-mobile");

bouton.addEventListener("click", () => {
    menu.classList.toggle("hidden");

    const estCache = menu.classList.contains("hidden");
    bouton.setAttribute("aria-expanded", !estCache);
});

// Recherche et filtres
const recherche = document.getElementById("recherche-produits");
const filtresCategories = document.getElementById("filtres-categories");

let tousLesProduits = [];
let categorieActive = "Toutes";

// Actualiser le catalogue
const actualiserCatalogue = () => {
    const texte = recherche.value.trim().toLocaleLowerCase("fr");

    const resultats = tousLesProduits.filter(produit => {
        const correspondNom = produit.nom
            .toLocaleLowerCase("fr")
            .includes(texte);

        const correspondCategorie =
            categorieActive === "Toutes" ||
            produit.categorie === categorieActive;

        return correspondNom && correspondCategorie;
    });

    afficherProduits(resultats);

    if (resultats.length === 0) {
        document.getElementById("catalogue").innerHTML =
            '<p class="text-gray-500">Aucun produit trouvé.</p>';
    }
};

// Créer les boutons de catégories
const afficherCategories = () => {
    const categories = [
        "Toutes",
        ...new Set(tousLesProduits.map(produit => produit.categorie))
    ];

    filtresCategories.innerHTML = "";

    categories.forEach(categorie => {
        const boutonCategorie = document.createElement("button");

        boutonCategorie.type = "button";
        boutonCategorie.textContent = categorie;

        boutonCategorie.className =
            "px-4 py-2 rounded-lg transition-colors " +
            (categorie === categorieActive
                ? "bg-[#183F35] text-white"
                : "bg-[#F5F8ED] text-[#183F35]");

        boutonCategorie.addEventListener("click", () => {
            categorieActive = categorie;
            afficherCategories();
            actualiserCatalogue();
        });

        filtresCategories.appendChild(boutonCategorie);
    });
};

// Recherche instantanée
recherche.addEventListener("input", actualiserCatalogue);

// Charger les produits
const afficherDonnees = async () => {
    try {
        tousLesProduits = await chargerProduits();

        afficherCategories();
        actualiserCatalogue();

    } catch (erreur) {
        console.error("Erreur de chargement :", erreur);
    }
};

afficherDonnees();
