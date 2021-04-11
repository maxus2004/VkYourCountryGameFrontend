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
    let request = await fetch('https://servermaksa.tk/yourcountryserver/doTask' + location.search + '&taskId=' + taskId);
    result = await request.json();

    playerData.money = result.money;
    playerData.days = result.days;

    updatePlayerInfo();

    if (result.failed) {
        var message = Math.floor(Math.random() * tasks[taskId].failMessages.length);
        showMessage(tasks[taskId].failMessages[message]);
    }
}