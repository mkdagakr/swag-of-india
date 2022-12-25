// Product-view 
let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");
let qty = document.querySelector(".pv-qty");

let a = 1;

plus.addEventListener("click", () => {
    a++;
    a = (a < 10) ? "0" + a : a; // this statement used for set 0 in single digit number.
    qty.innerHTML = a;
})

minus.addEventListener("click", () => {
    if (a > 1) {
        a--;
        a = (a < 10) ? "0" + a : a;
        qty.innerHTML = a;
    }
})