var data = {
    count: 0,
    items: {},
};
var persecond = 0;

const itemsData = [
    {
        name: "clicker",
        label: "CLICKER",
        cost: 25,
        persecond: 1,
    },
    {
        name: "potato",
        label: "FRIED POTATO",
        cost: 250,
        persecond: 25,
    },
    {
        name: "curry",
        label: "CURRY RICE",
        cost: 2500,
        persecond: 250,
    },
    {
        name: "mafuyu",
        label: "ASAHINA MAFUYU",
        cost: 12700,
        persecond: 1620,
    },
    {
        name: "kanade",
        label: "YOISAKI KANADE",
        cost: 210000,
        persecond: 15400,
    },
    {
        name: "ena",
        label: "SHINONOME ENA",
        cost: 4300000,
        persecond: 158000,
    },
]

function init() {
    loadData();
    updateCounter();
    updateItems();
    $(".akiyama").on("click", function (event) {
        $('#akiyama_audio')[0].currentTime = 0;
        $('#akiyama_audio')[0].play();
        data.count++;
        saveData();
        updateCounter();
    });
    setInterval(loving, 20);
    setInterval(saveData, 1000 * 10);
}

function updateItems() {
    $(".itemTable")[0].innerHTML = "";
    itemsData.forEach((item) => {
        var enabled = data.count >= (item.cost * (data.items[item.name] + 1));
        $(".itemTable")[0].innerHTML += `
                <tr>
                    <td>
                        <button name="${item.name}" cost="${item.cost}" persecond="${item.persecond}" class="item ${item.name}" ${enabled ? "" : "disabled"} onclick="upgradeItem(this)">
                            <svg>
                                <text x="5" y="94" class="itemLabel">${item.label}</text>
                                <text x="250" y="28">LEVEL</text>
                                <text x="330" y="26">:</text>
                                <text x="350" y="28">${data.items[item.name]}</text>
                                <text x="250" y="58">COST</text>
                                <text x="330" y="56">:</text>
                                <text x="350" y="58" class="heart">❤</text>
                                <text x="380" y="58">${(item.cost * (data.items[item.name] + 1)).toLocaleString()}</text>
                                <text x="250" y="88">❤/sec</text>
                                <text x="330" y="86">:</text>
                                <text x="350" y="88" class="heart">❤</text>
                                <text x="380" y="88">${item.persecond.toLocaleString()}</text>
                                <rect x="0" y="0" width="100%" height="100%" fill="black">
                            </svg>
                        </button>
                    </td>
                </tr>
        `;
    });
}

function upgradeItem(item) {
    if (data.count < (item.getAttribute("cost") * (data.items[item.name] + 1))) {
        updateItems();
        updateCounter();
        return;
    }
    $('#btn_audio')[0].currentTime = 0;
    $('#btn_audio')[0].play();
    data.count -= (item.getAttribute("cost") * (data.items[item.name] + 1));
    data.items[item.name]++;
    persecond += new Number(item.getAttribute("persecond"));
    updateItems();
    updateCounter();
}

function updateCounter() {
    $(".counter").html(`
            <svg>
                <text x="5" y="45" class="heart">❤</text>
                <text x="50" y="45">${data.count.toLocaleString(undefined, { minimumFractionDigits: 2 })}</text>
            </svg>
    `);
    itemsData.forEach((item) => {
        var enabled = data.count >= (item.cost * (data.items[item.name] + 1));
        if (enabled) {
            $(".item." + item.name).removeAttr("disabled");
        } else {
            $(".item." + item.name).prop("disabled", "true");
        }
    });
}

function loving() {
    data.count += persecond / 50;
    updateCounter();
}

function saveData() {
    document.cookie = "clickerData=" + btoa(JSON.stringify(data)) + "; max-age=31536000";
}

function loadData() {
    const cookieValue = document.cookie.split("; ").find((row) => row.startsWith("clickerData="))?.split("=")[1];
    if (cookieValue != null && cookieValue != "") {
        data = JSON.parse(atob(cookieValue));
    }
    itemsData.forEach((item) => {
        if (data.items[item.name] == undefined) {
            data.items[item.name] = 0;
        }
        persecond += item.persecond * data.items[item.name]
    });
}

window.addEventListener('load', init);