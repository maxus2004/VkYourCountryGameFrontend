var userInfo;
var playerData;

async function loadPlayerData() {
    userInfo = await bridge.send('VKWebAppGetUserInfo');
    document.getElementById('name').innerText = userInfo.first_name + ' ' + userInfo.last_name;
    document.getElementById('userPicture').src = userInfo.photo_200;
    let request = await fetch('https://servermaksa.tk/yourcountryserver/getUser' + location.search);
    result = await request.json();
    playerData = result.playerData;
    result.activeTasks.forEach(taskId => {
        tasks[taskId].active = true;
        document.getElementById('upgrades').children[taskId].classList.add('jobActive');
    });

    updatePlayerInfo();
}

async function doJob(taskId) {

    if (taskId == 0) {
        var platform = new URLSearchParams(location.search).get('vk_platform');
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

    let request = await fetch('https://servermaksa.tk/yourcountryserver/doTask' + location.search + '&taskId=' + taskId);
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
    await fetch('https://servermaksa.tk/yourcountryserver/cancelTask' + location.search + '&taskId=' + taskId);
}