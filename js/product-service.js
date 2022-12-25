let totalItem = document.getElementById("total-item");

let productListurl = "products.json";

async function getProduct() {
    fetch(productListurl).then(response => response.json())
        .then((data) => {
            const products = data.Products;
            let htmlToReturn = "";
            let starRate = ""; let noStar = "";
            products.forEach((element, index) => {
                totalItem.innerText = `(${index + 1} Items)`
                htmlToReturn = `<div class="vp-product2 pl-bord-prod" id="${element.id}">
                    <img src="image/${element.imageName}.png" alt="image">
                        <h5>Dummy Text Lorel</h5>
                        <p>
                            <b>Rs ${element.priceAfterDiscount}</b>
                            <del>Rs ${element.price} </del>
                            <span class="offer">(60% Off)</span>
                        </p>
                       
                        <div class="vp-star-icon">`
                for (let i = 1; i <= element.ratings; i++) {
                    starRate += `<i class="fa-solid fa-star"></i>`
                }

                htmlToReturn += starRate;
                starRate = "";
                if (element.ratings < 5){
                    let j = 1;
                    do {
                        noStar += `<i class="fa-regular fa-star"></i>`
                        j++;
                    }while(j <= (6-element.ratings));
                }
                htmlToReturn += noStar;
                noStar = "";
                 htmlToReturn +=`</div >
                      <div class="vp-animate" id="vp-animate2">
                            <a href="wishlist.html" onclick="addWishList(${index+1})"><i class="fa-regular fa-heart"></i></a>
                            <a href="cart.html" id="${index}" onclick="addicart(this.id)"><i class="fa-solid fa-cart-shopping"></i></a>
                            <a href="#"><i class="fa-solid fa-eye"></i></a>
                        </div>
                </div>`
                document.querySelector("#productsListArea").innerHTML += htmlToReturn;
            });
        });
}

getProduct();