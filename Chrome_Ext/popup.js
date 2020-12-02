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
        $("#about").toggleClass("open");
    });

    $('#tempath_toggle').click(function() {
        if($(this).prop("checked") === true) {
            makeAjaxCall("/ztech/index/cacheclean?enable=true");
        }
        else {
            makeAjaxCall("/ztech/index/cacheclean?enable=false");
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
                makeAjaxCall("/ztech/index/cacheclean");
                break;
            case "cacheFlush":
                makeAjaxCall("/ztech/index/cacheflush");
                break;
            case "reIndex":
                makeAjaxCall("/ztech/index/runreindex");
                break;
            case "adminPage":
                makeAjaxCall("/ztech/index/adminPage");
                break;
        }
    });

    function makeAjaxCall(route) {
        $.ajax({
            url: ajaxUrl + route,
            type: 'GET',
            complete: function(response) {
                console.log("Response ", response);
            },
            error: function (error) {
                console.log("error", error);
            }
        });
    }

});