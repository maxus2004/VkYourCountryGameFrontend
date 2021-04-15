var tasks = [
    { name: 'Сдавать металлолом', cost: 0, reward: 50, repeating: false, rewardInterval: 0, failMessages: ['весь металл разобрали', 'вы потеряли металлолом пока несли его'] },
    { name: 'Попрошайничать', cost: 0, reward: 50, repeating: false, rewardInterval: 0, failMessages: ['вас отпиздили ауешники', 'вас обокрали цыгане'] },
    { name: 'Работать на складе', cost: 0, reward: 750, repeating: false, rewardInterval: 0, failMessages: ['начальник вас обманул'] },
    { name: 'Продавать мороженное', cost: 500, reward: 2000, repeating: false, rewardInterval: 0, failMessages: ['мороженное растаяло и утекло'] },
    { name: 'Открыть магазин', cost: 50000, reward: 200000, repeating: true, rewardInterval: 30, failMessages: ['покупатели не нашлись', 'приехала налоговая инспекция'] },
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
        jobNode.className = 'infoBox';
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
        if (job.repeating) {
            jobRewardNode.innerText = 'Выгода: ' + job.reward + '₽ каждый ' + job.rewardInterval + 'й день';
        } else
            jobRewardNode.innerText = 'Выгода: ' + job.reward + '₽';
        jobNode.appendChild(jobRewardNode);
        jobNode.addEventListener('click', function() { clickJob(i) })
        jobNode.addEventListener('transitionend', function() { stopJobAnimation(i) })
        jobsNode.appendChild(jobNode);
    };
}

function clickJob(jobId) {
    let job = tasks[jobId]
    if (animatingJob) return;
    if (job.cost > playerData.money) {
        showMessage('Мало денег');
        document.getElementById('upgrades').children[jobId].classList.remove('jobNoMoney');
        void document.getElementById('upgrades').children[jobId].offsetWidth;
        document.getElementById('upgrades').children[jobId].classList.add('jobNoMoney');
        return;
    }
    if (job.repeating && playerData.days - job.started < job.rewardInterval) {
        showMessage('Работа еще не закончена');
        document.getElementById('upgrades').children[jobId].classList.remove('jobNoMoney');
        void document.getElementById('upgrades').children[jobId].offsetWidth;
        document.getElementById('upgrades').children[jobId].classList.add('jobNoMoney');
        return;
    }
    animatingJob = true;
    document.getElementById('upgrades').children[jobId].classList.remove('jobAnimating');
    void document.getElementById('upgrades').children[jobId].offsetWidth;
    document.getElementById('upgrades').children[jobId].classList.add('jobAnimating');
    if (!job.repeating) {
        setTimeout(function() { stopJobAnimation(jobId) }, 1000);
    } else {
        job.started = playerData.days;
        setTimeout(function() { stopRepeatingJobAnimation(jobId) }, 1000);
    }
}

function stopRepeatingJobAnimation(taskId) {
    animatingJob = false;
    doJob(taskId);
}

function stopJobAnimation(taskId) {
    animatingJob = false;
    document.getElementById('upgrades').children[taskId].classList.remove('jobAnimating');
    doJob(taskId);
}