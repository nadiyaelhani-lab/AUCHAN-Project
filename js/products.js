
export const afficherProduits = (produits) => {
    const catalogue = document.getElementById("catalogue");

    const cartes = produits.map(produit => `
        <article draggable="true" data-id="${produit.id}" class="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition-shadow">
            <img src="${produit.image}" alt="${produit.nom}" class="w-full h-48 object-contain">

            <h3>${produit.nom}</h3>
            <p>${produit.categorie}</p>
            <p>${produit.prix} DH</p>

            <button type="button" data-id="${produit.id}" class="mt-4 w-full bg-[#183F35] text-white py-2 px-4 rounded-lg hover:bg-[#31684C] transition-colors">
                Ajouter au panier
            </button>
        </article>
    `);

    const html = cartes.join("");
    catalogue.innerHTML = html;
};
