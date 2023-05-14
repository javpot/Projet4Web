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

// code qui recherche la meteo selon la ville ecrite a revoir

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

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error('Error occurred while connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB successfully!');

  const db = client.db('<db_name>');
  const collection = db.collection('<collection_name>');

  const document = { name: 'John Doe', age: 30 };
  collection.insertOne(document, function(err, result) {
    if (err) {
      console.error('Error occurred while inserting document:', err);
    } else {
      console.log('Document inserted successfully!');
      // Perform other database operations if needed
    }

    client.close(); // Close the connection after all operations are done
  });
});