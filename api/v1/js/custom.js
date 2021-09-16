$(document).ready(function () {
    // -------------------------------------------------------------
    //  prepare the form when the DOM is ready
    // -------------------------------------------------------------
    $("#custom_field_frm").on("submit", function (e) {
        e.stopPropagation();
        e.preventDefault();
        var error = 0;
        if(search_form == 0){
            $(".quick-error").hide();
            $(".quick-text").each(function() {
                var $value = $(this).val().trim();

                if($(this).data("req") && $value.length === 0){
                    error = 1;
                    $(this).siblings(".quick-error").show();
                }
            });
            $(".quick-textArea").each(function() {
                var $value = $(this).val().trim();
                if($(this).data("req") && $value.length === 0){
                    error = 1;
                    $(this).siblings(".quick-error").show();
                }
            });
            $(".quick-select").each(function() {
                var $value = $(this).val().trim();
                if($(this).data("req") && $value.length === 0){
                    error = 1;
                    $(this).siblings(".quick-error").show();
                }
            });
            $(".quick-radioCheck").each(function() {
                var $name = $(this).data("name");
                var $value = $('[data-name="'+$name+'"]:checked').map(function () {
                    return $(this).val().trim();
                }).get();
                if($(this).data("req") && $value.length === 0){
                    error = 1;
                    $(this).siblings(".quick-error").show();
                }
            });
        }
        if(!error){
            var form = $(this);
            var url = form.attr("action");
            $.ajax({
                type: "POST",
                url: url,
                data: form.serialize(), // serializes the form"s elements.
                success: function(data)
                {
                    AndroidInterface.additionalInfo(data);
                }
            });
        }else{
            $("html, body").animate({
                scrollTop: $("#custom_field_frm").offset().top
            }, 2000);
        }
        return false;
    });
});