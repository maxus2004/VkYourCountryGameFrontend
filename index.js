var bridge = vkBridge;

var prevLeaderboardLoad = 0;

bridge.send('VKWebAppInit');

window.onload = function() {
    document.getElementById('getFreeBtn').addEventListener('click', clickGetFree);
    document.getElementById('getSlavesBtn').addEventListener('click', clickGetSlaves);
    document.getElementById('leaderboardPageSelect').addEventListener('click', function() { setPage('leaderboardPage') });
    document.getElementById('mainPageSelect').addEventListener('click', function() { setPage('mainPage') });
    document.getElementById('upgradePageSelect').addEventListener('click', function() { setPage('upgradePage') });

    loadJobs();
    loadPlayerData();
}

function setPage(page) {
    if (page == 'leaderboardPage' && Date.now() - prevLeaderboardLoad > 1000 * 10) {
        prevLeaderboardLoad = Date.now();
        loadLeaderboard();
    }

    var pages = document.getElementsByClassName('page');
    var selectors = document.getElementsByClassName('pageSelect');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
        selectors[i].classList.remove('pageSelected');
    }
    document.getElementById(page).style.display = 'block';
    document.getElementById(page + 'Select').classList.add('pageSelected');
}

async function updateOwnerInfo() {
    if (playerData.owner == null) {
        document.getElementById('slaveInfo').style = "display: none";
    } else {
        var ownerNameRequest = await bridge.send("VKWebAppCallAPIMethod", { "method": "users.get", "request_id": "32test", "params": { "user_ids": playerData.owner, "v": "5.130", "access_token": access_token, 'name_case': 'gen' } });
        document.getElementById('slaveInfo').style = "";
        document.getElementById('ownerId').href = "https://vk.com/id" + playerData.owner;
        document.getElementById('ownerId').innerText = ownerNameRequest.response[0].first_name + ' ' + ownerNameRequest.response[0].last_name;
    }
}

function updatePlayerInfo() {
    document.getElementById('money').innerText = playerData.money + "₽";
    document.getElementById('day').innerText = playerData.days;
    document.getElementById('slaves').innerText = playerData.slaves;
    document.getElementById('moneyTasks').innerText = playerData.money + "₽";
    document.getElementById('dayTasks').innerText = playerData.days;

    var status = ''

    if (playerData.money < 10000) status = 'бомж'
    else if (playerData.money < 100000) status = 'бедный'
    else if (playerData.money < 1000000) status = 'на новый комп хватит'
    else if (playerData.money < 1000000000) status = 'миллионер'
    else status = 'царь всея руси'

    if (playerData.owner != null) {
        document.getElementById('status').innerText = 'раб ' + status;
    } else {
        document.getElementById('status').innerText = status;
    }
}

function showMessage(message) {
    messageBox = document.getElementById('messageBox');
    messageBox.innerText = message;
    messageBox.classList.remove('messageBoxActive');
    void messageBox.offsetWidth;
    messageBox.classList.add('messageBoxActive');
}