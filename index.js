var bridge = vkBridge;
bridge.send('VKWebAppInit');

var pages = {};

window.onload = function () {
    pages.main = document.getElementById('mainPage');
    pages.upgrade = document.getElementById('upgradePage');
    pages.leaderboard = document.getElementById('leaderboardPage');

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
