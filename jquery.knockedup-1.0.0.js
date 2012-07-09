var ku = new function knockedUp() {
    this.whitelist = ["ko-optionsText", "ko-optionsCaption"]
}




ku.applyMappings = function (scope) {

    for (var p in ko.bindingHandlers) {
        ku.whitelist.push("ko-" + p);
    }

    var items = arrayAsAttr(ku.whitelist);

    if (scope == null) scope = $("body");

    scope.find(items).each(function (index) {
        ku.applyDataBindings(this);
    });


};

ku.applyDataBindings = function (e) {

    for (var i = 0; i < ku.whitelist.length; i++) {

        var item = ku.whitelist[i];

        var t = $(e).attr(item);
        var dataBind = $(e).attr("data-bind");

        if (dataBind == null) dataBind = "";

        if (t != null) {

            $(e).attr("data-bind", dataBind + ", " + item.replace("ko-", "") + ": " + t);

            var d = $(e).attr("data-bind");

            if (d.substring(0, 1) == ",") {
                $(e).attr("data-bind", d.substring(2, d.length));
            }

            $(e).removeAttr(item);

        }
    }

};

function arrayAsAttr(arr) {

    var s = "";

    for (var i = 0; i < arr.length; i++) {

        if (i > 0) s += ", ";

        s += "[" + arr[i] + "]";
    }

    return s;
}


    