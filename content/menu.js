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

class Meteo {
  constructor(responseOpenWeatherMap) {
    const meteo = responseOpenWeatherMap;
    this.temperature = meteo.main.temp;
    this.ville = meteo.name;
    this.date = new Date();
    const iconCode = meteo.weather[0].icon;
    this.url = this.getIconImage(iconCode);
  }

  getDOMElement() {
    const elt = document.createElement("div");
    elt.classList = "meteoSnippet";
    const tempPara = document.createElement("p");
    tempPara.innerHTML = "Temperature: " + this.temperature + "C";
    const namePara = document.createElement("p");
    namePara.innerHTML = this.ville;
    const img = document.createElement("img");
    img.src = this.url;
    elt.appendChild(namePara);
    elt.appendChild(tempPara);
    elt.appendChild(img);
    return elt;
  }

  getIconImage(code) {
    return `http://openweathermap.org/img/wn/${code}@2x.png`;
  }
}