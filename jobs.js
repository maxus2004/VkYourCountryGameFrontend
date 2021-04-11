var jobs = [
    { name: 'Сдавать металлолом', cost: 0, reward: 50, rewardDelay: 0, repeating: false },
    { name: 'Попрошайничать', cost: 0, reward: 50, rewardDelay: 0, repeating: false },
    { name: 'Работать на складе', cost: 0, reward: 5000, rewardDelay: 3, repeating: false },
    { name: 'Продавать мороженное', cost: 500, reward: 2000, rewardDelay: 0, repeating: false },
    { name: 'Открыть магазин', cost: 50000, reward: 200000, rewardDelay: 30, repeating: true },
    { name: 'Стать президентом', cost: 100000000, reward: 10000000000, rewardDelay: 365, repeating: false },
]

var doingJob = false;

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

    for(let i = 0;i<jobs.length;i++){
        let job = jobs[i];
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
        jobNode.addEventListener('click', function(){clickJob(i)}, false)
        jobsNode.appendChild(jobNode);
    };
}

function clickJob(jobId){
    if(doingJob)return;
    doingJob = true;
    setTimeout(function(){stopJobAnimation(jobId)},1000);
    console.log(jobs[jobId].name);
}

function stopJobAnimation(jobId){
    console.log('finished '+jobs[jobId].name);
}