/*

function getHTMLfile(category) {
  const url = `../content/${category}.html`;
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const categoryContent = document.getElementById("content");
      console.log(categoryContent);
      categoryContent.innerHTML = data;
    })
    .catch((error) => console.error(error));
}

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
*/