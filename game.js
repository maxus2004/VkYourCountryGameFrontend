var userInfo;
var playerData;

async function loadPlayerData() {
    userInfo = await bridge.send('VKWebAppGetUserInfo');
    document.getElementById('name').innerText = userInfo.first_name + ' ' + userInfo.last_name;
    document.getElementById('userPicture').src = userInfo.photo_200;
    let request = await fetch('https://servermaksa.tk/yourcountryserver/getUser' + location.search);
    playerData = await request.json();

    updatePlayerInfo();
}

async function doJob(taskId) {

    if (taskId == 0) {
        var result = await bridge.send("VKWebAppShowNativeAds", { ad_format: "preloader" })
        showMessage(result)
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