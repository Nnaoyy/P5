
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
    quantity: 0,
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
/*on récupère la couleur choisie */
document.getElementById("colors").addEventListener("change", function(e) {
    product.color = e.target.value;
})
/*on récupère la quantité choisie */
document.getElementById("quantity").addEventListener("input", function(e) {
    product.quantity = e.target.value;     
})

/*losqu'on clic on envoie les données du canapé dans le localstorage */
document.getElementById("addToCart").addEventListener('click', () => {
     /*On verifie d'abord si les information de couleur et de quantité sont bien rempli */
    function verify(){
        if (product.color == ""){
            alert("veuillez choisir une couleur!")
        }
        else if (product.quantity == 0 || product.quantity == ""){
            alert("veuiller choisir une quantitée!")
        }
        else{
            cart();
        }
    }
/*Fonction qui va mettre le produit dans le panier */
    function cart(){
        /*On récupère le panier */
        let listProduct = JSON.parse(localStorage.getItem("panier"));

        /*Si il y a deja quelquechose dans le panier */
        if (listProduct){
            /*On cherche si le produit et déja présent dans le panier même id et même couleur */
            let productAlreadyIn = listProduct.find((element) => 
            element.id == product.id && element.color == product.color
            );
            /*Si il est deja présent on augmente la quantité et on envoie le panier en localstorage */
            if (productAlreadyIn){
                let qty = productAlreadyIn.quantity*1;
                qty += product.quantity*1;
                productAlreadyIn.quantity = qty;
                localStorage.setItem("panier", JSON.stringify(listProduct));
                alert("la quantité du produit a été mise à jour")
                return;
            }
            /*si il n'est pas déja présent on le rajoute dans le panier */
            listProduct.push(product);
            localStorage.setItem("panier", JSON.stringify(listProduct));
            alert("Votre produit à bien été ajouté au panier")
        }
        /*Si le panier est vide */
        else {
            const canap = [];
            canap.push(product);
            localStorage.setItem("panier", JSON.stringify(canap));
            alert ("Votre produit à bien été ajouté au panier")
    
        }

    }
    
    verify();   
})


