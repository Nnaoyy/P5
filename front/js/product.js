
/* récupération de l'id de la page*/
let url = new URL(window.location.href);
let id = url.searchParams.get("id");
console.log(id);

/* Création de la variable qui contiendra l'api */
let articles = [];
let product = {
    name: "",
    price: "",
    id: "",
    color: "",
    quantity: "0",
    srcImg: "",
    altTxt: "",
};
/* Fonction qui récupére tout les articles depuis l'api */
async function fetchApi() {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (articles = data))
    .catch(err => console.log('oh no', err))
}
/*fonction qui recherche ou se situe le produit grace a son ID*/
async function articleNumber(){
    await fetchApi()
    const idList = articles.map(el =>el._id);
    number = idList.indexOf(id);  
    return number
}

/*Fonction qui affiche les information du produit */
async function canapProduct(){   
    await articleNumber()

    let itemImg = document.getElementsByClassName("item__img");
    let item = itemImg[0];
    let article_img = document.createElement("img");
    item.appendChild(article_img);
    article_img.alt = articles[number].altTxt;
    article_img.src = articles[number].imageUrl;

    document.getElementById("title").textContent = articles[number].name;
    document.getElementById("price").textContent = articles[number].price;
    document.getElementById("description").textContent = articles[number].description;

    let colors = document.getElementById("colors");
    let colorsList = articles.map(el =>el.colors);
    console.log(colorsList[number])

    for (let i = 0; i < colorsList[number].length; i++) {
        let option = document.createElement("option");
        colors.appendChild(option);
        option.textContent = (colorsList[number])[i];
        option.value = (colorsList[number])[i];   
        
    }

    product.name = articles[number].name;
    product.price= articles[number].price;
    product.id = articles[number]._id;
    product.srcImg = articles[number].imageUrl;
    product.altTxt = articles[number].altTxt;


}

canapProduct()

document.getElementById("colors").addEventListener("change", function(e) {
    product.color = e.target.value;
    })
document.getElementById("quantity").addEventListener("input", function(e) {
    product.quantity = e.target.value;     
    })


document.getElementById("addToCart").addEventListener('click', function(){
     
    
    const canap = [];
    canap.push(product);
    localStorage.setItem("panier", JSON.stringify(canap));
    alert ("Votre produit à bien été ajouté au panier")
    
        
})


