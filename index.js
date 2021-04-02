var bridge = vkBridge;
bridge.send('VKWebAppInit');

//fetch('https://webhook.site/5de1bb54-78c8-41a0-ac79-f873d6687cca/' + location.hash.substr(1));


var pages = {};

window.onload = function () {
    pages.main = document.getElementById('mainPage');
    pages.upgrade = document.getElementById('upgradePage');
    pages.leaderboard = document.getElementById('leaderboardPage');
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

bridge.send("VKWebAppGetUserInfo").then(data => {
    console.log(data);
    document.getElementById("name").innerText = data.first_name+" "+data.last_name;
    document.getElementById("userPicture").src = data.photo_200;
});
