$(document).ready(function () {

    // Basic Show/Hide Animations
    $("#fadeToggle").on("click", function () {
        $("#box1").fadeToggle(600);
    });

    $("#slideToggle").on("click", function () {
        $("#box1").slideToggle(600);
    });

    $("#showHide").on("click", function () {
        $("#box1").toggle(400);
    });

    // Custom Animations
    $("#moveRight").on("click", function () {
        $("#box2").animate({
            left: "+=200px"
        }, 800);
    });

    $("#grow").on("click", function () {
        $("#box2").animate({
            width: "300px",
            height: "200px",
            fontSize: "24px"
        }, 600);
    });

    $("#spin").on("click", function () {
        // Note: jQuery doesn't natively support CSS transforms in animate()
        // We'll use a workaround with step function
        $("#box2").animate({
            width: "250px",
            height: "250px",
            opacity: 0.7
        }, {
            duration: 1000,
            step: function (now, fx) {
                if (fx.prop === "width") {
                    var rotation = (now / 250) * 360;
                    $(this).css("transform", "rotate(" + rotation + "deg)");
                }
            }
        });
    });

    $("#reset").on("click", function () {
        $("#box2").stop().css({
            left: "0",
            width: "200px",
            height: "150px",
            fontSize: "18px",
            opacity: "1",
            transform: "rotate(0deg)"
        });
    });

    // Chained Animations
    $("#chainAnimation").on("click", function () {
        $("#box3")
            .fadeOut(400)
            .fadeIn(400)
            .animate({ width: "300px" }, 500)
            .animate({ height: "200px" }, 500)
            .animate({
                width: "200px",
                height: "150px"
            }, 500)
            .css("background", "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)");
    });

    // Multiple Element Animations
    $("#animateAll").on("click", function () {
        $(".small-box").animate({
            width: "100px",
            height: "100px"
        }, 600).animate({
            width: "80px",
            height: "80px"
        }, 600);
    });

    $("#staggered").on("click", function () {
        $(".small-box").each(function (index) {
            $(this).delay(index * 100).animate({
                opacity: 0.3
            }, 300).animate({
                opacity: 1
            }, 300);
        });
    });

    // Easing Demonstrations
    $("#easeLinear").on("click", function () {
        resetRacers();
        $("#racer1").animate({
            left: "700px"
        }, {
            duration: 2000,
            easing: "linear"
        });
    });

    $("#easeSwing").on("click", function () {
        resetRacers();
        $("#racer2").animate({
            left: "700px"
        }, {
            duration: 2000,
            easing: "swing"
        });
    });

    function resetRacers() {
        $(".racer").stop().css("left", "0");
    }

    // Add hover effects to boxes
    $(".animation-box, .small-box").hover(
        function () {
            $(this).stop().animate({
                opacity: 0.8
            }, 200);
        },
        function () {
            $(this).stop().animate({
                opacity: 1
            }, 200);
        }
    );

    console.log("jQuery animations ready!");
});
