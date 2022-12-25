let header = document.getElementById("main-header");
let footer = document.getElementById("main-footer");

let url = "header.html";
fetch(url)
    .then((response) => {
        return response.text();
    }).then((headerHtml) => {
        $(header).html(headerHtml);
    })
let url2 = "footer.html";
fetch(url2)
    .then((response) => {
        return response.text();
    })
    .then((footerHtml) => {
        $(footer).html(footerHtml);
    })



// $(document).ready(function () {
//     fetch('header.html')
//     .then(response => response.text())
//     .then(function (headerHtml) {
//     $('#main-header').html(headerHtml);
//     });
//     fetch('footer.html')
//     .then(response => response.text())
//     .then(function (footerHtml) {
//     $('#main-footer').html(footerHtml);
//     });
//     });





