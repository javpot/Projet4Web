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
      var ul = document.getElementById("ul-contact");
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
        
        button.addEventListener("click", function() {
          let urlSinglePerson = document.URL +"contact/"+list._id
          fetch(urlSinglePerson).then(res => res.json())
          .then(json =>{

            let singlePersonDiv = doucment.getElementById("singlePersonDiv")
            singlePersonDiv.append(document.createElement('p').innerHTML = json.prenom + " " + json.nom);
            singlePersonDiv.append(document.createElement('p').innerHTML = json.telephone + " " + json.mobile);
            singlePersonDiv.append(document.createElement('p').innerHTML = "\n" + json.entreprise);
          })
        })
        console.log(list.prenom, list.nom, list.entreprise);
      });
    })
    .catch((error) => console.error(error));
});