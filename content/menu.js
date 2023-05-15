document.addEventListener("DOMContentLoaded", function () {
  console.log("///////////////////////////////////////////////////////////////////////////////////////");
  let url = document.URL;
  //const url = `../content/${category}.html`;
  url += "all-contact";
  console.log(url)
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log("HELLO from albani!!!!!!!!!!!!!!" + json);
      let ul = document.getElementById("ul-contact");
      let singlePersonDiv = document.getElementById("singlePersonDiv")
      console.log(ul);

      json.forEach(list => {
        var li = document.createElement('li');
        li.setAttribute('class', 'li-contact');
        li.setAttribute('onclick', "location.href = /contact/" + list._id);

        var button = document.createElement('button');
        button.setAttribute('class', 'buttonContact');

        li.appendChild(button);
        ul.appendChild(li);

        button.append(document.createElement('p').innerHTML = list.prenom + " " + list.nom);
        button.append(document.createElement('p').innerHTML = "\n" + list.entreprise);

        button.addEventListener("click", () => {
          ul.style.display = "none"
          let urlSinglePerson = document.URL + "contact/" + list.phone
          let urlDeletePerson = document.URL + "contactDelete/" + list.phone
          singlePersonDiv.style.display = "block"

          fetch(urlSinglePerson).then(res => res.json())
            .then(json => {
              singlePersonDiv.append(document.createElement('p').innerHTML = json.prenom + " " + json.nom);
              singlePersonDiv.append(document.createElement('p').innerHTML = json.telephone + " " + json.mobile);
              singlePersonDiv.append(document.createElement('p').innerHTML = "\n" + json.entreprise);

              let supprimer = document.createElement('button');
              let button = document.createElement('button');

              button.innerHTML = 'Close'
              supprimer.innerHTML = 'Supprimer'

              supprimer.addEventListener("click", function() {
                fetch(urlDeletePerson, {method: "DELETE"})
                .then(res => res.text())
                .then(res => {
                  console.log(res)
                  this.location.reload()
                })
              })

              button.addEventListener("click", function () {
                ul.style.display = "block"
                singlePersonDiv.style.display = "none"
                while (singlePersonDiv.firstChild) {
                  singlePersonDiv.removeChild(singlePersonDiv.lastChild);
                }
              })
              singlePersonDiv.append(supprimer)
              singlePersonDiv.append(button)
            })
        })
        console.log(list.prenom, list.nom, list.entreprise);
      });
    })
    .catch((error) => console.error(error));
});