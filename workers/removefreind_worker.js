const queue=require('../config/kyu');
const removeFreind=require('../mailers/removefreind_mailer');

// function to process 

queue.process('remove-freind',function(job,done)
{
    console.log("worker is doing job ",job.id);
    removeFreind.newFreind(job.data);
    done();
});