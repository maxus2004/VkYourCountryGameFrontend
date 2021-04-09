var jobs = [
    { name: 'Сдавать металлолом', cost: 0, reward: 50, rewardDelay: 1, repeating: false, maxAmount: 1},
    { name: 'Попрошайничать', cost: 0, reward: 50, rewardDelay: 1, repeating: false, maxAmount: 1},
    { name: 'Работать на складе', cost: 0, reward: 5000, rewardDelay: 3, repeating: false, maxAmount: 1},
    { name: 'Продавать мороженное', cost: 500, reward: 2000, rewardDelay: 1, repeating: false, maxAmount: 1},
    { name: 'Открыть магазин', cost: 50000, reward: 200000, rewardDelay: 30, repeating: true, maxAmount: 20},
    { name: 'Стать президентом', cost: 100000000, reward: 10000000000, rewardDelay: 365, repeating: false, maxAmount: 1},
]

function numToDays(num) {
    if (num % 10 == 1) {
        return 'день';
    } else if (num % 10 >= 2 && num % 10 <= 4) {
        return 'дня';
    } else {
        return 'дней';
    }
}

function loadJobs() {
    var jobsNode = document.getElementById('upgrades');

    jobs.forEach((job) => {
        var jobNode = document.createElement('div');
        jobNode.className = 'infoBox';
        var jobNameNode = document.createElement('p');
        jobNameNode.className = 'jobName';
        jobNameNode.innerText = job.name;
        jobNode.appendChild(jobNameNode);
        var jobCostNode = document.createElement('p');
        jobCostNode.className = 'jobCost';
        jobCostNode.innerText ='Цена: '+job.cost + '₽';
        jobNode.appendChild(jobCostNode);
        var jobRewardNode = document.createElement('p');
        jobRewardNode.className = 'jobReward';
        jobRewardNode.innerText = 'Выгода: '+job.reward + '₽ через ' + job.rewardDelay + ' ' + numToDays(job.rewardDelay);
        jobNode.appendChild(jobRewardNode);
        jobsNode.appendChild(jobNode);
    });
}