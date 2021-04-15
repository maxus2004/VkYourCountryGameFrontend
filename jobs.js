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
    let jobNode = document.getElementById('upgrades').children[jobId];

    if (animatingJob) return;

    if (job.cost > playerData.money) {
        showMessage('Мало денег');
        jobNode.classList.add('jobNoMoney');
        setTimeout(function() { jobNode.classList.remove('jobNoMoney') }, 300);
        return;
    }

    if (job.repeating && job.active) {
        showMessage('Работа отменена');
        job.active = false;
        cancelJob();
        jobNode.classList.remove('jobAnimating');
        void jobNode.offsetWidth;
        jobNode.classList.add('jobCancel');
        setTimeout(function() { jobNode.classList.remove('jobCancel') }, 300);
        return;
    }

    animatingJob = true;
    jobNode.classList.add('jobAnimating');
    if (!job.repeating) {
        setTimeout(function() {
            animatingJob = false;
            jobNode.classList.remove('jobAnimating');
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