var userInfo;
var playerData;

async function loadPlayerData() {
    userInfo = await bridge.send('VKWebAppGetUserInfo');
    document.getElementById('name').innerText = userInfo.first_name + ' ' + userInfo.last_name;
    document.getElementById('userPicture').src = userInfo.photo_200;

    let response = await fetch('https://servermaksa.tk/yourcountryserver/getUser',
        {
            method: 'POST',
            body: JSON.stringify({ id: userInfo.id })
        });

    playerData = await response.json();
    document.getElementById('money').innerText = playerData.money+"₽";

    console.log(playerData);

}