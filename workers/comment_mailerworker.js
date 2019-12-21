const queue=require('../config/kyu');
const commentmailer=require('../mailers/comment_mailer');

// function to process 

queue.process('emails',function(job,done)
{
    console.log("worker is doing job ",job.id);
    commentmailer.newComment(job.data);
    done();
});