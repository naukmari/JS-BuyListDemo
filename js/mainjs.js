$(function () {
    var $list = $(".bl-list");
    var ONE_ROW_HTML = $(".one-row-template").html();
    $(".one-row-template").detach();

    function addItem(title, needAnimation) {
        var $node = $(ONE_ROW_HTML);
        var quantity = 1;
        var $quantity_label = $node.find(".bl-label");

        $quantity_label.text(quantity);

        $node.find(".bl-product").text(title);


        $node.find(".bl-plus").click(function () {
            quantity += 1;
            $quantity_label.text(quantity);
            updateStaticstics();
        });

        $node.find(".bl-minus").click(function () {
            if (quantity === 1) {
                $node.find(".bl-minus").prop("disabled", false);
            }
            if (quantity > 1) {
                quantity -= 1;
                $quantity_label.text(quantity);
            }
            updateStaticstics();
        });

        $node.find(".bl-delete").click(function () {
            $node.fadeOut(500, function () {
                $node.remove();
                updateStaticstics();
            })
        });

        $node.find(".bl-buy").click(function () {
            updateStaticstics();
            $node.bought = true;
            $node.addClass("is-bought");
            updateStaticstics();
        });

        $node.find(".bl-unbuy").click(function () {
            $node.removeClass("is-bought");
            $node.bought = false;
            updateStaticstics();
        });

        $node.find(".bl-product").click(function () {
            if (!$node.bought) {
                $node.find(".bl-product").hide();
                $node.find(".edit").show();
                $node.find(".edit").val(title);
                $node.find(".edit").focus();
            }
            updateStaticstics();
        });

        $node.find(".edit").focusout(function () {
            if (!$node.bought) {
                $node.find(".bl-product").show();
                $node.find(".edit").hide();
                title = $node.find(".edit").val();
                $node.find(".bl-product").text(title);
            }
            updateStaticstics();
        });

        $list.append($node);
        if (needAnimation) {
            $node.hide();
            $node.fadeIn(900)
        }
    }

    function createRmainItem(name, count) {
        return $('<div/>').addClass('remaining-label')
            .append($('<span/>').html(name).addClass('title'))
            .append($('<span/>').html(count).addClass('number'));
    }

    addItem("Помідори", false);
    addItem("Огірки", false);
    addItem("Капуста", false);

    var $new_input = $(".bl-new_item");

    $(".bl-add").click(function () {

        var new_name = $new_input.val();
        if (new_name.trim()) {
            addItem(new_name, true);
            $new_input.val("");
            $new_input.focus();
        }
        updateStaticstics();
    });

    $(".bl-new_item").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var new_name = $new_input.val();
            if (new_name.trim()) {
                addItem(new_name, true);
                $new_input.val("");
                $new_input.focus();
            }
        }
        updateStaticstics();
    });

    function updateStaticstics() {
        $('.bl2-products').empty();
        $('.bl4-bought_products').empty();
        $('.bl-row').each(function (ind, elem) {
            var name = $(elem).find('.bl-product').html();
            var count = $(elem).find('.bl-label').html();
            var classesList = $(elem).attr('class')
            var elem = createRmainItem(name, count);
            if (classesList.indexOf('is-bought') > -1) {
                $('.bl4-bought_products').append(elem);
            } else {
                $('.bl2-products').append(elem);
            }
        });
    }
    updateStaticstics();
});