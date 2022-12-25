showCart();
couponPrice();

function couponPrice() {
    let a_Dis = JSON.parse(sessionStorage.getItem("disRate"));
    let b_Price = JSON.parse(sessionStorage.getItem("price"));
    let t_Discount = 0;
    let t_Price = 0;
    for (let k in a_Dis) {
        t_Discount += a_Dis[k];
    }
    for (let key in b_Price) {
        t_Price += b_Price[key];
    }
    document.querySelector(".tPriceAll").innerHTML = (t_Price).toFixed(2);
    document.querySelector(".tPriceDisAll").innerHTML = ((t_Price) - (t_Discount)).toFixed(2);
    document.querySelector(".tPriceRealAll").innerHTML = (t_Discount).toFixed(2);
    document.querySelector(".tRsCartAll").innerHTML = (t_Discount).toFixed(2);
    document.querySelector(".tPriceRealAllLast").innerHTML = (t_Discount).toFixed(2);

}

function priceRate(ind, price) {
    document.querySelector("#ctpbdis" + ind).innerHTML = price;

    let b_price = sessionStorage.getItem("price");
    if (b_price == null) {
        pri = [];
    }
    else {
        pri = JSON.parse(b_price);
    }
    pri.splice(ind, 1, price);
    sessionStorage.setItem("price", JSON.stringify(pri));
}
function disRate(ind, afterDiscount) {
    document.querySelector("#ctpadis" + ind).innerHTML = afterDiscount;

    let a_Dis = sessionStorage.getItem("disRate");
    if (a_Dis == null) {
        pr = [];
    }
    else {
        pr = JSON.parse(a_Dis);
    }
    pr.splice(ind, 1, afterDiscount);
    sessionStorage.setItem("disRate", JSON.stringify(pr));
    couponPrice();
}


function minus(index) {
    let pri = JSON.parse(localStorage.getItem("cartStore"));
    let prAftDis = pri[index].priceAfterDiscount;  // price after discount
    let prbfrDis = pri[index].price;   // actual price
    let itQty = document.querySelector(".ctqty" + index).textContent;  // item quantity class namitQtyInt
    let itQtyInt = parseInt(itQty);     // item quantity convert into integer
    if (itQtyInt > 1) {
        itQtyInt--;
        itQtyInt = (itQtyInt < 10) ? "0" + itQtyInt : itQtyInt;
        document.querySelector("#ctqt" + index).innerHTML = itQtyInt;  // item quantity by id:  implement decrement
        priceRate(index, itQtyInt * prbfrDis);
        disRate(index, itQtyInt * prAftDis);
    }
}
function plus(index) {
    let pri = JSON.parse(localStorage.getItem("cartStore"));
    let prAftDis = pri[index].priceAfterDiscount;    // price after discount
    let prbfrDis = pri[index].price;   // actual price

    let itQty = document.querySelector(".ctqty" + index).textContent;   // item quantity by class name
    let itQtyInt = parseInt(itQty);   // item quantity convert into integer
    itQtyInt++;
    itQtyInt = (itQtyInt < 10) ? "0" + itQtyInt : itQtyInt;
    document.querySelector("#ctqt" + index).innerHTML = itQtyInt;   // item quantity by id:  implement increment 

    priceRate(index, itQtyInt * prbfrDis);
    disRate(index, itQtyInt * prAftDis);
}

fetch("products.json").then(response => response.json())
    .then((data) => {
        let product = data.Products;
        localStorage.setItem("note", JSON.stringify(product));
    })

function addicart(index) {
    let store = JSON.parse(localStorage.getItem("note"));
    let body = store[index];
    let cartStore = localStorage.getItem("cartStore");
    let noteObj = "";
    if (cartStore == null) {
        noteObj = [];
        noteObj.push(body);
    }
    else {
        noteObj = JSON.parse(cartStore);
        noteObj.forEach(function (element, ind) {
            if (element.id == body.id) {
                body = null;
            }
        })
        if (body != null) {
            noteObj.push(body);
        }
    }
    localStorage.setItem("cartStore", JSON.stringify(noteObj));
    showCart();
}

