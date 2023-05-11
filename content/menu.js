let loupeListener = document.getElementById("loupe").addEventListener("click", loadMeteoNomVille);

getHTMLfile("Accueil");
function getHTMLfile(category) {
  const url = `../content/${category}.html`;
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const categoryContent = document.getElementById("content");
      categoryContent.innerHTML = data;
    })
    .catch((error) => console.error(error));
}

// code qui recherche la meteo selon la ville ecrite a revoir

const menuItems = document.querySelector("#menu");

menuItems.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    const category = this.textContent.trim();
    getHTMLfile(category);
  });
});

document.getElementById("addUser").addEventListener("click", function (event) {
  event.preventDefault();
  const category = this.textContent.trim();
  getHTMLfile(category);
});