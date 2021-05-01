var bridge = vkBridge;

bridge.send('VKWebAppInit');

window.onload = function() {
    loadJobs();
    loadPlayerData();
}

function setPage(page) {
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
    document.getElementById('moneyTasks').innerText = playerData.money + "₽";
    document.getElementById('dayTasks').innerText = playerData.days;
}

function showMessage(message) {
    messageBox = document.getElementById('messageBox');
    messageBox.innerText = message;
    messageBox.classList.remove('messageBoxActive');
    void messageBox.offsetWidth;
    messageBox.classList.add('messageBoxActive');
}