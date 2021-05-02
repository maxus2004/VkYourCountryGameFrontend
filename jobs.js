var tasks = [
    { name: 'Посмотреть рекламу', cost: 0, reward: 0, repeating: false, rewardInterval: 0, failMessages: ['смотреть рекламу можно только на телефоне', 'не удалось показать рекламу'] },
    { name: 'Сдавать металлолом', cost: 0, reward: 50, repeating: false, rewardInterval: 0, failMessages: ['весь металл разобрали', 'вы потеряли металлолом пока несли его'] },
    { name: 'Попрошайничать', cost: 0, reward: 50, repeating: false, rewardInterval: 0, failMessages: ['вас отпиздили ауешники', 'вас обокрали цыгане'] },
    { name: 'Работать на складе', cost: 250, reward: 2000, repeating: false, rewardInterval: 0, failMessages: ['начальник вас обманул'] },
    { name: 'Продавать мороженное', cost: 500, reward: 2000, repeating: false, rewardInterval: 0, failMessages: ['мороженное растаяло и утекло'] },
    { name: 'Чинить компьютеры', cost: 5000, reward: 30000, repeating: false, rewardInterval: 0, failMessages: ['бабка воткнула USB наоборот', 'комп забрали, а деньги не дали'] },
    { name: 'Открыть магазин', cost: 100000, reward: 200000, repeating: true, rewardInterval: 10, failMessages: ['покупатели не нашлись', 'приехала налоговая инспекция'] },
    { name: 'Стать президентом', cost: 100000000, reward: 10000000000, repeating: true, rewardInterval: 365, failMessages: ['вас не выбрали', 'голоса подделали'] },
]

var animatingJob = false;

function numDaysToText(num) {
    if (num % 10 == 1) {
        return num + ' день';
    } else if (num % 10 >= 2 && num % 10 <= 4) {
        return num + ' дня';
    } else {
        return num + ' дней';
    }
}

function loadJobs() {
    var jobsNode = document.getElementById('upgrades');

    for (let i = 0; i < tasks.length; i++) {
        let job = tasks[i];
        var jobNode = document.createElement('div');
        jobNode.className = 'jobBox clickable';
        var jobNameNode = document.createElement('p');
        jobNameNode.className = 'jobName';
        jobNameNode.innerText = job.name;
        jobNode.appendChild(jobNameNode);
        var jobCostNode = document.createElement('p');
        jobCostNode.className = 'jobCost';
        jobCostNode.innerText = 'Цена: ' + job.cost + '₽';
        jobNode.appendChild(jobCostNode);
        var jobRewardNode = document.createElement('p');
        jobRewardNode.className = 'jobReward';
        if (i == 0) {
            jobRewardNode.innerText = '+10% от всех денег';
        } else if (job.repeating) {
            jobRewardNode.innerText = 'Выгода: ' + job.reward + '₽ каждый ' + job.rewardInterval + 'й день';
        } else {
            jobRewardNode.innerText = 'Выгода: ' + job.reward + '₽';
        }
        jobNode.appendChild(jobRewardNode);
        jobNode.addEventListener('click', function() { clickJob(i) })
        jobsNode.appendChild(jobNode);
    };
}

function clickJob(jobId) {
    let job = tasks[jobId]
    let jobNode = document.getElementById('upgrades').children[jobId];

    if (animatingJob) return;

    if (!job.active && job.cost > playerData.money) {
        showMessage('Мало денег');
        jobNode.classList.add('jobNoMoney');
        setTimeout(function() { jobNode.classList.remove('jobNoMoney') }, 300);
        return;
    }

    if (job.repeating && job.active) {
        showMessage('Работа отменена');
        job.active = false;
        cancelJob(jobId);
        jobNode.classList.remove('jobActive');
        jobNode.classList.remove('jobClicked');
        jobNode.classList.add('jobCancel');
        setTimeout(function() { jobNode.classList.remove('jobCancel') }, 300);
        return;
    }

    animatingJob = true;
    jobNode.classList.add('jobClicked');
    void jobNode.offsetWidth;
    jobNode.classList.add('jobActive');
    if (!job.repeating) {
        setTimeout(function() {
            animatingJob = false;
            jobNode.classList.remove('jobActive');
            jobNode.classList.remove('jobClicked');
            doJob(jobId);
        }, 1000);
    } else {
        job.active = true;
        setTimeout(function() {
            animatingJob = false;
            doJob(jobId);
        }, 1000);
    }
}

function clickGetFree() {
    if (playerData.money < 1000000) {
        showMessage('Мало денег');
        document.getElementById('getFreeBtn').classList.add('jobNoMoney');
        setTimeout(function() { document.getElementById('getFreeBtn').classList.remove('jobNoMoney') }, 300);
        return;
    }
    getFree();
}

function clickGetSlaves() {
    var link = "https://vk.com/app7811492#" + userInfo.id;
    bridge.send("VKWebAppShare", { "link": link });
}