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

function updatePlayerInfo() {
    document.getElementById('money').innerText = playerData.money + "₽";
    document.getElementById('day').innerText = playerData.days;
    document.getElementById('moneyTasks').innerText = playerData.money + "₽";
    document.getElementById('dayTasks').innerText = playerData.days;
}

function showMessage(message) {
    document.getElementById('messageBox').innerText = message;
    document.getElementById('messageBox').classList.remove('messageBoxActive');
    setTimeout(function() { document.getElementById('messageBox').classList.add('messageBoxActive') }, 0);
}