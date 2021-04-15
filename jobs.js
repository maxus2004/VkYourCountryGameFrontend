var tasks = [
    { name: 'Сдавать металлолом', cost: 0, reward: 50, rewardInterval: 0, failMessages: ['весь металл разобрали', 'вы потеряли металлолом пока несли его'] },
    { name: 'Попрошайничать', cost: 0, reward: 50, rewardInterval: 0, failMessages: ['вас отпиздили ауешники', 'вас обокрали цыгане'] },
    { name: 'Работать на складе', cost: 0, reward: 5000, rewardInterval: 0, failMessages: ['начальник вас обманул'] },
    { name: 'Продавать мороженное', cost: 500, reward: 2000, rewardInterval: 0, failMessages: ['мороженное растаяло и утекло'] },
    { name: 'Открыть магазин', cost: 50000, reward: 200000, rewardInterval: 30, failMessages: ['покупатели не нашлись', 'приехала налоговая инспекция'] },
    { name: 'Стать президентом', cost: 100000000, reward: 10000000000, rewardInterval: 365, failMessages: ['вас не выбрали', 'голоса подделали'] },
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
        if (job.rewardInterval > 0)
            jobRewardNode.innerText = 'Выгода: ' + job.reward + '₽ каждый ' + numDaysToText(job.rewardInterval);
        else
            jobRewardNode.innerText = 'Выгода: ' + job.reward + '₽';
        jobNode.appendChild(jobRewardNode);
        jobNode.addEventListener('click', function() { clickJob(i) })
        jobNode.addEventListener('transitionend', function() { stopJobAnimation(i) })
        jobsNode.appendChild(jobNode);
    };
}

function clickJob(taskId) {
    if (animatingJob) return;
    if (tasks[taskId].cost > playerData.money) {
        showMessage('Мало денег');
        document.getElementById('upgrades').children[taskId].classList.remove('jobNoMoney');
        void document.getElementById('upgrades').children[taskId].offsetWidth;
        document.getElementById('upgrades').children[taskId].classList.add('jobNoMoney');
        return;
    }
    animatingJob = true;
    document.getElementById('upgrades').children[taskId].classList.add('jobAnimating');
    setTimeout(function() { stopJobAnimation(taskId) }, 1000);
}

function stopJobAnimation(taskId) {
    animatingJob = false;
    document.getElementById('upgrades').children[taskId].classList.remove('jobAnimating');
    doJob(taskId);
}