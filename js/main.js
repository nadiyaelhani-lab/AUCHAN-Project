
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
let pageActuelle = 1;
let produitsParPage = 8;
// Fonction de pagination

const afficherPagination = (nombrePages) => {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    if (nombrePages <= 1) return;

    // Bouton Précédent
    const precedent = document.createElement("button");
    precedent.textContent = "← Précédent";
    precedent.type = "button";
    precedent.disabled = pageActuelle === 1;
    precedent.className = "px-4 py-2 bg-white rounded-lg disabled:opacity-40";

    precedent.addEventListener("click", () => {
        pageActuelle--;
        actualiserCatalogue();
    });

    // Bouton Suivant
    const suivant = document.createElement("button");
    suivant.textContent = "Suivant →";
    suivant.type = "button";
    suivant.disabled = pageActuelle === nombrePages;
    suivant.className = "px-4 py-2 bg-white rounded-lg disabled:opacity-40";

    suivant.addEventListener("click", () => {
        pageActuelle++;
        actualiserCatalogue();
    });

    // Afficher les boutons
    pagination.append(precedent, suivant);
};



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
    const nombrePages = Math.ceil(resultats.length / produitsParPage);
    const debut = (pageActuelle - 1) * produitsParPage;
const fin = debut + produitsParPage;
const produitsPage = resultats.slice(debut, fin);

    afficherProduits(produitsPage);
afficherPagination(nombrePages);

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
const taillePage = document.getElementById("taille-page");

taillePage.addEventListener("change", () => {
    produitsParPage = Number(taillePage.value);
    pageActuelle = 1;
    actualiserCatalogue();
});

const afficherDonnees = () => {
    chargerProduits()
        .then(produits => {
            tousLesProduits = produits;

            afficherCategories();
            actualiserCatalogue();
        })
        .catch(erreur => {
            console.error("Erreur de chargement :", erreur);
        });
};

afficherDonnees();
