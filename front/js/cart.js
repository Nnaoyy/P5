let products = JSON.parse(localStorage.getItem("panier"));
console.log(products)
let qty = 0;
let total = 0;
/*fonction qui va créer les élément pour afficher le panier*/
 async function createElements() {
    let cart__items = document.getElementById("cart__items");
    for (let article of products) {

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
        products[i].quantity = parseInt(e.target.value);
        /* On met à jour le localstorage*/
        localStorage.setItem("panier", JSON.stringify(products));
        /* on lance la fonction qui va mettre à jour le prix et le total de la page panier*/
        recalcul();
      });
    }

    for (let i = 0; i < vignettes.length; i++) {
      const suppr = suppressions[i];
      let colorId = products[i].color;
      let dataId = products[i].id;
      suppr.addEventListener("click", () => {
        /* On supprime de notre panier l'élément de la boucle selectionné via splice()*/
        let filtre = products.filter(function (article) {
          return article.id != dataId || article.color != colorId;
        });

        products = filtre;
        console.log(products);

        /* on supprime le code HTML de ce même élément*/
        document
          .querySelector(
            `[data-id='${dataId}']` && `[data-color='${colorId}']`
          )
          .remove();
        /* On met à jour le localstorage*/
        localStorage.setItem("panier", JSON.stringify(products));
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
      document.getElementById(
        "cart__items"
      ).innerHTML = `<h3 style="text-align: center; margin-bottom: 50px;">Vous n'avez aucun article dans votre panier !</h3>`;
    }
  }
