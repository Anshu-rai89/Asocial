const queue=require('../config/kyu');
const resetPasswordMailer=require('../mailers/resetpassword');

// function to process 

queue.process('resetpassword',function(job,user,done)
{
    console.log("worker is doing job ",job.id);
    console.log('resetdb',job.data);
    console.log('user email',user.email);
    resetPasswordMailer.resetPassword(job.data);
    done();
});