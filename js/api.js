export const chargerProduits = () => {
    return fetch("./data/data.json")
        .then(reponse => reponse.json());
};