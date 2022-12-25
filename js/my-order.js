myOrderShow();

function myOrderShow() {
    let myOr = localStorage.getItem("myOrder");
    // let myOrObj = "";

    if (myOr == null) {
        myOrObj = [];
    }
    else {
        myOrObj = JSON.parse(myOr);
    }

    let myOrSh = "";

    myOrObj.forEach(function (element, index) {
        myOrSh += `<div class="myWishListItem">
        <hr>
        <div class="myWishListView">
            <div class="myOdImg">
                <img src="image/${element.imageName}.png" alt="product_Image" id="myItemImg2">
            </div>
            <div class="myOdDescription">
                <div class="pdtDescription">Your's Favourite Premium Quality Natural...</div>
                <div class="pdtRealPri myOdfo">Color : Multicolor</div>
                <div class="pdtRealPri myOdfo">Seller : krishnapoojabhandar</div>
            </div>
            <div class="myOdDescription2">
                <div class="pdtPriceDis">
                    <div class="pdtRsPri">Rs ${element.price}</div>
                </div>
            </div>
            <div class="myOdDescription3">
                <div class="myOdCiDe">
                    <i class="fa-regular fa-circle"></i>
                    <div class="myOdDel myOdDes">Delivery expected by Jul 28</div>
                </div>
                <div class="">
                    <div class="pdtRealPri myOdfo1">Your Order has been placed</div>
                    <a href="#" class="myOdTr">TRACK YOUR ORDER</a>
                </div>
            </div>
        </div>
        <hr>
    </div>`
    });

    
        document.querySelector(".myOrderAdd").innerHTML = myOrSh;

}