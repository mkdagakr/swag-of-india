wishListShow();

fetch("products.json").then(response => response.json())
    .then((data) => {
        let prodt = data.Products;
        localStorage.setItem("jsonote", JSON.stringify(prodt));
    })

function addWishList(index){

    let jsonStore = JSON.parse(localStorage.getItem("jsonote"));
    let body = jsonStore[index - 1];
    let wishObj = localStorage.getItem("wishObj");
    if (wishObj == null){
        list = [];
        list.push(body);
    }
    else{
        list = JSON.parse(wishObj);
        list.forEach(function(element, ind){
            if (element.id == body.id){
                body = null;
            }
        })
        if(body != null){
            list.push(body);
        }
    }
    localStorage.setItem("wishObj", JSON.stringify(list));
    wishListShow();
}

function wishListShow(){    
    let wishObj = localStorage.getItem("wishObj");
    if (wishObj == null){
        list = [];
    }
    else{
        list = JSON.parse(wishObj);
    }

    
    document.querySelector(".myWishList").innerHTML = `My Wishlist (0 Item)`;

    let wishShow = "";
    let starList = "";
    let noStarList = "";
    list.forEach(function(element, index){

        document.querySelector(".myWishList").innerHTML = `My Wishlist (${index + 1} Item)`;

        wishShow += `<div class="myWishListItem">
        <hr>
        <div class="myWishListView">
            <div class="myItemImg">
                <img src="image/${element.imageName}.png" alt="product_Image" id="myItemImg1">
            </div>
            <div class="wishListDescription">
                <div class="pdtDescription">Indus Valley Disposable Face Mask Pack of 50 pc</div>
                <div class="pdtStarWish">`
                
                for(let i=1; i<=element.ratings; i++){
                    starList += `<i class="fa-solid fa-star"></i>`
                }
                wishShow += starList;
                starList = "";

                if (element.ratings < 5){
                    let j = 1;
                    do {
                        noStarList += `<i class="fa-regular fa-star"></i>`
                        j++;
                    }while(j <= (6-element.ratings));
                }
                wishShow += noStarList;
                noStarList = "";

                wishShow += `</div>
                <div class="pdtPriceDis">
                    <div class="pdtRsPri">Rs ${element.priceAfterDiscount}</div>
                    <del class="pdtRealPri">Rs ${element.price}</del>
                    <div class="pdtOfferPtg">(60% Off)</div>
                </div>
                <div class="pdtSelectPc">
                    <select name="pack" id="pdtPack">
                        <option value="">Select Pack of</option>
                    </select>
                </div>
                <div class="addCartRemove">
                    <div class="addCartbtn" id="${(element.id)-(1)}" onclick="addicart(this.id)">Add to Cart</div>
                    <div>|</div>
                    <div class="removeWishList" onclick="removeWish(${index})">Remove from wishlist</div>
                </div>
            </div>
        </div>
        <hr>
    </div>`
    });

    let myWishListItemAdd = document.querySelector(".myWishListItemAdd");
    if(list.length != 0){
        myWishListItemAdd.innerHTML = wishShow;
    }
    else{
        myWishListItemAdd.innerHTML = "You don\'t have any product in wishlist...";
    }
}

function removeWish(index){
    let wishObj = localStorage.getItem("wishObj");
    if (wishObj == null){
        list = [];
    }
    else{
        list = JSON.parse(wishObj);
    }
    list.splice(index, 1);
    localStorage.setItem("wishObj", JSON.stringify(list));
    wishListShow();
}