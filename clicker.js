var data = {
    count: 0
};

function init() {
    updateCounter();
    $(".akiyama").on("click", function(event) {
        data.count++;
        updateCounter();
    });
}

function updateCounter() {
    $(".counter").html("<font color='#F9629F'>❤</font> " + data.count);
}

window.addEventListener('load', init);