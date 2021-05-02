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
        updateLeaderboard();
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

    var status = moneyToStatus(playerData.money);

    if (playerData.owner != null) {
        document.getElementById('status').innerText = 'раб ' + status;
    } else {
        document.getElementById('status').innerText = status;
    }
}

async function updateLeaderboard() {
    let request = await fetch('https://servermaksa.tk/yourcountryserver/getLeaders' + server_access_string);
    leaders = (await request.json()).leaders;

    var leaderIds = "";
    for (let i = 0; i < leaders.length; i++) {
        leaderIds += leaders[i].id + ',';
    }
    var ownerNameRequest = await bridge.send("VKWebAppCallAPIMethod", { "method": "users.get", "request_id": "32test", "params": { "user_ids": leaderIds, "v": "5.130", "access_token": access_token, 'name_case': 'nom' } });

    var leaderboardNode = document.getElementById('leaderboardPage');
    leaderboardNode.innerHTML = '';
    for (let i = 0; i < leaders.length; i++) {
        var player = leaders[i];

        if (ownerNameRequest.response[i] != undefined)
            player.name = ownerNameRequest.response[i].first_name + ' ' + ownerNameRequest.response[i].last_name

        var entry = document.createElement('div');
        entry.className = 'leaderboardEntry';
        var nameNode = document.createElement('p');
        nameNode.className = 'leaderboardName';
        nameNode.innerHTML = '<a href="' + 'https://vk.com/id' + player.id + '" target="_blank">' + player.name + '</a>';
        var statusNode = document.createElement('p');
        statusNode.className = 'leaderboardStatus';
        statusNode.innerText = moneyToStatus(player.money);

        var moneyNode = document.createElement('p');
        moneyNode.className = 'leaderboardMoney';
        moneyNode.innerText = player.money + '₽';
        nameNode.appendChild(moneyNode);
        var otherNode = document.createElement('p');
        otherNode.className = 'leaderboardOther';
        otherNode.innerText = 'рабов: ' + player.slaves + ', день: ' + player.days;
        statusNode.appendChild(otherNode);

        entry.appendChild(nameNode);
        entry.appendChild(statusNode);

        leaderboardNode.appendChild(entry);
    };
}

function showMessage(message) {
    messageBox = document.getElementById('messageBox');
    messageBox.innerText = message;
    messageBox.classList.remove('messageBoxActive');
    void messageBox.offsetWidth;
    messageBox.classList.add('messageBoxActive');
}

function numDaysToText(num) {
    if (num % 10 == 1) {
        return num + ' день';
    } else if (num % 10 >= 2 && num % 10 <= 4) {
        return num + ' дня';
    } else {
        return num + ' дней';
    }
}

function moneyToStatus(money) {
    var status = ''
    if (money < 10000) status = 'бомж'
    else if (money < 100000) status = 'бедный'
    else if (money < 1000000) status = 'на комп хватит'
    else if (money < 10000000) status = 'миллионер'
    else if (money < 100000000) status = 'мажор'
    else if (money < 1000000000) status = 'олигарх'
    else status = 'царь всея руси'
    return status
}