function showCart() {
    let cartStore = localStorage.getItem("cartStore");

    if (cartStore == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(cartStore);
    }
    document.querySelector("#cart-item").innerHTML = `(0 Items)`;
    let show = "";

    noteObj.forEach(function (element, index) {

        document.getElementById("cart-item").innerHTML = `(${index + 1} Items)`;

        show += `<div class="addcartproduct1">
    <div class="cartpdtdiscription">
        <img src="image/${element.imageName}.png" alt="Image" class="cartimg">
        <div class="cartimgdis">
            <h6>Your's Favourite Premium Quality Natural...</h6>
            <p class="imgcartcolor">Color: Green</p>
            <p class="cartpdtsold">Sold By: Macmerise Celfie Design Pvt. Ltd.</p>
            <div class="cartpdtsize">
                <p>Size: </p>
                <select name="Product-Size" class="cartpdtsize">
                    <option value="small">Small</option>
                    <option value="xl">XL</option>
                    <option value="xxl">XXL</option>
                </select>
                
            </div>  
            <div class="pdtqty">
                <h6>QTY</h6>
                <div class="plusminusqty">
                    <div class="ctminus" onclick="minus(${index})">-</div>
                    <div class="ctqty ctqty${index}" id="ctqt${index}">01</div>
                    <div class="ctplus" onclick="plus(${index})">+</div>
                </div>
            </div>                         
        </div>
        <div class="ctpdrs">
            <div class="ctpriceaftdis">Rs <span id="ctpadis${index}"> ${element.priceAfterDiscount} </span></div>
            <div class="discountcartpriceoffer">
                <del>Rs <span id="ctpbdis${index}"> ${element.price} </span></del>
                <p>(60% Off)</p>
            </div>
            <div class="pdtdelivery">Delivery in 4 - 6 days</div>
        </div>
    </div>
    <hr>
    <div class="removecart">
        <div id="${index}" onclick="removeCart(this.id)" class="cremove">Remove</div>
        <div class="slash">|</div>
        <div class="movetowishlist" onclick="addWishListC(${element.id})">Move To Wishlist</div>
    </div>
</div>`;

    });

    let addCartProduct = document.querySelector("#addCartProduct");
    if (noteObj.length != 0) {
        addCartProduct.innerHTML = show;
    } else {
        addCartProduct.innerHTML = "Add Product\'s in Your Cart...";
    }
}

function removeCart(index) {
    let cartStore = localStorage.getItem("cartStore");
    if (cartStore == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(cartStore);
    }
    noteObj.splice(index, 1);
    localStorage.setItem("cartStore", JSON.stringify(noteObj));
    showCart();

    let a_Dis = sessionStorage.getItem("disRate");
    if (a_Dis == null) {
        pri = [];
    }
    else {
        pri = JSON.parse(a_Dis);
    }
    pri.splice(index, 1);
    sessionStorage.setItem(`disRate`, JSON.stringify(pri));


    let b_price = sessionStorage.getItem("price");
    if (b_price == null) {
        pr = [];
    }
    else {
        pr = JSON.parse(b_price);
    }
    pr.splice(index, 1);
    sessionStorage.setItem("price", JSON.stringify(pr));
    couponPrice();
}

function removeAllCart() {

    let cartStore = localStorage.getItem("cartStore");

    // My Order local Storage
    let myOrder = JSON.parse(cartStore);
    let myOrL = localStorage.getItem("myOrder");
    let myOrdObj = "";
    myOrder.forEach(function (element, index){
        if(myOrL == null){
            myOrdObj = [];
        }
        else{
            myOrdObj = JSON.parse(myOrL);
        }
        myOrdObj.push(element);
        localStorage.setItem("myOrder", JSON.stringify(myOrdObj));
        console.log(index);
    })



    let noteObj = JSON.parse(cartStore);

    noteObj.forEach(function (e, index) {
        noteObj.splice(index, 6);
    });
    localStorage.setItem("cartStore", JSON.stringify(noteObj));
    showCart();


    let a_Dis = sessionStorage.getItem("disRate");
    let pri = JSON.parse(a_Dis);

    pri.forEach(function (e, index) {
        pri.splice(index, 6);
    });
    sessionStorage.setItem("disRate", JSON.stringify(pri));



    let b_price = sessionStorage.getItem("price");
    let pr = JSON.parse(b_price);

    pr.forEach(function (e, index) {
        pr.splice(index, 6);
    });
    sessionStorage.setItem("price", JSON.stringify(pr));
    couponPrice();
    myOrderShow();
}


// WishList JavaScript

function addWishListC(index) {
    let cartStore = localStorage.getItem("cartStore");
    let indexid = 0;
    if (cartStore == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(cartStore);
        noteObj.forEach(function (e, ind) {
            if (e.id == index) {
                indexid = ind;
            }
        })
    }
    noteObj.splice(indexid, 1);
    localStorage.setItem("cartStore", JSON.stringify(noteObj));

    let a_Dis = sessionStorage.getItem("disRate");
    if (a_Dis == null) {
        pri = [];
    }
    else {
        pri = JSON.parse(a_Dis);
    }
    pri.splice(indexid, 1);
    sessionStorage.setItem(`disRate`, JSON.stringify(pri));


    let b_price = sessionStorage.getItem("price");
    if (b_price == null) {
        pr = [];
    }
    else {
        pr = JSON.parse(b_price);
    }
    pr.splice(indexid, 1);
    sessionStorage.setItem("price", JSON.stringify(pr));

    let jsonStore = JSON.parse(localStorage.getItem("jsonote"));
    let body = jsonStore[index - 1];
    let wishObj = localStorage.getItem("wishObj");
    if (wishObj == null) {
        list = [];
        list.push(body);
    }
    else {
        list = JSON.parse(wishObj);
        list.forEach(function (element, ind) {
            if (element.id == body.id) {
                body = null;
            }
        })
        if (body != null) {
            list.push(body);
        }
    }
    localStorage.setItem("wishObj", JSON.stringify(list));
    showCart();
    couponPrice();
    wishListShow();
}

// my order
