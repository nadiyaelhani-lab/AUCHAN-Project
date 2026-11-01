export const chargerProduits = async () => {
    const reponse = await fetch("./data/data.json");
    const produits = await reponse.json();

    return produits;
};