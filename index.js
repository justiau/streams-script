(function() {
    const elUI = document.createElement('iframe');
    elUI.setAttribute('style', `
        display: block;
        position: fixed;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 60%;
        height: 40%;
        border: 1px solid black;
        opacity: 1.0;
        filter: alpha(opacity=100);
        background: #FFF;
        -webkit-box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.75);
        z-index: 9999;
    `);

    elUI.onload = function () {
        const contents = $(elUI).contents();
        contents.find('head').html(`
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>
            <script src="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js"></script>
        `);
        contents.find('body').html(`
        <div class="ui segment">
            <h4 class="ui dividing header" style="text-align:center; margin:auto; padding-bottom: 10px;">Register STREAMS lab / tutorial</h4>
            <form class="ui form">
                <div class="ui three column centered grid">
                    <div class="four column centered row">
                        <div class="column">
                            <label style="display:block; text-align:center; padding: 0.5em; font-weight: bold">Course code</label>
                            <input class="prompt" type="text" placeholder="comp2310" name="courseCode" id="courseCode">
                        </div>
        
                        <div class="column">
                            <label style="display:block; text-align:center; padding: 0.5em; font-weight: bold">Day of the week</label>
                            <input class="prompt" type="text" placeholder="wednesday" name="day" id="day">
                        </div>
        
                        <div class="column">
                            <label style="display:block; text-align:center; padding: 0.5em; font-weight: bold">Time period</label>
                            <input class="prompt" type="text" placeholder="12:00 - 14:00" name="time" id="time">
                        </div>
                    </div>
                    <div class="three column centered row">
                        <div class="column" style="display:inline-block text-align:left">
                            <button class="ui fluid primary button" type="submit" id="start">Start</button>
                        </div>
        
                        <div class="column" style="display:inline-block; text-align:left;">
                            <button class="ui fluid primary button" type="close" id="close">Close</button>
                        </div>
                    </div>
                    <p style="font-weight:bold; opacity: 0.35">
                        By Justin Au
                    </p>
                </div>
            </form>
        </div>
        `);
        contents.find('#start').click(() => {
            const courseCode = contents.find("#courseCode").val().toLowerCase().trim();
            const day = contents.find('#day').val().toLowerCase().trim();
            var time = contents.find('#time').val().toLowerCase().trim();
            var hyphenIndex = time.indexOf('-');
            console.log("input time: " + time);
            if (time.charAt(hyphenIndex - 1) != ' ') {
                time = time.substring(0,hyphenIndex) + ' ' + time.substring(hyphenIndex)
                hyphenIndex++;
                console.log ("space added before hyphen " + time)
            }
            if (time.charAt(hyphenIndex + 1) != ' ') {
                time = time.substring(0,hyphenIndex + 1) + ' ' + time.substring(hyphenIndex + 1)
                console.log ("space added after hyphen " + time)
            }
            $([elUI]).remove();
            register(courseCode, day, time);
        });
        contents.find("#close").click(() => {
            $([elUI]).remove();
        })
    };

    document.body.appendChild(elUI);

    function register(courseCode, day, time) {
        var rep = setInterval(function(courseCode,day,time){
            $.ajax({
                url: document.location.href
            }).done(function(coursesHTML){
                var rows = jQuery(coursesHTML).find('table tr');
                for (var i = 2; i < rows.length; i++) {
                    if (rows[i].textContent.toLowerCase().includes(courseCode) && rows[i].cells[2].textContent.includes("Register")) {
                        clearInterval(rep);
                        $.ajax({
                            url: window.location.href.split('?')[0]+rows[i].cells[2].firstChild.search
                        }).done(function(tutsHTML){
                            var slots = jQuery(tutsHTML).find('table tr');
                            var mySlot, myText;
                            for (var n = 1; n < slots.length; n++) {
                                mySlot = slots[n];
                                myText = mySlot.textContent;
                                if (myText.includes("Register") && myText.toLowerCase().includes(day) && myText.toLowerCase().includes(time)) {
                                    mySlot.cells[mySlot.cells.length - 1].firstChild.click();
                                }
                            }
                        })
                    }
                }
            });
        }, 500, courseCode, day, time);
    }
})();
