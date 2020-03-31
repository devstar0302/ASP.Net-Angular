$(document).ready(function () {
    $(".ui-link").click(function () {
        //Do stuff when clicked
        console.log("click");
    });
    var swiper = new Swiper('.swiper-container',
        {
                paginationClickable: true,
                spaceBetween: 0
        });

    
})