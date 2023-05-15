document.addEventListener("DOMContentLoaded", function () {
  console.log("///////////////////////////////////////////////////////////////////////////////////////");
  let url = document.URL;
  //const url = `../content/${category}.html`;
  url += "all-contact";
  console.log(url)
  /*
  fetch(url)
    .then(response => {
      return response.json()
    })
    .then(data => {
      data.forEach(element => {
        // Contact
        const prenom = element.prenom;
        const nom = element.nom;

        let content = document.getElementById("test");
        //cree card-contact
        let cardContact = document.createElement("div");
        cardContact.className = "card-contact";

        //prenom
        let prenomH2 = document.createElement("h2");
        prenomH2.innerHTML = prenom;

        cardContact.append(prenomH2);
        content.append(cardContact);
      }
      )
      */
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          console.log("HELLO from albani!!!!!!!!!!!!!!"+json);
          var ul = document.getElementById("ul-contact");
          console.log(ul);
    
          json.forEach(list => {
            var li = document.createElement('li');
            li.setAttribute('class', 'li-contact');
            li.setAttribute('onclick', "location.href = /contact/" + list.id);
    
            var button = document.createElement('button');
            button.setAttribute('class', 'buttonContact');
    
            li.appendChild(button);
            ul.appendChild(li);

            button.append(document.createElement('p').innerHTML = list.prenom + " " + list.nom);
            button.append(document.createElement('p').innerHTML = list.entreprise + " ");
            console.log(list.prenom, list.nom, list.entreprise);
          });
        })
        .catch((error) => console.error(error));
    });