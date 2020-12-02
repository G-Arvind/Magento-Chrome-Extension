$(document).ready(function() {
    console.log("sasdfasdf");
    function isUrlValid(url) {
        return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
    }

    $('#dark_toggle').click(function(){
        if($(this).prop("checked") == true){
            console.log("Checkbox is checked.");
            $("body").addClass("dark");
        }
        else if($(this).prop("checked") == false){
            console.log("Checkbox is unchecked.");
            $("body").removeClass("dark");
        }
    });

    $('.setting').click(function() {
        $("#about").toggleClass("open");
    });

    $('#tempath_toggle').click(function(){
        if($(this).prop("checked") == true){
            console.log("Checkbox is checked.");
            makeAjaxCall("ssss");
        }
        else if($(this).prop("checked") == false){
            console.log("Checkbox is unchecked.");
            makeAjaxCall("ssss");
        }
    });

    $('#url').keyup(function(event) {
        var input=$(this);
        var url=$(this).val();
        if(isUrlValid(url)){
            input.removeClass("invalid").addClass("valid");
        } else {
            input.removeClass("valid").addClass("invalid");
        }	
    });

    $("button").on("click", function(event) {
        switch(event.target.id) {
            case "clearCache":
                console.log("clearCache");
                makeAjaxCall("ssss");
                break;
            case "cacheFlush":
                console.log("cacheFlush");
                makeAjaxCall("ssss");
                break;
            case "reIndex":
                console.log("reIndex");
                makeAjaxCall("ssss");
                break;
            case "adminPage":
                console.log("adminPage");
                makeAjaxCall("ssss");
                break;
        }
    })

    function makeAjaxCall(url) {
        $.ajax({
            url: url,
            type: 'GET',
            complete: function(response){
                console.log("Response ", response);
            },
            error: function (error) {
                console.log("error", error);
            }
        });
    }

});