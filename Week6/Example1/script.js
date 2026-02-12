$(document).ready(function () {
    // Initialize Accordion
    $("#accordion").accordion({
        collapsible: true,
        heightStyle: "content",
        animate: 300
    });

    // Initialize Datepicker
    $("#datepicker").datepicker({
        dateFormat: "yy-mm-dd",
        showAnim: "slideDown",
        changeMonth: true,
        changeYear: true,
        yearRange: "2020:2030"
    });

    // Initialize Dialog
    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        width: 400,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        },
        show: {
            effect: "fade",
            duration: 300
        },
        hide: {
            effect: "fade",
            duration: 300
        }
    });

    // Open dialog button
    $("#open-dialog").on("click", function () {
        $("#dialog").dialog("open");
    });

    // Initialize Tabs
    $("#tabs").tabs({
        show: {
            effect: "fadeIn",
            duration: 300
        },
        hide: {
            effect: "fadeOut",
            duration: 200
        }
    });

    // Initialize Slider
    $("#slider").slider({
        min: 0,
        max: 100,
        value: 50,
        slide: function (event, ui) {
            $("#slider-value").text(ui.value);
        }
    });

    // Log initialization
    console.log("jQuery UI widgets initialized successfully!");
});
