// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    for (let i = 0; i < products.length; i++) {
        if (products[i]["id"] == id) { cartList.push(JSON.parse(JSON.stringify(products[i]))) }
    }

}

// Exercise 2
//Versió simple de l'exercici 2; la versió funcional està modificada per reaprofitar-la en exercicis posteriors
/*function cleanCart() {
    cartList = [];
}*/

function cleanCart() {
    cart = [];
    printCart();
    document.getElementById("count_product").innerHTML = 0;
    console.log("S'ha esborrat el carret.");
}


// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    var total = 0;

    for (let i = 0; i < cartList.length; i++) {
        total += cartList[i]["price"];
    }
    console.log(total);
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart,
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    //Cal eliminar "id"? A l'exemple no surt, però no hi veig el sentit. S'hauria de fer amb "delete"



    cartList.forEach(function (prod) {
        prod.subtotal = prod.price;
        prod["quantity"] = 1;
    });

    //Si cart està buit, hi passem el primer element de cartList. Utilitzo el truc de JSON.parse/stringify per crear una còpia independent de l'original
    if (cart.length == 0) {
    cart.push(JSON.parse(JSON.stringify(cartList[0])));
    cartList.shift();
    }
    
    //Passem la resta d'elements de cartList al cart
    for (let i = 0; i < cartList.length; i++) {
        for (let j = 0; j < cart.length; j++) {
            if (cartList[i].name == cart[j].name) {
                cart[j].quantity++;
                cart[j].subtotal += cart[j].price;
                break;
            } else if (j == cart.length - 1) {
                cart.push(JSON.parse(JSON.stringify(cartList[i])));
                break;
            }
        }
    }

    cartList = [];
    console.log(cart);
}

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    //El que es dona a "offer" no coincideix amb les instruccions donades
    for (let i = 0; i < cart.length; i++) {

        cart[i].subtotalWithDiscount = cart[i].price * cart[i].quantity; //podria posar =cart[i].subtotal però això em suposaria afegir línies a ex. 9

        if (cart[i].name == "Cooking oil" && cart[i].quantity >= cart[i].offer.number) {
            cart[i].subtotalWithDiscount -= (0.5 * cart[i].quantity);
        } else if (cart[i].name == "Instant cupcake mixture" && cart[i].quantity >= cart[i].offer.number) {
            cart[i].subtotalWithDiscount = +(cart[i].subtotalWithDiscount * (2 / 3)).toFixed(2);
        }
    }

    console.log(cart);
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    let newElements = "";
    let totalprice = 0;


    for (let i = 0; i < cart.length; i++) {
        newElements += `<tr class="text-center"><th scope="row">${cart[i].name}</th><td>${cart[i].price}</td><td>${cart[i].quantity}</td><td class="pe-0">${cart[i].subtotalWithDiscount}</td><td><button type="button" class="btn rounded-circle ps-0 pe-1 me-1 border-0" onclick="removeFromCart(${cart[i].id})">-</button><button type="button" class="btn border-0 p-0 rounded-circle" onclick="add1ToCart(${cart[i].id})">+</button></td></tr>`;
        totalprice += cart[i].subtotalWithDiscount;
    }

    document.getElementById("cart_list").innerHTML = newElements;
    document.getElementById("total_price").innerHTML = totalprice.toFixed(2);
    console.log("S'ha printejat la cart.");
}


// ** Nivell II **

// Exercise 8
function addToCart(id) {
    // Refactor previous code in order to simplify it
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.

    //Afegim els productes al carret
    for (let i = 0; i < products.length; i++) {
        if (id == products[i]["id"]) {
            products[i].subtotal = products[i].price;
            products[i]["quantity"] = 1;

            if (cart.length == 0) {
                cart.push(JSON.parse(JSON.stringify(products[i])));
            } else {
                for (let j = 0; j < cart.length; j++) {
                    if (products[i]["name"] == cart[j]["name"]) {
                        cart[j].quantity++;
                        cart[j].subtotal = cart[j].price * cart[j].quantity;
                        break;
                    } else if (j == cart.length - 1) {
                        cart.push(JSON.parse(JSON.stringify(products[i])));
                        break;
                    }
                }
            }
        }
    }

    //Apliquem promocions
    applyPromotionsCart();

    //Fem que el número del costat del carro s'actualitzi

    var totalQuantity = 0;
    cart.forEach(function (prod) {
        totalQuantity += prod.quantity;
    });
    document.getElementById("count_product").innerHTML = totalQuantity;
}

// Exercise 9
function removeFromCart(id) {
    //Identifiquem el producte seleccionat i li restem una unitat (quantitat)
    for (let i = 0; i < cart.length; i++) {
        if (cart[i]["id"] == id && cart[i]["quantity"] > 0) {
            cart[i]["quantity"]--;
        }

        //Reduïm número del carret
        var totalQuantity = 0;
        cart.forEach(function (prod) {
            totalQuantity += prod.quantity;
        });

        document.getElementById("count_product").innerHTML = totalQuantity;
    }
    //Recalculem subtotals i els imprimim
    applyPromotionsCart();
    printCart();
}

//Imprimim les dades cridant la funció printCart() --ex. 5
function open_modal() {
    console.log("Open Modal");
    printCart();
}

//Ampliació
function add1ToCart(id) {
        //Identifiquem el producte seleccionat i li restem una unitat (quantitat)
        for (let i = 0; i < cart.length; i++) {
            if (cart[i]["id"] == id && cart[i]["quantity"] >= 0) {
                cart[i]["quantity"]++;
            }

            /*Augmentem número del carret */
            var totalQuantity = 0;
            cart.forEach(function (prod) {
                totalQuantity += prod.quantity;
            });

            document.getElementById("count_product").innerHTML = totalQuantity;
        }
        //Recalculem subtotals i els imprimim
        applyPromotionsCart();
        printCart();
    
    //Imprimim les dades cridant la funció printCart() --ex. 5
    function open_modal() {
        console.log("Open Modal");
        printCart();
    }

}

