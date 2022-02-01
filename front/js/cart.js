let localPanier = JSON.parse(localStorage.getItem("panier"));
console.log(localPanier)
let qty = 0;
let total = 0;
/*soit on est sur la page panier*/
if (location.href.search("confirmation") < 1 ){

  if (localPanier == null){
    document.getElementById("totalQuantity").innerHTML = 0;
    document.getElementById("totalPrice").innerHTML = 0 ;
    document.getElementById("cart__items")
      .innerHTML = `<h3 style="text-align: center; margin-bottom: 50px;">Vous n'avez aucun article dans votre panier !</h3>`;
    document.getElementById("order").addEventListener("click",function(e){
      e.preventDefault()
      alert("ajouter d'abord un produit à votre panier!")
    })
  }
  else{
/*fonction qui va créer les élément pour afficher le panier*/
    async function createElements() {
      let cart__items = document.getElementById("cart__items");
      for (let article of localPanier) {

        qty += article.quantity*1;
        total += article.quantity * article.price;
        /* Création de toutes les balises qui seront utilisés*/
        let cart__item = document.createElement("article");
        let cart__item__img = document.createElement("div");
        let img = document.createElement("img");
        let cart__item__content = document.createElement("div");
        let cart__item__content__description = document.createElement("div");
        let cart__item__content__description__name =
          document.createElement("h2");
        let cart__item__content__description__color =
          document.createElement("p");
        let cart__item__content__description__price =
          document.createElement("p");
        let cart__item__content__settings = document.createElement("div");
        let cart__item__content__settings__quantity =
          document.createElement("div");
        let cart__item__content__settings__quantity_qty =
          document.createElement("p");
       let itemQuantity = document.createElement("input");
       let cart__item__content__settings__delete =
          document.createElement("div");
        let deleteItem = document.createElement("p");

        /* Ajout de toutes les balises au document*/
        cart__items.appendChild(cart__item);
        cart__item.appendChild(cart__item__img);
        cart__item__img.appendChild(img);
        cart__item.appendChild(cart__item__content);
        cart__item__content.appendChild(cart__item__content__description);
        cart__item__content__description.append(
          cart__item__content__description__name,
          cart__item__content__description__color,
          cart__item__content__description__price
        );
        cart__item__content.appendChild(cart__item__content__settings);
        cart__item__content__settings.appendChild(
          cart__item__content__settings__quantity
        );
        cart__item__content__settings__quantity.appendChild(
          cart__item__content__settings__quantity_qty
        );
        cart__item__content__settings__quantity.appendChild(itemQuantity);
        cart__item__content__settings.appendChild(
          cart__item__content__settings__delete
        );
        cart__item__content__settings__delete.appendChild(deleteItem);

        /* Ajout des classes et attributs*/
        cart__item.classList.add("cart__item");
        cart__item.setAttribute("data-id", article.id);
        cart__item.setAttribute("data-color", article.color);

        cart__item__img.classList.add("cart__item__img");
        img.src = article.srcImg;
        img.alt = article.altTxt;

        cart__item__content.classList.add("cart__item__content");
        cart__item__content__description.classList.add("cart__item__content__description");
        cart__item__content__description__name.textContent = article.name;
        cart__item__content__description__color.textContent = article.color;
        cart__item__content__description__price.textContent = article.price+'€';
        cart__item__content__settings.classList.add("cart__item__content__settings");
        cart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity");
        cart__item__content__settings__quantity_qty.textContent = "Qté : ";
        itemQuantity.classList.add("itemQuantity");
        itemQuantity.setAttribute("name", "itemQuantity");
        itemQuantity.setAttribute("type", "number");
        itemQuantity.setAttribute("min", "1");
        itemQuantity.setAttribute("max", "100");
        itemQuantity.setAttribute("value", article.quantity);
        cart__item__content__settings__delete.classList.add(
          "cart__item__content__settings__delete"
        );
        deleteItem.classList.add("deleteItem");
        deleteItem.textContent = "Supprimer";
      }

      let vignettes = document.querySelectorAll(".cart__item");
      let suppressions = document.querySelectorAll(".deleteItem");
      let quantity = document.querySelectorAll(".itemQuantity");
      for (let i = 0; i < vignettes.length; i++) {
        const qty = quantity[i];
        qty.addEventListener("change", (e) => {
          /*On envoie la quantité selectionnée dans le panier*/
          localPanier[i].quantity = parseInt(e.target.value);
          /* On met à jour le localstorage*/
          localStorage.setItem("panier", JSON.stringify(localPanier));
          /* on lance la fonction qui va mettre à jour le prix et le total de la page panier*/
          recalcul();
        });
      }

      for (let i = 0; i < vignettes.length; i++) {
        const suppr = suppressions[i];
        let colorId = localPanier[i].color;
        let dataId = localPanier[i].id;
        suppr.addEventListener("click", () => {
          /* On supprime de notre panier l'élément de la boucle selectionné via splice()*/
          let filtre = localPanier.filter(function (article) {
            return article.id != dataId || article.color != colorId;
          });

          localPanier = filtre;
          console.log(localPanier);

          /* on supprime le code HTML de ce même élément*/
          document.querySelector(`[data-id='${dataId}']` && `[data-color='${colorId}']`).remove();
        
          /* On met à jour le localstorage*/
          localStorage.setItem("panier", JSON.stringify(localPanier));
          /* on lance la fonction qui va mettre à jour le prix et le total de la page panier*/
          recalcul();
        });
      }

      /* Affichage de la quantité et du prix total*/
      document.getElementById("totalQuantity").innerHTML = qty;
      document.getElementById("totalPrice").innerHTML = total;
    }
    createElements();

    /*fonction qui recalcule les quantité et le total des produits*/
    function recalcul() {
      let panier = JSON.parse(localStorage.getItem("panier"));
      let quantity = 0;
      let total = 0;
      for (article of panier) {
        quantity += parseInt(article.quantity);
        total += parseFloat(article.price) * parseInt(article.quantity);
      }
      document.getElementById("totalQuantity").innerHTML = quantity;
      document.getElementById("totalPrice").innerHTML = total;

      if (quantity == 0) {
        localStorage.removeItem("panier");
        panier = null;
        document.getElementById("cart__items")
          .innerHTML = `<h3 style="text-align: center; margin-bottom: 50px;">Vous n'avez aucun article dans votre panier !</h3>`;
      }
    }


    products =[];
    contact ={
      firstName : "",
      lastName : "",
      address : "",
      city : "",
      email : "",
    };


    document.querySelector("div.cart__order__form__question input[name='firstName']")
     .addEventListener("input", function(e) {
       contact.firstName = e.target.value;
     })
    document.querySelector("div.cart__order__form__question input[name='lastName']")
      .addEventListener("input", function(e) {
        contact.lastName = e.target.value;
      })
    document.querySelector("div.cart__order__form__question input[name='address']")
      .addEventListener("input", function(e) {
        contact.address = e.target.value;
      })
    document.querySelector("div.cart__order__form__question input[name='city']")
      .addEventListener("input", function(e) {
        contact.city = e.target.value;
      })
    document.querySelector("div.cart__order__form__question input[name='email']")
      .addEventListener("input", function(e) {
        contact.email = e.target.value;
      })

     /*Les fonction qui doivent vérifer que le formulaire est bien remplie */ 
     
    function verifyFirstName() {
      if (contact.firstName == ""){
        document.getElementById("firstNameErrorMsg").textContent = "veuillez entrer votre prénom!"
        document.getElementById("firstName").style.border = "3px solid red";
      }
      else if (/[0-9]/.test(contact.firstName)){
        document.getElementById("firstNameErrorMsg").textContent = "votre prénom ne doit pas contenir de chiffre!";
        document.getElementById("firstName").style.border = "3px solid red";
      }
      
      else{
        document.getElementById("firstName").style.border = "3px solid green";
        document.getElementById("firstNameErrorMsg").textContent = ""; 
        return true;
      }
    }

    function verifyLastName() {
      if (contact.lastName == ""){
        document.getElementById("lastNameErrorMsg").textContent = "veuillez entrer votre nom!"
        document.getElementById("lastName").style.border = "3px solid red";
      }
      else if (/[0-9]/.test(contact.lastName)){
        document.getElementById("lastNameErrorMsg").textContent = "votre nom ne doit pas contenir de chiffre!";
        document.getElementById("lastName").style.border = "3px solid red";
      }
      else{
        document.getElementById("lastNameErrorMsg").textContent = "";
        document.getElementById("lastName").style.border = "3px solid green";
        return true;
      }
    }

    function verifyAddress() {
      if (contact.address == ""){
        document.getElementById("addressErrorMsg").textContent = "veuillez entrer votre adresse!"
        document.getElementById("address").style.border = "3px solid red";
      }
      else{
        document.getElementById("addressErrorMsg").textContent = "";
        document.getElementById("address").style.border = "3px solid green";
        return true;
      }
    }

    function verifyCity() {
      if (contact.city == ""){
        document.getElementById("cityErrorMsg").textContent = "veuillez entrer votre ville!"
        document.getElementById("city").style.border = "3px solid red";
      }
      else if (/[0-9]/.test(contact.city)){
        document.getElementById("cityErrorMsg").textContent = "votre nom ne doit pas contenir de chiffre!";
        document.getElementById("city").style.border = "3px solid red";
      }
      else{
        document.getElementById("cityErrorMsg").textContent = "";
        document.getElementById("city").style.border = "3px solid green";
        return true;
      }
    }

    function verifyEmail() {
      if (contact.email == ""){
        document.getElementById("emailErrorMsg").textContent = "veuillez entrer votre Email!"
        document.getElementById("email").style.border = "3px solid red";
      }
      if (!/^[a-z0-9\-_\.]+@[a-z0-9]+\.[a-z]{2,5}$/i.test(contact.email)){
        document.getElementById("emailErrorMsg").textContent = "Email non valide!"
        document.getElementById("email").style.border = "3px solid red";
      }
      else{
        document.getElementById("emailErrorMsg").textContent = "Email Valide";
        document.getElementById("email").style.border = "3px solid green";
        return true;
     }
    }
  
    document.getElementById("order").addEventListener("click", (e) =>{ 
      e.preventDefault()
      /* Fonction fetch qui envoie à l'API un objet contenant l'objet 'contact' et le tableau 'products'*/
      async function sendData() {
        fetch("http://localhost:3000/api/products/order", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
          },
          body: JSON.stringify({contact, products}),
        })
          /* Ensuite on récupère la réponse de l'api (orderId)*/
          .then(function (response) {
            return response.json();
          })
          /*et on envoie la page de confirmation*/
          .then(function (data) {
            let orderId = data.orderId;
           /* window.location.href= `./confirmation.html?id=${orderId}` ;*/ 
        console.log(orderId);
          });
        
      }
      /* Fontion qui envoie les id de tout les produits dans le tableau products*/
      function collectDatas() {
        for (let article of localPanier) {
          products.push(article.id);
        }
      }
      verifyFirstName();
      verifyLastName();
      verifyAddress();
      verifyCity();
      verifyEmail();

    /*on vérifie que le formulaire est bien remplie et qu'il y a quelque chose dans le panier  */
      if (verifyFirstName() && verifyLastName() && verifyAddress() && verifyCity() && verifyEmail()){
        if(localPanier.length > 0){
        collectDatas();
        sendData();
        }
        else{
          alert("Votre panier est vide!")
        }
      }
      
      
    })
  }
}
/*soit sur la page confirmation */
else {
  orderId = window.location.search.replace("?", "");
  document.getElementById("orderId").innerHTML = orderId;
  // On supprime le panier du localStorage pour pouvoir passer d'autres productss
  localStorage.removeItem("panier");

}