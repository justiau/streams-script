javascript: (function() {
    (function(onload) {
        if (typeof jQuery === "undefined") {
            var s = document.createElement("script");
            s.src = "//code.jquery.com/jquery-latest.min.js";
            s.onload = onload;
            document.body.appendChild(s);
        } else onload();
    })(function() {
        var s = document.createElement("script");
        s.src = "https://gitcdn.xyz/repo/justiau/streams-script/master/index.js";
        document.body.appendChild(s);
    })
})();