const queue=require('../config/kyu');
const confirmFreind=require('../mailers/confirmfreindmailer');

// function to process 

queue.process('confirm-freind',function(job,done)
{
    console.log("worker is doing job ",job.id);
    confirmFreind.newFreind(job.data);
    done();
});