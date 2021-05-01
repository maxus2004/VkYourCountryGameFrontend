var userInfo;
var playerData;
var access_token;
var server_access_string;

async function loadPlayerData() {
    server_access_string = JSON.parse(JSON.stringify(location.search));
    access_token = (await bridge.send("VKWebAppGetAuthToken", { "app_id": 7811492, "scope": "" })).access_token;
    userInfo = await bridge.send('VKWebAppGetUserInfo');
    document.getElementById('name').innerText = userInfo.first_name + ' ' + userInfo.last_name;
    document.getElementById('userPicture').src = userInfo.photo_200;
    let request = await fetch('https://servermaksa.tk/yourcountryserver/getUser' + server_access_string);
    result = await request.json();
    playerData = result.playerData;
    result.activeTasks.forEach(taskId => {
        tasks[taskId].active = true;
        document.getElementById('upgrades').children[taskId].classList.add('jobActive');
    });

    updatePlayerInfo();

    if (playerData.owner == null && location.hash != '') {
        var owner = location.hash.replace('#', '');
        becomeSlave(owner);
    }
}

async function becomeSlave(owner) {
    if (isNaN(owner)) return;
    let request = await fetch('https://servermaksa.tk/yourcountryserver/becomeSlave' + server_access_string + '&owner_id=' + owner);
    playerData.owner = await request.json();
    updateOwnerInfo();
}

async function getFree() {
    let request = await fetch('https://servermaksa.tk/yourcountryserver/getFree' + server_access_string);
    playerData = await request.json();
    updatePlayerInfo();
    updateOwnerInfo();
}

async function doJob(taskId) {

    if (taskId == 0) {
        var platform = new URLSearchParams(server_access_string).get('vk_platform');
        if (platform != 'mobile_android' && platform != 'mobile_ipad' && platform != 'mobile_iphone') {
            showMessage(tasks[taskId].failMessages[0]);
            return;
        }
        var result = await bridge.send("VKWebAppShowNativeAds", { ad_format: "reward" })
        if (result.result == false) {
            showMessage(tasks[taskId].failMessages[1]);
            return;
        }
    }

    let request = await fetch('https://servermaksa.tk/yourcountryserver/doTask' + server_access_string + '&taskId=' + taskId);
    result = await request.json();


    if (result.playerData != null)
        playerData = result.playerData;


    updatePlayerInfo();

    if (result.failed) {
        var message = Math.floor(Math.random() * tasks[taskId].failMessages.length);
        showMessage(tasks[taskId].failMessages[message]);
    }
}

async function cancelJob(taskId) {
    await fetch('https://servermaksa.tk/yourcountryserver/cancelTask' + server_access_string + '&taskId=' + taskId);
}