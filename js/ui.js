export const changerVue = () => {
    const catalogue = document.getElementById("catalogue");
    const boutonGrille = document.getElementById("vue-grille");
    const boutonListe = document.getElementById("vue-liste");
        boutonListe.addEventListener("click", () => {
        catalogue.classList.remove("sm:grid-cols-2", "lg:grid-cols-4");
   });
     boutonGrille.addEventListener("click", () => {
    catalogue.classList.add("sm:grid-cols-2", "lg:grid-cols-4");

    });
 };