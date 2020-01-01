const queue=require('../config/kyu');
const signupMailer=require('../mailers/signup_welcome_mailer');

// function to process 

queue.process('signup',function(job,user,done)
{
    console.log("worker is doing job ",job.id);
    
   signupMailer.welcome(job.data);
    done();
});