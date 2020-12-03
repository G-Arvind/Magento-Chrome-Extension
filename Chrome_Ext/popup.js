$(document).ready(function() {

    $('#url').val(window.localStorage.getItem("mageExtBaseUrl"));
    let ajaxUrl = $('#url').val();
    
    if(parseInt(window.localStorage.getItem("dark"))) {
        $('#dark_toggle').prop('checked', true);
        $("body").addClass("dark");
    }

    function isUrlValid(url) {
        return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
    }

    $('#dark_toggle').click(function() {
        if($(this).prop("checked") == true) {
            window.localStorage.setItem("dark", 1);
            $("body").addClass("dark");
        }
        else {
            window.localStorage.setItem("dark", 0);
            $("body").removeClass("dark");
        }
    });

    $('.setting').click(function() {
        $(".back-btn").toggleClass("open");
        $(".setting").toggleClass("close");
        $("#about").toggleClass("open");
    });

    $('.back-btn').click(function() {
        $(".back-btn").toggleClass("open");
        $(".setting").toggleClass("close");
        $("#about").toggleClass("open");
    });

    $('#tempath_toggle').click(function() {
        if($(this).prop("checked") === true) {
            makeAjaxCall("chromeext/index/enabletph?enable=1");
        }
        else {
            makeAjaxCall("chromeext/index/enabletph?enable=0");
        }
    });

    $('#url').keyup(function(event) {
        var input = $(this);
        var url = $(this).val();
        if(isUrlValid(url)) {
            ajaxUrl = url;
            window.localStorage.setItem("mageExtBaseUrl", url);
            input.removeClass("invalid").addClass("valid");
        } else {
            input.removeClass("valid").addClass("invalid");
        }	
    });

    $("button").on("click", function(event) {
        switch(event.target.id) {
            case "clearCache":
                makeAjaxCall("chromeext/index/cacheclean", "clearCache");
                break;
            case "cacheFlush":
                makeAjaxCall("chromeext/index/cacheflush", "cacheFlush");
                break;
            case "reIndex":
                makeAjaxCall("chromeext/index/runreindex", "reIndex");
                break;
            case "adminPage":
                makeAjaxCall("chromeext/index/adminPage", "adminPage");
                break;
        }
    });

    function makeAjaxCall(route, loaderDiv = null) {
        $("#"+loaderDiv).append(constructLoader());
        $("#"+loaderDiv).prop('disabled', true);
        $.ajax({
            url: ajaxUrl + route,
            type: 'GET',
            success: function(response) {
                console.log("Response ", response);
            },
            error: function (error) {
                console.log("error", error);
                setTimeout(function() {
                    $("#"+loaderDiv + " .loader").remove();
                    $("#"+loaderDiv).prop('disabled', false);
                    MessageHelper.errorMsgHandler(error);
                }, 2000);
            }
        });
    }

    function constructLoader() {
        return `<div class="loader"></div>`;
    }

});


MessageHelper = {
    succesMsgHandler: function() {
        $("#msg").addClass("success_msg");
        $("#msg strong").text("Success!");
        $("#msg span").text("");
        setTimeout(function() {
            $("#msg").removeClass("success_msg");
        }, 5000);
    },

    errorMsgHandler: function(error) {
        $("#msg").addClass("error_msg");
        $("#msg strong").text("Error");
        $("#msg span").text("Internal Server error");
        setTimeout(function() {
            $("#msg").removeClass("error_msg");
        }, 5000);
    }
}