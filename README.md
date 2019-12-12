# streams-script
This is a script which will automatically register you in the tutorial you want in the ANU CS streams website.

## Setup

Simply click and drag the following image or link into your bookmarks bar.

<a href='javascript: (function() {
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
})();'>
STREAMS Rego

<img src=luffy-face.jpg alt="STREAMS Rego">
</a>

## Usage
1. First login at [streams](https://cs.anu.edu.au/streams/index.php)
2. Then click on the 'STREAMS Rego' Bookmark
3. Fill in the details with your preferences and click 'Start'

__Note: The page is NOT MEANT TO REFRESH.__ This script Axios to continually check the server code so there is no need to refresh the page itself. Once the tutorial is the script will click the register button, and the page will then change.

## Tips
- If you leave this running for hours at a time, you may need to refresh the page, relog and run the script again for authorization and caching