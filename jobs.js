var tasks = [
    { name: 'Сдавать металлолом', cost: 0, reward: 50, rewardDelay: 0, repeating: false, failMessages: ['весь металл разобрали', 'вы потеряли металлолом пока несли его'] },
    { name: 'Попрошайничать', cost: 0, reward: 50, rewardDelay: 0, repeating: false, failMessages: ['вас отпиздили ауешники', 'вас обокрали цигане'] },
    { name: 'Работать на складе', cost: 0, reward: 5000, rewardDelay: 3, repeating: false, failMessages: ['начальник вас обманул'] },
    { name: 'Продавать мороженное', cost: 500, reward: 2000, rewardDelay: 0, repeating: false, failMessages: ['мороженное растаяло и утекло'] },
    { name: 'Открыть магазин', cost: 50000, reward: 200000, rewardDelay: 30, repeating: true, failMessages: ['покупатели не нашлись', 'приехала налоговая инспекция'] },
    { name: 'Стать президентом', cost: 100000000, reward: 10000000000, rewardDelay: 365, repeating: false, failMessages: ['вас не выбрали'], failMessages: ['голоса подделали'] },
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
            jobRewardNode.innerText = 'Выгода: ' + job.reward + '₽ каждый ' + job.rewardDelay + 'й день';
        } else {
            if (job.rewardDelay > 0)
                jobRewardNode.innerText = 'Выгода: ' + job.reward + '₽ через ' + numDaysToText(job.rewardDelay);
            else
                jobRewardNode.innerText = 'Выгода: ' + job.reward + '₽';
        }
        jobNode.appendChild(jobRewardNode);
        jobNode.addEventListener('click', function() { clickJob(i) })
        jobNode.addEventListener('transitionend', function() { stopJobAnimation(i) })
        jobsNode.appendChild(jobNode);
    };
}

function clickJob(jobId) {
    if (animatingJob) return;
    animatingJob = true;
    document.getElementById('upgrades').children[jobId].classList.add('jobAnimating');
    setTimeout(function() { stopJobAnimation(jobId) }, 1000);
}

function stopJobAnimation(jobId) {
    animatingJob = false;
    document.getElementById('upgrades').children[jobId].classList.remove('jobAnimating');
    doJob(jobId);
}