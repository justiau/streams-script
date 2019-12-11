javascript: (function() {
    (function(onload) {
        if (typeof jQuery === "undefined") {
            var s = document.createElement("script");
            s.src = "//code.jquery.com/jquery-latest.min.js";
            s.onload = onload;
            document.body.appendChild(s);
        } else onload();
    })(function() {
        var rep = setInterval(function(re,day,time){
            $.ajax({
                url: document.location.href
            }).done(function(html){
                var rows = jQuery(html).find('table tr');
                for (var i = 2; i < rows.length; i++) {
                    if (rows[i].textContent.includes(re) && rows[i].cells[2].textContent.includes("Register")) {
                        clearInterval(rep);
                        $.ajax({
                            url: window.location.href.split('?')[0]+rows[i].cells[2].firstChild.search
                        }).done(function(html2){
                            var slots = jQuery(html2).find('table tr');
                            var mySlot, myText;
                            for (var n = 1; n < slots.length; n++) {
                                mySlot = slots[n];
                                myText = mySlot.textContent;
                                if (myText.includes("Register") && myText.includes(day) && myText.includes(time)) {
                                    mySlot.cells[mySlot.cells.length - 1].firstChild.click();
                                }
                            }
                        })
                    }
                }
            });
        }, 1000, "COMP2310","Wednesday","12:00 - 14:00");
    })
})();