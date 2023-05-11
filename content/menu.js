let loupeListener = document.getElementById("loupe").addEventListener("click", loadMeteoNomVille);

getHTMLfile("Accueil");
function getHTMLfile(category) {
  const url = `../content/${category}.html`;
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const categoryContent = document.getElementById("content");
      categoryContent.innerHTML = data;


      loadMeteo();
    })
    .catch((error) => console.error(error));
}


function loadMeteo() {
  document.querySelector(".meteo").innerHTML = "";
  let cle = "1ac298995ec2f7c641fb3806216c0c04";
  let url =
    "http://api.openweathermap.org/data/2.5/weather?q=Montreal,ca&units=metric&appid=" +
    cle;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const meteoData = new Meteo(data);
      const meteoSnippet = meteoData.getDOMElement();
      document.querySelector(".meteo").appendChild(meteoSnippet);
    })
    .catch((error) => console.error(error));
}
// code qui recherche la meteo selon la ville ecrite a revoir
function loadMeteoNomVille() {
  document.querySelector(".meteo").innerHTML = "";
  let searchContent = document.getElementById("searchContent").value;
  let cle = "1ac298995ec2f7c641fb3806216c0c04";
  let url ="http://api.openweathermap.org/data/2.5/weather?q=" + searchContent + ",ca&units=metric&appid=" +
    cle;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const meteoData = new Meteo(data);
      const meteoSnippet = meteoData.getDOMElement();
      document.querySelector(".meteo").appendChild(meteoSnippet);
      console.log(searchContent);
    })
    .catch((error) => console.error(error));
}

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