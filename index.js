(function() {
    console.log('12:27')

    const elUI = document.createElement('iframe');
    elUI.width = 800;
    elUI.setAttribute('style', `
        display: block;
        position: fixed;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        height: 100%;
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
            <div class="ui">
                <h4 class="ui header">Set values</h4>
                <form class="ui form">
                    <div class="fields">
                        <div class="course-input">
                            <label>Course code</label>
                            <input class="prompt" type="text" placeholder="COMP2310" name="courseCode" id="courseCode">
                        </div>
                        <div class="day-input">
                            <label>Day of the week</label>
                            <input class="prompt" type="text" placeholder="Wednesday" name="day" id="day">
                        </div>
                        <div class="time-input">
                            <label>Time period</label>
                            <input class="prompt" type="text" placeholder="12:00 - 14:00" name="time" id="time">
                        </div>
                        <div class="">
                            <label>Start</label>
                            <button class="ui fluid primary button" type="submit" id="start">Start</button>
                        </div>
                    </div>
                </form>
            </div>
        `);
        contents.find('#start').click(() => {
            const courseCode = contents.find("#courseCode").val().toLowerCase().trim();
            const day = contents.find('#day').val().toLowerCase().trim();
            const time = contents.find('#time').val().toLowerCase().trim();
            console.log(courseCode);
            console.log(day);
            console.log(time);
            $([elUI]).remove();
            register(courseCode, day, time);
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

