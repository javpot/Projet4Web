document.addEventListener("DOMContentLoaded", function(){
  console.log("///////////////////////////////////////////////////////////////////////////////////////");
  const url = document.URL;
  //const url = `../content/${category}.html`;
  url+="all-contact";
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log("HELLO from albani!!!!!!!!!!!!!!"+json);
      var ul = document.getElementById(parent);
      console.log(ul);

      json.forEach(list => {
        var li = document.createElement('li');
        li.setAttribute('class', 'li-contact');
        li.setAttribute('onclick', "location.href = /contact/" + list.id);

        var button = document.createElement('button');
        button.setAttribute('class', 'buttonContact');

        ul.appendChild(li);
        li.appendChild(button);

        button.appendChild(document.createElement('p').innerHTML(list.Prenom + " " + list.Nom));
        button.appendChild(document.createElement('p').innerHTML(list.entreprise));
        console.log(list.Prenom, list.Nom, list.entreprise);
      });
    })
    .catch((error) => console.error(error));
});


const menuItems = document.querySelector("#sidebarMenuInner");

menuItems.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    const category = this.textContent.trim();
    getHTMLfile(category);
  });
});

document.getElementById("addUser").addEventListener("click", function (event) {
  event.preventDefault();
  console.log(9);
  getHTMLfile("addUser");
});