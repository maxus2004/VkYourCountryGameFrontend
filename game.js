var userInfo;
var playerData;

async function loadPlayerData() {
    userInfo = await bridge.send('VKWebAppGetUserInfo');
    document.getElementById('name').innerText = userInfo.first_name + ' ' + userInfo.last_name;
    document.getElementById('userPicture').src = userInfo.photo_200;
    let request = await fetch('https://servermaksa.tk/yourcountryserver/getUser'+location.search);
    playerData = await request.json();
    document.getElementById('money').innerText = playerData.money+"₽";
    document.getElementById('day').innerText = playerData.days;
    console.log(playerData);
}

async function doJob(jobId){
    let request = await fetch('https://servermaksa.tk/yourcountryserver/doTask'+location.search+'&taskId='+jobId);
    result = await request.json();

    console.log(result);
}