/* Création de la variable qui contiendra l'api */
let articles = [];

/* Fonction qui récupére tout les articles depuis l'api */
async function fetchApi() {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (articles = data))
    .catch(err => console.log('oh no', err))
}

/* Fonction pour insérer les produits sur la page d'acceuil*/
async function canapDisplay() {
  await fetchApi();
  let items = document.getElementById("items");

  for (let i = 0; i < articles.length; i++) {
    let link = document.createElement("a");
    let article = document.createElement("article");
    let article_img = document.createElement("img");
    let article_h3 = document.createElement("h3");
    let article_p = document.createElement("p");

    items.appendChild(link);
    link.appendChild(article);
    article.append(article_img, article_h3, article_p);

    link.href = `./product.html?id=${articles[i]._id}`;
    article_img.alt = articles[i].altTxt;
    article_img.src = articles[i].imageUrl;
    article_h3.classList.add("productName");
    article_h3.textContent = articles[i].name;
    article_p.classList.add("productDescription");
    article_p.textContent = articles[i].description;
  }
}
canapDisplay();
