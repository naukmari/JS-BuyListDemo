$(function() {
    var $list = $(".bl-list");
    var ONE_ROW_HTML = $(".one-row-template").html();
// зробити var для рядку
    var

    function addItem(title) {
        var $node = $(ONE_ROW_HTML);

        var quantity = 1;
        var $quantity_label = $node.find(".bl-label");

        $quantity_label.text(quantity);

        $node.find(".bl-product").text(title);


        $node.find(".bl-plus").click(function(){
            quantity += 1;
            $quantity_label.text(quantity);
        });

        $node.find(".bl-minus").click(function(){
            if (quantity === 1) {
                $node.find(".bl-minus").prop("disabled", false);
            }
            if (quantity > 1) {
                quantity -= 1;
                $quantity_label.text(quantity);
            }
        });

        $node.find(".bl-delete").click(function () {
            $node.detach();
        });

        $node.find(".bl-buy").click(function () {
           $node.bought = true;
           $node.addClass("is-bought");
        });

        $node.find(".bl-unbuy").click(function () {
            $node.removeClass("is-bought");
            $node.bought = false;
        });

        $node.find(".bl-product").click(function () {
            if (!$node.bought) {
                $node.find(".bl-product").hide();
                $node.find(".edit").show();
                $node.find(".edit").val(title);
                $node.find(".edit").focus();
            }

        });

        $node.find(".edit").focusout(function () {
            if (!$node.bought) {
                $node.find(".bl-product").show();
                $node.find(".edit").hide();
                title = $node.find(".edit").val();
                $node.find(".bl-product").text(title);
            }
        });

        $list.append($node);

    }

    addItem("Помідори");
    addItem("Огірки");
    addItem("Капуста");

    var $new_input = $(".bl-new_item");

    $(".bl-add").click(function () {
        var new_name = $new_input.val();
        if(new_name.trim()){
            addItem(new_name);
            $new_input.val("");
            $new_input.focus();
        }
     });

    $(".bl-new_item").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            var new_name = $new_input.val();
            if(new_name.trim()){
                addItem(new_name);
                $new_input.val("");
                $new_input.focus();
            }
        }
    });

    function updateStaticstics() {
        $(".ffdfd").html("");

        $(".bl-row").each(function(i, elem){
            var $node = $(elem);

            if($node.hasClass("is-bought")) {
                $node.find("title")


            } else {

            }
        })
    }
});