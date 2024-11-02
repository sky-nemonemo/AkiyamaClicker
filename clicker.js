var data = {
    count: 0
};

function init() {
    loadData();
    updateCounter();
    $(".akiyama").on("click", function (event) {
        data.count++;
        saveData();
        updateCounter();
    });
}

function updateCounter() {
    $(".counter").html("<font color='#F9629F'>❤</font> " + data.count.toLocaleString());
}

function saveData() {
    document.cookie = "clickerData=" + btoa(JSON.stringify(data)) + "; max-age=31536000";
}

function loadData() {
    const cookieValue = document.cookie.split("; ").find((row) => row.startsWith("clickerData="))?.split("=")[1];
    if (cookieValue != null && cookieValue != "") {
        data = JSON.parse(atob(cookieValue));
    }
}

window.addEventListener('load', init);