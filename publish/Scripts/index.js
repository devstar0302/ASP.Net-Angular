$(document).ready(function (event) {
    $(".ui-loader h1").css("display", "none");

    $("body").on("swipeleft", function (event) {
        var activeIndex = 0;
        var max = 0;
        $("li[name=navbarMenu]").each(function (index) {
            max++;
            if ($(this).attr("class") == "active")
                activeIndex = index;
        })
        if (activeIndex != max) {
            var href = $("li[name=navbarMenu]")[activeIndex + 1];
            console.log($(href).find("a"));
            $(href).find("a").click();
        }
        console.log("left");
    });
    $("body").on("swiperight", function (event) {
        var activeIndex = 0;

        $("li[name=navbarMenu]").each(function (index) {

            if ($(this).attr("class") == "active")
                activeIndex = index;
        })
        if (activeIndex != 0) {
            var href = $("li[name=navbarMenu]")[activeIndex - 1];
            console.log($(href).find("a"));
            $(href).find("a").click();
        }
        console.log("right");
    });
});